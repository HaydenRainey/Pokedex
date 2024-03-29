import usePokemonTypeColor from '@/types/pokeTypeColors';
import { capitalizeWord } from '@/comp/util/StringHelper';
import { Box, SxProps, Typography, useColorScheme } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';

interface PokeTypePillProps {
	typeName: string;
	colorScheme?: 'light' | 'dark';
}
export function PokeTypePill(props: PokeTypePillProps) {
	const { typeName,colorScheme } = props;
	const theme = useTheme();
	
	const backgroundColor = usePokemonTypeColor(typeName,colorScheme);
	const rootStyle = {
		backgroundColor: backgroundColor,
		color: theme.palette.text.secondary,
		fontWeight: '100',
		borderRadius: '0.5em',
		padding: '0.25em 0.5em',
		margin: '0.25em',
		width: 'auto',
		minWidth: '4em',
		maxWidth: '6em',
		border: `2px solid ${theme.palette.grey[700]}`,
		//boxShadow: theme.shadows[2],
		textAlign: 'center',
		'&:hover': {
			cursor: 'pointer',
			boxShadow: theme.shadows[1],
		}
	} as SxProps;

	return (
		<Box sx={rootStyle}>
			<Typography variant="caption" fontWeight='bold'>{capitalizeWord(typeName)}</Typography>
		</Box>
	);
}
