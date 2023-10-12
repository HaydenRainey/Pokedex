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

	const theme = useTheme();
	const backgroundColor = usePokemonTypeColor(pokemon?.types[0].type.name);
	let containerStyles = {
		position: 'relative',
		backgroundColor: backgroundColor,
		padding: theme.spacing(6),
		paddingTop: theme.spacing(7),
		paddingRight: theme.spacing(6),
		width: 'auto',
		//paddingY: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '15px',
		boxShadow: theme.shadows[2],
		color: backgroundColor
			? theme.palette.getContrastText(backgroundColor)
			: '#2a2a2a',
		//small screen
		// [theme.breakpoints.down('md')]: {
		// 	padding: theme.spacing(2),
		// 	paddingTop: theme.spacing(3),
		// 	paddingRight: theme.spacing(2),
		// },
	} as SxProps;

	const pokeImageContainerStyles = {
		width: '100%',
		height: height,
		overflow: 'visible',
		flexGrow: 1,
	};

	//reposition content if size is less than 150px
	if (width < 200) {
		containerStyles = {
			...containerStyles,

		} as SxProps;
	}
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
				<Typography variant={(width < 200) ? 'h4' : 'h6'} textAlign="start">
					{capitalizeWord(pokemon?.name)}
				</Typography>

				<Typography variant="h4" textAlign="end">
					{pokeId}
				</Typography>
			</Box>
			<Grid container width="100%">
				<Grid item md={6}>
					<Box display="flex" mt={theme.spacing(5)} sx={{
						flexDirection: (width < 200) ? 'column' : 'row',
					}}>
						{pokemon?.types.map((v, i) => {
							return <PokeTypePill key={v.type.name} typeName={v.type.name} />;
						})}
					</Box>
				</Grid>
				<Grid item md={6} flexGrow={1}>
					<Box sx={pokeImageContainerStyles}>
						<Image src={src} height={height} width={width} alt={alt} />
					</Box>
				</Grid>
			</Grid>

			{children}
		</Box>
	);
}
