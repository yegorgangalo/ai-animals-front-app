import { Controller, FieldErrors, Control } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import ImageUpload from '../ImageUpload'

interface ControlledFileUploadFieldProps {
  name: string
  label?: string
  backgroundUrl?: string
  disabled?: boolean
  errors: FieldErrors
  control: any
}

const ControlledFileUploadField = ({ name, label, backgroundUrl, disabled, errors, control }: ControlledFileUploadFieldProps) => {
  const error = errors[name]
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { /* value, */ onChange } }) => (
        <FormControl fullWidth error={!!error}>
          <ImageUpload
            label={label}
            backgroundUrl={backgroundUrl}
            disabled={disabled}
            // file={value}
            setFile={onChange}
            error={!!error}
          />
          {error ? <FormHelperText>{error.message as string}</FormHelperText> : null}
        </FormControl>
      )}
    />
  )
}

export default ControlledFileUploadField
