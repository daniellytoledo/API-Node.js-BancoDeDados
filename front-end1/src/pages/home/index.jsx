import { useEffect, useState, useRef } from 'react'
import './styles.css'
import Lixeira1 from '../../assets/lixeira1.png'
import api from '../../services/api'

function Home() {
    const [users, setUsers] = useState([])

    const inputName = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()

    async function getUsers() {
        try {
            const response = await api.get('/usuarios')
            setUsers(response.data)
            console.log('Usuários carregados:', response.data)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
        }
    }

    async function createUsers() {
        await api.post('usuarios', {
            name: inputName.current.value,
            age: inputAge.current.value,
            email: inputEmail.current.value
        })

        getUsers()
    }

    async function deleteUsers(id) {
        try {
            console.log('🗑️ Deletando usuário ID:', id)
            await api.delete(`/usuarios/${id}`)
            console.log('✅ Usuário deletado, atualizando lista...')
            getUsers()
        } catch (error) {
            console.error('❌ Erro ao deletar usuário:', error)
        }
    }

    useEffect(() => {
        console.log('🎯 Componente montado, buscando usuários...')
        getUsers()
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className='container'>
            <form>
                <h1>Cadastro de Usuários</h1>
                <input placeholder='Nome' name='name' type='text' ref={inputName}/>
                <input placeholder='Idade' name='age' type='number' ref={inputAge}/>
                <input placeholder='E-mail' name='email' type='email' ref={inputEmail}/>
                <button type='button' onClick={createUsers}>Cadastrar</button>
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
                        <button onClick={() => deleteUsers(user.id)}>
                            <img src={Lixeira1} />
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