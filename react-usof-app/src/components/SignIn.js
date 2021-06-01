import '../App.css'

const SignIn = () => {
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
                    <input type="text" name="login" />
                    <p>password</p>
                    <input type="password" name="password" />
                    <p></p>
                    <input type="submit" name="send" />
                </form>
            </div>
        </div>
    );
}

export default SignIn;