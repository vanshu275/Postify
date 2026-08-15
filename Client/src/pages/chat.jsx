import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMessages } from "../api/messageApi";
import { useAuth } from "../context/AuthContext";
import socket from "../socket/socket";


const Chat = () => {
    const { receiverId } = useParams();
    const { user } = useAuth()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // fetching messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getMessages(receiverId);

                setMessages(response.data.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [receiverId]);


    // socket connection
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        socket.emit("sendMessage", {
            receiver: receiverId,
            message: message.trim(),
        });

        setMessage("");
    };

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col bg-zinc-950">

            {/* Header */}
            <div className="border-b border-zinc-800 px-5 py-4">
                <h2 className="text-lg font-semibold text-zinc-100">
                    Chat
                </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                {loading ? (
                    <p className="text-center text-zinc-500">
                        Loading messages...
                    </p>
                ) : messages.length === 0 ? (
                    <p className="text-center text-zinc-500">
                        No messages yet. Start the conversation.
                    </p>
                ) : (
                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                        {messages.map((msg) => {
                            const isMe = msg.sender === user?._id;

                            return (
                                <div
                                    key={msg._id}
                                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-zinc-100 ${isMe
                                            ? "bg-blue-600"
                                            : "bg-zinc-800"
                                            }`}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Input */}
            <form
                onSubmit={handleSendMessage}
                className="border-t border-zinc-800 p-4"
            >
                <div className="mx-auto flex max-w-3xl gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={!message.trim()}
                    >
                        Send
                    </button>
                </div>
            </form>

        </div>
    );
};

export default Chat;