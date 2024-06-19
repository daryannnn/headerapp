import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AppBarLower from "@/components/AppBarLower";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import PlaceIcon from '@mui/icons-material/Place';
import SettingsIcon from '@mui/icons-material/Settings';
import {useRouter} from "next/router";
import {getAuth, User} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import signOutFunc from "@/firebase/signOutFunc";
import {theme} from "@/utils/theme";
import {ThemeProvider} from "@mui/material";

const auth = getAuth(firebase_app);

interface Props {
    currentUserId: string,
}

export default function AppBarComponent(props: Props) {
    const router = useRouter()

    //const currentUser = auth.currentUser;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLogout = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const { result, error } = await signOutFunc(auth);
        if (error) {
            return console.log(error)
        }
        console.log(result)
        return router.push("/login")
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => router.push(`/profile/${props.currentUserId}`)}>Профиль</MenuItem>
            <MenuItem onClick={() => router.push(`/settings/${props.currentUserId}`)}>Настройки</MenuItem>
            <MenuItem data-testid="logout-button" onClick={handleLogout}>Выйти</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => router.push(`/profile/${props.currentUserId}`)}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <AccountCircle />
                </IconButton>
                <p>Профиль</p>
            </MenuItem>
            <MenuItem onClick={() => router.push(`/`)}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <HomeIcon />
                </IconButton>
                <p>Главная</p>
            </MenuItem>
            <MenuItem onClick={() => router.push(`/events/${props.currentUserId}`)}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <CalendarTodayIcon />
                </IconButton>
                <p>Мероприятия</p>
            </MenuItem>
            <MenuItem onClick={() => router.push(`/services/${props.currentUserId}`)}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <SportsMmaIcon />
                </IconButton>
                <p>Услуги</p>
            </MenuItem>
            <MenuItem /*onClick={handleProfileMenuOpen}*/>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <PlaceIcon />
                </IconButton>
                <p>Карта</p>
            </MenuItem>
            <MenuItem onClick={() => router.push(`/settings/${props.currentUserId}`)}>
                <IconButton
                    size="large"
                    aria-haspopup="true"
                    color="primary"
                >
                    <SettingsIcon />
                </IconButton>
                <p>Настройки</p>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Выйти</MenuItem>
        </Menu>
    );

    return (
        <ThemeProvider theme={theme}>
        <Box color={"primary.main"} sx={{ flexGrow: 1 }}>
            <AppBar >
                <Toolbar>
                    <Box sx={{ flexGrow: 2.75 }} />
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        fontFamily="Roboto_Serif"
                        //fontWeight="550"
                    >
                        Sports
                    </Typography>
                    <Box sx={{ flexGrow: 2 }} />
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="search"
                        aria-haspopup="true"
                        onClick={() => router.push(`/search/organizations`)}
                        color="inherit"
                        sx={{margin: "auto 10px", color: "#5D7C3B"}}
                    >
                        <SearchIcon />
                        <Typography>Поиск</Typography>
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            data-testid="open-menu"
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            sx={{color: "#5D7C3B"}}
                        >
                            <AccountBoxIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

                <AppBarLower currentUserId={props.currentUserId}/>

            </AppBar>
            <Toolbar />
            <Toolbar/>
            {renderMobileMenu}
            {renderMenu}
        </Box>
        </ThemeProvider>
    );
}