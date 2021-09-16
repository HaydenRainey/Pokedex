import React, { useEffect } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import PokeCard from './pokeCard';

const useStyles = makeStyles((theme) => ({
  root: {
  }
}));

const getPokemon = () => {

}

const PokedexPage = () => {
  const classes = useStyles();
  const pokemon = useState(getPokemon)
  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid container spacing={3}>
            {pokemon.map(poke => (
              <Grid item key={poke.id} lg={4} md={6} xs={12}>
                <PokeCard
                  className={classes.PokeCard}
                  product={poke}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};
