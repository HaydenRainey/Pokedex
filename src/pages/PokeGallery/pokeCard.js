import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, Card, CardActions, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: '20em'
  },
  sprite: {
    maxHeight: '15em',
    objectFit: 'contain'
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

const PokeCard = ({pokemonName, pokemonId, url}) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  useEffect(() => {
    axios.get(url)
        .then((r) => {
          setPokemon(r.data);
          setLoaded(true);
        })
    
  }, [])
  

  return (
    loaded 
    ? (
      <Card className={classes.root} variant="outlined">
        {pokemon 
          && <CardMedia 
            className={classes.sprite}
            component="img"
            image={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemonName}
          />
        }
        
        <CardContent>
          <Typography variant="h1" className={classes.title} >
            {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
          </Typography>
          
        </CardContent>
      </Card>
    )
    : <Skeleton className={classes.root} variant="rectangular"></Skeleton>
  );
}

export default PokeCard;
