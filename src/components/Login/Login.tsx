import React from 'react';
import {reduxForm} from 'redux-form'
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input, createField} from "../Common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {Redirect} from 'react-router-dom';
import {RootState} from "../../redux/redux-store";
import stylesFC from "../Common/FormsControls/FormsControl.module.scss";
import btn from "../../styles/Button.module.scss"
import styles from './Login.module.scss'



const Login = (props: any) => {

    const onSubmit = (formData: any) => {
        let {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>LOGIN</h1>
            <div className={styles.form} >
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>

        </div>
    )
}
const LoginForm = ({handleSubmit, error}: any) => {

    return (
        <form onSubmit={handleSubmit}>

            {error && <div className={stylesFC.errorMessage}>{error}</div>}
            {createField("Email", "email", [required], Input, null)}     {/* Forms вынесли в formsContorl.tsx*/}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember Me")}
            <div>
                <button className={btn.button}>Login</button>
            </div>
        </form>
    )
}
const mapStateToProps = (state: RootState) => {
    return {isAuth: state.auth.isAuth}
}


const LoginContainer = connect(mapStateToProps, {login})(Login);

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default LoginContainer;




