import React, { useState } from 'react';
import { Box, Card, Grid, CardMedia, makeStyles, Modal, Typography, Tabs, Tab, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import usePokemon from 'src/hooks/usePokemon';
import TabPanel from './TabPanel';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '35%',
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        padding: '1em'
    },
    sprite: {
        // height: 'auto',
        // width: 'auto',
        margin: '0 auto  auto'
    },
    description: {

    }
}));

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const tabProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PokeModal({isOpen, handleClose, pokemonName}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const pokemon = usePokemon(pokemonName);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Card className={classes.modal}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            {/* {capitalize(pokemon.name)} */}
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                               
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column">
                            <Grid item xs={5}>
                                {/* <CardMedia
                                    className={classes.sprite}
                                    component="img"
                                    image={pokemon.sprites.other["official-artwork"].front_default}
                                    alt={pokemon.name} /> */}
                            </Grid>
                            <Grid item xs={5}></Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Card>
        </Modal>
    );
}

const PokeModalClickHandler = ({ children, pokemon, ...rest }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div {...rest}>
            <div onClick={() => handleOpen}>
                {children}
            </div>
            {isOpen && <PokeModal isOpen={isOpen} handleClose={() => handleClose()} pokemonName={pokemon.name} />}
        </div>
    )
}




export { PokeModalClickHandler, PokeModal };


{/* <section className={classes.description}>

    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Item One" {...tabProps(0)} />
                <Tab label="Item Two" {...tabProps(1)} />
                <Tab label="Item Three" {...tabProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            In amet nisi adipisicing id deserunt eu ad nulla. Nisi reprehenderit sint ipsum sint enim non. Esse nostrud labore ad laborum ut consequat culpa ea. Ullamco deserunt reprehenderit ipsum eiusmod excepteur velit magna duis fugiat fugiat. Occaecat ea Lorem laborum sit duis sint deserunt consectetur veniam nostrud elit velit. Tempor enim magna ut incididunt culpa occaecat sit dolor esse commodo. Non est aute laboris fugiat.
        </TabPanel>
        <TabPanel value={value} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
            Item Three
        </TabPanel>
    </Box>
</section> */}
