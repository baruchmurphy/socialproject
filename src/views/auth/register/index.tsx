import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles, AppBar, Card } from "@material-ui/core";
import FormikInput from '../../../formik/FormikInput';
import FormikAlert from '../../../formik/FormikAlert';
import { useAuth } from '../../../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    inputs: {
        marginBottom: '1rem',
        width: '20rem'
    },
    container: {
        height: '50rem',

    },
    card: {
        width: '25rem'
    },
    button: {
        color: 'white'
    }
});

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const classes = useStyles();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be between 6-20 characters')
            .max(20, 'Password must be between 6-20 characters')
            .required('Password is required'),
        confirmPassword: Yup.string().required('Password Confirmation is required')
    })
    
    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    
    const handleSubmit = useCallback(
        async function(values, actions) {
            if (values.password !==
                values.confirmPassword) {
                    return setError('Passwords do not match')
                }
            try {
                await signup(values.email, values.password)
                setLoading(true)
                actions.setStatus({ loginSuccess: 'Setting up...'})
                setLoading(false)
                history.push('/home')
            } catch (error) {
                setError('failed to create an account')
                actions.setStatus({ loginError: 'Something went wrong' })
                setLoading(false)
            }
        }, [history, signup]
    );

    return( 
        <>
            <AppBar color='primary' position="static">
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <Typography color='secondary' variant="h4">YourSpace</Typography>
                </Box>
            </AppBar>
                <Box height="40rem" display="flex" justifyContent="center" alignItems="center">
                    <Box maxWidth={300}>
                    {error && <Alert severity="error">{error}</Alert>}
                        <Formik 
                            validateOnBlur={false} 
                            validateOnChange={false} 
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                        <Card className={classes.card}>
                            <Box width='100%' display='flex' justifyContent='center' marginTop='1rem'>
                                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <Box width='20rem'>
                                    <Form id="sign-up-form">
                                        <FormikAlert name="loginSuccess" severity="success"  />
                                        <FormikAlert name="loginError" severity="error"  />
                                        <FormikInput 
                                            name="fullName"
                                            placeholder="Type name here..."
                                            id="fullName"
                                            variant='outlined'
                                            className={classes.inputs}
                                        />
                                        <FormikInput 
                                            name="email"
                                            type="email"
                                            placeholder="Type email here..." 
                                            variant='outlined'
                                            className={classes.inputs}
                                        />
                                        <FormikInput 
                                            name="password"
                                            type="password"
                                            placeholder="Type password here..." 
                                            fullWidth
                                            variant='outlined'
                                            className={classes.inputs}
                                        />
                                        <FormikInput 
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm password here..." 
                                            fullWidth
                                            variant='outlined'
                                            className={classes.inputs}
                                        />
                                        <Box display='flex' justifyContent='center'>
                                            <Link color='textPrimary' href="/login" >Already have an account? Login</Link>
                                        </Box>
                                        <Box display="flex" justifyContent="center" my={3}>
                                            <Button disabled={loading} type="submit" variant="contained" color="primary">
                                                <Typography className={classes.button}>Sign Up</Typography>
                                            </Button>
                                        </Box>
                                    </Form>
                                </Box>
                            </Box>
  
                        </Card>
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default Register;