import '../style/Auth.css'
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const PassReset = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const resetPass = async (user) => {
        const res = await fetch('http://localhost:3000/api/auth/password-reset', {
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

        if (!email) {
            alert('please enter email');
            return;
        }

        resetPass({email});

        setEmail('');
    }

    return (
        <div className="centered">
            <p>Password Reset</p>
            <form className="signIn">
                <p>email</p>
                <input type="text" name="email" placeholder="enter your email" value={email} onChange={(e) =>
                    setEmail(e.target.value)}/>
                <p></p>
                <input type="submit" name="send" value="Send" onClick={onSubmit}/>
                {/*<a href="/api/auth/login">Sign in</a>*/}
                <button onClick={() => history.push('/api/auth/login')}>Sign in</button>
            </form>
        </div>
    );
}

export default PassReset;