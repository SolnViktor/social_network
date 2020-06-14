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
        let {email, password, rememberMe, captcha} = formData
        props.login(email, password, rememberMe, captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>LOGIN</h1>
            <div className={styles.form} >
                <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
            </div>
        </div>
    )
}
const LoginForm = ({handleSubmit, error, captchaUrl}: any) => {


    return (
        <form onSubmit={handleSubmit}>

            {error && <div className={stylesFC.errorMessage}>{error}</div>}
            {createField("Email", "email", [required], Input, null)}     {/* Forms вынесли в formsContorl.tsx*/}
            {createField("Password", "password", [required], Input, {type: "password"})}
            {createField(null, "rememberMe", null, Input, {type: "checkbox"}, "remember Me")}
            {captchaUrl
            && <div><img src={captchaUrl} alt="captcha"/>
                {createField("Enter symbols", "captcha", [required], Input, null)}
            </div>

            }
            <div>
                <button className={btn.button}>Login</button>
            </div>
        </form>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}


const LoginContainer = connect(mapStateToProps, {login})(Login);

const LoginReduxForm:any = reduxForm({form: 'login'})(LoginForm)

export default LoginContainer;




