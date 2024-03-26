import { Controller, FieldErrors, Control } from 'react-hook-form'
import TextField, { TextFieldProps } from '@mui/material/TextField'

interface ControlledTextFieldProps {
  name: string
  label: string
  errors: FieldErrors
  control: any
}

const ControlledTextField = ({ name, label, errors, control, ...rest }: ControlledTextFieldProps & TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value!}
          label={label}
          variant="standard"
          error={!!errors[name]}
          helperText={(errors[name]?.message || '') as any}
          fullWidth
          {...rest}
        />
      )}
    />
  )
}

export default ControlledTextField
