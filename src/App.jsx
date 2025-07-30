import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import PostList from './pages/PostList'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <div className="text-center mt-5">Cargando sesión...</div>
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user ? <PostList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
