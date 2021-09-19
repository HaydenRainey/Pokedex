import React, { useEffect,useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import PokeCard from './pokeCard';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { initial } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
  }
}));

const getPokemon = async (pageLimit) => {
  const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}`);
  console.log(resp.data.results);
  return resp.data;
}

const PokeGalleryPage = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(25);
  const [pokemon,setPokemon] = useState(null);


  const handlePageChange = (event,value) => {
    setPage(value);
  }

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${pageLimit}`)
      .then((v) => {
        console.log(v.data);
        setPokemon(v.data)
      })
  },[])

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Grid container spacing={3}>
            {pokemon?.results.map((poke,i) => (
              <Grid item key={poke.id} lg={4} md={6} xs={12}>
                <PokeCard
                  className={classes.PokeCard}
                  pokemon={poke}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination 
            color="primary" 
            count={25 / pageLimit} 
            page={page}  
            onChange={handlePageChange}
            size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default PokeGalleryPage;
