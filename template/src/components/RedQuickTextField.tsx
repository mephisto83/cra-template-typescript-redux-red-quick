import * as React from 'react';
import TextField from '@mui/material/TextField';
import {
    Grid,
} from '@mui/material';

export default function RedQuickTextField(props: any) {
    return (
        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
            <TextField
                defaultValue=""
                error={!!props.invalid}
                value={props.value}
                label={props.title}
                disabled={props.disabled}
                required={props.required}
                type={props.type}
                variant="standard"
                onChange={(evt) => {
                    if (props.onChange) {
                        props.onChange(evt.currentTarget.value);
                    }
                }} />
        </Grid>

    );
}
