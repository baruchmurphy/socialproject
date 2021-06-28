import React, { useState, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { 
    Box, 
    Card, 
    Typography, 
    makeStyles,
    IconButton,
    Divider,
    Button
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Formik, Form } from 'formik';
import FormikInput from '../../formik/FormikInput';
import FormikAlert from '../../formik/FormikAlert';

const useStyles = makeStyles({
    inputs: {
        width: '20rem',
        marginBottom:'1rem'
    },
    card: {
        padding: '5px',
        width: '27rem',
    },
    editIcon: {
        marginLeft: '1rem',
        height: '20px',
        width: '20px'
    },
    divider: {
        marginBottom: '1rem'
    },
});




const Settings = () => {
    const { profile, updateEmailAndPassword, updateFirestoreEmailAndPassword } = useAuth();
    const classes = useStyles();
    const [editing, setEditing] = useState(false);

    
const initialValues = {
    email: profile.email,
    password: profile.password
};


    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                await updateEmailAndPassword(values.email, values.password)
            } catch (error) {
                const message = `The user's credential is no longer valid. The user must sign in again.`
                if(error.message === message) {
                    updateFirestoreEmailAndPassword(values.email, values.password)
                    actions.setStatus({UpdateSucess: 'Update Successful'})
                } else {
                    actions.setStatus({UpdateFailure: error.message})
                }
            } finally {
                setEditing(false)
            }
        }, [updateEmailAndPassword, updateFirestoreEmailAndPassword]
    )

    return (
        <Box width='100%' height='20rem' marginTop='4rem' display='flex' justifyContent='center' alignItems='center' >
            <Card elevation={5} className={classes.card}>
                <Box width='100%' display='flex' justifyContent='center'>
                    <Typography variant='h4'>Account Details</Typography>
                    <IconButton onClick={()=> setEditing(!editing)}>
                        <Edit className={classes.editIcon}/>
                    </IconButton>
                </Box>
                <Divider className={classes.divider} />
                <Formik
                    validateOnBlur={false} 
                    validateOnChange={false} 
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <FormikAlert name='UpdateFailure' severity='error' />
                        <FormikAlert name='UpdateSuccess' severity='success' />
                        {editing ?
                            <Box>
                                <Box display='flex' justifyContent='center'>
                                    <Box width='20rem'>
                                        <Box>
                                            <Typography>Email:</Typography>
                                            <FormikInput
                                                name="email"
                                                type="text"
                                                variant="outlined"
                                                className={classes.inputs}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography>Password:</Typography>
                                            <FormikInput
                                                name="password"
                                                type="password"
                                                variant="outlined"
                                                className={classes.inputs}
                                            />
                                        </Box>
                                    </Box>
                            
                                </Box>
                                <Box width='100%' display='flex' justifyContent='center'>
                                    <Button type='submit' color='primary' variant='contained'>
                                        <Typography color='secondary'>Submit</Typography>
                                    </Button>
                                </Box>
                            </Box>
                        :
                        <Box>
                            <Box>
                                <Typography variant='h6'>
                                    Email: {profile.email}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant='h6'>
                                    Password: {profile.password}
                                </Typography>
                            </Box>
                        </Box>
                    }
                </Form>
                </Formik>

                        
                <Typography variant='h6'>User ID: {profile.uid}</Typography>
            </Card>
        </Box>
    )
}

export default Settings