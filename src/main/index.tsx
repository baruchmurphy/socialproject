import React, { useEffect, useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import clsx from 'clsx';
import { useAuth } from '../contexts/AuthContext';
import HomeContent from '../components/HomeScreen';
import NoData from '../components/Errors/NoData';
import CssBaseline from '@material-ui/core/CssBaseline';
import SettingsPage from '../components/settings';
import { 
    Box, 
    AppBar, 
    ListItem, 
    ListItemText, 
    Divider, 
    IconButton, 
    makeStyles, 
    Drawer, 
    createStyles,
    Menu,
    MenuItem,
    Avatar,
    Toolbar,
    useTheme,
    Theme,
    ListItemIcon,
    Typography
} from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { 
    HomeTwoTone,
    CloudUpload, 
    PersonAdd,
    Settings 
} from '@material-ui/icons';
import Upload from '../components/Upload';
import AddFriends from '../components/Friends';



const drawerWidth = 177;

const useStyles = makeStyles ((theme: Theme) => 
    createStyles({
    appBarBox: {
        display: 'inline-flex',
    },
    appBar: {
        height: '4rem',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
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
    loadingCards: {
        marginLeft: '1rem', 
        marginRight: '1rem', 
        marginTop: '1rem'
    }, 
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
    },
    drawerOpen: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeButton: {
        height: '3rem'
    },
    border: {
        border: '2px solid black'
    }
})
)

const Home = () => {
    const { profile, logout } = useAuth();
    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const [content, setContent] = useState<any>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if(profile) {
            switch(history.location.pathname) {
                case '/home':
                    setContent(<HomeContent />)
                    setLoading(false)
                    break; 
                case '/settings':
                    setContent(<SettingsPage />)
                    setLoading(false)
                    break;
                case '/upload':
                    setContent(<Upload />)
                    setLoading(false)
                    break;
                case '/addfriends':
                    setContent(<AddFriends />)
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
            to: '/home',
            icon: <HomeTwoTone />
        },
        {
            name: 'Upload',
            to: '/upload',
            icon: <CloudUpload />

        },
                {
            name: 'Add Friends',
            to: '/addfriends',
            icon: <PersonAdd />
        },
        {
            name: 'Settings',
            to: '/settings',
            icon: <Settings />
        },
    ];

    const renderDrawerList = () => {
        return drawerItems.map(item => {
            return (
                <Box>
                    <Link to={item.to} className={classes.drawerItems}>
                        <ListItem button>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItem>
                        <Divider />
                    </Link>
                </Box>
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

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
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
            <CssBaseline />
            <AppBar 
                position="fixed" 
                className={clsx (classes.appBar, {
                    [classes.appBarShift]: open,
                })} 
                color='primary'
            >
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        className={clsx({
                            [classes.hide]: open,
                        })}
                        color="secondary" 
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box width='100%' display='flex' justifyContent='center'>
                        <Typography className={classes.titleText} variant='h4'>YourSpace</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
                        <Drawer
                            onMouseEnter={handleDrawerOpen}
                            onMouseLeave={handleDrawerClose}
                            variant='permanent'
                            className={clsx(classes.drawer, {
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            })}
                            classes={{
                                paper: clsx({
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open,
                                }),
                            }}
                        >
                            <Box className={classes.toolbar}>
                                <IconButton className={classes.closeButton} onClick={handleDrawerClose} >
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </Box>
                            <Divider />
                            {renderDrawerList()}
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
            <Box>
                <main>{content}</main>
            </Box>
        </Box>
    )
}

export default Home
