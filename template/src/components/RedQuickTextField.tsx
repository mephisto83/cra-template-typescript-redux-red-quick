import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function RedQuickTextField(props: any) {
    return (
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
    );
}
