'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ControlledFileUploadField from '../ControlledFileUploadField'
import ControlledTextField from '../ControlledTextField'

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
  prompt: 'make this photo in pop art style',
  image: undefined,
}

interface FormProps {
  loading: boolean
  handleFetch: (data: FormData) => void
}

const Form = ({ loading, handleFetch }: FormProps) => {
  const { control, handleSubmit, formState, reset } = useForm<IFormData>({ defaultValues, resolver })
  const { errors } = formState

  const sendToAI = (uiFormData: IFormData) => {
    const { image, prompt } = uiFormData
    console.log('uiFormData=', uiFormData);

    const apiFormData = new FormData()

    apiFormData.append("image", image, image.name)
    apiFormData.append("prompt", prompt)

    handleFetch(apiFormData)
  }

  return (
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
  )
}

export default Form
