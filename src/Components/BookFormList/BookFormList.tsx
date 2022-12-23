import React, {useLayoutEffect, useState} from 'react'

import {Author} from "../../types/Author";
import {BookForm, BookFormProps} from "../BookForm/BookForm";
import {Genre} from "../../types/Genre";

import './BookFormList.css'
import axios from "axios";

interface CartResponse
{
    id: number,
    title: string,
    bookFile: string,
    imageUrl: string,
    cost: number,
    description: string,
    authors: Author[],
    genres: Genre[],
}

interface CartsResponse
{
    books: CartResponse[]
}

interface AddCartsRequest
{
    books: number[],
    id: number
}

export function BookFormList()
{
    function getFavorites() {
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/cart';

        axios.defaults.baseURL = url;
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
        axios.defaults.headers.get['Authorization'] = localStorage.getItem('auth');
        axios.get<CartsResponse>(url)
            .then(response => {
                //console.log('response: ' + JSON.stringify(response.data));

                const books = response.data;
                let data_: BookFormProps[] = [];
                books.books.forEach(element => {
                    let bookForm: BookFormProps = {
                        id: element.id,
                        title: element.title,
                        imageSrc: element.imageUrl,
                        authors: element.authors,
                        cost: element.cost,
                    };
                    data_.push(bookForm);
                })
                setData(data_);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function onChange(id: number, e: React.ChangeEvent<HTMLInputElement>)
    {
        if(e.target.checked) {
            const alreadyAddedIdWithSameValue = selectedIds.find(x => x === id);
            if(alreadyAddedIdWithSameValue == null)
            {
                selectedIds.push(id);
            }
        }
        else
        {
            const index = selectedIds.indexOf(id, 0);
            if (index > -1) {
                selectedIds.splice(index, 1);
            }
        }
    }

    function buy()
    {
        const params: AddCartsRequest = {
            books: selectedIds,
            id: 0
        }

        console.log(params);

        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/orders';

        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'GET';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
        axios.defaults.headers.post['Authorization'] = localStorage.getItem('auth');
        axios.post<CartsResponse>(url, params)
            .then(response => {
                alert('bought books: ' + JSON.stringify(selectedIds));
                selectedIds.forEach((id) => {
                    document.querySelector(`#book-form-${id}`)?.remove();
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    const [data, setData] = useState<BookFormProps[]>([]);
    const [selectedIds] = useState<number[]>([]);

    useLayoutEffect(()=>{
        getFavorites();
    }, [])
    return (

            <div>
                <div className='catalog-container'>
                    <div className="book-form-container">
                        <ul>
                            {data.map((props) => {
                                return (
                                    <li id={`book-form-${props.id}`}>
                                        <input type='checkbox' className='d-inline-block' onChange={(e) => onChange(props.id, e)}/>
                                        <BookForm id={props.id} imageSrc={props.imageSrc} authors={props.authors}  title={props.title} cost={props.cost}/>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className='buy-button-container'>
                    <button onClick={buy} className='buy-button'>Buy</button>
                </div>
        </div>
    )
}