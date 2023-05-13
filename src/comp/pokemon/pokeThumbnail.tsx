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
  typeName: string
}


export function PokeThumbnail(props:React.PropsWithChildren<PokeThumbnailProps>) {
  const { key,children,typeName,src, alt } = props;
  const { mode } = useColorScheme();
  const theme = useTheme();

  const colors = mode === 'light' ? pokemonColors : pokemonDarkModeColors;
  const containerStyles = {
    backgroundColor: typeName ? colors[typeName] : 'red',
    margin: theme.spacing(8),
    paddingY: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '2em',
    boxShadow: theme.shadows[5],
    '&:hover': {
      boxShadow: theme.shadows[8],
      cursor: 'pointer',
    },
  };

  return (
    <Box key={key} sx={containerStyles}>
      <Image src={src} height={150} width={150} alt={alt} />
        {children}
    </Box>
  );
}
