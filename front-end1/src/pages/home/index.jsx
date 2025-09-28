import { useEffect, useState } from 'react'
import './styles.css'
import Lixeira1 from '../../assets/lixeira1.png'
import api from '../../services/api'

function Home() {
    const [users, setUsers] = useState([])

    async function getUsers() {
        try {
            const response = await api.get('/usuarios')
            setUsers(response.data)
            console.log('Usuários carregados:', response.data)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='container'>
            <form>
                <h1>Cadastro de Usuários</h1>
                <input placeholder='Nome' name='name' type='text' />
                <input placeholder='Idade' name='age' type='number' />
                <input placeholder='E-mail' name='email' type='email' />
                <button type='button'>Cadastrar</button>
            </form>

            {/* VERIFICAÇÃO DOS DADOS */}
            {console.log('Users no estado:', users)}
            
            {users.length > 0 ? (
                users.map(user => (
                    <div key={user.id} className='card'>
                        <div>
                            {/* Tente ambas as formas - inglês e português */}
                            <p>Nome: <span>{user.name || user.nome}</span></p>
                            <p>Idade: <span>{user.age || user.idade}</span></p>
                            <p>E-mail: <span>{user.email || user.email}</span></p>
                        </div>
                        <button>
                            <img src={Lixeira1} alt="Excluir" />
                        </button>
                    </div>
                ))
            ) : (
                <p>Nenhum usuário cadastrado</p>
            )}
        </div>
    )
}

export default Home