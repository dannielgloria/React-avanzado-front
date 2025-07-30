import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from './context/UserContext'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import PostList from './pages/PostList'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  const { user } = useUser()

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PostList />
            </PrivateRoute>
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
