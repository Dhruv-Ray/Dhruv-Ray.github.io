import { useNavigate } from "react-router-dom";

function LoginForm(){

    const navigate = useNavigate();
    const login = ()=>{
        navigate('/home');
    }

    return(
        <div className="login">
            <div className="login-head">
                <h1>Sign In</h1>
            </div>
            <button className="login-button" onClick={login}>Click to Enter Metadome-Play</button>
        </div>
        
    )
}

export default LoginForm;