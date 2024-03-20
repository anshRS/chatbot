import React from "react";
import { deleteChat, setChatTitleFromMessage } from "@/redux/slices/chat";
import { RootState } from "@/redux/store";
import axios from "@/utils/axios";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type NewChatProps = {
    id: number,
    title: string,
};

const ChatRow = ({ id, title }: NewChatProps) => {
    
    const pathname = usePathname();
    const router = useRouter();
    const { token } = useSelector((state: RootState) => state.auth);

    const [inputTitle, setTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const handleEditTitle = async () => {
        setIsEditing(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            try {
                const response = await axios.patch(`/chats/${id}/`, { title: inputTitle }, {
                    headers: {
                        'Authorization': `JWT ${token}`
                    }
                });
                dispatch(setChatTitleFromMessage({ chatId: id, title: response.data.title }));
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating title:', error);
            }
        }
    };


    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(`/chat/${id}`));
    }, [pathname])

    const handleDeleteChat = async () => {
        try {
            await axios.delete(`/chats/${id}/`, {
                headers: {
                    Authorization: `JWT ${token}`,
                },
            });
            dispatch(deleteChat(id));
            router.replace("/chat/");
        } catch (error) {
            console.error('Error deleting chat:', error);
        }
    };

    return (
        <div className={`group hover:bg-input rounded-md p-2 relative ${active && 'bg-input'} `}>
            <Link href={`/chat/${id}`} className='flex item-center'>
                {/* <p className='truncate'> */}
                {/* {messages && messages.length > 0 ? messages[messages.length - 1].content : "New Chat"} */}
                {/* {title} */}
                {/* </p> */}
                {isEditing ? (
                    <input
                        type='text'
                        value={inputTitle}
                        onChange={handleTitleChange}
                        onKeyPress={handleKeyPress}
                        onBlur={() => setIsEditing(false)}
                        autoFocus
                        className="px-2 focus:outline-muted w-full"
                    />
                ) : (
                    <p className='truncate'>{title ? title : "New Chat"}</p>
                )}
                {active && (
                    <>
                        <div className="absolute bottom-0 right-0 top-0 bg-gradient-to-l from-input w-20 from-60%"></div>
                        <div className="absolute top-0 bottom-0 right-0 flex items-center pr-2 gap-1">
                            <Pencil1Icon className="w-5 h-5 group-hover:block cursor-pointer" onClick={handleEditTitle} />
                            <TrashIcon className="w-5 h-5 group-hover:block cursor-pointer" onClick={handleDeleteChat} />
                        </div>
                    </>
                )}

            </Link>
        </div>
    )
}

export default ChatRow
