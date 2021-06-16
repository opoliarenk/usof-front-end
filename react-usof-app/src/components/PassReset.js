import '../style/Auth.css'
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const PassReset = ({resetPass}) => {
    const [email, setEmail] = useState('');
    const history = useHistory();

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