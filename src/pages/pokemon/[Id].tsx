import { PokeThumbnail } from '@/comp/pokemon/PokeThumbnail';
import { capitalizeWord } from '@/comp/util/StringHelper';
import {
	Box,
	Container,
	Grid,
	List,
	ListItem,
	SxProps,
	Typography,
} from '@mui/material';
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
	const theme = useTheme();
	const {
		data: pokeBaseData,
		isLoading,
		error,
	} = useSWR<Pokemon, Error>(`/api/poke/pokemon/${pokeId}`);
	const {
		data: pokeSpeciesData,
		isLoading: speciesIsLoading,
		error: speciesError,
	} = useSWR<PokemonSpecies, Error>(`/api/poke/pokemon-species/${pokeId}`);
	const [tab, setTab] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setTab(newValue);
	};

	return (
		(pokeBaseData && !isLoading && (
			<>
				<Container maxWidth="sm">
					<PokeThumbnail
						height={imgSize}
						width={imgSize}
						src={pokeBaseData.sprites.front_default ?? ''}
						pokemon={pokeBaseData}
						alt={pokeBaseData.name}
					/>
					{/* <PokeEvelutionChainDisplay pokeId={pokeBaseData.id} /> */}
					<TabContext value={tab}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<TabList
								onChange={handleChange}
								aria-label="lab API tabs example"
							>
								<Tab label="Detail" value="1" />
								<Tab label="Stats" value="2" /> 
							</TabList>
						</Box>

						<TabPanel value="1">
							<Grid container spacing={2}>
								<Grid item >
									<Typography variant="h5" marginBottom="0.2em">
										Description
									</Typography>
									<PokeFlavorTextEntry
										key={pokeBaseData.species.url}
										species={pokeSpeciesData}
										language="en"
									/>
									<Typography variant="h5" marginBottom="0.2em">
										Abilities
									</Typography>
									<List>
										{pokeBaseData.abilities.map((v, i) => (
											<ListItem>
												<PokeAbilityDisplay
													key={v.ability.name}
													abilityName={v.ability.name}
													abilityUrl={v.ability.url}
												/>
											</ListItem>
										))}
									</List>
								</Grid>
								
							</Grid>
						</TabPanel>
						<TabPanel value="2">
							{pokeBaseData.stats.map((v) => {
								return (
									<PokeStatDisplay
										key={v.stat.name}
										statUrl={v.stat.url}
										baseStat={v.base_stat}
										effort={v.effort}
									/>
								);
							})}
						</TabPanel>
					</TabContext>
				</Container>
			</>
		)) ||
		'loading...'
	);
}

interface PokeEvelutionChainDisplayProps {
	species: PokemonSpecies | undefined;
}

function PokeEvelutionChainDisplay(props: PokeEvelutionChainDisplayProps) {
	const { species } = props;
	const theme = useTheme();


	return(
		<Box>
			<Typography variant="h5" marginBottom="0.2em">
				Evolution Chain
			</Typography>
			<Box>
				{/* {species?.evolution_chain.url ?? 'loading...} */}
			</Box>
		</Box>
	)
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
	species: PokemonSpecies | undefined;
	language: 'en' | 'ja' | 'ko';
}

function PokeFlavorTextEntry(props: PokeFlavorTextEntryProps) {
	const { language, species } = props;
	const theme = useTheme();
	let flavorText = '';
	const flavor = _.pickBy(species?.flavor_text_entries, (value, key) => {
		return value.language.name === language;
	});
	flavorText = _.flatten(Object.values(flavor))[0]?.flavor_text;
	//replace  with new line character
	const flavorTextParagaraphs = flavorText?.split('').map((v, i) => {
		return (
			<Typography variant="body1" key={i} mb={theme.spacing(2)}>
				{v}
			</Typography>
		);
	});

	return (
		<Box mb={theme.spacing(3)}>
			<Box>
				{flavorTextParagaraphs}
				
			</Box>
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
