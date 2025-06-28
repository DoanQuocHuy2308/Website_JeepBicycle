"use client";
import icon1 from "@/ImageJeepBicycle/facebook.png";
import icon2 from "@/ImageJeepBicycle/phone.png";
import icon3 from "@/ImageJeepBicycle/zalo.png";
import { FaRegCommentDots } from 'react-icons/fa';
import Image from "next/image";
import Link from "next/link";
import ChatBot from "@/components/chatbot";
import { useState } from "react";

export default function LienHe() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-4">
      <div className="space-y-4 flex flex-col">
        <Link href="https://facebook.com">
          <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 transform hover:scale-110">
            <Image src={icon1} alt="facebook" width={40} height={40} />
          </div>
        </Link>
        <Link href="tel:0123456789">
          <div className="flex justify-center items-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform duration-300 transform hover:scale-110">
            <Image src={icon2} alt="phone" width={40} height={40} />
          </div>
        </Link>
        <Link href="https://zalo.me">
          <div className="flex justify-center items-center w-16 h-16 bg-blue-400 text-white rounded-full shadow-lg hover:bg-blue-500 transition-transform duration-300 transform hover:scale-110">
            <Image src={icon3} alt="zalo" width={40} height={40} />
          </div>
        </Link>
      </div>
      <button
        className="flex items-center px-3 py-2 rounded-full text-white shadow-lg transition-transform duration-300 transform hover:scale-105 bg-red-600 hover:bg-red-700"
        onClick={() => setShowChat(true)} 
      >
        <FaRegCommentDots className="text-2xl mr-2" />
        <span className="whitespace-nowrap">Chat tư vấn - Giải đáp</span>
      </button>
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
}
