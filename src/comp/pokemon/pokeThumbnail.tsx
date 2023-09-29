import { Box, Grid, SxProps, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material';
import { NamedAPIResource, Pokemon, PokemonType } from 'pokedex-promise-v2';
import usePokemonTypeColor from '@/types/pokeTypeColors';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { capitalizeWord } from '@/comp/util/typehelper';
import { PokeTypePill } from './PokeTypePill';

interface PokeThumbnailProps {
	src: string;
	alt: string;
	pokemon: Pokemon;
	height: number;
	width: number;
}

export function PokeThumbnail(
	props: React.PropsWithChildren<PokeThumbnailProps>,
) {
	const { children, pokemon, src, alt, height, width } = props;
	const { mode } = useColorScheme();
	const theme = useTheme();
	const backgroundColor = usePokemonTypeColor(pokemon?.types[0].type.name);
	const containerStyles = {
		backgroundColor: backgroundColor,
		padding: theme.spacing(4),
		width: 'auto',
		//paddingY: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '15px',
		boxShadow: theme.shadows[2],
		color: backgroundColor ? theme.palette.getContrastText(backgroundColor) : 'white',
	};

	//pokemonId masked like #001
	const pokeId = `#${pokemon?.id.toString().padStart(3, '0')}`;

	return (
		<Box sx={containerStyles}>
			<Grid container width='100%'>
				<Grid item>
					<Typography

						variant="h4"
						textAlign="start"
						
					>
						{capitalizeWord(pokemon?.name)}
            
          </Typography>
          {pokemon?.types.map((v, i) => {
              return (
                <PokeTypePill key={v.type.name} typeName={v.type.name}/>
              )
            })}
				</Grid>
				<Grid item flexGrow={1}>
					<Typography variant="h5" textAlign="end" paddingLeft={5}>
						{pokeId}
					</Typography>
					<Image src={src} height={height} width={width} alt={alt} />
				</Grid>
			</Grid>

			{children}
		</Box>
	);
}
