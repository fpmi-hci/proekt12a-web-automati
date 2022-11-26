import React from 'react'

import {Author} from "../../types/Author";

import './BookForm.css'

import axios from "axios";

export interface BookFormProps
{
    id: number
    imageSrc: string
    authors: Author[]
    title: string
    cost: number
}

export function BookForm(props : BookFormProps)
{

    function removeBook(bookId: number)
    {
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/cart/batch/remove';
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Authorization'] = localStorage.getItem('auth');

        axios.post(url, `[${JSON.stringify(bookId)}]`)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    document.querySelector(`#book-form-${bookId}`)?.remove();
                }
            })
            .catch(error =>
            {
                console.error(error);
            })
    }

    return (
        <div className='border d-inline-block book-form-div'>
            <img className='d-inline-block book-form-icon' src={props.imageSrc}/>
            <div className='d-inline-block book-form-text-div'>
                <p><b>{props.title}</b></p>
                <p>{props.authors.map((props) => {
                    return (
                        <span>{props.fullName} </span>
                    )})}</p>
            </div>
            <div className='d-inline-block'>
                <b>{props.cost}<span>руб</span></b>
            </div>
            <img className='d-inline-block col remove-button' src='/books/png/cross.png' onClick={()=>removeBook(props.id)}/>
        </div>

    )
}