import { useEffect, useState } from 'react';
import '../styles/RepoList.css';

export const RepoList = () => {
    const [repos, setRepos] = useState([])
    const [user, setUser] = useState({})
    console.log(repos)
    console.log(user)

    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    useEffect(() => {
         fetch(`http://localhost:2400/apiv1/github/callback?code=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                res && setRepos(res.repos);
                res && setUser(res.user)
            }
            ).catch(err => console.log(err));
    })

    return (
        <div className='repo-list'>
            <div className='header'>
                <img src={user.avatar_url} class="avatar" />
                <h2>{user.login}</h2>
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