import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup'; 
import { Button, Box, Link, Typography, makeStyles, Card, AppBar } from "@material-ui/core";
import { useAuth } from '../../../contexts/AuthContext';
import { useHistory } from "react-router-dom";
import FormikAlert from '../../../formik/FormikAlert';
import FormikInput from '../../../formik/FormikInput';
import loginImage2 from '../../../images/loginImage2.jpg'


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
    },
    imageContainer: {
        backgroundImage: `url('../../../images/LoginImage.jpg')`,
        display: 'flex',
        flexDirection: 'column',
        backgroundRepeat: 'no-repeat',
        height:'57rem'
    },
    image: {
        height:'61rem',
        width: '40rem',
        position: 'fixed'
    },
    imageText: {
        zIndex: 3,
        width:'40rem',
        height: '20rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:'30rem'
    },
    imageText2:{
        zIndex: 3,
        width:'40rem',
        height: '10rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
        <Box height='100%'>
            <Box height="100%" display="flex" alignItems="center" >
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <Box display='flex' height='50rem' width='30rem'>
                            <Box className={classes.imageContainer}>
                                <Typography variant='h4' className={classes.imageText}>Meet new people</Typography>
                                <Typography variant='h4' className={classes.imageText2}>Share your interests</Typography>
                                <img alt='loginpage illustration' src={loginImage2} className={classes.image} />
                            </Box>
                            <Box width='100%' marginLeft='5rem' display='flex' alignItems='center'>
                                <Card elevation={5} className={classes.card}>
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
                            </Box>
                        </Box>
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;