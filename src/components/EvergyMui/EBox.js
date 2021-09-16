import React, { useEffect } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: '',
        borderRadius: '0px',
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.text.secondary,
        border: [
            ['1px', 'solid']
        ]
    }
}))

export default function EBox({children, boxShadow, className, ...rest }) {
    const classes = useStyles()

    return (
        <Box boxShadow={boxShadow} className={clsx(classes.root, className)} {...rest}>
            {children}
        </Box>
    )
}