import React, {useLayoutEffect, useState} from 'react'

import Image from 'react-bootstrap/Image'

import {BookBoxList} from "../../Components/BookBoxList/BookBoxList";
import {BookBoxProps, BookBoxType} from "../../Components/BookBox/BookBox";

import {Book} from "../../types/Book";
import {User} from "../../types/User";

import axios from "axios";

export function UserPage()
{
    // var { id } = useParams<UserParams>();

    const [user, setUser] = useState<User>();
    const [books, setBooks] = useState<BookBoxProps[]>([]);

    useLayoutEffect(()=>{

        function getUserInfo()
        {
            const url = `http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/users/self`;

            axios.defaults.baseURL = url;
            axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
            axios.defaults.headers.get['Authorized'] = localStorage.getItem('auth');
            axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
            axios.get<User>(url)
                .then(response => {
                    // console.log('response: ' + JSON.stringify(response.data));
                    setUser(response.data);
                    console.log(user);
                    // console.log('genres: ' + JSON.stringify(genres));
                })
                .catch(error => {
                    console.error(error);
                });
        }

        function getBooks() {
            // console.log('getData started...');
            const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/books/purchased';
            axios.defaults.baseURL = url;
            axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
            axios.defaults.headers.get['Authorized'] = localStorage.getItem('auth');
            axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
            axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
            axios.get<Book[]>(url)
                .then(response => {
                    // console.log('response: ' + JSON.stringify(response.data));
                    const booksResponse = response.data;
                    let data : BookBoxProps[] = [];
                    booksResponse.forEach(element => {
                        let bookBox : BookBoxProps = {
                            id: element.id,
                            imageSrc: element.imageUrl,
                            authors: element.authors,
                            title: element.title,
                            cost: element.cost,
                            type: BookBoxType.Download
                        };
                        data.push(bookBox);
                    })
                    setBooks(data);
                    console.log(books);
                    // console.log('data: ' + JSON.stringify(data));
                    // console.log('getData finished...');
                })
                .catch(error => {
                    console.error(error);
                });
        }

        getUserInfo();
        getBooks();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className=''>
                <Image src={user?.iconPath} alt='Image did not find' className='d-inline-block m-5 col-9 col-md-5' roundedCircle={true}></Image>
                <div className='col-md-5 d-inline-block'>
                    <h2>{user?.name}</h2>
                </div>
            </div>
            <h2>My books</h2>
            <BookBoxList books={books}/>
        </div>
    )
}