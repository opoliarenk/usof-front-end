import '../style/Auth.css'
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const loginUser = async (user) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        console.log(data);
    }

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
                <button onClick={() => history.push('/api/auth/password-reset')
                }>Forgot password?</button>
            </form>
        </div>
    );
}

export default SignIn;