import React, {useLayoutEffect, useState} from 'react'
import {useParams} from "react-router-dom";

import {Author} from "../../types/Author";
import {Genre} from "../../types/Genre";

import Image from "react-bootstrap/Image";

import axios from "axios";

interface BookResponse
{
    id: number,
    title: string,
    bookFile: string,
    imageUrl: string,
    cost: number,
    description: string,
    authors: Author[],
    genres: Genre[]
}

type BookParams = {
    id: string
};

export function BookPage()
{
    function getBook()
    {
        const url = `http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/books/${id}`;

        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
        axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.get['Authorization'] = localStorage.getItem('auth');
        axios.get<BookResponse>(url)
            .then(response => {

                setBook(response.data);

            })
            .catch(error => {
                console.error(error);
            });
    }

    function addToFavorites()
    {
        //const url = `https://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/cart/add/${id}`;
        const url = `http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/cart/batch/add`;

        axios.defaults.baseURL = url;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.post['Authorization'] = localStorage.getItem('auth');
        axios.post(url, `[${JSON.stringify(id)}]`)
            .then(response => {
                //console.log('response: ' + JSON.stringify(response.data));
                alert('book was added to favorites');
            })
            .catch(error => {
                console.error(error);
            });
    }

    var { id } = useParams<BookParams>();

    const [book, setBook] = useState<BookResponse>();

    useLayoutEffect(()=>{
        getBook();
    });

    return (

            <div>
                <div>
                    <div className='d-inline-block col-8 col-md-4'>
                        <Image src={book?.imageUrl} className='m-5 col-7'></Image>
                        <button type="button" className="btn btn-success" onClick={addToFavorites}>Add to favorites</button>
                    </div>
                    <div className='col-6 d-inline-block'>
                        <h1>{book?.title}</h1>
                        <h3>Authors: {book?.authors.map((author)=>{
                            return <span>{author.fullName} </span>
                        })}</h3>
                        <hr/>
                        <p>{book?.description}</p>
                    </div>
                </div>
            </div>

    );
}
