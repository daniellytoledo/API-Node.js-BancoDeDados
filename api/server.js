import express from 'express';
import pkg from '@prisma/client';
import cors from 'cors';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CORS para produção - aceita qualquer origem
app.use(cors({
    origin: true,
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// GET por ID específico
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Buscando usuário com ID:', id);
        
        const user = await prisma.user.findUnique({
            where: { id: id }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro no GET por ID:', error);
        res.status(400).json({ error: error.message });
    }
});

// atualizar usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log('ID recebido:', id);
        console.log('Dados para atualizar:', req.body);

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        
        console.log('Usuário atualizado:', user);
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro no PUT:', error);
        res.status(400).json({ error: error.message }); 
    }
});

// DELETE - Deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;     
        
        console.log('Tentando deletar usuário com ID:', id);
        
        const user = await prisma.user.delete({
            where: { id: id }
        });
        
        console.log('Usuário deletado com sucesso:', user);
        res.status(200).json({ message: 'Usuário deletado', user });
        
    } catch (error) {
        console.error('Erro ao deletar:', error);

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        
        res.status(400).json({ error: error.message });
    }
});

// GET todos os usuários
app.get('/usuarios/', async (req, res) => {
    try {
        console.log('Query parameters:', req.query);
        
        const filters = {};
        if (req.query.name) filters.name = req.query.name;
        if (req.query.email) filters.email = req.query.email;
        if (req.query.age) filters.age = req.query.age;
        
        console.log('Filtros aplicados:', filters);
        
        const users = await prisma.user.findMany({
            where: Object.keys(filters).length > 0 ? filters : {}
        });
        
        console.log('Usuários encontrados:', users.length);
        res.status(200).json(users);
        
    } catch (error) {
        console.error('Erro no GET:', error);
        res.status(500).json({ error: error.message });
    }
});

// POST criar usuário
app.post('/usuarios', async (req, res) => {
    try {
        console.log('Dados recebidos no POST:', req.body);
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        console.log('Usuário criado no banco:', user);
        res.status(201).json(user);
    } catch (error) {
        console.error('Erro no POST:', error);
        res.status(400).json({ error: error.message });
    }
});

// MUDANÇA IMPORTANTE PARA PRODUÇÃO:
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});