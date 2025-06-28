"use client";

import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import axios from "axios";
import {
    ShoppingCart,
    CheckCircle,
    Clock,
    XCircle,
    MessageCircle,
    Box,
    Users,
    Star,
    User,
    DollarSign,
    Hash
} from "lucide-react";
import { FaBicycle } from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
export default function JeepDashboard() {
    const [orders, setOrders] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [sortProducts, setSortProducts] = useState([]);
    const [dataLocal, setDataLocal] = useState(null);
    const [selected, setSelected] = useState(null);
    const [tkUserByOrder, setTkUserByOrder] = useState([]);
    const options = [
        { name: "Tất cả", value: "all" },
        { name: "Tồn Kho", value: "stock" },
        { name: "Bán Chạy Nhất", value: "sell" },
    ]
    const [statData, setStatData] = useState({
        processingOrders: 0,
        successOrders: 0,
        deliveringOrders: 0,
        deliveredOrders: 0,
        cancelRequestOrders: 0,
        cancelledOrders: 0,
        completedOrders: 0,
        totalRevenue: 0,
        monthlyRevenue: Array(12).fill(0)
    });
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("data"));
        setDataLocal(localData);
    }, []);

    useEffect(() => {
        if (dataLocal) {
            fetchData();
        }
    }, [dataLocal]);

    const fetchData = async () => {
        try {
            const headers = { Authorization: `Bearer ${dataLocal.token}` };
            const [resFeedbacks, resUsers, resProducts, resOrders, resUserByOrder] = await Promise.all([
                axios.get("http://localhost:3000/feedbacks/getAllFeedbacks"),
                axios.get("http://localhost:3000/users/getAllUsers", { headers }),
                axios.get("http://localhost:3000/products/getAllProducts"),
                axios.get("http://localhost:3000/orders/getAllOrders", { headers }),
                axios.get("http://localhost:3000/thongke/thongkeKhachHangMuaNhieu"),
            ]);
            setFeedbacks(resFeedbacks.data);
            setUsers(resUsers.data);
            setProducts(resProducts.data);
            setOrders(resOrders.data);
            setSortProducts(resProducts.data);
            setTkUserByOrder(resUserByOrder.data);
            const processing = resOrders.data.filter(o => o.status === "Đang Xử Lý").length;
            const success = resOrders.data.filter(o => o.status === "Đặt Hàng Thành Công").length;
            const delivering = resOrders.data.filter(o => o.status === "Đang Giao Hàng").length;
            const delivered = resOrders.data.filter(o => o.status === "Giao Hàng Thành Công").length;
            const cancelRequest = resOrders.data.filter(o => o.status === "Yêu Cầu Hủy").length;
            const cancelled = resOrders.data.filter(o => o.status === "Đã Hủy").length;
            const completed = resOrders.data.filter(o => o.status === "Đã Nhận Được Hàng").length;
            const revenue = resOrders.data.filter(o => ["Đã Nhận Được Hàng"].includes(o.status)).reduce((total, o) => total + o.subtotal, 0);

            const monthly = Array(12).fill(0);
            resOrders.data.forEach(o => {
                const month = new Date(o.created_at).getMonth();
                monthly[month] += Number(o.subtotal);
            });

            setStatData({
                processingOrders: processing,
                successOrders: success,
                deliveringOrders: delivering,
                deliveredOrders: delivered,
                cancelRequestOrders: cancelRequest,
                cancelledOrders: cancelled,
                completedOrders: completed,
                totalRevenue: revenue,
                monthlyRevenue: monthly
            });
        } catch (err) {
            console.error("Lỗi khi lấy dữ liệu:", err);
        }
    };
    const colors = [
        "#22c55e",
        "#facc15",
        "#ef4444",
        "#3498db",
        "#9b59b6",
        "#1abc9c",
        "#95a5a6"
    ];
    const statusLabels = [
        "Đang Xử Lý",
        "Đặt Hàng Thành Công",
        "Đang Giao Hàng",
        "Giao Hàng Thành Công",
        "Yêu Cầu Hủy",
        "Đã Hủy",
        "Đã Nhận Được Hàng"
    ];

    const statusCounts = statusLabels.map(status =>
        orders.filter(order => order.status === status).length
    );
    const doughnutData = {
        labels: statusLabels,
        datasets: [
            {
                data: statusCounts,
                backgroundColor: [
                    "#60a5fa",
                    "#4ade80",
                    "#facc15",
                    "#22c55e",
                    "#f97316",
                    "#ef4444",
                    "#a78bfa"
                ],
                hoverBackgroundColor: [
                    "#3b82f6",
                    "#22c55e",
                    "#eab308",
                    "#16a34a",
                    "#fb923c",
                    "#dc2626",
                    "#8b5cf6"
                ]
            }
        ]
    };

    const lineData = {
        labels: ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"],
        datasets: [{
            label: "Doanh thu (VNĐ)",
            data: statData.monthlyRevenue,
            borderColor: colors[0],
            backgroundColor: "rgba(34,197,94,0.2)",
            tension: 0.4,
            fill: true
        }]
    };

    const imageBody = (value) => (
        <Image src={`http://localhost:3000${value}`} alt="Image" width="60" height="60" preview />
    );
    const imageBodyTemplate = (rowData) => (
        <Image src={`http://localhost:3000${rowData.image[0]}`} alt="Image" width="80" height="80" preview />
    );
    const starBody = (value) => (
        <Rating value={value} readOnly cancel={false} />
    );

    const dateBody = (value) => {
        const d = new Date(value);
        return d.toLocaleString("vi-VN");
    };

    const productBody = (row) => (
        <div>
            <p className="font-medium text-gray-800">{row.product_name}</p>
            <span className="text-sm text-gray-500 italic">Màu: {row.color}</span>
        </div>
    );

    const filterProducts = (value) => {
        if (value === "all") {
            setSortProducts(products);
        } else if (value === "sell") {
            const filtered = products.sort((a, b) => a.quantity - b.quantity);
            setSortProducts(filtered);
        } else if (value === "stock") {
            const sorted = [...products].sort((a, b) => b.quantity - a.quantity);
            setSortProducts(sorted);
        }
    };
    const cardStyle = "flex justify-between items-center p-4 bg-white shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300";
    const iconStyle = "w-8 h-8"
    return (
        <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Tổng đơn</p>
                                <p className="text-xl font-bold">{orders.length}</p>
                            </div>
                            <ShoppingCart className={`${iconStyle} text-blue-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Tổng doanh thu</p>
                                <p className="text-xl font-bold text-indigo-500">
                                    {statData.totalRevenue.toLocaleString('vi-VN')} đ
                                </p>
                            </div>
                            <DollarSign className={`${iconStyle} text-indigo-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đang xử lý</p>
                                <p className="text-xl font-bold text-yellow-500">{statData.processingOrders}</p>
                            </div>
                            <Clock className={`${iconStyle} text-yellow-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đặt thành công</p>
                                <p className="text-xl font-bold text-green-500">{statData.successOrders}</p>
                            </div>
                            <CheckCircle className={`${iconStyle} text-green-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đang giao hàng</p>
                                <p className="text-xl font-bold text-blue-500">{statData.deliveringOrders}</p>
                            </div>
                            <Clock className={`${iconStyle} text-blue-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đã giao thành công</p>
                                <p className="text-xl font-bold text-green-600">{statData.deliveredOrders}</p>
                            </div>
                            <CheckCircle className={`${iconStyle} text-green-600`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Yêu cầu hủy</p>
                                <p className="text-xl font-bold text-orange-500">{statData.cancelRequestOrders}</p>
                            </div>
                            <XCircle className={`${iconStyle} text-orange-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đã hủy</p>
                                <p className="text-xl font-bold text-red-500">{statData.cancelledOrders}</p>
                            </div>
                            <XCircle className={`${iconStyle} text-red-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Đã nhận được hàng</p>
                                <p className="text-xl font-bold text-orange-500">{statData.completedOrders}</p>
                            </div>
                            <CheckCircle className={`${iconStyle} text-orange-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Sản phẩm</p>
                                <p className="text-xl font-bold">{products.length}</p>
                            </div>
                            <Box className={`${iconStyle} text-purple-500`} />
                        </Card>
                        <Card className={cardStyle}>
                            <div>
                                <p className="text-sm text-gray-500">Người dùng</p>
                                <p className="text-xl font-bold">{users.length}</p>
                            </div>
                            <Users className={`${iconStyle} text-green-500`} />
                        </Card>
                    </div>
                </div>
                <div className="col-span-1">
                    <h2 className="text-black text-[20px] my-2 hover:text-orange-600 font-bold mb-2 flex items-center gap-2">
                        <Users className="w-10 h-10 text-blue-600 text-[20px] my-2 hover:text-blue-500" /> Danh sách khách hàng mua nhiều nhất
                    </h2>
                    <DataTable
                        value={tkUserByOrder}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        tableStyle={{ minWidth: '100%', borderCollapse: 'collapse' }}
                        className="shadow-lg rounded-2xl"
                    >
                        <Column
                            body={(rowData, { rowIndex }) => (
                                <span className="font-semibold">{rowIndex + 1}</span>
                            )}
                            header={<div className="flex items-center gap-1"><Hash className="w-4 h-4 text-gray-600" /> STT</div>}
                            style={{ width: '5%', textAlign: 'center' }}
                            headerStyle={{ textAlign: 'center', backgroundColor: '#f9fafb' }}
                        ></Column>

                        <Column
                            body={(rowData) => imageBody(rowData.image)}
                            header={<div className="flex items-center gap-1"><User className="w-4 h-4 text-gray-600" /> Avatar</div>}
                            style={{ width: '15%', textAlign: 'center' }}
                            headerStyle={{ textAlign: 'center', backgroundColor: '#f9fafb' }}
                        ></Column>

                        <Column
                            field="user_name"
                            header={<div className="flex items-center gap-1"><User className="w-4 h-4 text-gray-600" /> Họ tên</div>}
                            style={{ width: '40%', textAlign: 'left', paddingLeft: '10px' }}
                            headerStyle={{ textAlign: 'left', backgroundColor: '#f9fafb' }}
                        ></Column>

                        <Column
                            field="total_quantity"
                            body={(rowData) => (
                                <div className="flex items-center gap-1 justify-center">
                                    <ShoppingCart className="w-4 h-4 text-green-500" />
                                    {rowData.total_quantity}
                                </div>
                            )}
                            header={<div className="flex items-center gap-1"><ShoppingCart className="w-4 h-4 text-gray-600" /> Số Lượng Mua</div>}
                            style={{ width: '20%', textAlign: 'center' }}
                            headerStyle={{ textAlign: 'center', backgroundColor: '#f9fafb' }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Tỷ lệ đơn hàng" className="text-center">
                    <div className="flex justify-center">
                        <Chart
                            type="doughnut"
                            data={doughnutData}
                            options={{ cutout: "70%" }}
                            className="w-full max-w-xs"
                        />
                    </div>
                </Card>
                <Card title="Doanh thu theo tháng">
                    <Chart type="line" data={lineData} className="w-full" style={{ maxHeight: "300px" }} />
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title={
                    <div className="flex items-center gap-2">
                        <MessageCircle className="text-blue-500" />
                        <span>Feedbacks</span>
                    </div>}>
                    <DataTable value={feedbacks}
                        paginator
                        rows={3}
                        rowsPerPageOptions={[3, 20, 100]}
                        tableStyle={{ minWidth: "100%" }}>
                        <Column
                            field="user_name"
                            header={
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4 text-green-500" />
                                    <span>Tên</span>
                                </div>
                            }
                            style={{ width: "15%" }}
                        />
                        <Column
                            body={productBody}
                            header={
                                <div className="flex items-center gap-1">
                                    <Box className="w-4 h-4 text-purple-500" />
                                    <span>Sản phẩm</span>
                                </div>
                            }
                            style={{ width: "20%" }}
                        />
                        <Column
                            body={(row) => imageBody(row.image_path)}
                            header={
                                <div className="flex items-center gap-1">
                                    <Image className="w-4 h-4" />
                                    <span>Ảnh</span>
                                </div>
                            }
                            style={{ width: "10%" }}
                        />
                        <Column
                            body={(row) => starBody(row.star)}
                            header={
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span>Sao</span>
                                </div>
                            }
                            style={{ width: "10%" }}
                        />

                        <Column field="content" header="Nội dung" style={{ width: "30%" }} />
                        <Column body={(row) => dateBody(row.updated_at)} header="Ngày" style={{ width: "15%" }} />
                    </DataTable>
                </Card>
                <div className="">
                    <Dropdown
                        value={selected}
                        onChange={(e) => {
                            setSelected(e.value);
                            filterProducts(e.value);
                        }}
                        options={options}
                        optionLabel="name"
                        optionValue="value"
                        placeholder="Lọc sản phẩm"
                        className="w-full md:w-14rem"
                    />
                    <Card title={
                        <div className="flex items-center gap-2">
                            <FaBicycle className="text-green-500 size-9" />
                            <span>Sản Phẩm Tồn Kho</span>
                        </div>}>
                        <DataTable
                            value={sortProducts}
                            paginator
                            rows={3}
                            rowsPerPageOptions={[3, 20, 100]}
                            tableStyle={{ minWidth: "100%" }}
                            className=""
                        >
                            <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "1%" }} />
                            <Column field="name" header="Tên Sản Phẩm" style={{ width: "5%" }} />
                            <Column header="Hình ảnh" body={(rowData) => imageBodyTemplate(rowData)} style={{ width: "15%" }} />
                            <Column field="color" header="Màu Sắc" style={{ width: "2%" }} />
                            <Column field="quantity" header="Số Lượng" style={{ width: "2%" }} />
                        </DataTable>
                    </Card>
                </div>
            </div>
        </div>
    );
}
