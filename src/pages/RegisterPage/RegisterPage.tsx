import React, {useState} from 'react'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function RegisterPage()
{

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function validatePasswords()
    {
        let element = document.querySelector('.invalid-form-text');
        if(password !== repeatedPassword)
        {
            console.log('Password do not equal');
            element?.classList.remove('hidden');
        }
        else
        {
            element?.classList.add('hidden');
        }
    }

    function onRegisterSuccess()
    {
        let element = document.querySelector('.register-success-text');
        element?.classList.remove('hidden');
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(repeatedPassword !== password)
        {
            return;
        }

        var body = {
            email: email,
            password: password
        };
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/auth/register';

        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(body) // body data type must match "Content-Type" header
        }).then(response =>{
            onRegisterSuccess();
            console.log('success');
        })
        .catch(error =>{
            console.error(error.message)
        });

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");

    return (

        <div>
            <div>
                <section className="vh-100 section">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong circle-card">
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5">Sign up</h3>
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
                                            <Form.Group>
                                                <div className="form-outline mb-4">
                                                    <Form.Label>Repeat password</Form.Label>
                                                    <Form.Control
                                                        className="form-control form-control-lg validating-input"
                                                        type="password"
                                                        value={repeatedPassword}
                                                        onChange={(e) => {
                                                            setRepeatedPassword(e.target.value);
                                                        }
                                                        }
                                                    />
                                                </div>
                                            </Form.Group>
                                            <label className='register-success-text hidden'>Successful</label>
                                            <label className='invalid-form-text hidden'>Passwords do not equal!</label>

                                            <Button className="btn btn-primary btn-lg btn-block" size="lg" type="submit" disabled={!validateForm()} onClick={()=>validatePasswords()}>Register</Button>
                                            <hr/>

                                            <p>Do you already have account?</p>
                                            <a href='/login'>Login</a>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
