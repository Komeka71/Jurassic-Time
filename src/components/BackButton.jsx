import { useNavigate } from 'react-router-dom'
import './BackButton.css'

function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      className="back-button"
      onClick={() => navigate('/')}
    >
      <span className="back-button__arrow" aria-hidden="true">
        ←
      </span>
      Back to Era Selection
    </button>
  )
}

export default BackButton
