import * as React from 'react';
import List from '@mui/material/List';

export default function RedQuickList(props: any) {
    return (
        <React.Fragment>
            <List>
                {props.children || []}
            </List>
        </React.Fragment>
    );
}
