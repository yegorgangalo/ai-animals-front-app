import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { modalStyle } from '../../services/common'

interface ErrorModalProps {
    isOpen: boolean
    onClose: () => void
}

const ErrorModal = ({ isOpen, onClose }: ErrorModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{ ...modalStyle, width: '330px' }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Something wrong. Please, try again.
        </Alert>
      </Box>
    </Modal>
  )
}

export default ErrorModal
