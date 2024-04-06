'use client'
import { useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Container from '@mui/material/Container'
import { useAiModifyImage } from '../../hooks/useAiModifyImage'
import Form from '../Form'
import LoadingModal from '../LoadingModal'
import SuccessModal from '../SuccessModal'
import ErrorModal from '../ErrorModal'

const FormWrapper = () => {
  const { fetch: fetchAiModifiedImage, data, loading, setError, error } = useAiModifyImage()

  const handleFetchAiModifiedImage = (data: FormData) => {
    handleOpenLoadingModal()
    fetchAiModifiedImage(data)
      .then(() => {
        handleCloseLoadingModal()
        handleOpenSuccessModal()
      })
      .catch((err) => {
        console.log(err);
        handleCloseLoadingModal()
        handleOpenErrorModal()
      })
  }

  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const handleOpenSuccessModal = () => setOpenSuccessModal(true)
  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false)
    error && setError(null)
  }

  const [openLoadingModal, setOpenLoadingModal] = useState(false)
  const handleOpenLoadingModal = () => setOpenLoadingModal(true)
  const handleCloseLoadingModal = () => setOpenLoadingModal(false)

  const [openErrorModal, setOpenErrorModal] = useState(false)
  const handleOpenErrorModal = () => setOpenErrorModal(true)
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false)
    error && setError(null)
  }

  return (
    <>
      {loading ? <LinearProgress sx={{ position: "fixed", width: "100%" }}/> : null}
      <Container sx={{ backgroundColor: 'white', width: '600px', padding: 8 }}>
        <Form loading={loading} handleFetch={handleFetchAiModifiedImage} />
      </Container>
      <LoadingModal isOpen={openLoadingModal} onClose={handleCloseLoadingModal} />
      <SuccessModal imageData={data} isOpen={openSuccessModal} onClose={handleCloseSuccessModal} />
      <ErrorModal isOpen={openErrorModal} onClose={handleCloseErrorModal} />
    </>
  )
}

export default FormWrapper
