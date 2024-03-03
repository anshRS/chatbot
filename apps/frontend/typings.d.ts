
interface IUser {
    userId: string;
    email: string;
    fullName: string;
    profileImage: string;
}

interface IMessage {
    id: string;
    text: string;
    sender: IUser;
    timestamp: string;
}