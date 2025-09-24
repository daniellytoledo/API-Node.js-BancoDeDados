import './styles.css'
import Lixeira from '../../assets/lixeira.png'

function Home() {

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' />
        <input idade='email' type='number' />
        <input name='nome' type='email'/>
        <button type='button'>Cadastrar</button>
      </form>

      <div>
          <div>
            <p>Nome:</p>
            <p>Idade:</p>
            <p>E-mail:</p>
          </div>
          <button>
            <img src={Lixeira} />
          </button>
      </div>
    </div>
  )
}

export default Home;
