import {User} from './User';

export interface Comment {
    description: string
    id: number,
    rate: number,
    user: User
}
