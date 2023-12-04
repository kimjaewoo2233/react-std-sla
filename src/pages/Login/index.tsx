import React, { FormEvent, ReactNode, useCallback, useState } from 'react';
import { Button, Header, Input, Label, LinkContainer } from '../SignUp/style';
import { Form, Link } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';

const Login = ()=> {    //  첫번쨰 인수를 fetcher로전달해줌 (응답으로 데이터, 에러 ,로딩상태를 받는다.)
    const {data, error} = useSWR('http://localhost:3095/api/uses', fetcher); // 사용자 정보를 받아올 곳 GET 
    const [loginError, setLoginError] = useState(false);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');
    const onSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        setLoginError(false);

        axios.post(
            'http://localhost:3095/api/users/login',
            { email, password },
            {
                withCredentials: true,
            },
        )
        .then((response) => {
            
        })
        .catch((error) => {
            setLoginError(error.response?.status === 401);
        });
    },
    [email, password]
    );

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일 주소</span>
                    <div>
                        <Input type='email' id='email' value={email} onChange={onChangeEmail}/>
                    </div>
                </Label>

                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type='password' id="password" name='password' value={password} onChange={onChangePassword}/>
                    </div>
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요? &nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
}

export default Login;