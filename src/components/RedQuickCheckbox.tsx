import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function RedQuickCheckbox(props: any) {
    return (
        <FormGroup>
            <FormControlLabel
                control={<Checkbox  checked={!!props.value}
                    onChange={(arg) => {
                        if (props.onChange) {
                            props.onChange(arg.currentTarget.checked);
                        }
                    }}
                />} label={props.title} />
        </FormGroup>
    );
}