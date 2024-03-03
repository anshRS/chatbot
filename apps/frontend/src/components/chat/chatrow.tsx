import { useMessages } from "@/hooks/useMessages";
import { deleteChat } from "@/redux/slices/chat";
import { TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type NewChatProps = {
    id: string;
};

const ChatRow = ({ id }: NewChatProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const [active, setActive] = useState(false);

    const messages = useMessages(id);

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(`/chat/${id}`));
    }, [pathname])

    const dispatch = useDispatch();

    const handleDeleteChat = async () => {
        await dispatch(deleteChat(id));
        router.replace("/chat/")
    };


    return (
        <div className={`group hover:bg-input rounded-md p-2 relative ${active && 'bg-input'} `}>
            <Link href={`/chat/${id}`} className='flex item-center'>
                <p className='truncate'>
                    {messages.length > 0 ? messages[messages.length - 1].text : "New Chat"}
                </p>
                <div className="absolute top-0 bottom-0 right-0 flex items-center pr-2">
                    <TrashIcon className="w-5 h-5 hidden group-hover:block cursor-pointer" onClick={handleDeleteChat} />
                </div>
            </Link>
        </div>
    )
}

export default ChatRow
