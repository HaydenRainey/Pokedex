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
  navItems?: NavigationItem[]
}

const drawerWidth = 240;

export default function DraweredTopbar(props: DraweredTopbarProps) {
  const { window, navItems } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { mode, setMode } = useColorScheme();
  
  const handleColorSchemeToggle = () => {
    if(mode === 'light')
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
          <Container sx={{ display: 'flex' }}>
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
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems?.map((item, index) => (
                <Link href={item.href} key={index}>
                  <Button sx={{ color: "#fff" }}>
                    {item.label}
                  </Button>
                </Link>
              ))}
              <IconButton onClick={handleColorSchemeToggle}>
                {(mode === 'light')?
                  <DarkModeIcon />:
                  <LightModeIcon/>
                }
              </IconButton>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              {process.env.NEXT_PUBLIC_SITE_TITLE}
            </Typography>
            <Divider />
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
        </Drawer>
      </Box></>
  )
}

