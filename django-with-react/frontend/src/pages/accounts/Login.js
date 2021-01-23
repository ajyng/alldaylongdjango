import React, { useState } from 'react';
import Axios from 'axios';
import { Card, Form, Input, Button, notification } from 'antd';
// import { useHistory } from 'react-router-dom';
import { SmileOutlined, CrownOutlined } from '@ant-design/icons';

import { setToken, useAppContext } from 'store';

export default function Login() {

    const { dispatch } = useAppContext();
    // const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});
    // const [jwtToken, setJwtToken] = useLocalStorage('jwtToken', "");

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await Axios.post("http://localhost:8000/accounts/token/", data);

                const { data: { token: jwtToken } } = response;
                dispatch(setToken(jwtToken));

                notification.open({
                    message: "로그인 성공",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                // history.push("/accounts/login"); // TODO
            }
            catch(error) { // 주어진 {username, password}에 매칭되는 유저가 없는 경우
                notification.open({
                    message: "로그인 실패",
                    description: "아이디/암호를 확인해주세요.",
                    icon: <CrownOutlined style={{ color: "#ff3333" }} />
                });

                if (error.response) {
                    const { data: fieldErrorMessage } = error.response;
                    setFieldErrors(
                        Object.entries(fieldErrorMessage).reduce( (acc, [fieldName, errors]) => {
                            acc[fieldName] = {
                                validateStatus: "error",
                                help: errors.join(" "),
                            }
                            return acc;
                        }, {})
                    )
                }
            }
        }
        fn();
    };

    return (
        <Card title="로그인">
            <Form
                {...layout}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 5, message: '5글자 이상 입력해주세요.'}
                ]}
                hasFeedback
                {...fieldErrors.username}
                {...fieldErrors.non_field_errors} // {...fieldErrors.username}을 overwrite 해버린다
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    {...fieldErrors.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};