import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import Cadastro from './pages/cadastro/Cadastro'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

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

            <main className="flex-1">
              <Routes>
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Login />} />
                <Route path='/' element={<Login />} />
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