import { useColorScheme } from "@mui/material";

type PokemonColors = {
    [key: string]: string;
  };
  
  const pokemonColors: PokemonColors = {
    "normal": "#C7C7A6",
    "fire": "#F4A881",
    "water": "#98BDFC",
    "electric": "#FDD473",
    "grass": "#A7DB8D",
    "ice": "#A6E3E9",
    "fighting": "#D67873",
    "poison": "#C183C1",
    "ground": "#E0C68F",
    "flying": "#B8A9F9",
    "psychic": "#F887B1",
    "bug": "#C7D08F",
    "rock": "#D9CB8F",
    "ghost": "#A292BC",
    "dragon": "#9B7BFF",
    "dark": "#9C9A8F",
    "steel": "#CECEDE",
    "fairy": "#F4BDC9"
  };  

  const pokemonDarkModeColors: PokemonColors = {
    "normal": "#767561",
    "fire": "#9E5C3B",
    "water": "#6086A7",
    "electric": "#B98C3F",
    "grass": "#6C8D62",
    "ice": "#72B1BD",
    "fighting": "#8E3F3A",
    "poison": "#825D81",
    "ground": "#A58F58",
    "flying": "#6E64A6",
    "psychic": "#B5577B",
    "bug": "#7C8662",
    "rock": "#8E815A",
    "ghost": "#6A6075",
    "dragon": "#6A548C",
    "dark": "#6E6C61",
    "steel": "#9D9DAC",
    "fairy": "#A76E7A"
  };

  export default function usePokemonTypeColor(type: string, colorSchemeMode?: 'light' | 'dark' | undefined) {
    const { mode } = useColorScheme();

    //override colorSchemeMode if it is defined
    if (colorSchemeMode !== undefined){
      const colors = colorSchemeMode === 'light' ? pokemonColors : pokemonDarkModeColors;
      return colors[type];
    }
    //use colorSchemeMode from device
    else{
      const colors = mode === 'light' ? pokemonColors : pokemonDarkModeColors;
      return colors[type];
    }
  }

export { pokemonColors, pokemonDarkModeColors };