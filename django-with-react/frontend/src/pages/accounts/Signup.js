import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Alert } from 'antd';
import { useHistory } from 'react-router-dom';

export default function Signup() {
    const history = useHistory();
    const [inputs, setInputs] = useState({username: "", password: ""});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(true);
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        setLoading(true);

        Axios.post("http://localhost:8000/accounts/signup/", inputs)
            .then(response => {
                history.push("/accounts/login");
            })
            .catch(error => {
                console.log("error: ", error);
                if (error.response ) {
                    setErrors({
                        username : (error.response.data.username || []).join(" "),
                        password : (error.response.data.password || []).join(" ")
                    });
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect( () => {
        const isEnabled = Object.values(inputs).every(s => s.length > 0);
        setFormDisabled(!isEnabled);
    }, [inputs])

    const onChange = e => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" name="username" onChange={onChange} />
                    {errors.username && <Alert type="error" message={errors.username} />}
                </div>
                
                <div>
                    <input type="password" name="password" onChange={onChange} />
                    {errors.password && <Alert type="error" message={errors.password} />}
                </div>

                <input type="submit" value="회원가입" disabled={loading || formDisabled} />
            </form>
        </div>
    );
}