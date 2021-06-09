import '../App.css'
import React, {useState} from 'react';

const SignIn = ({loginUser}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!login) {
            alert('please enter login');
            return;
        }

        loginUser({login, password});

        setLogin('');
        setPassword('')
    }

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
                    <input type="text" name="login" placeholder="enter your login" value={login} onChange={(e) =>
                    setLogin(e.target.value)}/>
                    <p>password</p>
                    <input type="password" name="password" placeholder="enter your password" value={password} onChange={(e) =>
                    setPassword(e.target.value)}/>
                    <p></p>
                    <input type="submit" name="send" value="Send" onClick={onSubmit}/>
                </form>
            </div>
        </div>
    );
}

export default SignIn;