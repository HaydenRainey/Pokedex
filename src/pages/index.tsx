import styles from '@/styles/Home.module.scss'
import { Box, Grid, Link, Pagination, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import useSWR from 'swr';
import { NamedAPIResourceList, NamedAPIResource, Pokemon } from 'pokedex-promise-v2';
import React from 'react';
import { PokeThumbnail } from '../comp/pokemon/pokeThumbnail';
import { capitalizeWord } from '@/comp/util/typehelper';



export default function Home() {
  
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isValidating } = useSWR<NamedAPIResourceList>('/api/poke/pokemon');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Box className={styles.root}>
      {
        (isLoading || isValidating) ?
          <Typography variant='caption'>
            loading...
          </Typography> :
          <PokeIndexGrid pokeIndex={data} page={page} onPageChange={handleChange} />
      }

    </Box>
  )
}


interface PokeIndexGridProps {
  pokeIndex: NamedAPIResourceList | undefined;
  page: number;
  onPageChange:any
}

function PokeIndexGrid(props: PokeIndexGridProps) {
  const { pokeIndex, page = 1, onPageChange } = props;

  const pageCount = (pokeIndex?.results !== undefined)?
    Math.floor(152 / pokeIndex.results.length )
    :1//default to one if undefined


  return (
    <Grid container>
      {pokeIndex && pokeIndex.results &&
        pokeIndex?.results?.map((v, i) =>
          <PokeIndexGridItem key={i} resource={v} />
        )};

        <Grid item sm={12}>
          <Pagination page={page} onChange={onPageChange} count={pageCount}/>
        </Grid>
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
          <PokeThumbnail key={key} height={150} width={150} src={data.sprites.front_default??''} typeName={typeName} alt={data.name}>
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