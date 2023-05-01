import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import HeroImgScroller, { HeroImgProps } from '@/comp/HeroImgScroller';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';




export default function Home() {
  const theme = useTheme();

  return (
    <Box className={styles.root}>

     
    </Box>
  )
}



