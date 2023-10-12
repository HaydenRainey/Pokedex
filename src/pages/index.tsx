import styles from '@/styles/Home.module.scss'
import { Box, Grid, Link, Pagination, SxProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import useSWR from 'swr';
import { NamedAPIResourceList, NamedAPIResource, Pokemon } from 'pokedex-promise-v2';
import React from 'react';
import { PokeThumbnail } from '../comp/pokemon/pokeThumbnail';
import { capitalizeWord } from '@/comp/util/typehelper';
import { PokeGalleryItem } from '@/comp/pokemon/pokeGalleryItem';



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
  const theme = useTheme();
  const pageCount = (pokeIndex?.results !== undefined)?
    Math.floor(152 / pokeIndex.results.length )
    :1//default to one if undefined

  const pokeIndexGridStyles = {
    padding: '1em',

    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: theme.palette.background.paper
  } as SxProps

  return (
    <Grid container sx={pokeIndexGridStyles}>
      {pokeIndex && pokeIndex.results &&
        pokeIndex?.results?.map((v, i) =>
          <PokeIndexGridItem key={i} resource={v}  />
        )}

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
    <Grid item sm={6} md={3} key={key} sx={{
      padding: theme.spacing(2),
      '>div:hover': {
        boxShadow: theme.shadows[3],
        cursor: 'pointer',
      }
    }}>
      {data &&
        <Link href={`/pokemon/${data.id}`} sx={{
          textDecoration:'none !important', 
          }}>
          <PokeGalleryItem key={key}  src={data.sprites.front_default??''} pokemon={resource} alt={data.name}></PokeGalleryItem>
        </Link>
      }
    </Grid>
  )
}