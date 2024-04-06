import Image from 'next/image'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { modalStyle } from '../../services/common'

interface SuccessModalProps {
    imageData: string | null
    isOpen: boolean
    onClose: () => void
}

const SuccessModal = ({ imageData, isOpen, onClose }: SuccessModalProps) => {
    const downloadAiImage = () => {
        if (!imageData) {
          return
        }
        // Create a Blob from the base64 imageData
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ai-generated-image.jpg';
        link.click();

        // Clean up
        URL.revokeObjectURL(url);
      }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{ ...modalStyle, width: 512 }}>
        <Image
            src={`data:image/jpeg;base64,${imageData}`}
            alt={`ai-image`}
            width={512}
            height={512}
        />
        <Button size="large" variant="contained" fullWidth onClick={downloadAiImage}>Download</Button>
      </Box>
    </Modal>
  )
}

export default SuccessModal
