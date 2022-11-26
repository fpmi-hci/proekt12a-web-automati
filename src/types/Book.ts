import {Author} from "./Author";
import {Comment} from "./Comment";
import {Genre} from "./Genre";

export interface Book
{
    id: number,
    title: string,
    bookFile: string,
    imageUrl: string,
    cost: number,
    description: string,
    authors: Author[],
    genres: Genre[],
    comments: Comment[]
}