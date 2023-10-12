import { PokeThumbnail } from '@/comp/pokemon/pokeThumbnail';
import { capitalizeWord } from '@/comp/util/typehelper';
import { Box, Container, Grid, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import {
	Ability,
	Stat,
	AbilityEffectEntry,
	AbilityPokemon,
	NamedAPIResource,
	Pokemon,
	PokemonSpecies,
	PokemonSprites,
} from 'pokedex-promise-v2';
import useSWR from 'swr';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import React from 'react';
import { useTheme } from '@mui/material';
import _ from 'lodash';
import { PokeTypePill } from '../../comp/pokemon/PokeTypePill';

interface IndexedPokemonSprites extends PokemonSprites {
	[index: string]: any;
}

export default function PokeView() {
	const router = useRouter();
	const pokeId = router.query['Id'];
	const imgSize = 270;
	const imgSizeSm = 100;
	const { data, isLoading, error } = useSWR<Pokemon, Error>(
		`/api/poke/pokemon/${pokeId}`,
	);
	const typeName = data?.types[0].type.name ?? 'normal';
	const [tab, setTab] = useState('1');
	const indexedSprites = data?.sprites as IndexedPokemonSprites;

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setTab(newValue);
	};

	return (
		(data && !isLoading && (
			<>
				<Container maxWidth="sm">
					<Grid container sx={{ marginTop: '-0.5em' }}>
						<Grid item sm={12} md={12}>
							<PokeThumbnail
								height={imgSize}
								width={imgSize}
								src={data.sprites.front_default ?? ''}
								pokemon={data}
								alt={data.name}
							/>
						</Grid>
						<Grid item sm={12} md={12}>
							<Box
								mb={3}
								sx={{
									display: 'flex',
									flexDirection: 'row',
									overflowY: 'auto',
									justifyContent: 'center',
								}}
							>
								{/* {Object.keys(data.sprites)
									.filter((val, i) => val !== 'versions' && val !== 'other') //filter other
									.sort((a, b) => b.localeCompare(a)) //sort desc
									.sort((a, b) =>
										a.split('_')[1].localeCompare(b.split('_')[1]),
									) //order default first
									.map((sprite: string, i) => {
										const src = indexedSprites[sprite];

										if (src != null)
											return (
												<PokeThumbnail
													key={sprite}
													height={imgSizeSm}
													width={imgSizeSm}
													src={src}
													pokemon={data}
													alt={sprite}
												/>
											);
									})} */}
							</Box>
							<TabContext value={tab}>
								<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
									<TabList
										onChange={handleChange}
										aria-label="lab API tabs example"
									>
										<Tab label="Stats" value="1" />
										<Tab label="Detail" value="2" />
									</TabList>
								</Box>
								<TabPanel value="1">
									{data.stats.map((v, i) => {
										return (
											<PokeStatDisplay
												key={v.stat.name}
												statUrl={v.stat.url}
												baseStat={v.base_stat}
												effort={v.effort}
											/>
										);
									})}
									{/* <Grid container>
										<Grid item>
											
										</Grid>
										<Grid item>
											
										</Grid>
									</Grid> */}
								</TabPanel>
								<TabPanel value="2">
                                <Typography variant="h5" marginBottom='0.2em'>Description</Typography>
                               
									<PokeFlavorTextEntry
										key={data.species.url}
										speciesUrl={data.species.url}
										language="en"
									/>
									<Typography variant="h5" marginBottom='0.2em'>Abilities</Typography>
                                    
                                    <Box marginLeft='1em'>
                                    {data.abilities.map((v, i) => (
										<PokeAbilityDisplay
											key={v.ability.name}
											abilityName={v.ability.name}
											abilityUrl={v.ability.url}
										/>
									))}
                                    </Box>
									
								</TabPanel>
								<TabPanel value="3">Item Three</TabPanel>
							</TabContext>
						</Grid>
					</Grid>
				</Container>
			</>
		)) ||
		'loading...'
	);
}

interface PokeAbilityDisplayProps {
	key: React.Key;
	abilityUrl: string;
	abilityName: string;
}

function PokeAbilityDisplay(props: PokeAbilityDisplayProps) {
	const { abilityUrl, abilityName } = props;
	const { data, isLoading, error } = useSWR<Ability, Error>(abilityUrl);
	const theme = useTheme();
	let effectText = '';

	if (!isLoading || error) {
		const effect = _.pickBy(data?.effect_entries, (value, key) => {
			return value.language.name === 'en';
		});
		effectText = _.flatten(Object.values(effect))[0].effect;
	}

	return (
		<Box mb={theme.spacing(3)}>
			{!isLoading ? (
				<Box>
					<Typography variant="h6">{capitalizeWord(abilityName)}</Typography>
					<Typography variant="body1">{effectText}</Typography>
				</Box>
			) : (
				<Typography variant="caption">loading</Typography>
			)}
		</Box>
	);
}

interface PokeFlavorTextEntryProps {
	key: React.Key;
	speciesUrl: string;
	language: 'en' | 'ja' | 'ko';
}

function PokeFlavorTextEntry(props: PokeFlavorTextEntryProps) {
	const { speciesUrl, language } = props;
	const { data, isLoading, error } = useSWR<PokemonSpecies, Error>(speciesUrl);
	const theme = useTheme();
	let flavorText = '';

	if (!isLoading || error) {
		const flavor = _.pickBy(data?.flavor_text_entries, (value, key) => {
			return value.language.name === language;
		});
		flavorText = _.flatten(Object.values(flavor))[0].flavor_text;
	}

	return (
		<Box mb={theme.spacing(3)}>
			{!isLoading ? (
				<Box>
					<Typography variant="body1">{flavorText}</Typography>
				</Box>
			) : (
				<Typography variant="caption">loading</Typography>
			)}
		</Box>
	);
}

interface PokeStatDisplayProps {
	key: React.Key;
	statUrl: string;
	baseStat: number;
	effort: number;
}

function PokeStatDisplay(props: PokeStatDisplayProps) {
	const { statUrl, baseStat, effort } = props;
	const { data, isLoading, error } = useSWR<Stat, Error>(statUrl);
	const theme = useTheme();
	const rootStyle = {
		//boxShadow: theme.shadows[2],
	} as SxProps;
	const barContainerStyle = {
		width: '100%',
		border: '1px solid black',
		borderRadius: '0.5em',
		boxShadow: `0 0 0.25em ${theme.palette.grey[500]} inset`,
	} as SxProps;
	const barStyle = {
		//width represented as percentage of max baseStat (255) and max width (100%)
		width: `${(baseStat / 255) * 100}%`,
		backgroundColor: theme.palette.secondary.main,
		height: '2em',
		boxShadow: theme.shadows[2],
		borderRadius: '0.25em',
		color: 'white',
		padding: '0.25em 0.5em',
	} as SxProps;
	let effectText = '';
	var color = theme.palette.grey[400];
	return (
		<Box mb={theme.spacing(4)} width="100%">
			{!isLoading ? (
				<Box sx={rootStyle}>
					<Typography variant="h5">{capitalizeWord(data?.name)}</Typography>
					<Box sx={barContainerStyle} width="100%">
						<Box sx={barStyle}>
							<Typography variant="body1" textAlign="end">
								{baseStat}
							</Typography>
						</Box>
					</Box>
				</Box>
			) : (
				<Typography variant="caption">loading</Typography>
			)}
		</Box>
	);
}


