import React, { useEffect, useState, useRef } from 'react';
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
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemon, setPokemon] = useState(null);

  const isInitialMount = useRef(true);
  useEffect(() => {
    const offset = (page - 1) * pageLimit;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}&offset=${offset}`)
      .then((v) => {
        setPokemon(v.data.results)
        setPokemonCount(v.data.count)
      })
  },[page])

  const handlePageChange = (event, value) => {
    console.log('page: ' + value)
    setPage(value);
  }

  const createPokeCard = (poke, classes) => {
    return (
      <Grid item key={getPokeId(poke.url)} xl={3} lg={4} md={6} xs={12}>
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
    return id;
  }



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
            count={Math.floor( pokemonCount / pageLimit)}
            page={page}
            onChange={handlePageChange}
            size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default PokeGalleryPage;


