import React, { ElementType } from 'react';
import Input from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

const FormControl: React.FC<{
    placeholder?: string;
    name: string;
    formik: {
        handleChange: (e: any) => void;
        values: { [key: string]: string };
        errors: { [key: string]: string };
    };
    as?: ElementType;
    type: string;
}> = ({ type, as, placeholder, name, formik }) => {
    return (
        <>
            <Input
                type={type}
                as={as}
                placeholder={placeholder}
                onChange={formik.handleChange}
                name={name}
                value={formik.values[name]}
                isInvalid={!!formik.errors[name]}
            />
            {formik.errors[name] && (
                <Alert variant={'danger'}>{formik.errors[name]}</Alert>
            )}
        </>
    );
};

export default FormControl;
