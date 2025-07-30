import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useUser } from '../context/UserContext'
import client from '../api/client'

const Login = () => {
  const { login } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await client.post('/user/login', data)
      login(res.data)
    } catch (err) {
      console.error(err)
      setError('root', {
        message: 'Correo o contraseña incorrectos',
      })
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            {...register('email', { required: 'El correo es obligatorio' })}
          />
          {errors.email && (
            <Form.Text className="text-danger">{errors.email.message}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Tu contraseña"
            {...register('password', { required: 'La contraseña es obligatoria' })}
          />
          {errors.password && (
            <Form.Text className="text-danger">{errors.password.message}</Form.Text>
          )}
        </Form.Group>

        {errors.root && <Alert variant="danger">{errors.root.message}</Alert>}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Login
