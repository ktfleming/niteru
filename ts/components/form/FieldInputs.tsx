import * as React from 'react';
import { FormControl } from "react-bootstrap";
import { WrappedFieldProps } from "redux-form";

export interface FieldInputProps extends WrappedFieldProps {
    readOnly?: boolean;
}

export interface TextFieldInputProps extends FieldInputProps {
    type?: string;
    placeholder?: string;
}

export class TextFieldInput extends React.Component<TextFieldInputProps, {}> {
    public render() {
        const { input, placeholder, readOnly } = this.props;
        return (
                <FormControl {...input}
                             readOnly={readOnly}
                             type={"text"}
                             placeholder={placeholder} />
        );
    }
}
