
import React from 'react';
import { ValidationResult } from 'features/validation';
import './validation.scss';
import TitleService from 'title-service';
export function ValidationMessages(props: { invalid: ValidationResult | boolean }) {
    let { invalid } = props;
    if (typeof invalid === 'boolean' || !invalid ) {
        return null;
    }

    return (
        <div>
            {invalid.errors.map((v: { title: string }, index: number) => {
                return <div key={`${v.title}-${index}`} className="validation-error">{TitleService(v.title)}</div>
            })}
        </div>
    )
}