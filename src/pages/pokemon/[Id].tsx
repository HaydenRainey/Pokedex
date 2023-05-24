import { PokeThumbnail } from "@/comp/pokemon/pokeThumbnail";
import { capitalizeWord } from "@/comp/util/typehelper";
import { Box, Grid, SxProps, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Pokemon, PokemonSprites } from "pokedex-promise-v2";
import useSWR from "swr";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";

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
                <Grid container sx={{ marginTop: '2em' }}>
                    <Grid item sm={12} md={6}>
                        <Typography variant='h5' textAlign='center'>
                            {capitalizeWord(data?.name)}
                        </Typography>
                        <Typography variant='caption' textAlign='center'>
                            {data?.id}
                        </Typography>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <PokeThumbnail height={imgSize} width={imgSize} src={data.sprites.front_default ?? ''} typeName={typeName} alt={data.name} />
                    </Grid>
                    <Grid item sm={12}>
                        <TabContext value={tab} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Overview" value="1" />
                                    <Tab label="Detail" value="2" />
                                    <Tab label="Item Three" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" >
                                <Box sx={{ display: 'flex', flexDirection: 'row', overflowY: 'auto' }}>
                                    {Object.keys(data.sprites)
                                        .filter((val, i) => (val !== 'versions' && val !== 'other'))
                                        .sort((a,b) => b.localeCompare(a))//sort desc
                                        .sort((a,b) => a.split('_')[1].localeCompare(b.split('_')[1])) //order default first
                                        .map((sprite: string, i) => {
                                            const src = indexedSprites[sprite];
                                            console.log('src')
                                            console.log(sprite);
                                            if (src != null)//if front facing
                                                return <PokeThumbnail height={imgSizeSm} width={imgSizeSm} src={src} typeName={typeName} alt={sprite} />
                                        })}
                                    <Typography variant='h3'>
                                        {data.}
                                    </Typography>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                            <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </>


        )
        || 'loading...'
    )
}


