import './App.css'
import { UserProvider } from './context/UserContext'
import Header from './components/Header'
import Loging from './components/Login'
import ContenidoPrivado from './components/ContenidoPrivado'

function App() {

  return (
    <UserProvider>
      <Header />
      <Loging />
      <ContenidoPrivado />
    </UserProvider>
  )
}

export default App
