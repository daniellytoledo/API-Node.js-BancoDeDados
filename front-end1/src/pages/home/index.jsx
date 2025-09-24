import './styles.css'
import Lixeira1 from '../../assets/lixeira1.png'

function Home() {
  const users = [
    {
      id: '97329371',
      name: 'Julia',
      age: 33,
      email: 'julia@email.com'
    },
    {
      id: '98342984',
      name: 'Malaica',
      age: 33,
      email: 'mama@email.com',
    },
  ]

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
