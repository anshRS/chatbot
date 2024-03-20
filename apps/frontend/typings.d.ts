interface IUser {
    id: string;
    email: string;
    full_name: string;
    is_admin: boolean;
    profileImage: string;
}

interface IChat {
    id: number;
    title: string;
    user_email: string;
    created_at: string;
}

interface IMessage {
    id: number;
    content: string;
    sender_email: string | null;
    chat: number;
    created_at: string;
}
