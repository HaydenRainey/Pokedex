import { Box, Card, CardMedia, makeStyles, Modal, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 400,
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        padding: '1em'
    },
    sprite: {
        height: '20em',
        width: '20em',
        margin: '0 auto  auto'
    },
    description: {

    }
}));

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {boolean} isOpen
 * @param {{ (): void; (event: {}, reason: "backdropClick" | "escapeKeyDown"): void; }} handleClose
 * @param {{ sprites: { other: { [x: string]: { front_default: string; }; }; }; name: string; }} pokemon
 */
function PokeModal(isOpen, handleClose, pokemon) {
    const classes = useStyles();
    return <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Card className={classes.modal}>
            <CardMedia
                className={classes.sprite}
                component="img"
                image={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name} />
            <section className={classes.description}>
                <Typography variant="h1" component="h2" gutterBottom>
                    {capitalize(pokemon.name) }
                </Typography>
                <Typography paragraph>
                    Labore occaecat laboris duis duis et qui non est qui duis eu reprehenderit. Officia incididunt dolore magna sint duis in fugiat consequat pariatur tempor amet amet quis proident. Labore pariatur do dolor occaecat aute dolor eiusmod commodo voluptate eiusmod reprehenderit laborum velit sint. Anim cillum culpa esse anim enim reprehenderit. Voluptate ea veniam cillum do exercitation.
                </Typography>
            </section>
        </Card>
    </Modal>;
}

const PokeModalClickHandler = ({ children, pokemon, ...rest }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div {...rest}>
            <div onClick={handleOpen}>
                {children}
            </div>
            {PokeModal(isOpen, handleClose, pokemon)}
        </div>
    )
}




export { PokeModalClickHandler, PokeModal };
