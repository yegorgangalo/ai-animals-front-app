'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import { useAiModifyImage } from '../../hooks/useAiModifyImage'
import ControlledFileUploadField from '../../components/ControlledFileUploadField'
import ControlledTextField from '../../components/ControlledTextField'
import { modalStyle } from '../../services/common'

type IFormData = { prompt: string, image: File }

const formSchema = yup
  .object()
  .shape({
    prompt: yup.string().required(),
    image: yup.mixed().test("fileSize", "File size should be less than 10Mb", (file: any) => {
      if (!file) {
        return true
      }
      return file.size <= 10_000_000
    }).required(),
  })
  .required()

const resolver = yupResolver<IFormData>(formSchema as any)

const defaultValues = {
  prompt: '',
  image: undefined,
}

const Form = () => {
  const { fetch: fetchAiModifiedImage, data, loading, setError, error } = useAiModifyImage()
  const { control, handleSubmit, formState, reset } = useForm<IFormData>({ defaultValues, resolver })
  const { errors } = formState

  const sendToAI = (uiFormData: IFormData) => {
    const { image, prompt } = uiFormData
    console.log('uiFormData=', uiFormData);

    const apiFormData = new FormData()

    apiFormData.append("image", image, image.name)
    apiFormData.append("prompt", prompt)

    fetchAiModifiedImage(apiFormData)
      .then(() => handleOpenSuccessModal())
      .catch((err) => {
        console.log(err);
        handleOpenErrorModal()
      })
  }

  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const handleOpenSuccessModal = () => setOpenSuccessModal(true)
  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false)
    error && setError(null)
  }

  const [openErrorModal, setOpenErrorModal] = useState(false)
  const handleOpenErrorModal = () => setOpenErrorModal(true)
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false)
    error && setError(null)
  }

  const downloadAiImage = () => {
    if (!data) {
      return
    }
    // Create a Blob from the base64 data
    const byteCharacters = atob(data);
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
  };

  return (<>
    {loading ? <LinearProgress sx={{ position: "fixed", width: "100%" }}/> : null}
    <Container sx={{ backgroundColor: 'white', width: '600px', padding: 8 }}>
      <Box component="form" noValidate onSubmit={handleSubmit(sendToAI)}>
      <Grid container spacing={2} flexDirection="column" justifyContent="center" alignItems="center" width="100%">
        <Grid item sx={{ width: '100%' }} pb={6}>
          <Typography variant="h4" component="h1">Customize your pet image with AI</Typography>
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <ControlledTextField
            variant="outlined"
            name="prompt"
            label="Set prompt how to change your pet photo"
            errors={errors}
            control={control}
            disabled={loading}
            multiline
            maxRows={4}
            required
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <ControlledFileUploadField
            name="image"
            errors={errors}
            control={control}
            disabled={loading}
          />
        </Grid>
        <Grid item sx={{ width: '100%' }}>
          <Button
            size="large"
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            children="Generate AI Image"
          />
        </Grid>
      </Grid>
      </Box>
    </Container>
    <Modal
      open={openSuccessModal}
      onClose={handleCloseSuccessModal}
    >
      <Box sx={{ ...modalStyle, width: 512 }}>
        <Image
            src={`data:image/jpeg;base64,${data}`}
            alt={`ai-image`}
            width={512}
            height={512}
        />
        <Button size="large" variant="contained" fullWidth onClick={downloadAiImage}>Download</Button>
      </Box>
    </Modal>
    <Modal
      open={openErrorModal}
      onClose={handleCloseErrorModal}
    >
      <Box sx={{ ...modalStyle, width: '330px' }}>
        <Alert severity="info">
          <AlertTitle>info</AlertTitle>
          Something wrong. Please, try again.
        </Alert>
      </Box>
    </Modal>
    </>
  )
}

export default Form
