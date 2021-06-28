import React, { useEffect, useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import HomeContent from '../components/HomeScreen';
import NoData from '../components/Errors/NoData';
import Settings from '../components/settings';
import { 
    Box, 
    Typography, 
    AppBar, 
    ListItem, 
    ListItemText, 
    Divider, 
    IconButton, 
    makeStyles, 
    Drawer, 
    List,
    createStyles,
    Menu,
    MenuItem,
    Avatar,
} from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles ((theme: any) => 
    createStyles({
    menuButton: {
        marginLeft: '.2rem',
        marginTop: '-.4rem',
        justifyContent: 'flex-start',
    },
    appBarBox: {
        display: 'inline-flex',
    },
    appBar: {
        height: '3rem',
        marginBottom: '3rem',
        display: 'inline-flex'
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: 'rgb(226, 226, 226)',
    },
    drawerItems: {
        textDecoration: 'none',
        color:'black'
    },
    drawerHeader: {
        width: 250,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    titleText: {
        color: 'white',
    },
    avatarButton: {
        marginTop: '-.5rem',
        marginRight: '-.3rem'
    },
    link: {
        color: 'black',
        textDecoration: 'none' 
    },
    divider: {
        marginBottom: '-7px'
    },
    loadingCards: {
        marginLeft: '1rem', 
        marginRight: '1rem', 
        marginTop: '1rem'
    }
})
)

const Home = () => {
    const { profile, logout } = useAuth();
    const classes = useStyles();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [content, setContent] = useState<any>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if(profile) {
            switch(history.location.pathname) {
                case '/home':
                    setContent(<HomeContent />)
                    setLoading(false)
                    break; 
                case '/settings':
                    setContent(<Settings/>)
                    setLoading(false)
                    break;
                case '/error1':
                    setContent(<NoData/>)
                    setLoading(false)
                    break;
                default: 
                    setContent(<NoData/>)
                    setLoading(false)
            }
        }
    },[history.location.pathname, loading, profile])

    const drawerItems = [
        {
            name: 'Home',
            to: '/home'
        },
        {
            name: 'Favorites',
            to: '/favorites'
        },
    ];

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <div onClick={() => setDrawerOpen(false)} key={item.name}>
                    <Link to={item.to} className={classes.drawerItems}>
                        <ListItem button>
                            <ListItemText primary={item.name} />
                        </ListItem>
                        <Divider />
                    </Link>
                </div>
            );
        });
    };

    const handleLogout = async () => {
        handleClose()
        try {
            await logout()
            history.push('/login')
        } catch {
            setError('failed to logout')
            console.log(error)
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget)
    };

    return (
        loading ?
        <Box>
            <Skeleton height="3rem" count={1}/>
            <Skeleton height="25rem" count={1}/>
            <Box display='inline-flex' >
                <Skeleton className={classes.loadingCards} height="24.7rem" width='17.5em' count={20}/>
            </Box>
        </Box>
    :
        <Box>
            <AppBar className={classes.appBar} color='primary'>
                <Box className={classes.appBarBox}>
                    <IconButton 
                        edge="start" 
                        className={classes.menuButton} 
                        color="secondary" 
                        aria-label="menu"
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Typography className={classes.titleText} variant='h4'>ravenous</Typography>
                    </Box>
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            className={classes.drawer}
                            variant="persistent"
                            anchor="left"
                            open={drawerOpen}
                        >
                            <Box className={classes.drawerHeader}>
                                <IconButton onClick={() => setDrawerOpen(!drawerOpen)} >
                                    <ChevronLeftIcon />
                                </IconButton>
                            </Box>
                            <Divider className={classes.divider} />
                            <List>
                                {renderDrawerList()}
                            </List>
                        </Drawer>
                        <IconButton className={classes.avatarButton} onClick={handleClick}>
                            <Avatar color='secondary'/>
                        </IconButton>
                        <Menu
                            id="profilemenu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className='menu'
                        >
                        <MenuItem onClick={() => {
                            handleClose()
                        }}>
                        <Link className={classes.link} to='/settings'>Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </AppBar>
            <Box>
                <main>{content}</main>
            </Box>
        </Box>
    )
}

export default Home
