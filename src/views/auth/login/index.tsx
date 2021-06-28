import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles, Card, AppBar } from "@material-ui/core";
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import FormikAlert from '../../../formik/FormikAlert';
import FormikInput from '../../../formik/FormikInput';

const useStyles = makeStyles({
    inputs: {
        marginBottom: '1rem',
        width: '20rem'
    },
    appbar: {
        height: '3rem',
    },
    submit: {
        color: 'white'
    },
    card: {
        width: '25rem',
        height: '21rem',
    }
});

const Login = () => {
    const { login } = useAuth()
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    const history = useHistory();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    const initialValues = {
        email: '',
        password: '',
    };
    
    const handleSubmit = useCallback(
        async function(values, actions) {
            try {
                await login(values.email, values.password);
                setLoading(true);
                console.log(loading)
                actions.setStatus({ loginSuccess: 'Signing in...'});
            } catch (error) { 
                console.log(error);
                actions.setStatus({ loginError: 'Something went wrong' });
            } finally {
                setLoading(false);
                history.push('/home');
            }
        }, [history, loading, login]
    );

    return( 
        <>
        <AppBar color='primary' position="static" className={classes.appbar}>
            <Box display="flex" marginTop='4px'>
                <Box display="flex" justifyContent="center" width="100%" >
                    <Typography color='secondary' variant="h4">YourSpace</Typography>
                </Box>
            </Box>
        </AppBar>
            <Box height="40rem" display="flex" justifyContent="center" alignItems="center" >
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Card color='black' className={classes.card}>
                            <Box marginTop='1rem' width='100%' display='flex' justifyContent='center'>
                                <Typography variant="h4" gutterBottom>Login</Typography>
                            </Box>
                            <Box display='flex' justifyContent='center'>
                                <Box width='20rem' height='10rem'>
                                    <Form>
                                        <FormikAlert name="loginSucess" severity="success" />
                                        <FormikAlert name="loginError" severity="error" />
                                        <FormikInput
                                            name="email"
                                            type="email"
                                            placeholder="Type email here..." 
                                            variant="outlined"
                                            className={classes.inputs}
                                        />
                                        <FormikInput 
                                            name="password"
                                            type="password"
                                            placeholder="Type password here..." 
                                            variant='outlined'
                                            className={classes.inputs}
                                        />
                                        <Box display='flex' justifyContent='center'>
                                            <Box marginBottom='1rem'>
                                                <Box marginBottom='2px'>
                                                    <Link color='textPrimary' href="/forgot">Forgot Password?</Link>
                                                </Box>
                                                <Box>
                                                    <Link color='textPrimary' href='/register'>Need an account? Sign Up</Link>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box display='flex' justifyContent='center'>
                                            <Button type="submit" variant='contained' color="primary">
                                                <Typography className={classes.submit}>Submit</Typography>
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

export default Login;