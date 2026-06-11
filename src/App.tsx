import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/cadastro/Cadastro'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import ListaViagens from './components/viagem/listaviagem/ListaViagem'
import DeleteViagem from './components/viagem/deletarviagem/DeleteViagem'
import FormViagem from './components/viagem/formviagem/FormViagem'
import DetalhesViagem from './pages/viagens/DetalhesViagem'
import FormParada from './components/parada/formparada/FormParada'
import DeleteParada from './components/parada/deleteparada/DeleteParada'
import FormAtividade from './components/atividade/formatividade/Formatividade'
import DeletarAtividade from './components/atividade/deleteatividade.tsx/DeletarAtividade'
import DeletarDespesa from './components/despesa/deletedespesa/DeletarDespesa'
import FormDespesa from './components/despesa/formdespesa/FormDespesa'
import  Dashboard  from './pages/dashboard/DashBoard'
import Sobre from './pages/sobre/Sobre'

function App() {

  return (
    <>
      <AuthProvider>
      <ToastContainer/>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <header>
              <Navbar/>
            </header>

            <main className="flex-1 min-h-screen">
              <Routes>

                <Route path='*' element={<Home />} />
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />

                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/login' element={<Login />} />

                <Route path='/viagens/*' element={<ListaViagens />} />
                <Route path='/viagens' element={<ListaViagens />} />

                <Route path='/cadastrarviagem/*' element={<FormViagem />} />
                <Route path='/editarviagem/:id' element={<FormViagem />} />
                <Route path='/deletarviagem/:id' element={<DeleteViagem />} />
                <Route path='/detalhesviagem/:id' element={<DetalhesViagem />} />

                <Route path='/cadastrar-parada/:viagemId' element={<FormParada />} />
                <Route path='/editar-parada/:id' element={<FormParada />} />
                <Route path='/deletar-parada/:id' element={<DeleteParada />} />

                <Route path='/atividades/cadastrar/:paradaId' element={<FormAtividade />} />
                <Route path='/editar-atividade/:id' element={<FormAtividade />} />
                <Route path='/deletar-atividade/:id' element={<DeletarAtividade />} />

                <Route path='/cadastrar-despesa/:viagemId' element={<FormDespesa />} />
                <Route path='/editar-despesa/:id' element={<FormDespesa />} />
                <Route path='/deletar-despesa/:id' element={<DeletarDespesa />} />

                <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/sobre' element={<Sobre />} />

              </Routes>
            </main>

          <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App