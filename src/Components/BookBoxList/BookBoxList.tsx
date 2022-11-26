import React from 'react'

import {BookBox, BookBoxProps} from "../BookBox/BookBox";

export interface BookBoxListProps
{
    books: BookBoxProps[]
}

export function BookBoxList(props: BookBoxListProps)
{
    return (
        <div className='container'>
            <ul className='col-lg-11'>
                {props.books.map((props) => {
                    return (
                        <li className='d-inline-block'>
                            <BookBox id={props.id} imageSrc={props.imageSrc} authors={props.authors} title={props.title} cost={props.cost} type={props.type}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
//
// export class BookBoxList_ extends Component
// {
//
//     data : BookBoxProps[] = [];
//
//     getData(params: string) {
//         const url = 'http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/books/search';
//
//         axios.defaults.baseURL = url;
//         axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//         axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
//         axios.post<BookBoxResponse[]>(url, params)
//             .then(response => {
//
//                 const bookBoxResponse :BookBoxResponse[] = response.data;
//                 bookBoxResponse.forEach(element => {
//                     let bookBox : BookBoxProps = {
//                         id: element.id,
//                         imageSrc: 'http://www.w3.org/2008/site/images/logo-w3c-screen-lg',
//                         author: 'author',
//                         title: element.title,
//                         cost: element.cost
//                     };
//                     this.data.push(bookBox);
//                 })
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }
//
//     componentDidMount() {
//         this.getData('{}');
//         this.forceUpdate();
//         console.log('here');
//     }
//
//     render()
//     {
//         return (
//             <div className='container'>
//                 <ul className='col-lg-11'>
//                     <li>{this.data.length}</li>
//                     {this.data.map((props) => {
//                         return (
//                             <li className='d-inline-block'>
//                                 <BookBox id={props.id} imageSrc={props.imageSrc} author={props.author}  title={props.title} cost={props.cost}/>
//                             </li>
//                         )
//                     })}
//                 </ul>
//             </div>
//         )
//     }
//
// }