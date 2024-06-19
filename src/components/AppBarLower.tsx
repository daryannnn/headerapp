import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import {useRouter} from "next/router";
import {getAuth, User} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import Typography from "@mui/material/Typography";
import {theme} from "@/utils/theme";
import {ThemeProvider} from "@mui/material";

const auth = getAuth(firebase_app);

interface Props {
    currentUserId: string,
}

export default function AppBarLower(props: Props) {
    const router = useRouter()

    //const currentUser = auth.currentUser;

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{backgroundColor: '#e5ffc9'}} position="static">
                <Toolbar variant={"dense"} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box sx={{ flexGrow: 2 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            onClick={() => router.push('/')}
                            //color={primary.dark}
                            sx={{color: "primary.dark"}}
                        >
                            <HomeIcon fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            data-testid="profile-button"
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            onClick={() => router.push(`/profile/${props.currentUserId}`)}
                            //color="primary"
                            sx={{color: "primary.dark"}}
                        >
                            <AccountCircle fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            //onClick={() => router.push(`/events/${currentUser?.uid}`)}
                            onClick={() => router.push(`/events/${props.currentUserId}`)}
                            sx={{color: "primary.dark"}}
                        >
                            <CalendarTodayIcon fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 2 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            //onClick={() => router.push(`/programs/${currentUser?.uid}`)}
                            onClick={() => router.push(`/programs/${props.currentUserId}`)}
                            sx={{color: "primary.dark"}}
                        >
                            <SportsMmaIcon fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={() => router.push(`/map/organizations`)}
                            sx={{color: "primary.dark"}}
                        >
                            <PlaceIcon fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-haspopup="true"
                            onClick={() => router.push(`/favorites/posts`)}
                            sx={{color: "primary.dark"}}
                        >
                            <StarIcon fontSize={"inherit"} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 2 }} />
                </Toolbar>
            </AppBar>
        </Box>
        </ThemeProvider>
    );
}