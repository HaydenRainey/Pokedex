import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import PokeCard from './pokeCard';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { initial } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
  }, 
  container: {
    padding: '15px'
  }
}));



const PokeGalleryPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(25);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemon, setPokemon] = useState(null);


  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const createPokeCard = (poke, classes) => {
    return (
      <Grid item key={getPokeId(poke.url)} xl={3} lg={4} md={6} xs={6}>
        <PokeCard
          className={classes.PokeCard}
          pokemonName={poke.name}
          pokemonId={getPokeId(poke.url)}
          url={poke.url} />
      </Grid>
    )
  }

  const getPokeId = (url) => {
    const id = url.split('/')[6]
    console.log(id);
    return id;
  }

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}`)
      .then((v) => {
        setPokemon(v.data.results)
        setPokemonCount(v.data.count)
      })
  }, [])

  return (
    <Page className={classes.root} title="Products">
      <Container className={classes.container}  maxWidth={false}>
        <Box mt={3}>
          <Grid container spacing={8}>
            {pokemon && pokemon.map((poke) => (
              createPokeCard(poke, classes)
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={pokemonCount / pageLimit}
            page={page}
            onChange={handlePageChange}
            size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default PokeGalleryPage;


