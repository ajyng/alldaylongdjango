import React, { useState, useEffect } from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import useAxios from 'axios-hooks';
import { useAppContext } from "store";
import Axios from "axios";

export default function SuggestionList({ style }) {
    const [ userList, setUserList ] = useState([]);

    const { store: {jwtToken} } = useAppContext();
    const headers = { Authorization: `JWT ${jwtToken}` };

    const [{ data: origUserList, loading, error}, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers
        });


    useEffect(() => {
        if (!origUserList) setUserList([]);
        else setUserList(origUserList.map(user => ({ ...user, is_follow: false })));
        }, [origUserList]);
    
    const onFollowUser = username => {
        const data = { username };
        const config = { headers };
        Axios.post("http://localhost:8000/accounts/follow/", data, config)
        .then(response => {
            setUserList(prevUserList =>
                prevUserList.map(user =>
                user.username !== username ? user : { ...user, is_follow: true }
                )
            );
        })
        .catch(error => {
            console.log(error);
        });
    };


    return (
        <div style={style}>
            {loading && <div>Loading...</div>}
            {error && <div>로딩 중에 에러가 발생했습니다.</div>}

            <button onClick={ () => refetch()}>Reload</button>

            <Card title="Suggestions for you " size="small">
            {userList.map(suggestionUser => (
                <Suggestion
                key={suggestionUser.username}
                suggestionUser={suggestionUser}
                onFollowUser={onFollowUser}
                />
            ))}
            </Card>
        </div>
        
    );
}