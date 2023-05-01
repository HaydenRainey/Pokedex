import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, Card, CardActions, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { PokemonColors } from 'src/colors/PokeTypeColors';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    borderRadius: '5px',
    boxShadow: theme.shadows[3],
    display: 'flex',
    flexDirection: 'column',

    '&:hover':{
      boxShadow: theme.shadows[8],
    }
  },
  sprite: {
    maxHeight: '15em',
    objectFit: 'contain'
  },
  cardTitle: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    paddingBottom: '60px'
  },
  loading: {
    height: '20em'
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
}));

const getBgColor = (type) => {
  return PokemonColors[type];
}

const PokeCard = ({pokemonName, pokemonId, url}) => {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const [bgColor, setBgColor] = useState('#fff');
  useEffect(() => {
    axios.get(url)
        .then((r) => {
          setPokemon(r.data);
          const type = pokemon?.types[0].type.name
          setLoaded(true);
          setBgColor(getBgColor(type));
        })
    
  }, [loaded])
  

  return (
    loaded 
    ? (
      <Card className={classes.root} style={{backgroundColor:bgColor}}  variant="elevation">
        {pokemon 
          && <CardMedia 
            className={classes.sprite}
            
            component="img"
            image={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemonName}
          />
        }
        
        <CardContent classes={{root:classes.cardTitle}}>
          <Typography variant="h1" className={classes.title} >
            {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
          </Typography>
        </CardContent>
      </Card>
    )
    : <Skeleton className={classes.loading} variant="rectangular"></Skeleton>
  );
}

export default PokeCard;
