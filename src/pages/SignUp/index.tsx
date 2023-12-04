import React, { FormEventHandler, useCallback, useState } from 'react';
import { Button, Form, Header, Input, Label, LinkContainer, Error, Success } from './style';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccessm, setSignUpSuccess] = useState('');

    const [email, onChangeEmail, setEmail] = useInput('');
    const [nickname, onChangeNickname, setNickname] =useInput('');
    const [password, setPassword] = useState<string>();
    const [passwordCheck, setPasswordCheck] = useState<string>();
    const [mismatchError, setMismatchError] = useState<boolean>(false);
    
    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const onChangePasswordCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
       setPasswordCheck(e.target.value);
       setMismatchError(e.target.value === password);
    }, [passwordCheck]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(
            {
                email,
                password,
                nickname,
                passwordCheck
        
            }
        );
        if(mismatchError){
            console.log('비밀번호일치');
            setSignUpError('');
            setSignUpSuccess('');

            axios.post('http://localhost:3095/api/users',{
              email, nickname, password
            })
            .then((response) => {
              console.log(response);
              setSignUpError(response.data);
            })
            .catch((err) => {
              console.log(err.response);
              setSignUpError('로그인 실패');
            })
            .finally(() => {});
        }
    },
    [email, password, nickname, passwordCheck]);

    return (
        <div id="container">
          <Header>Sleact</Header>
          <Form onSubmit={onSubmit}>
            <Label id="email-label">
              <span>이메일 주소</span>
              <div>
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
              </div>
            </Label>
            <Label id="nickname-label">
              <span>닉네임</span>
              <div>
                <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
              </div>
            </Label>
            <Label id="password-label">
              <span>비밀번호</span>
              <div>
                <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
              </div>
            </Label>
            <Label id="password-check-label">
              <span>비밀번호 확인</span>
              <div>
                <Input
                  type="password"
                  id="password-check"
                  name="password-check"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                />
              </div>
              {!mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
              {signUpError != '' && <Error>{signUpError}</Error>}
              {signUpSuccessm && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
            </Label>
            <Button type="submit">회원가입</Button>
          </Form>
          <LinkContainer>
            이미 회원이신가요?&nbsp;
            <Link to="/login">로그인 하러가기</Link>
          </LinkContainer>
        </  div>
      );
}

export default SignUp;