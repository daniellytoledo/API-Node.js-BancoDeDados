import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
const app = express (); /* criando uma função para o express, pois é o que os criados do express recomendam */
app.use(express.json()); /* avisando o express que estamos usando json */

/* 
Agora vamos criar uma rota, ou seja, uma conversa entre o front-end e o back-end, usando HTTP. 
Podemos usar alguns comandos como:
Get = listar
Post = criar
Put = editar vários
Patch = editar um
Delete = deletar

E as rotas precisam de:
1- tipo de rota / método HTTP
2- endereço (www.qualquersite.com/usuarios) o usuario é o endereço, neste caso.

Então, vamos iniciar com uma rota chamada get para listar os usuarios e o endereço que será 'usuarios'.
E junto com essa rota vamos utilizar request e response para dizer ao código que iremos fazer uma requisição e que também queremos uma resposta desta requisição.

HTTP Status
2xx - sucesso
4xx - erro cliente (front-end)
5xx - erro servidor (back-end)
*/

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// rotas com parametro primeiro

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


// rotas sem parametro
app.get('/usuarios/', async (req, res) => {
    try {
        console.log('Query parameters:', req.query);
        
        // Criar filtro dinamicamente
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

/* informando a porta que iremos usar e para testar o que escrevemos em cima, podemos ir no navegador e digitar o caminho para verificarmos se está tudo funcionando: localhost:3000/usuarios 

o computador por modo padrão, ele sempre vai acessar o localhost pelo método GET, mas se tivessemos usado outro método, daria erro no navegador, então podemos instalar uma ferramente chamada Thunder Client pelas extensões do vs code, e nela iremos fazer um new request get http://localhost:3000/usuarios para que o navegador consiga nos mostrar todos os métodos http usado.
*/

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

/* 
Agora podemos criar nossa API de usuários (criar, listar, editar e deletar).
E isso funciona de que forma? iremos usar Query Params (consultas), e Route Params.  Quando usamos o GET, o link do navegador pode mostrar vários informações no query params. Já no route params, são informações específicas como acessar o perfil de tal usuário, editar e deletar.
*/

/* 
O outro passo é criar uma conta no MongoDB e baixar o Prisma. Ao instalar o Prisma, ele cria um arquivo chamado env. Neste arquivo iremos colocar o link do banco de dados do Mongo.
*/
