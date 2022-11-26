import { withStyles } from "@material-ui/core";
import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";


const styles = (theme) => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
        maxWidth: 240,
    },
    cardTitle: {
        color: theme.palette.primary.light,
        textTransform: 'uppercase',
        fontSize: 14,
        margin: 'auto'
    }
});

function FilterCard(props) {
    const { classes } = props;

    return (
        <Card sx={{ margin: 'auto' }}>
            <CardContent>
                <div className={classes.formControl} >
                    <h5 className={classes.cardTitle} >Find Movies By:</h5>
                </div>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="movies-name">Movies Name</InputLabel>
                    <Input id="movies-name" />
                </FormControl>



                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="movies-name">Movies Name </InputLabel>
                    <Input id="movies-name" />
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="movies-name">Movies Name</InputLabel>
                    <Input id="movies-name" />
                </FormControl>
            </CardContent>

            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card >
    )
}

export default withStyles(styles)(FilterCard);