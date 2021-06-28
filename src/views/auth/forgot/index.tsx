import React from "react";
import * as Yup from 'yup'; 
import { Button, Box, Typography, makeStyles, AppBar, Card, Link } from "@material-ui/core";
import FormikInput from '../../../formik/FormikInput';
import { Formik, Form } from "formik";

const useStyles = makeStyles({
    inputs: {
        width: '20rem'
    },
    card: {
        height: '17rem',
        width: '25rem'
    }
});

const Forgot = () => {
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });
    
    // const handleSubmit = useCallback(
    //     async function(values, actions) {
    //         console.log('hello')
    //         try {
    //             setError('')
    //             setLoading(true)
    //             await resetPassword(values.email)
    //             actions.setStatus({ loginSuccess: 'Check your inbox for further instructions'})
    //             console.log(values.email)
    //         } catch (error) { 
    //             actions.setStatus({ loginError: 'Something went wrong' })
    //         } finally {
    //             setLoading(false)
    //         }
    //     }, []
    // )
    
    const initialValues = {
        email: '',
    };
    
// const value = {
//     resetPassword
// }

    return( 
        <>
            <AppBar color='primary' position="static">
                <Box display="flex" justifyContent="center" width="100%" >
                    <Typography color='secondary' variant="h4">YourSpace</Typography>
                </Box>
            </AppBar>
            <Box height="40rem" display="flex" justifyContent="center" alignItems="center">
                <Box maxWidth={300}>
                    <Formik 
                        validateOnBlur={false} 
                        validateOnChange={false} 
                        initialValues={initialValues}
                        onSubmit={() => console.log('hello')}
                        validationSchema={validationSchema}
                    >
                        <Card className={classes.card}>
                            <Box display='flex' justifyContent='center' marginTop='1rem'>
                                <Typography variant="h4" gutterBottom>Recover Password</Typography>
                            </Box>
                            <Box width='100%' display='flex' justifyContent='center'>
                                <Box width='20rem' display='flex' justifyContent='center'>
                                    <Form>
                                        <FormikInput
                                            name="email"
                                            type="email"
                                            placeholder="Type email here..." 
                                            variant="outlined"
                                            className={classes.inputs}
                                        />
                                        <Box display='flex' justifyContent='center' marginTop='1rem'>
                                            <Box marginBottom='1rem'>
                                                <Box>
                                                    <Link color='textPrimary' href="/login">Know your password? Log In</Link>
                                                </Box>
                                                <Box>
                                                    <Link color='textPrimary' href='/register'>Need an account? Sign Up</Link>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Form>

                                </Box>
                            </Box>
                            <Box width='100%' display='flex' justifyContent='center' marginTop='1rem'>
                                <Button type="submit" variant='contained' color="primary">
                                    <Typography color='secondary'>Submit</Typography>
                                </Button>
                            </Box>
                        </Card>
                    </Formik>
                </Box>
            </Box>
        </>
    );
};

export default Forgot;