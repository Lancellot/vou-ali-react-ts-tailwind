import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/cadastro/Cadastro'

function App() {

  return (
    <>
      <AuthProvider>
      <ToastContainer/>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <header>

            </header>

            <main>
              <Routes>
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Login />} />
                <Route path='/' element={<Login />} />
              </Routes>
            </main>


          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App