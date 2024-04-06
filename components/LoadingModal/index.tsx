import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { modalStyle } from '../../services/common'

interface LoadingModalProps {
    isOpen: boolean
    onClose: () => void
}

const LoadingModal = ({ isOpen, onClose }: LoadingModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{ ...modalStyle, width: '330px' }}>
        <Alert severity="info">
          <AlertTitle>Please, wait</AlertTitle>
          AI is modifying your photo. It can take few minutes.
        </Alert>
      </Box>
    </Modal>
  )
}

export default LoadingModal
