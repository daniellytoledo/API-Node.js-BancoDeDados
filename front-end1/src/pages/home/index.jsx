import { useEffect, useState } from 'react'
import './styles.css'
import Lixeira1 from '../../assets/lixeira1.png'
import api from '../../services/api'


function Home() {
    const [users, setUsers] = useState([])  // armazenar usuários

    async function getUsers() {
        try {
            const response = await api.get('/usuarios')
            setUsers(response.data)  // Armazena os dados no estado
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
        <input placeholder='Nome' name='nome' type='text' />
        <input placeholder='Idade' idade='email' type='number' />
        <input placeholder='E-mail' name='nome' type='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>E-mail: <span>{user.email}</span></p>
          </div>
          <button>
            <img src={Lixeira1} />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home;
