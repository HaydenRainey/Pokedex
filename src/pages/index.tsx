import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import HeroImgScroller, { HeroImgProps } from '@/comp/HeroImgScroller';
import { Box, Grid, Link, List, ListItem, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import useSWR from 'swr';
import { NamedAPIResourceList, NamedAPIResource, Pokemon } from 'pokedex-promise-v2';
import React from 'react';
import { PokeThumbnail, pokeThumbnail } from '../comp/pokemon/pokeThumbnail';
import { capitalizeWord } from '@/comp/util/typehelper';



export default function Home() {
  const theme = useTheme();
  const { data, isLoading, isValidating } = useSWR<NamedAPIResourceList>('/api/poke/pokemon');
  console.log(data);

  return (
    <Box className={styles.root}>
      {
        (isLoading || isValidating) ?
          <Typography variant='caption'>
            loading...
          </Typography> :
          <PokeIndexGrid pokeIndex={data} />
      }

    </Box>
  )
}


interface PokeIndexGridProps {
  pokeIndex: NamedAPIResourceList | undefined;
}

function PokeIndexGrid(props: PokeIndexGridProps) {
  const { pokeIndex } = props;
  console.log(pokeIndex);
  return (
    <Grid container>
      {pokeIndex && pokeIndex.results &&
        pokeIndex?.results?.map((v, i) =>
          <PokeIndexGridItem key={i} resource={v} />
        )};
    </Grid>
  )
}

interface PokeIndexGridItemProps {
  resource: NamedAPIResource;
  key: React.Key;
}
function PokeIndexGridItem(props: PokeIndexGridItemProps) {
  const { key, resource } = props;
  const { data, isLoading, error } = useSWR<Pokemon, Error>(`/api/poke/pokemon/${resource.name}`);
  const typeName = data?.types[0].type.name ?? 'normal';
  const theme = useTheme();

  return (
    <Grid item spacing={3} columnSpacing={4} sm={6} md={3} key={key} sx={{
      'div:hover': {
        boxShadow: theme.shadows[3],
        cursor: 'pointer',
      }
    }}>
      {data &&
        <Link href={`/pokemon/${data.id}`} sx={{
          textDecoration:'none !important', 
          }}>
          <PokeThumbnail key={key} height={150} width={150} src={data.sprites.front_default??''} typeName={typeName} alt={data.name} height={150} width={150}>
            <Typography variant="h6" textAlign='center' color={theme.palette.primary.contrastText} >
              {capitalizeWord(data.name)}
            </Typography>
            <Typography variant="caption" textAlign='center' color={theme.palette.primary.contrastText}>
              {data.id}
            </Typography>
          </PokeThumbnail>
        </Link>
      }
    </Grid>
  )
}