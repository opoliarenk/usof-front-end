import '../App.css'
import React, {useState} from 'react';


const SignUp = ({registerUser}) => {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (!login || !fullName || !email || !password || !passConfirm) {
            alert('please enter login');
            return;
        }

        registerUser({fullName, email, login, password, passConfirm});

        setLogin('');
        setPassword('');
        setEmail('');
        setName('');
        setPassConfirm('');
    }

    return (
        <div className="sign up">
            <div className="centered">
                <p>Sign up</p>
                <form className="signUp">
                    <p>full name</p>
                    <input required type="text" name="fullName" placeholder="enter your name" value={fullName} onChange={(e) =>
                    {setName(e.target.value)}}/>
                    <p>email</p>
                    <input type="text" name="email" placeholder="enter your email" value={email} onChange={(e) =>
                    {setEmail(e.target.value)}}/>
                    <p>login</p>
                    <input type="text" name="login" placeholder="enter your login" value={login} onChange={(e) =>
                    {setLogin(e.target.value)}}/>
                    <p>password</p>
                    <input type="password" name="password" placeholder="enter your password" value={password} onChange={(e) =>
                    {setPassword(e.target.value)}}/>
                    <p>confirm password</p>
                    <input type="password" name="passConfirm" placeholder="confirm your password" value={passConfirm} onChange={(e) =>
                    {setPassConfirm(e.target.value)}}/>
                    <p></p>
                    <input type="submit" name="send" value="Send" onClick={onSubmit}/>
                </form>
            </div>
        </div>
    );
}

export default SignUp;