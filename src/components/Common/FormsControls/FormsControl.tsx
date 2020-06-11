import React from "react";
import styles from './FormsControl.module.scss'
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}: any) => {

    const hasError = touched && error;
    return (
        <div>
            <div className={`${styles.formControl} ${hasError && styles.error}`}>
                <div>
                    {children}
                </div>

                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props: any) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} rows={5} cols={100}/> </FormControl>
}

export const Input = (props: any) => {

    const {input, meta, child, ...restProps} = props;

    return <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
}

export const createField = (placeholder: any, name: any, validators: any, component: any, props: any = {}, text:any = '') => (
    <div>
        <Field placeholder={placeholder}
              name={name}
              component={component}
              validate={validators}
               {...props}
        /> {text}
    </div>
)

