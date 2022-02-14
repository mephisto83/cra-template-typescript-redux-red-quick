import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {
    Grid,
} from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function RedQuickCheckbox(props: any) {
    return (
        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={!!props.value}
                        onChange={(arg) => {
                            if (props.onChange) {
                                props.onChange(arg.currentTarget.checked);
                            }
                        }}
                    />} label={props.title} />
            </FormGroup>
        </Grid>
    );
}