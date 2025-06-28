"use client";
import { useState, useEffect } from "react";
import { Badge } from "primereact/badge";
import Thongbao from "./thongbao";
import axios from "axios";
import { motion } from "framer-motion";
import Contacts from "./contact";
export default function Header() {
    const [userData, setUserData] = useState(null);
    const [showThongbao, setShowThongbao] = useState(false);
    const [showContacs, setShowContacts] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedData = localStorage.getItem("data");
            if (storedData) {
                setUserData(JSON.parse(storedData)?.user);
            }
        }
    }, []);

    const toggleThongbao = () => {
        setShowThongbao(!showThongbao);
    };
    const toggleContacts = () => {
        setShowContacts(!showContacs);
    }
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        try {
            const fetchProductByType = async () => {
                const response = await axios.get('http://localhost:3000/feedbacks/getAllFeedbacks');
                const data = response.data;
                setFeedback(data);
            };
            fetchProductByType();
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    const [dataContacts, setDataContacts] = useState([]);
    const getAllContacts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/contacts/getAllContacts");
            setDataContacts(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllContacts();
    }, []);
    const role = (value) => {
        if (value === 1) {
            return "Khách hàng";
        }
        if (value === 2) {
            return "Nhân Viên";
        }
        if (value === 3) {
            return "Quản lý";
        }
        return "";
    }
    return (
        <div className="m-2 flex items-center relative justify-end rounded-2xl border border-gray-300 bg-white dark:bg-gray-900 p-4 shadow-lg transition-all">
            <motion.h2
                className="text-xl font-semibold text-gray-800 absolute left-0 m-5 dark:text-white"
                animate={{
                    x: [0, -10, 10, -10, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Xin chào, <span className="text-orange-500">{role(userData?.role_user) || '...'}</span>: <span className="text-green-500">{userData?.name || '...'}</span>!
            </motion.h2>
            <div className="flex items-center space-x-6 relative">
                <div className="card flex flex-wrap justify-content-center gap-4">
                    <div onClick={toggleThongbao} className="cursor-pointer relative">
                        <i className="pi pi-calendar p-overlay-badge" style={{ fontSize: "2rem" }}>
                            <Badge value={feedback.length}></Badge>
                        </i>
                        {showThongbao && (
                            <div className="absolute bg-white top-12 right-0 z-50">
                                <Thongbao />
                            </div>
                        )}
                    </div>

                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: "2rem" }}>
                        <Badge severity="danger"></Badge>
                    </i>
                    <div onClick={toggleContacts} className="cursor-pointer relative">
                        <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: "2rem" }}>
                            <Badge value={dataContacts.length} severity="danger">
                            </Badge>
                            {showContacs && (
                                <div className="absolute bg-white top-12 right-0 z-50">
                                    <Contacts />
                                </div>
                            )}
                        </i>
                    </div>
                </div>

                {userData ? (
                    <div className="flex items-center space-x-3">
                        <img
                            src={`http://localhost:3000${userData.image}`}
                            alt="User"
                            className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                            {userData.name}
                        </span>
                    </div>
                ) : (
                    <span className="text-gray-500 dark:text-gray-400">Loading...</span>
                )}
            </div>
        </div>
    );
}
