import styles from '@/styles/Home.module.scss'
import { Box, Grid, Link, Pagination, SxProps, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import useSWR from 'swr';
import { NamedAPIResourceList, NamedAPIResource, Pokemon } from 'pokedex-promise-v2';
import React from 'react';
import { PokeThumbnail } from '../comp/pokemon/pokeThumbnail';
import { capitalizeWord } from '@/comp/util/typehelper';
import { PokeGalleryItem } from '@/comp/pokemon/pokeGalleryItem';
import { set } from 'lodash';



export default function Home() {
  
  const [page, setPage] = React.useState(1);
  
  
  return (
    <Box className={styles.root}>
      <PokeIndexGrid  />

    </Box>
  )
}


interface PokeIndexGridProps {
  maxDisplayItems?: number;
  totalPokemon?: number;
}

function PokeIndexGrid(props: PokeIndexGridProps) {
  const { maxDisplayItems = 20, totalPokemon = 150 } = props;
  const theme = useTheme();
  const [activePage, setActivePage] = React.useState(1);
  const offset = (activePage - 1) * maxDisplayItems;
  const pageCount = Math.ceil(totalPokemon / maxDisplayItems);
  const { data, isLoading, isValidating } = useSWR<NamedAPIResourceList>(`/api/poke/pokemon?limit=${maxDisplayItems}&offset=${offset}`);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      console.log(value);
      setActivePage(value);
   };

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
      {data && data.results &&
        data?.results?.map((v, i) =>
          <PokeIndexGridItem key={i} resource={v}  />
        )}

        <Grid item sm={12}>
          <Pagination page={activePage} onChange={handleChange} count={pageCount}/>
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
  const { data: pokeBaseData, isLoading, error } = useSWR<Pokemon, Error>(`/api/poke/pokemon/${resource.name}`);
  const typeName = pokeBaseData?.types[0].type.name ?? 'normal';
  const theme = useTheme();

  return (
    <Grid item sm={6} md={3} key={key} sx={{
      padding: theme.spacing(2),
    }}>
      {pokeBaseData &&
        <Link href={`/pokemon/${pokeBaseData.id}`} sx={{
          textDecoration:'none !important', 
          }}>
          <PokeGalleryItem 
            key={key} 
            src={pokeBaseData.sprites.front_default??''} 
            pokemon={resource} 
            alt={pokeBaseData.name}>
            </PokeGalleryItem>
        </Link>
      }
    </Grid>
  )
}