import { PokeThumbnail } from "@/comp/pokemon/pokeThumbnail";
import { capitalizeWord } from "@/comp/util/typehelper";
import { Box, Grid, SxProps, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Pokemon } from "pokedex-promise-v2";
import useSWR from "swr";


export default function PokeView() {
    const router = useRouter();
    const pokeId = router.query['Id'];
    const { data, isLoading, error } = useSWR<Pokemon, Error>(`/api/poke/pokemon/${pokeId}`);
    const typeName = data?.types[0].type.name ?? 'normal';

    return (
        (data && !isLoading) &&
        <Grid container sx={{marginTop: '2em'}}>
            <Grid item sm={12} md={6}>
                <Typography variant='h5' textAlign='center'>
                    { capitalizeWord(data?.name)}
                </Typography>
                <Typography variant='caption' textAlign='center'>
                    {data?.id}
                </Typography>
            </Grid>
            <Grid item sm={12} md={6}>
                <PokeThumbnail src={data.sprites.front_default??''} typeName={typeName} alt={data.name}/>
            </Grid>
        </Grid>
        || 'loading...'
    )
}


