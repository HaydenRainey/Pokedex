import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DraweredTopbar from "@/comp/navi/draweredTopbar";
import { Container } from "@mui/material";
import styles from './TopbarLayout.module.scss';
import navItems from "@/navigation";

export default function TopbarLayout(props: any) {

  return (
    <Box className={styles.root}>
      <DraweredTopbar navItems={navItems} pageTitle="HR Pokedex"/>
      <Container className={styles.container}>
        <Box component="main" className={styles.main}>
          <Toolbar />
          <Box className={styles.content}>
            {props.children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
