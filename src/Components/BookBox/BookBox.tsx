import React from 'react'

import Image from 'react-bootstrap/Image'

import {Author} from "../../types/Author";

import {isAuthenticated} from "../../utils/utils";

import './BookBox.css'

import axios from "axios";

export enum BookBoxType {
    Add,
    Download
}

export interface BookBoxProps
{
    id: number,
    imageSrc: string,
    authors: Author[],
    title: string,
    cost: number,

    type: BookBoxType
}

interface DownloadBookResponse
{
    fileName: string,
    content: string
}

function base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

export function BookBox(props : BookBoxProps)
{
    function plusButtonOnClick(id: number)
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

    function downloadButtonOnClick(id: number)
    {
        const url = `http://readmeapplication-env.eba-5kjirdez.us-east-1.elasticbeanstalk.com/books/${id}/content`;

        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.get['Authorization'] = localStorage.getItem('auth');
        axios.defaults.headers.get['Access-Control-Allow-Methods'] = 'GET';
        axios.get<DownloadBookResponse>(url)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([base64toBlob(res.data.content, 'text/plain')]
                    ,{type: "text/plain"}))
                var link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', res.data.fileName);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                console.error(error);
            });


    }

    return (
        <div className='d-inline-block m-4 border border-primary box'>
            <a href={'/books/' + props.id}>
                <Image src={props.imageSrc} className='m-2 box-image' rounded={true}/>
                <p className='m-0'>{props.authors.map((props) => {
                    return (
                        <span>{props.fullName} </span>
                )})}</p>
                <p className='m-0'>{props.title}</p>
                <p><b>{props.cost}</b> <span>$</span></p>
            </a>
            {isAuthenticated() && props.type === BookBoxType.Add && <input className='float-end plus-button' type="image" src="/books/png/plus.png" alt='Not found' onClick={()=>{plusButtonOnClick(props.id)}}/>}
            {isAuthenticated() && props.type === BookBoxType.Download && <input className='float-end plus-button' type="image" src="/books/png/download.png" alt='Not found' onClick={()=>{downloadButtonOnClick(props.id)}}/>}
        </div>

    )
}