import React, {useLayoutEffect, useState} from 'react'

import {BookBoxList} from "../../Components/BookBoxList/BookBoxList";
import {BookBoxProps, BookBoxType} from "../../Components/BookBox/BookBox";
import {Book} from "../../types/Book";

import axios from "axios";

export function BooksPage()
{
    function getBooks(params: string) {
        // console.log('getData started...');
        const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/books/search';
        axios.defaults.baseURL = url;
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
        axios.post<Book[]>(url, params)
            .then(response => {
                // console.log('response: ' + JSON.stringify(response.data));
                const bookBoxResponse :Book[] = response.data;
                let data : BookBoxProps[] = [];
                bookBoxResponse.forEach(element => {
                    let bookBox : BookBoxProps = {
                        id: element.id,
                        imageSrc: element.imageUrl,
                        authors: element.authors,
                        title: element.title,
                        cost: element.cost,
                        type: BookBoxType.Add
                    };
                    data.push(bookBox);
                })
                setBooks(data);
                // console.log('data: ' + JSON.stringify(data));
                // console.log('getData finished...');
            })
            .catch(error => {
                console.error(error);
            });
    }

    useLayoutEffect(()=>{
        getBooks('{}');
    }, [])

    const [books, setBooks] = useState<BookBoxProps[]>([]);

    return (
        <div>
            <BookBoxList books={books}/>
        </div>
    )
}
