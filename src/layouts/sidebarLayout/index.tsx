import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DraweredTopbar from "@/comp/navi/draweredTopbarV2";
import { Container } from "@mui/material";
import styles from './SidebarLayout.module.scss';
import navItems from "@/navigation";


const pageTitle = process.env.NEXT_PUBLIC_SITE_TITLE as string;
export default function SidebarLayout(props: any) {
  
  return (
    <Box className={styles.root}>
      <DraweredTopbar navItems={navItems} toolbarTitle='' drawerTitle={pageTitle}/>
      <Box component="main" className={styles.main}>
          <Toolbar />
          <Box className={styles.content}>
            {props.children}
          </Box>
      </Box>
    </Box>
  );
}
