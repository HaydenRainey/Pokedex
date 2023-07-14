import { Box, SxProps, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material';
import { NamedAPIResource, Pokemon } from 'pokedex-promise-v2';
import { pokemonColors, pokemonDarkModeColors } from '@/types/pokeTypeColors';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { capitalizeWord } from '@/comp/util/typehelper';

 interface PokeThumbnailProps{
  key?: React.Key | undefined,
  src: string,
  alt: string,
  typeName: string,
  height: number,
  width: number
}

export function PokeThumbnail(props:React.PropsWithChildren<PokeThumbnailProps>) {
  const { children,typeName,src, alt, height, width } = props;
  const { mode } = useColorScheme();
  const theme = useTheme();

  const colors = mode === 'light' ? pokemonColors : pokemonDarkModeColors;
  const containerStyles = {
    backgroundColor: typeName ? colors[typeName] : 'red',
    margin: theme.spacing(4),
    width: 'auto',
    //paddingY: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '15px',
    boxShadow: theme.shadows[2],
  };

  return (
    <Box sx={containerStyles}>
      <Image src={src} height={height} width={width} alt={alt} />
        {children}
    </Box>
  );
}
