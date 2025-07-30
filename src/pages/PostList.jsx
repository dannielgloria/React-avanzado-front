import { useEffect, useState } from 'react'
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Spinner,
  Alert,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useUser } from '../context/UserContext'
import client from '../api/client'

const PostList = () => {
  const { user, logout } = useUser()
  const [posts, setPosts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm()

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await client.get('/post')
      setPosts(res.data.reverse())
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Error al cargar publicaciones')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      if (!user) return
      if (editingId) {
        await client.put(`/post/${editingId}`, data)
        setEditingId(null)
      } else {
        await client.post('/post', { ...data, user_id: user._id })
      }
      reset()
      fetchPosts()
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('No se pudo guardar el post')
    }
  }

  const handleEdit = (post) => {
    setValue('title', post.title)
    setValue('content', post.content)
    setEditingId(post._id)
  }

  const handleDelete = async (id) => {
    try {
      await client.delete(`/post/${id}`)
      fetchPosts()
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('No se pudo eliminar el post')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">Debes iniciar sesión para ver los posts.</Alert>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Publicaciones</h2>
        <Button variant="outline-danger" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Control
              placeholder="Título"
              {...register('title', { required: 'Requerido' })}
              className="mb-2"
            />
          </Col>
          <Col md={6}>
            <Form.Control
              placeholder="Contenido"
              {...register('content', { required: 'Requerido' })}
              className="mb-2"
            />
          </Col>
          <Col md={2}>
            <Button type="submit" className="w-100">
              {editingId ? 'Actualizar' : 'Crear'}
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </Container>
  )
}

export default PostList
