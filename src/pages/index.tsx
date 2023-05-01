import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import HeroImgScroller, { HeroImgProps } from '@/comp/HeroImgScroller';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';

const testImgs: HeroImgProps[] = [
  {
    src: 'https://via.placeholder.com/300x200.png?text=Image1',
    width: 100,
    height: 100,
    alt: 'test image',
  },
  {
    src: 'https://via.placeholder.com/300x200.png?text=Image2',
    width: 100,
    height: 100,
    alt: 'test image',
  },
  {
    src: 'https://via.placeholder.com/300x200.png?text=Image3',
    width: 100,
    height: 100,
    alt: 'test image',
  },
]


export default function Home() {
  const theme = useTheme();

  return (
    <div className={styles.root}>

      <HeroImgScroller
        imgs={testImgs}
        interactable={true}
        className={styles.heroImgScroller}
      />

      <Box className={styles.calloutSection} sx={{marginTop: theme.spacing(10)}}>
        <Grid container columnGap={2} justifyContent='space-around'>
          <Grid item md={3} className={styles.callout}>
            <Paper className={styles.calloutIcon}>
              <WebIcon/>
            </Paper>
            <Typography className={styles.calloutText} variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Autem perferendis culpa harum error laudantium nobis ipsam voluptatem excepturi
              rem pariatur repellat vitae nemo maiores totam qui, possimus, saepe quod soluta?
            </Typography>
          </Grid>
          <Grid item md={3} className={styles.callout}>
            <Paper className={styles.calloutIcon}>
              <WebIcon/>
            </Paper>
            <Typography className={styles.calloutText} variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Autem perferendis culpa harum error laudantium nobis ipsam voluptatem excepturi
              rem pariatur repellat vitae nemo maiores totam qui, possimus, saepe quod soluta?
            </Typography>
          </Grid>
          <Grid item md={3} className={styles.callout}>
            <Paper className={styles.calloutIcon}>
              <WebIcon/>
            </Paper>
            <Typography className={styles.calloutText} variant='body2'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Autem perferendis culpa harum error laudantium nobis ipsam voluptatem excepturi
              rem pariatur repellat vitae nemo maiores totam qui, possimus, saepe quod soluta?
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box className={styles.servicesSection} mt={theme.spacing(10)}>
        <Typography variant='h2'>
          Services
        </Typography>
        <Typography variant='body1' mt={theme.spacing(3)} sx={{padding: '0 0.5em'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero tenetur at repudiandae, adipisci totam velit. Officia ab doloremque alias accusantium temporibus. Quo sequi quaerat explicabo distinctio earum illo eum natus!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum beatae cupiditate quia saepe ipsam odit, molestias maxime aperiam veritatis perspiciatis harum id qui sequi deleniti numquam quam libero eum vero?
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero nam ullam voluptas molestias. Aut rem unde modi fugiat. Mollitia saepe placeat sunt ipsa consequuntur perspiciatis. Recusandae, ut. Obcaecati, incidunt aspernatur?
        </Typography>
      </Box>
    </div>
  )
}



