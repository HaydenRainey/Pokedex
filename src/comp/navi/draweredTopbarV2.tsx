import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";

interface NavigationItem {
  href: string;
  label: string;
}

interface DraweredTopbarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  navItems?: NavigationItem[];
  drawerTitle?: string;
  toolbarTitle: string;
  drawerWidth?: number;
  
}


export default function DraweredTopbar(props: DraweredTopbarProps) {
  const { window, navItems, toolbarTitle, drawerTitle = toolbarTitle, drawerWidth = 240 } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();

  const handleColorSchemeToggle = () => {
    if (mode === 'light')
      setMode('dark');
    else
      setMode('light');
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  

  return (
    <>
      <AppBar component="nav">
        <Toolbar variant="regular">
          <Container sx={{ 
            display: 'flex', 
            ml: {
              sm: 'none', 
              md: `${drawerWidth}px`}, 
            
            }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
            >
              
              {toolbarTitle}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems?.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Button sx={{ color: "#fff" }}>
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="persistent"
          open={mobileOpen}
          onClose={handleDrawerToggle}

          sx={{
            display: { xs: "block", sm: "block", },
            overflow: 'none',
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box sx={{
            
            overflow: 'none',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',

          }}>

            <Box display='flex' justifyContent='center' alignItems='center' sx={{
              minHeight: '64px',
              display: 'flex',
              justifyContent: 'center',
              alightItems: 'center',
              backgroundColor: theme.palette.primary.main,
              
            }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.contrastText
                }}>
                {drawerTitle}
              </Typography>
            </Box>

            <Divider />
            <Box sx={{
              boxShadow: theme.shadows[20],
              flexGrow: 1,
              borderRight: `solid 1px ${theme.palette.divider}`
            }}>
              <List>
                {navItems?.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <Link href={item.href}>
                        <ListItemText primary={item.label} />
                      </Link>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>

          </Box>
        </Drawer>
      </Box></>
  )
}

