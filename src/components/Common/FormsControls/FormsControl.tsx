import React from "react";
import styles from './FormsControl.module.scss'

const FormControl = ({input, meta, child, ...props}: any) => {

    const hasError = meta.touched && meta.error;
    return (
        <div>
            <div className={`${styles.formControl} ${hasError && styles.error}`}>
                <div>
                    {props.children}
                </div>

                {hasError && <span>{meta.error}</span>}
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