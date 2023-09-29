import usePokemonTypeColor from '@/types/pokeTypeColors';
import { capitalizeWord } from '@/comp/util/typehelper';
import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material';

interface PokeTypePillProps {
	typeName: string;
}
export function PokeTypePill(props: PokeTypePillProps) {
	const { typeName } = props;
	const theme = useTheme();
	const backgroundColor = usePokemonTypeColor(typeName);
	const rootStyle = {
		backgroundColor: backgroundColor,
		color: theme.palette.primary.contrastText,
		borderRadius: '0.5em',
		padding: '0.25em 0.5em',
		margin: '0.25em',
		width: 'auto',
		boxShadow: theme.shadows[2],
	} as SxProps;

	return (
		<Box sx={rootStyle}>
			<Typography variant="body1">{capitalizeWord(typeName)}</Typography>
		</Box>
	);
}
