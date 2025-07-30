import { Card, Button } from 'react-bootstrap'
import { useUser } from '../context/UserContext'

const PostCard = ({ post, onEdit, onDelete }) => {
  const { user } = useUser()
  const isOwner = user && post.user_id === user._id

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
        <small className="text-muted">
          {new Date(post.created_at).toLocaleString()}
        </small>
        {isOwner && (
          <div className="mt-3">
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => onEdit?.(post)}
            >
              Editar
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => onDelete?.(post._id)}
            >
              Eliminar
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default PostCard
