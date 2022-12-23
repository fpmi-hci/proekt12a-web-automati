import React, {useState, useLayoutEffect} from 'react'

import {BookFormList} from "../BookFormList/BookFormList";

import {Genre} from "../../types/Genre";
import {User} from "../../types/User";

import {isAuthenticated} from "../../utils/utils";

import Form from "react-bootstrap/Form";

import axios from 'axios';

import './Header.css'

export function Header()
{
    function hideRightPanel(id: string)
    {
        let panel = document.querySelector('#'+id) as HTMLElement;
        panel.classList.add('invisible');
    }

    function showRightPanel(id: string)
    {
        let panel = document.querySelector('#'+id) as HTMLElement;
        panel.classList.remove('invisible');
    }

    function getGenres()
    {
        //console.log('getData started...');

        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/genres';

        axios.defaults.baseURL = url;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET';
        axios.get<Genre[]>(url)
            .then(response => {
                // console.log('response: ' + JSON.stringify(response.data));

                setGenres(response.data);

                // console.log('genres: ' + JSON.stringify(genres));
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getUserInfo()
    {
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/users/self';

        axios.defaults.baseURL = url;
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Authorization'] = localStorage.getItem('auth');
        axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
        axios.get<User>(url)
            .then(response => {
                // console.log('response: ' + JSON.stringify(response.data));
                setUser(response.data);
                // console.log('genres: ' + JSON.stringify(genres));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const [genres, setGenres] = useState<Genre[]>([]);
    const [user, setUser] = useState<User>();

    useLayoutEffect(()=>{
        getUserInfo();
        getGenres();
    }, [])

    return (

        <header className='bg-primary text-white header'>
            <div className=' d-inline-block col'>
                <a href={isAuthenticated() ? `/users/${user?.id}` : '/login'}>
                    <img src={'/books/png/person.png'} className='d-inline-block rounded-circle icon bg-white'/>
                </a>
            </div>
            <div className=' d-inline-block col'>
                <a href={'/'} className='link-light'>
                    ReadMe
                </a>
            </div>
            <div className='d-inline-block col-4 col-sm-6 col-xl-9'></div>
            <div className='d-inline-block'>
                <button className='btn col' id='searchMenuButton' onClick={() => showRightPanel('search-right-panel')}>
                    <img src='/books/png/022-icon-3839775.png' className='d-inline-block icon'/>
                </button>
                <button className='btn col' id='catalogMenuButton' onClick={() => showRightPanel('catalog-right-panel')}>
                    <img src='/books/png/034-icon-3839819.png' className='d-inline-block icon'/>
                </button>
            </div>
            <div>
                <div className='right-panel invisible' id='search-right-panel'>
                    <div className='inner-header'>
                        <div>
                            <button className='btn col' id='searchMenuButton' onClick={() => hideRightPanel('search-right-panel')}>
                                <img src='/books/png/022-icon-3839775.png' className='d-inline-block icon'/>
                            </button>
                            <h1 className='d-inline-block col-9'>Поиск</h1>
                            <hr/>

                            <Form>
                                <Form.Group>
                                    <Form.Label>Жанры</Form.Label>
                                    {genres.map((props) => {
                                        return (
                                            <Form.Check
                                                label={props.name}
                                                id={`${props.id}`}
                                            />
                                        )
                                    })}
                                </Form.Group>
                            </Form>

                        </div>
                    </div>
                </div>
                {isAuthenticated() &&
                <div className='right-panel invisible' id='catalog-right-panel'>
                    <div className='right-panel-header'>
                        <button className='btn col' id='searchMenuButton' onClick={() => hideRightPanel('catalog-right-panel')}>
                            <img src='/books/png/034-icon-3839819.png' className='d-inline-block icon'/>
                        </button>
                        <h1 className='d-inline-block col-9'>Избранное</h1>
                    </div>
                    <hr/>
                    <BookFormList/>
                </div>
                }
            </div>
        </header>
    )
}
