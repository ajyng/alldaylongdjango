import React, { useState, useEffect } from 'react';
import { Alert, Form, Input, Button, Checkbox, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import { SmileOutlined, CrownOutlined } from '@ant-design/icons';
import { axiosInstance } from "api";

export default function Signup() {
    const history = useHistory();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                const response = await axiosInstance.post("/accounts/signup/", data);
                notification.open({
                    message: "회원가입 성공",
                    description: "로그인 페이지로 이동합니다.",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                history.push("/accounts/login");
            }
            catch(error) {
                notification.open({
                    message: "회원가입 실패",
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
    }

    return (
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
    );
}
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};