import { Box, Grid, SxProps, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material';
import { NamedAPIResource, Pokemon, PokemonType } from 'pokedex-promise-v2';
import usePokemonTypeColor from '@/types/pokeTypeColors';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { capitalizeWord } from '@/comp/util/typehelper';
import { PokeTypePill } from './PokeTypePill';
import useSWR from 'swr';

interface PokeGalleryItemProps {
	src: string;
	alt: string;
	pokemon: Pokemon | NamedAPIResource;
}

export function PokeGalleryItem(
	props: React.PropsWithChildren<PokeGalleryItemProps>,
) {
	const { children, src, alt, pokemon } = props;
	const theme = useTheme();
	let loadedPokemon = undefined as unknown as Pokemon;
	//if pokemon is a NamedAPIResource, fetch it
	if ('name' in pokemon) {
		const { data, isLoading, error } = useSWR<Pokemon, Error>(
			`/api/poke/pokemon/${pokemon.name}`,
		);
		if (data !== undefined) loadedPokemon = data;
	} else if (pokemon !== undefined) {
		//else use the pokemon passed in
		loadedPokemon = pokemon as Pokemon; //cast to pokemon
	}
	const backgroundColor = usePokemonTypeColor(
		loadedPokemon?.types[0].type.name,
	);
	const inverseBackgroundColor =
		theme.palette.mode === 'dark'
			? usePokemonTypeColor(loadedPokemon.types[0].type.name, 'light')
			: usePokemonTypeColor(loadedPokemon.types[0].type.name, 'dark');

	const containerStyles = {
		position: 'relative',
		backgroundColor: inverseBackgroundColor,
		padding: theme.spacing(5),
        justifyContent:'space-between',
		width: 'auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '10px',
        border: `5px solid ${theme.palette.grey[500]}`,
		boxShadow: theme.shadows[2],
		color: backgroundColor
			? theme.palette.getContrastText(inverseBackgroundColor)
			: '#2a2a2a',
	} as SxProps;

	const pokeImageContainerStyles = {
		width: '100%',
		height: '200px',
		overflow: 'visible',
		flexGrow: 1,
		backgroundColor: backgroundColor,
		borderRadius: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};
	//pokemonId masked like #001

	return (
		<Box sx={containerStyles}>
			<Box sx={pokeImageContainerStyles}>
				<Image src={src} height={150} width={175} alt={alt} />
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
					alignItems: 'center',
				}}
			>
				<Typography variant="h5" textAlign="start">
					{capitalizeWord(pokemon?.name)}
				</Typography>

				<Typography variant="h5" textAlign="end">
					{pokemon !== undefined
						? `#${loadedPokemon?.id.toString().padStart(3, '0')}`
						: '#000'}
				</Typography>
			</Box>
			<Box sx={{
                display: 'flex',
                justifyContent: 'start',
                width: '100%',
                marginTop: theme.spacing(2),
            }}>
				{loadedPokemon?.types.map((v, i) => {
					return <PokeTypePill key={v.type.name} typeName={v.type.name} />
				})}
			</Box>
		</Box>
	);
}
