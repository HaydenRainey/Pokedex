import { PokeThumbnail } from "@/comp/pokemon/pokeThumbnail";
import { capitalizeWord } from "@/comp/util/typehelper";
import { Box, Container, Grid, SxProps, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Ability, AbilityEffectEntry, AbilityPokemon, NamedAPIResource, Pokemon, PokemonSprites } from "pokedex-promise-v2";
import useSWR from "swr";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import React from "react";
import { useTheme } from '@mui/material';
import _ from 'lodash';

interface IndexedPokemonSprites extends PokemonSprites {
    [index: string]: any
}

export default function PokeView() {
    const router = useRouter();
    const pokeId = router.query['Id'];
    const imgSize = 300;
    const imgSizeSm = 100;
    const { data, isLoading, error } = useSWR<Pokemon, Error>(`/api/poke/pokemon/${pokeId}`);
    const typeName = data?.types[0].type.name ?? 'normal';
    const [tab, setTab] = useState('1');
    const indexedSprites = data?.sprites as IndexedPokemonSprites;

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };


    return (
        (data && !isLoading) &&
        (
            <>
                <Container maxWidth='sm'>
                    <Grid container sx={{ marginTop: '2em' }}>
                        <Grid item sm={12} md={12}>
                            <Typography variant='h5' textAlign='center'>
                                {capitalizeWord(data?.name)}
                            </Typography>
                            <Typography variant='caption' textAlign='center'>
                                {data?.id}
                            </Typography>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            <PokeThumbnail height={imgSize} width={imgSize} src={data.sprites.front_default ?? ''} typeName={typeName} alt={data.name} />
                        </Grid>
                        <Grid item sm={12} md={12}>
                            <Box mb={3} sx={{ display: 'flex', flexDirection: 'row', overflowY: 'auto', justifyContent: 'center' }}>
                                {Object.keys(data.sprites)
                                    .filter((val, i) => (val !== 'versions' && val !== 'other'))//filter other
                                    .sort((a, b) => b.localeCompare(a))//sort desc
                                    .sort((a, b) => a.split('_')[1]
                                        .localeCompare(b.split('_')[1])) //order default first
                                    .map((sprite: string, i) => {
                                        const src = indexedSprites[sprite];

                                        if (src != null)
                                            return <PokeThumbnail key={sprite} height={imgSizeSm} width={imgSizeSm} src={src} typeName={typeName} alt={sprite} />
                                    })}

                            </Box>
                            <TabContext value={tab} >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Detail" value="1" />
                                        <Tab label="Abilities" value="2" />
                                        <Tab label="Item Three" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1" >

                                    <Typography variant='body1'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum perspiciatis aut delectus ipsum magnam dolorem provident
                                        consequuntur voluptas saepe sint, quisquam beatae eligendi quaerat deleniti iusto minus, nemo vero.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ipsa et impedit tempora hic itaque repudiandae, praesentium numquam ratione optio accusamus minima voluptatibus, eos eligendi officia velit quaerat est esse!
                                    </Typography>
                                </TabPanel>
                                <TabPanel value="2">
                                    {data.abilities.map((v, i) =>
                                        <PokeAbilityDisplay key={v.ability.name} abilityName={v.ability.name} abilityUrl={v.ability.url} />
                                    )}
                                </TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Grid>
                    </Grid>
                </Container>
            </>
        )
        || 'loading...'
    )
}

interface PokeAbilityDisplayProps {
    key: React.Key;
    abilityUrl: string;
    abilityName: string;
}

function PokeAbilityDisplay(props: PokeAbilityDisplayProps) {
    const { abilityUrl,abilityName } = props;
    const { data, isLoading, error } = useSWR<Ability, Error>(abilityUrl);
    const theme = useTheme();
    let effectText = '';

    if(!isLoading || error){
        const effect = _.pickBy(data?.effect_entries, (value,key) => {
            return value.language.name === 'en'
        });
        effectText = _.flatten(Object.values(effect))[0].effect;
    }


    return (
        <Box  mb={theme.spacing(3)}>
            {(!isLoading) ?
                <Box>
                    <Typography variant='h5'>
                        {capitalizeWord(abilityName)}
                    </Typography>
                    <Typography variant='body1'>
                        {effectText}
                    </Typography>
                </Box>
                :
                <Typography variant='caption'>
                    loading
                </Typography>
            }
        </Box>
    );
}
