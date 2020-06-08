import React from 'react';
import { reduxForm, Field } from 'redux-form'
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Input} from "../Common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import { Redirect } from 'react-router-dom';
import {RootState} from "../../redux/redux-store";



const Login = (props: any) => {

    const onSubmit = (formData: any) => {
        let {email, password, rememberMe} = formData
        props.login(email, password, rememberMe)
    }
    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
const LoginForm = (props: any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {/*<div>*/}
            {/*    <Field name={"login"}*/}
            {/*           component={Input} placeholder={'Login'} */}
            {/*           validate={[required]}/>*/}
            {/*</div>*/}
            <div>
                <Field name={"email"} component={Input} placeholder={'Email'} validate={[required]} />
            </div>
            <div>
                <Field name={"password"} component={Input} type={"password"} placeholder={'Password'} validate={[required]}/>
            </div>

            <div>
                <Field name={"rememberMe"} component={Input} type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const mapStateToProps = (state: RootState) => {
   return {isAuth: state.auth.isAuth}
}


const LoginContainer = connect(mapStateToProps, {login })(Login);

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

export default LoginContainer;




