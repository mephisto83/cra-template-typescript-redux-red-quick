import * as React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import FormControl from '@mui/material/FormControl';
import { ValidationMessages } from './ValidationMessages';

import {
    Grid,
} from '@mui/material';
export default function RedQuickDatePicker(props: any) {

    let { value } = props;
    if (value && value.seconds) {
        value = new Date(value.seconds * 1000);
    }
    return (
        <Grid item xs={12} sm={3} lg={4} sx={{ pt: { xs: 2, sm: '0 !important' } }}>
            <FormControl variant="standard">
                <label htmlFor={props.name}>{props.title}</label>
                <DatePicker selected={value} disabled={props.disabled} onChange={(date: any) => {
                    if (props.onChange) {
                        props.onChange(date);
                    }
                }} />
                <ValidationMessages invalid={props.invalid} />
            </FormControl>
        </Grid>
    );
}