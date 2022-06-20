import logo from '../../src/glob.webp';
import '../styles/HomePage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
    const [token, setToken] = useState('');

    let navigate = useNavigate();

    const sendToken = (e) => {
        setToken(e.target.value);
    }

    const signWithToken = () => {
        fetch(`http://localhost:2400/apiv1/manually-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: token
            })
        }).then(res => res.json())
            .then(res => {
                navigate("../repo", { state: res })
            }).catch(err => console.log(err));

    }

    useEffect(() => {
        if (localStorage.getItem('user-id')) {
            navigate(`../repo/?code=${localStorage.getItem('code')}&&userID=${localStorage.getItem('user-id')}`)
        }
    }, [])

    return (
        <div className="App">
            <div className="App-header">
                <div>
                    <h1 className='App-h1'>One click away from your github repos!</h1>
                    <div className="log-in-form-body">
                        <div>
                            <h1 className='log-in-h6'>Sign in with personal access token: </h1>
                        </div>
                        <div className="log-in-form-body-token">
                            <div>
                                <input onChange={(e) => sendToken(e)} type="password" placeholder="Personal Access Token" />
                            </div>
                            <div>
                                <button onClick={() => signWithToken()} className="log-in-button">Sign in with Token</button>
                            </div>
                        </div>
                        <div>-OR-</div>
                        <div className="log-in">
                            <h1 className='log-in-h6'>Click to sign in to your GitHub account: </h1>
                            <a href="https://github.com/login/oauth/authorize?client_id=8f80d399a407f5416b92" className="log-in-button-github">
                                <div>Sign in with GitHub</div>
                            </a>
                        </div>
                    </div>
                </div>
                <img src={logo} alt='logo' width='30%' height='20% ' className="rotate" />
            </div>

        </div>
    );
}