'use client';
import Link from "next/link";
import styleGioiThieu from "@/styles/gioithieu.module.css";
import { Helmet } from "react-helmet";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { Dialog } from "primereact/dialog";
export default function GioiThieu() {
    const [dataDiscounts, setDataDiscounts] = useState([]);
    const msgs = useRef(null);
    const [form, setForm] = useState(false);
    const [voucher, setVoucher] = useState(null)
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await axios.get("http://localhost:3000/promotions/getAllPromotions");
                setDataDiscounts(response.data);
            };
            fetchData();
        }
        catch (err) {
            msgs.current?.show([
                {
                    severity: 'error',
                    summary: 'Thông báo',
                    detail: "Có lỗi xảy ra khi tải sản phẩm",
                    life: 3000
                }
            ]);
        }
    }, [])
    return (
        <div>
            <Toast ref={msgs} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>Trang voucher Jeep Bicycle</title>
            </Helmet>
            <div className={`${styleGioiThieu.backgroudVoucher} w-full h-55 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleGioiThieu.title}>Voucher</h2>
                    <p className={styleGioiThieu.content}><Link href="/nguoidung/trangchu">Trang Chủ</Link> » Các mã giảm giá về JeepBicycle Việt Nam</p>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataDiscounts
                    .filter((item) => item.is_active === 2)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="relative bg-white border-2 border-red-500 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-in-out overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 z-1">
                                <img
                                    src="https://static.vecteezy.com/system/resources/thumbnails/024/039/409/small_2x/red-label-tag-sale-discount-with-transparent-background-png.png"
                                    alt="Ribbon"
                                    className="w-20 h-20 rotate-[-20deg]"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-center text-red-700 text-xl font-bold uppercase mb-5 tracking-wide">
                                    Tặng ngay<br />Phiếu giảm giá {item.discount_percentage}%
                                </h2>
                                <div className="flex justify-center">
                                    <div className="relative bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl px-6 py-4 flex items-center shadow-md">
                                        <div className="pr-6 border-r border-white font-bold text-sm text-center">
                                            Tặng<br />ngay
                                        </div>
                                        <div className="pl-6 text-center">
                                            <div className="text-xs uppercase">Mã phiếu</div>
                                            <div className="text-3xl font-extrabold text-yellow-300 drop-shadow-sm">
                                                {item.id}
                                            </div>
                                        </div>
                                        <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-inner"></div>
                                        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-inner"></div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <Button
                                        icon="pi pi-info-circle"
                                        label="Chi tiết"
                                        className="p-button-rounded p-button-warning font-bold"
                                        onClick={() => {
                                            setForm(true);
                                            setVoucher(item);
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <Dialog
                header="Chi Tiết Phiếu Giảm Giá"
                visible={form}
                style={{ width: '90%', maxWidth: '600px' }}
                className="rounded-xl shadow-lg"
                onHide={() => setForm(!form)}
                modal
            >
                <div className="relative bg-gradient-to-br m-15 from-orange-400 to-orange-600 border-l-8 border-yellow-400 text-white rounded-2xl shadow-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 w-full max-w-sm mx-auto">
                    <div className="absolute top-0 left-0 z-10">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/024/039/409/small_2x/red-label-tag-sale-discount-with-transparent-background-png.png"
                            alt="Ribbon"
                            className="w-20 h-20 rotate-[-15deg]"
                        />
                    </div>
                    {voucher && (
                        <div className="px-6 py-8">
                            <p className="text-center text-2xl font-extrabold text-white drop-shadow-lg mt-10 mb-2">{voucher.title}</p>
                            <h3 className="text-white text-xl font-bold uppercase tracking-wide text-center mb-2">
                                Tặng ngay
                            </h3>
                            <p className="text-center text-3xl font-extrabold text-yellow-300 drop-shadow-lg mb-4">
                                Phiếu giảm giá {voucher.discount_percentage}%
                            </p>
                            <div className="relative bg-white text-orange-600 rounded-xl py-4 px-6 font-bold text-lg text-center tracking-widest shadow-md mb-6">
                                MÃ: {voucher.id}
                                <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full shadow-inner border-4 border-white"></div>
                                <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-orange-500 rounded-full shadow-inner border-4 border-white"></div>
                            </div>
                            <div className="text-sm text-white text-center">
                                {voucher.description}<br />
                                <span className="font-semibold">
                                    HSD: {new Date(voucher.start_date).toLocaleDateString('vi-VN')} - {new Date(voucher.end_date).toLocaleDateString('vi-VN')}
                                </span>
                            </div>

                            <div className="flex justify-center mt-6">
                                {voucher.quantity_promotion > 0 ? (
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(voucher.id);
                                            msgs.current?.show([
                                                {
                                                    severity: 'success',
                                                    summary: 'Thông báo',
                                                    detail: "Đã sao chép mã",
                                                    life: 3000
                                                }
                                            ]);
                                        }}
                                        className="bg-yellow-400 hover:bg-yellow-300 cursor-pointer text-orange-800 font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200"
                                    >
                                        Sao chép mã
                                    </button>
                                ) :
                                    (
                                        <button
                                            className="bg-gray-400 cursor-not-allowed text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-200"
                                        >
                                            Hết sử dụng
                                        </button>
                                    )}
                            </div>
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
}
