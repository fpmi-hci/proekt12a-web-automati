import React, { useState }from 'react'
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";

import axios from 'axios';

import './LoginPage.css'

interface LoginResponse
{
    login: string,
    token: string
}

export function LoginPage()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        var body = {
            email: email,
            password: password
        };
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/auth/login';

        axios.defaults.baseURL = url;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
        axios.post<LoginResponse>(url, JSON.stringify(body))
            .then(response => {
                let data = response.data;
                localStorage.setItem('auth', data.token);

                navigate("/books");
            })
            .catch(error => {
                if (error.response!.status === 401) {
                    let element = document.querySelector('.invalid-form-text');
                    element?.classList.remove('hidden');
                }
                console.log(error.message)
            });
    }

    return (

        <div>
            <section className="vh-100 section">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong circle-card">
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Sign in</h3>
                                    <Form onSubmit={(e) => handleSubmit(e)}>
                                        <Form.Group>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    className="form-control form-control-lg validating-input"
                                                    autoFocus
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => {
                                                            setEmail(e.target.value);
                                                        }
                                                    }
                                                />
                                            </div>
                                        </Form.Group>

                                        <Form.Group>
                                            <div className="form-outline mb-4">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    className="form-control form-control-lg validating-input"
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => {
                                                            setPassword(e.target.value);
                                                        }
                                                    }
                                                />
                                            </div>
                                        </Form.Group>
                                        <label className='invalid-form-text hidden'>Wrong login or password!</label>

                                        <Button className="btn btn-primary btn-lg btn-block" size="lg" type="submit" disabled={!validateForm()}>Login</Button>
                                    </Form>
                                    <hr/>

                                    <p>Don't have account?</p>
                                    <a href='/register'>Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
