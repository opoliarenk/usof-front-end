import '../App.css'
import React from 'react';

const SignUp = () => {
    return (
        <SignUpForm />
    );
}


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            login: '',
            password: '',
            passConfirm: '',
        }

        this.changeFullName = this.changeFullName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassConfirm = this.changePassConfirm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeFullName(e) {
        this.setState({fullName: e.target.value});
    }

    changeEmail(e) {
        this.setState({email: e.target.value});
    }

    changeLogin(e) {
        this.setState({login: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    changePassConfirm(e) {
        this.setState({passConfirm: e.target.value});
    }

    handleSubmit(e) {
        console.log(`up your name - ${this.state.fullName}`);
        console.log(`up your email - ${this.state.email}`);
        console.log(`up your login - ${this.state.login}`);
        console.log(`up your password - ${this.state.password}`);
        console.log(`up your confirm - ${this.state.passConfirm}`);
        e.preventDefault();
    }

    render() {
        return (
            <div className="sign up">
                <div className="centered">
                    <p>Sign up</p>
                    <form className="signUp">
                        <p>full name</p>
                        <input type="text" name="fullName" placeholder="enter your name" value={this.state.fullName} onChange={this.changeFullName}/>
                        <p>email</p>
                        <input type="text" name="email" placeholder="enter your email" value={this.state.email} onChange={this.changeEmail}/>
                        <p>login</p>
                        <input type="text" name="login" placeholder="enter your login" value={this.state.login} onChange={this.changeLogin}/>
                        <p>password</p>
                        <input type="password" name="password" placeholder="enter your password" value={this.state.password} onChange={this.changePassword}/>
                        <p>confirm password</p>
                        <input type="password" name="passConfirm" placeholder="confirm your password" value={this.state.passConfirm} onChange={this.changePassConfirm}/>
                        <p></p>
                        <input type="button" name="send" value="Send" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignUp;