import { useEffect, useState } from 'react';
import '../styles/RepoList.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import userDefault from '../../src/user.png';



export const RepoList = () => {
    const [repos, setRepos] = useState([])
    const [user, setUser] = useState({})
    const location = useLocation();
    let navigate = useNavigate();


    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    useEffect(() => {
        if (code) {
            fetch(`http://localhost:2400/apiv1/github/callback?code=${code}&&userID=${localStorage.getItem('user-id')}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    debugger
                    res && setRepos(res.repos);
                    res && setUser(res.user)
                    localStorage.setItem('user-id', res.user.id);
                    localStorage.setItem('code', code);
                }
                ).catch(err => console.log(err));
        } else {
            location.state.repos && setRepos(location.state.repos);
            location.state.user && setUser(location.state.user);
        }
    }, [])

    const logOut = () => {
        localStorage.removeItem('user-id');
        localStorage.removeItem('code');
        setRepos([]);
        setUser({});
        navigate("/");
    }

    return (
        <div className='repo-list'>
            <div className='header'>
                <div>
                    {user.avatar_url ? <img src={user.avatar_url} className="avatar" /> : <img alt="userDefault" className='image' width='35px' height='35px' src={userDefault}></img>}
                    <h2>{user.login}</h2>
                </div>
                <div>
                    <button onClick={() => logOut()} className='logout'>Log out </button>
                </div>
            </div>
            <div>
                <table id="customers">
                    <tr>
                        <th>Repo Name</th>
                        <th>Language</th>
                        <th>Click to open</th>
                    </tr>
                    {repos.map(repo => (
                        <tr key={repo._id}>
                            <td>{repo.repo_name}</td>
                            <td>{repo.language}</td>
                            <td className='link'><a href={repo.repo_url}>{repo.repo_url}</a></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}