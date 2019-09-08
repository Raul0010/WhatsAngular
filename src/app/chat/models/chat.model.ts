import { User } from '../../core/models/user.model';
import { Message } from '../models/message.model';

export class Chat {
    id: string;
    createdAt?: string;
    isGroup?: boolean;
    title?: string;
    users?: User[];
    messages?: Message[];
}