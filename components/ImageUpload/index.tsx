import React from 'react'
import { SxProps } from '@mui/material'
import { Typography, Box } from '@mui/material'
import { useDropzone } from 'react-dropzone'

const getStyles = (error: boolean) => ({
    dropZone: {
        height: 400,
        // width: 600,
        color: error ? '#d32f2f' : 'grey',
        fontWeight: 500,
        border: `2px dashed ${error ? '#d32f2f' : 'grey'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            color: '#1664c0',
            border: '2px solid #1664c0',
            borderRadius: '4px',
        },
        '&:focus': {
            color: '#1664c0',
            border: '2px solid #1664c0',
            borderRadius: '4px',
        },
    },
}) as { dropZone: SxProps }

interface ImageUploadProps {
    label?: string
    backgroundUrl?: string
    disabled?: boolean
    setFile: (files: File) => void
    error: boolean
}

const ImageUpload = ({ label, backgroundUrl, disabled, setFile, error }: ImageUploadProps) => {
    const [renderImage, setRenderImage] = React.useState<string | null>(null)

    const onDrop = (files: File[]) => {
        const currentImage = files[0]
        setFile(currentImage)
        setRenderImage(URL.createObjectURL(currentImage))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const dragZoneText = isDragActive ? 'Drop image to load it' : 'Drag image or click to select'

    const backgroundImageUrl = renderImage || backgroundUrl

    const styles = getStyles(error)
    if (backgroundImageUrl) {
        styles.dropZone = {
            ...styles.dropZone,
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
        }
    }

    return (
        <Box sx={{ pointerEvents: disabled ? "none" : "auto"}}>
            {label ? <Typography mb={2}>{label}</Typography> : null}
            <Box sx={styles.dropZone} {...getRootProps()}>
                <input {...getInputProps()} />
                {<Typography>{dragZoneText}</Typography>}
            </Box>
        </Box>
    )
}

export default ImageUpload
