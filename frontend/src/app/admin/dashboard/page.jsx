'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { BreadCrumb } from 'primereact/breadcrumb';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { MeterGroup } from 'primereact/metergroup';

export default function DashboardPage() {
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [dataLocal, setDataLocal] = useState(null);

    const fetchData = async () => {
        if (!dataLocal) return;
        try {
            const headers = { Authorization: `Bearer ${dataLocal.token}` };
            const [resContacts, resUsers, resProducts, resOrders] = await Promise.all([
                axios.get('http://localhost:3000/contacts/getAllContacts'),
                axios.get('http://localhost:3000/users/getAllUsers', { headers }),
                axios.get('http://localhost:3000/products/getAllProducts'),
                axios.get('http://localhost:3000/orders/getAllOrders', { headers })
            ]);
            setContacts(resContacts.data);
            setUsers(resUsers.data);
            setProducts(resProducts.data);
            setOrders(resOrders.data);
        } catch (err) {
            console.error('Lỗi khi lấy dữ liệu:', err);
        }
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('data'));
        setDataLocal(localData);
    }, []);

    useEffect(() => {
        if (dataLocal) fetchData();
    }, [dataLocal]);

    const values = [
        { label: 'Người dùng', color1: '#34d399', color2: '#10b981', value: users.length, icon: 'pi pi-users' },
        { label: 'Sản phẩm', color1: '#60a5fa', color2: '#3b82f6', value: products.length, icon: 'pi pi-box' },
        { label: 'Đơn hàng', color1: '#f59e0b', color2: '#d97706', value: orders.length, icon: 'pi pi-shopping-bag' },
        { label: 'Doanh thu', color1: '#c084fc', color2: '#a855f7', value: orders.reduce((sum, o) => sum + Number(o.subtotal), 0).toLocaleString() + ' đ', icon: 'pi pi-wallet' }
    ];

    const monthlyRevenue = useMemo(() => {
        const monthly = Array(12).fill(0);
        orders.forEach(order => {
            const month = new Date(order.created_at).getMonth();
            monthly[month] += Number(order.subtotal);
        });
        return monthly;
    }, [orders]);

    const barData = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
            label: 'Doanh thu (VNĐ)',
            backgroundColor: '#3b82f6',
            borderRadius: 5,
            data: monthlyRevenue
        }]
    };

    const barOptions = {
        plugins: {
            legend: { labels: { color: '#374151', font: { weight: 'bold' } } }
        },
        scales: {
            x: { ticks: { color: '#6b7280' }, grid: { color: '#f3f4f6' } },
            y: { ticks: { color: '#6b7280' }, grid: { color: '#f3f4f6' } }
        }
    };

    const items = [{ label: 'Trang chủ' }, { label: 'Dashboard' }];
    const home = { icon: 'pi pi-home', url: '/' };

    return (
        <div className="w-full p-6 bg-gray-50 min-h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-700">📊 Dashboard Quản lý cửa hàng xe đạp</h2>
                <BreadCrumb model={items} home={home} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {values.map((item, idx) => (
                    <Card key={idx} className="shadow-lg border-0 rounded-2xl bg-white">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 text-sm">{item.label}</span>
                                <div className="text-2xl font-bold text-gray-700">{item.value}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full flex justify-center items-center shadow-md" style={{ background: `linear-gradient(45deg, ${item.color1}, ${item.color2})`, color: '#fff' }}>
                                <i className={item.icon}></i>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-2xl bg-white shadow-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">📈 Doanh thu theo tháng</h3>
                    <Chart type="bar" data={barData} options={barOptions} />
                </div>

                <div className="border border-gray-200 rounded-2xl bg-white shadow-lg p-6 overflow-auto">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">📬 Liên hệ khách hàng</h3>
                    <DataTable
                        value={contacts}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        scrollable
                        className="p-datatable-sm"
                        style={{ minWidth: '100%' }}
                    >
                        <Column field="name" header="Họ tên" style={{ minWidth: '150px' }} />
                        <Column field="email" header="Email" style={{ minWidth: '200px' }} />
                        <Column field="phone" header="Số điện thoại" style={{ minWidth: '130px' }} />
                        <Column field="message" header="Tin nhắn" style={{ minWidth: '200px' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
