
interface IUser {
    id: string;
    email: string;
    full_name: string;
    is_admin: boolean;
    profileImage: string;
}

interface IMessage {
    id: string;
    text: string;
    sender: IUser;
    timestamp: string;
}