"use client";
import { useState, useEffect, useRef } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Image } from "primereact/image";
import Link from "next/link";
export default function ChatBot({ onClose }) {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào! Tôi có thể giúp gì cho bạn?\n ***** Bạn muốn hỏi về ***** \n sản phẩm  hay khuyến mại?' }
    ]);
    const [data, setData] = useState("https://venngage-wordpress.s3.amazonaws.com/uploads/2022/09/meme_sad_frog.png");
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const value = JSON.parse(localStorage.getItem("data"));
        if (value?.user?.image) {
            setData(`http://localhost:3000${value.user.image}`);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const statusText = (quantity) => quantity > 0 ? "Còn Hàng" : "Hết Hàng";
    const imageBody = (value) => (
        <Image src={`http://localhost:3000${value[0]}`} alt="Image" width="full" height="full" preview />
    );

    const trangthaiText = (rowData) => {
        const now = new Date();
        const endDate = new Date(rowData.end_date);
        const quantity = rowData.quantity_promotion;
        if (quantity <= 0) {
            return "Hết Số Lượng";
        } else if (endDate < now) {
            return "Hết Hạn";
        } else {
            return "Đang Khuyến Mại";
        }
    };
    const handleMessage = async (userMessage) => {
        if (/sản phẩm|xe đạp/i.test(userMessage)) {
            try {
                const { data: products } = await axios.get(`http://localhost:3000/products/getAllProducts`);
                if (!products.length) {
                    return [<div key="no-products">Hiện chưa có sản phẩm nào trong hệ thống.</div>];
                }
                return products.map((p) => (
                    <Link
                        key={p.id}
                        href={`/nguoidung/sanpham/${p.id}`}
                        className="block mb-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition duration-200 bg-white">
                            {/* Ảnh sản phẩm */}
                            <div className="flex col-span-1 items-center justify-center">
                                {imageBody(p.image)}
                            </div>

                            {/* Thông tin sản phẩm */}
                            <div className="space-y-2 col-span-2 text-sm md:text-base">
                                <p>
                                    <span className="font-medium">📝 Tên:</span> {p.name}
                                </p>
                                <p>
                                    <span className="font-medium">💰 Giá:</span>{' '}
                                    <span className="text-green-600 font-semibold">
                                        {Number(p.newprice).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-medium">📌 Tình trạng:</span>{' '}
                                    <span className={p.quantity > 0 ? 'text-blue-600' : 'text-red-500'}>
                                        {statusText(p.quantity)}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                ));
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                return [<div key="error-products">Không thể lấy dữ liệu sản phẩm. Anh thử lại sau nhé.</div>];
            }
        }
        else if (/khuyến mại|giảm giá/i.test(userMessage)) {
            try {
                const { data: giamgia } = await axios.get(`http://localhost:3000/promotions/getAllPromotions`);
                if (!giamgia.length) {
                    return [<div key="no-promotions">Hiện chưa có khuyến mãi nào.</div>];
                }

                return giamgia.map((promo) => (
                    <div
                        key={promo.id}
                        className="mb-4 p-4 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-200"
                    >
                        <p className="text-sm md:text-base">
                            🎁 <span className="font-semibold">Mã Khuyến Mại:</span>{' '}
                            <span className="text-blue-600">{promo.id}</span>
                        </p>
                        <p className="text-sm md:text-base mt-1">
                            📝 <span className="font-semibold">Chương trình:</span>{' '}
                            <span className="text-gray-800">{promo.title}</span>
                        </p>
                        <p className="text-sm md:text-base mt-1">
                            📄 <span className="font-semibold">Nội dung:</span>{' '}
                            <span className="text-gray-700">{promo.description}</span>
                        </p>
                        <p className="text-sm md:text-base mt-1">
                            📌 <span className="font-semibold">Tình trạng:</span>{' '}
                            <span className={promo.trangthai === 'active' ? 'text-green-600' : 'text-red-500'}>
                                {trangthaiText(promo)}
                            </span>
                        </p>
                    </div>
                ));

            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                return [<div key="error-promotions">Không thể lấy dữ liệu khuyến mãi. Anh thử lại sau nhé.</div>];
            }
        }
        else {
            try {
                const response = await axios.post('http://localhost:3000/chatbot', { message: userMessage });
                const botReply = response.data.reply || 'Xin lỗi, tôi không hiểu.';
                const lines = botReply.split('\n').filter(line => line.trim() !== '');
                return lines.map((line, index) => <div key={index}>{line}</div>);
            } catch (error) {
                console.error("Lỗi khi gọi chatbot:", error);
                return [<div key="error-chatbot">Xin lỗi, hệ thống đang bận.</div>];
            }
        }
    };

    const handleSend = async () => {
        if (input.trim() === '') return;
        setMessages(prev => [...prev, { sender: 'user', text: input }]);
        const userInput = input;
        setInput('');

        try {
            const botReplies = await handleMessage(userInput);
            const formattedReplies = botReplies.map((reply, idx) => ({
                sender: 'bot',
                text: reply
            }));

            setMessages(prev => [...prev, ...formattedReplies]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: <div>Xin lỗi, hệ thống đang bận.</div> }]);
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    const footer = (
        <div className="flex gap-2">
            <InputText
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="w-full p-inputtext-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button
                icon="pi pi-send"
                className="p-button-sm p-button-rounded p-button-primary"
                onClick={handleSend}
            />
        </div>
    );

    return (
        <Dialog
            header="💬 Chat tư vấn - Giải đáp"
            visible
            onHide={onClose}
            position="bottom-right"
            style={{ width: '600px', height: '70vh', borderRadius: '12px' }}
            footer={footer}
        >
            <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded-lg">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex items-end ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                    >
                        {msg.sender === 'bot' && (
                            <img
                                src="https://yt3.googleusercontent.com/MQpYbsm5L-b-xa6u8U-L8oQ57ekmRqLgdSYq1VGwdU4h5acCMGmZ6G8qZz20JwGzSqGEOHQbQ6o=s900-c-k-c0x00ffffff-no-rj"
                                alt="Bot"
                                className="w-8 h-8 rounded-full mr-2 border border-blue-300"
                            />
                        )}
                        <div
                            className={`max-w-[75%] p-2 rounded-2xl shadow text-sm ${msg.sender === 'bot' ? 'bg-blue-100 text-gray-800' : 'bg-green-100 text-gray-900'
                                }`}
                        >
                            {typeof msg.text === 'string' ? (
                                msg.text.split('\n').map((line, i) => (
                                    <p key={i} className="mb-1">{line}</p>
                                ))
                            ) : (
                                msg.text
                            )}

                        </div>
                        {msg.sender === 'user' && (
                            <img
                                src={data}
                                alt="User"
                                className="w-8 h-8 rounded-full ml-2 border border-green-300"
                            />
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </Dialog>

    );
}
