import { Box, Grid, SxProps, Typography, useColorScheme } from '@mui/material';
import { useTheme } from '@mui/material';
import { NamedAPIResource, Pokemon, PokemonType } from 'pokedex-promise-v2';
import usePokemonTypeColor from '@/types/pokeTypeColors';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { capitalizeWord } from '@/comp/util/StringHelper';
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

	const theme = useTheme();
	const backgroundColor = usePokemonTypeColor(pokemon?.types[0].type.name);
	const inverseBackgroundColor =
		theme.palette.mode === 'dark'
			? usePokemonTypeColor(pokemon.types[0].type.name, 'light')
			: usePokemonTypeColor(pokemon.types[0].type.name, 'dark');
	let containerStyles = {
		position: 'relative',
		backgroundColor: inverseBackgroundColor,
		padding: theme.spacing(6),
		paddingTop: theme.spacing(7),
		paddingRight: theme.spacing(6),
		width: '100%',
		//paddingY: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '15px',
		border: `5px solid ${theme.palette.grey[300]}`,
		
		boxShadow: theme.shadows[2],
		color: backgroundColor
			? theme.palette.getContrastText(inverseBackgroundColor)
			: '#2a2a2a',
	} as SxProps;

	const pokeImageContainerStyles = {
		width: '100%',
		height: height,
		overflow: 'visible',
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: backgroundColor,
		borderRadius: '10px',
		border: `2px solid ${theme.palette.grey[700]}`,
		
		color: backgroundColor
			? theme.palette.getContrastText(inverseBackgroundColor)
			: '#2a2a2a',
	};

	//pokemonId masked like #001
	const pokeId = `#${pokemon?.id.toString().padStart(3, '0')}`;

	return (
		<Box sx={containerStyles}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					width: '100%',
				}}
			>
				<Typography variant="h4" textAlign="start">
					{capitalizeWord(pokemon?.name)}
				</Typography>

				<Typography variant="h4" textAlign="end">
					{pokeId}
				</Typography>
			</Box>
			<Grid container width="100%" mt={theme.spacing(4)}>
				<Grid item sm={3}>
					<Typography variant="h5" textAlign="start">
						Type:
					</Typography>
					<Box
						display="flex"
						mt={theme.spacing(5)}
						sx={{
							flexWrap: 'wrap',
							justifyContent: 'start',
						}}
					>
						{pokemon?.types.map((v, i) => {
							return <PokeTypePill key={v.type.name} typeName={v.type.name} />;
						})}
					</Box>
				</Grid>
				<Grid item md={9} flexGrow={1}>
					<Box sx={pokeImageContainerStyles}>
						<Image src={src} height={height} width={width} alt={alt} />
					</Box>
				</Grid>
			</Grid>

			{children}
		</Box>
	);
}
