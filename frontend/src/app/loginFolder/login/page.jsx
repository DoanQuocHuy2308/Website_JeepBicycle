"use client";
import styleLogin from '@/styles/login.module.css';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/loading";
import React, { useEffect, useRef } from 'react';
import { useMountEffect } from 'primereact/hooks';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const msgs = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/login/login", { username, password });
            const user = res.data?.user;

            if (user) {
                if (user.ban === 1) {
                    msgs.current.show({
                        severity: 'error',
                        summary: 'Lỗi',
                        detail: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên',
                    });
                } else {
                    const role = user.role_user;
                    localStorage.setItem("data", JSON.stringify(res.data));

                    if (role === 3 || role === 2) {
                        router.push("/admin");
                    } else if (role === 1) {
                        router.push("/nguoidung");
                    } else {
                        msgs.current.show({
                            severity: 'warn',
                            summary: 'Cảnh báo',
                            detail: 'Bạn không có quyền truy cập!',
                        });
                    }
                }
            } else {
                msgs.current.show({
                    severity: 'warn',
                    summary: 'Cảnh báo',
                    detail: 'Đăng nhập không thành công, vui lòng kiểm tra lại thông tin.',
                });
            }
        } catch (err) {
            msgs.current.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Sai tài khoản hoặc mật khẩu',
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Toast ref={msgs} />
            <div className={`${styleLogin.background} w-full h-screen flex justify-center items-center`}>
                <div style={{ animation: 'slideInFromLeft 1s ease-out' }} className="max-w-4/12 w-full bg-gradient-to-r from-violet-100 to-white rounded-xl shadow-2xl overflow-hidden p-8 space-y-15">
                    <h2 style={{ animation: 'appear 2s ease-out' }} className="text-center text-5xl font-extrabold text-purple-600">
                        Welcome
                    </h2>
                    <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-purple-600">
                        Sign in to your account
                    </p>
                    <form method="POST" action="#" onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" required id="username" name="username" type="text" />
                            <label className="absolute left-0 -top-3.5 text-purple-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="username">Username</label>
                        </div>
                        <div className="relative">
                            <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" required id="password" name="password" type="password" />
                            <label className="absolute left-0 -top-3.5 text-purple-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="password">Password</label>
                        </div>
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-purple-600">
                                <input className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded" type="checkbox" />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <Link href="/loginFolder/forgotPassword" className="text-sm text-purple-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200 flex justify-center items-center"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <Loading /> : "Sign In"}
                        </button>
                    </form>
                    <div className="text-center text-gray-500">
                        Don't have an account?
                        <Link className="text-purple-600 hover:underline " href="/loginFolder/dangky">Sign up</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
