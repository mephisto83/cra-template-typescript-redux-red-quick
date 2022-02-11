import * as React from 'react';
import Button from '@mui/material/Button';

export default function RedQuickList(props: any) {
    return (
        <React.Fragment>
            <Button variant="text"
                disabled={props.disabled}
                onClick={props.onClick}>{props.title}</Button>
        </React.Fragment>
    );
}
