import {useState,useEffect} from 'react';
import axios from 'axios';

function usePokemon(pokemonName){
    const [pokemon,setPokemon] = useState(null);
    console.log(pokemonName);
    //load pokemon from pokeapi based on id
    //TODO: move api to config file 
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((r) => {
          setPokemon(r.data);
        })

        return () =>{
            setPokemon(null);
        }
    },[])

    return pokemon;
}

export default usePokemon;