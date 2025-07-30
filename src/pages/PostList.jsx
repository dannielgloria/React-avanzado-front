import { useEffect, useState } from 'react'
import client from '../api/client'
import { useUser } from '../context/UserContext'

function PostList() {
  const { user } = useUser()
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editPostId, setEditPostId] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const res = await client.get('/post')
      setPosts(res.data.reverse())
    } catch (error) {
      console.error('Error al obtener posts:', error)
    }
  }

  const handleCreate = async () => {
    if (!title || !content) return
    try {
      await client.post('/post', {
        title,
        content,
        user_id: user._id,
      })
      setTitle('')
      setContent('')
      fetchPosts()
    } catch (error) {
      console.error('Error al crear post:', error)
    }
  }

  const handleUpdate = async (id) => {
    try {
      await client.put(`/post/${id}`, {
        title,
        content,
      })
      setEditPostId(null)
      setTitle('')
      setContent('')
      fetchPosts()
    } catch (error) {
      console.error('Error al actualizar post:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await client.delete(`/post/${id}`)
      fetchPosts()
    } catch (error) {
      console.error('Error al eliminar post:', error)
    }
  }

  const startEdit = (post) => {
    setEditPostId(post._id)
    setTitle(post.title)
    setContent(post.content)
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Crear nueva publicación</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Contenido"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editPostId ? (
          <button className="btn btn-warning" onClick={() => handleUpdate(editPostId)}>
            Actualizar publicación
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleCreate}>
            Crear publicación
          </button>
        )}
      </div>

      <hr className="my-4" />
      <h3 className="mb-3">Publicaciones</h3>

      {posts.map((post) => (
        <div className="card mb-3" key={post._id}>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <p className="card-text">
              <small className="text-muted">
                {new Date(post.created_at).toLocaleString()}
              </small>
            </p>

            {post.user_id === user._id && (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => startEdit(post)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(post._id)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
