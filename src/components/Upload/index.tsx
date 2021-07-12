import React from 'react'
import { Box, Button } from '@material-ui/core'
import { useAuth } from '../../contexts/AuthContext'

const Upload = () => {
    const { uploadImageToStorage } = useAuth()

    return (
        <Box display='flex' justifyContent='center' marginTop='8rem'>
            <input type='file' id='img' name='img' accept='image/*' />
            <Button onClick={uploadImageToStorage}>Upload</Button>
        </Box>
    )
}

export default Upload