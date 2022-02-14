import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {
    Grid,
} from '@mui/material';
import Select from '@mui/material/Select';
import { uuid } from './util';

export default function RedQuickDropdown(props: any) {
    const [id, setId] = React.useState(uuid());
    return (
        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`label-${id}`}>{props.title}</InputLabel>
                <Select
                    labelId={`label-${id}`}
                    id={`select-${id}`}
                    value={props.value}
                    onChange={props.onChange}
                    label={props.title}
                >
                    {props.options.map((op: any, index: number) => {
                        return <MenuItem value={op.label}>op.value</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Grid>
    );
}
