import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import HeroImgScroller, { HeroImgProps } from '@/comp/HeroImgScroller';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import useSWR from 'swr';
import { NamedAPIResourceList, NamedAPIResource } from 'pokedex-promise-v2';
import React from 'react';




export default function Home() {
  const theme = useTheme();
  const pokeIndexResp = useSWR<NamedAPIResourceList>('/api/poke/pokemon');
  console.log(pokeIndexResp.data?.results);

  return (
    <Box className={styles.root}>
      {
        (pokeIndexResp.isLoading || pokeIndexResp.isValidating) ?
          <Typography variant='caption'>
            loading...
          </Typography> :
          <PokeIndexGrid pokeIndex={pokeIndexResp.data} />
      }

    </Box>
  )
}


interface PokeIndexGridProps {
  pokeIndex: NamedAPIResourceList | undefined;
}

function PokeIndexGrid(props: PokeIndexGridProps) {
  const { pokeIndex } = props;
  return (
    <Grid container>
      {pokeIndex?.results.map((v,i) =>
        <PokeIndexGridItem key={i} pokemon={v}/>
      )}
    </Grid>
  )
}

interface PokeIndexGridItemProps {
  pokemon: NamedAPIResource;
  key: React.Key;
}
function PokeIndexGridItem(props: PokeIndexGridItemProps) {
  const { key, pokemon } = props;
  return (
    <Grid item key={key}>

    </Grid>
  )
}


// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // revalidation is enabled and a new request comes in
// export async function getStaticProps() {
//   const res = await fetch('https://.../posts')
//   const posts = await res.json()

//   return {
//     props: {
//       posts,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10, // In seconds
//   }
// }

// // This function gets called at build time on server-side.
// // It may be called again, on a serverless function, if
// // the path has not been generated.
// export async function getStaticPaths() {
//   const res = await fetch('/api/poke/pokemon')
//   const posts = await res.json()

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   // We'll pre-render only these paths at build time.
//   // { fallback: 'blocking' } will server-render pages
//   // on-demand if the path doesn't exist.
//   return { paths, fallback: 'blocking' }
// }