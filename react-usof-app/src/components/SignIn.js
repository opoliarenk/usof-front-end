import '../App.css'
import React from 'react';

const SignIn = () => {
    return (
        <SignInForm />
    );
}

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        }

        this.changeLogin = this.changeLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeLogin(e) {
        this.setState({login: e.target.value});
    }

    changePassword(e) {
        this.setState({password: e.target.value});
    }

    handleSubmit(e) {
        console.log(`in your login - ${this.state.login}`);
        console.log(`in your password - ${this.state.password}`);
        e.preventDefault();
    }

    render() {
        return (
            <div className="sign in">
                <ul>
                    <li><a className="active" href="#home">Home</a></li>
                    <li><a href="#news">News</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <div className="centered">
                    <p>Sign in</p>
                    <form className="signIn">
                        <p>login</p>
                        <input type="text" name="login" placeholder="enter your login" value={this.state.login} onChange={this.changeLogin}/>
                        <p>password</p>
                        <input type="password" name="password" placeholder="enter your password" value={this.state.password} onChange={this.changePassword}/>
                        <p></p>
                        <input type="button" name="send" value="Send" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        );
    }
}


export default SignIn;