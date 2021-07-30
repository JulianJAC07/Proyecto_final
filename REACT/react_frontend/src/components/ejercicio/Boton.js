import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function Botón({ count, setCount }) {
    const classes = useStyles();

    let contador = count;

    const contar = () => {
        contador += 1;
        setCount(contador);
    }

    return (
        <>
            <div className={classes.root}>
                <Button variant="contained" color="primary" onClick={() => contar()}>
                    Click me
                </Button>
            </div>
            {/* <button onClick={() => contar()}>Click me</button> */}
        </>
    )
}