import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, Card, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { PokemonColors } from 'src/colors/PokeTypeColors';
import {PokeModalClickHandler} from 'src/components/PokeModal';
import usePokemon from 'src/hooks/usePokemon';

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


const PokeCard = ({pokemonName}) => {
  const classes = useStyles();
  const [name, setName] = useState(pokemonName);
  const pokemon = usePokemon(name);
  const [bgColor, setBgColor] = useState('#fff');


  useEffect(() => {
    //setBgColor(getBgColor(pokemon.type));
  },[pokemon]);
  

  return (
    pokemon !== null
    ? (
      <PokeModalClickHandler pokemon={pokemon} className={classes.root} style={{backgroundColor:bgColor}}>
        <Card variant="elevation">
        {pokemon !== null
          && <CardMedia 
            className={classes.sprite}
            component="img"
            image={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
        }
        <CardContent classes={{root:classes.cardTitle}}>
          <Typography variant="h1" className={classes.title} >
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
        </CardContent>
      </Card>
      </PokeModalClickHandler>
      
    )
    : <Skeleton className={classes.loading} variant="rect"></Skeleton>
  );
}

export default PokeCard;
