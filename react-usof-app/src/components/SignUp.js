import '../App.css'

const SignUp = () => {
    return (
        <div className="sign up">
            <div className="centered">
                <p>Sign up</p>
                <form className="signUp">
                    <p>full name</p>
                    <input type="text" name="fullName"/>
                    <p>email</p>
                    <input type="text" name="email"/>
                    <p>login</p>
                    <input type="text" name="login"/>
                    <p>password</p>
                    <input type="password" name="password"/>
                    <p>confirm password</p>
                    <input type="password" name="passConfirm"/>
                    <p></p>
                    <input type="submit" name="send"/>
                </form>
            </div>
        </div>
    );
}

export default SignUp;