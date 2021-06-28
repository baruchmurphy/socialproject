import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { makeStyles, Card, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        marginTop: '4rem',
        width: '15rem',
        height:'8rem',
        padding: '4px'
    },
    link: {
        color: 'blue'
    },
    cardContainer: {
        width: '100%',
        height: '20rem',
        display: 'flex',
        justifyContent:'center',
        alignContent:'center'
    }
});

const NoData = () => {
    const classes = useStyles();
    const { logout } = useAuth();

    const handleLogout = async() => {
       await logout()
    };

    return (
        <Box className={classes.cardContainer}>
            <Card elevation={5} className={classes.card}>
                <Typography variant='h6'>
                    Error 1: Unable to retrieve restaurant data
                </Typography>
                <Typography variant='h6'>
                    Try to <Link className={classes.link} to='/home'>re-load</Link> data or Return to <Link className={classes.link} onClick={handleLogout} to='/'>Login Page</Link>
                </Typography>
            </Card>
        </Box>
    )
}

export default NoData