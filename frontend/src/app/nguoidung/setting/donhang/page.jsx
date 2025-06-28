"use client";
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import axios from "axios";
import { Image } from 'primereact/image';
import { useRouter } from "next/navigation";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { TabView, TabPanel } from 'primereact/tabview';
const inforOrder = {
    id: 0,
    user_id: 0,
    name: "",
    nameProduct: "",
    address: "",
    status: "",
    note: "",
    total: 0,
    payment_method_id: null,
    image: [],
};

export default function OrderPage() {
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState(inforOrder);
    const [user, setUser] = useState({});
    const [formVisible, setFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState("");
    const [editOrder, setEditOrder] = useState(false);
    const [selectedPay, setSelectedPay] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const toast = useRef(null);
    const router = useRouter();

    const statusOptions = [
        { label: "Đang Xử Lý", value: "Đang Xử Lý" },
        { label: "Đặt Hàng Thành Công", value: "Đặt Hàng Thành Công" },
        { label: "Đang Giao Hàng", value: "Đang Giao Hàng" },
        { label: "Giao Hàng Thành Công", value: "Giao Hàng Thành Công" },
        { label: "Yêu Cầu Hủy", value: "Yêu Cầu Hủy" },
        { label: "Đã Nhận Được Hàng", value: "Đã Nhận Được Hàng" },
        { label: "Đã Hủy", value: "Đã Hủy" },
    ];

    const fetchOrders = async () => {
        if (id?.user) {
            try {
                const response = await axios.get("http://localhost:3000/orders/getOrdersByIdUser", {
                    params: {
                        id: id?.user.id,
                    }
                });
                if (response.data) {
                    setOrders(response.data);
                } else {
                    console.error("API trả về dữ liệu không hợp lệ");
                }
            } catch (err) {
                setError("Lỗi khi tải danh sách đơn hàng.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get("http://localhost:3000/paymentmethods/getAllPaymentmethods");
            setPaymentMethods(response.data);
        } catch (err) {
            console.error("Lỗi khi tải danh sách phương thức thanh toán:", err);
        }
    };
    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                if (parsedData && parsedData.user && parsedData.user.id) {
                    setId(parsedData);
                }
            } catch (err) {
                console.error("Lỗi khi parse dữ liệu từ localStorage:", err);
            }
        }
    }, []);

    useEffect(() => {
        if (id?.user?.id) {
            fetchOrders();
        }
    }, [id]);

    useEffect(() => {
        fetchPaymentMethods();
    }, []);

    // Reset form
    const resetForm = () => {
        setOrder(inforOrder);
        setFormVisible(false);
        setEditOrder(false);
        setSelectedPay(null);
        setUser({});
    };

    const handleViewDetails = (rowData) => {
        const data = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/getUsersById`, {
                    params: {
                        id: rowData.user_id,
                    },
                    headers: {
                        Authorization: `Bearer ${id?.token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        data();
        setOrder(rowData);
        setFormVisible(true);
        const payMethod = paymentMethods.find((method) => method.id === rowData.payment_method_id);
        setSelectedPay(payMethod);
        setEditOrder(true);
        if (rowData.status === "Giao Hàng Thành Công" || rowData.status === "Đã Hủy" || rowData.status === "Yêu Cầu Hủy" || rowData.status === "Đã Nhận Được Hàng") {
            setEditOrder(false);
        }
    };

    const btnUpdateOrder = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/orders/updateOrders`, {
                ...order,
                user_id: order.user_id,
                status: order.status,
                address: `${order.address}`,
                note: order.note
            }, {
                params: {
                    id: order.id
                }
            });
            if (response.status === 200) {
                toast.current.show({ severity: "success", summary: "Cập nhật đơn hàng", detail: "Đơn hàng đã cập nhật", life: 3000 });
                resetForm();
                fetchOrders();
            } else {
                toast.current.show({ severity: "error", summary: "Lỗi cập nhật đơn hàng", detail: "Có lỗi xảy ra", life: 3000 });
            }
        } catch (error) {
            console.error(error);
        }
    };
    const btnDelete = async (rowData) => {
        if (!window.confirm(`Bạn có muốn yêu cầu hủy đơn hàng ${rowData.nameProduct}?`)) return;
        try {
            const response = await axios.put(`http://localhost:3000/orders/updateOrders`,
                {
                    ...rowData,
                    status: "Yêu Cầu Hủy"
                },
                {
                    params: {
                        id: rowData.id
                    }
                }
            );
            if (response.status === 200) {
                toast.current.show({
                    severity: "success",
                    summary: "Hủy đơn hàng",
                    detail: "Đơn hàng đã yêu cầu hủy",
                    life: 3000
                });
                fetchOrders();
            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Lỗi",
                    detail: "Hủy đơn không thành công",
                    life: 3000
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const doitien = (value) => {
        const number = Number(value);
        if (isNaN(number)) return "";
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    const handleComplete = async (rowData) => {
        try {
            const response = await axios.put(`http://localhost:3000/orders/updateOrders`, {
                ...rowData,
                status: "Đã Nhận Được Hàng",
            }, {
                params: {
                    id: rowData.id
                }
            });
            fetchOrders();
            setFormVisible(false);

            toast.current.show({
                severity: 'success',
                summary: 'Thành công',
                detail: 'Đã nhận được hàng',
            });
        } catch (error) {
            console.error(error);
        }
    };
    const handleFeedback = async (rowData) => {
        router.push("/nguoidung/sanpham/" + rowData.id_product);
    }
    const dataOrder = orders.filter(item => item.status == "Đang Xử Lý" || item.status == "Đặt Hàng Thành Công" || item.status == "Đang Giao Hàng" || item.status == "Giao Hàng Thành Công");
    const dataOrderComplete = orders.filter(item => item.status == "Đã Nhận Được Hàng");
    const dataOrderCancel = orders.filter(item => item.status == "Yêu Cầu Hủy" || item.status == "Đã Hủy");
    return (
        <div className="p-4 w-full h-full relative">
            <Toast ref={toast} />
            <h2 className="text-3xl text-orange-600 text-center w-full font-bold mb-6">Danh Sách Đơn Hàng</h2>
            <Dialog
                visible={formVisible}
                style={{ width: "60vw", maxHeight: "90vh" }}
                modal
                draggable
                onHide={() => setFormVisible(false)}
            >
                <div className="relative p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    <h2 className="text-2xl font-bold text-center text-orange-600">Chi Tiết Đơn Hàng</h2>
                    <div className="grid grid-cols-1 space-y-4 md:grid-cols-2 gap-4">
                        <FloatLabel>
                            <InputText id="name" value={order.id || ""} disabled className="w-full" />
                            <label htmlFor="name">Mã Đơn Hàng</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="name" value={order.name || ""} disabled className="w-full" />
                            <label htmlFor="name">Họ Và Tên</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="nameProduct" value={order.nameProduct || ""} disabled className="w-full" />
                            <label htmlFor="nameProduct">Sản Phẩm</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="phone" value={user.phone || ""} disabled className="w-full" />
                            <label htmlFor="phone">Số Điện Thoại</label>
                        </FloatLabel>
                        <FloatLabel>
                            <InputText id="email" value={user.email || ""} disabled className="w-full" />
                            <label htmlFor="email">Email</label>
                        </FloatLabel>
                        <Dropdown
                            value={selectedPay}
                            options={paymentMethods}
                            onChange={(e) => setSelectedPay(e.value)}
                            optionLabel="name"
                            disabled
                            placeholder="Chọn Phương Thức Thanh Toán"
                            className="w-full"
                        />
                        <Dropdown
                            value={order.status}
                            options={statusOptions}
                            disabled
                            onChange={(e) => setOrder({ ...order, status: e.value })}
                            placeholder="Chọn Trạng Thái"
                            className="w-full"
                        />
                        <FloatLabel>
                            <InputText
                                value={order?.quantity}
                                disabled
                                className="w-full text-end text-red-600 font-bold"
                                id="total"
                            />
                            <label htmlFor="total">Số lượng sản phẩm: </label>
                        </FloatLabel>
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputText
                                    value={doitien(order?.newprice)}
                                    disabled
                                    className="w-full text-end text-red-600 font-bold"
                                    id="total"
                                />
                                <label htmlFor="total">Giá sản phẩm: </label>
                            </FloatLabel>
                        </div>
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputText
                                    value={doitien(order?.subtotal)}
                                    disabled
                                    className="w-full text-end text-red-600 font-bold"
                                />
                                <label htmlFor="total">Tổng phải trả: </label>
                            </FloatLabel>
                        </div>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-4 col-span-2">
                            <Image id="IMG" src={`http://localhost:3000${order.image[0]}`} alt="Image" width="full" preview />
                            <FloatLabel>
                                <InputTextarea
                                    id="address"
                                    value={order.address || ""}
                                    className="w-full h-full"
                                    onChange={(e) => setOrder({ ...order, address: e.target.value })}
                                    rows={3}
                                />
                                <label htmlFor="address">Địa Chỉ</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold">Ghi Chú</h3>
                        <InputTextarea
                            value={order.note || ""}
                            className="w-full"
                            onChange={(e) => setOrder({ ...order, note: e.target.value })}
                            rows={5}
                        />
                    </div>
                    <div className="mt-4">
                        {editOrder && (
                            <Button
                                type="button"
                                label="Cập nhật"
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                onClick={btnUpdateOrder}
                            />
                        )}
                    </div>
                </div>
            </Dialog>
            <div className="card">
                {error && <p className="text-red-500">Lỗi: {error}</p>}
                <TabView>
                    <TabPanel header="Đơn Hàng">
                        <DataTable
                            value={dataOrder}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 50]}
                            tableStyle={{ minWidth: "85rem" }}
                            loading={loading}
                            emptyMessage={
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <i className="pi pi-inbox" style={{ fontSize: '2rem', color: '#999' }}></i>
                                    <div style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#666' }}>
                                        Không có dữ liệu đơn hàng để hiển thị
                                    </div>
                                </div>
                            }
                        >
                            <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "2%" }} />
                            <Column field="nameProduct" header="Sản Phẩm" style={{ width: "15%" }} />
                            <Column field="id" header="Mã Đơn Hàng" style={{ width: "10%" }} />
                            <Column field="status" header="Trạng Thái" style={{ width: "10%" }} />
                            <Column field="quantity" header="Số Lượng" style={{ width: "7%" }} />
                            <Column body={(rowData) => doitien(rowData.subtotal)} header="Tổng Tiền" style={{ width: "10%" }} />
                            <Column
                                header="Chi Tiết"
                                body={(rowData) => (
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-secondary"
                                        onClick={() => handleViewDetails(rowData)}
                                    />
                                )}
                                style={{ width: "6%" }}
                            />
                            <Column header="Xóa" body={(rowData) => (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-rounded p-button-danger"
                                    onClick={() => btnDelete(rowData)}
                                />
                            )} style={{ width: "5%" }} />
                            <Column
                                body={(rowData) => {
                                    if (rowData.status === "Giao Hàng Thành Công") {
                                        return (
                                            <Button
                                                label="Đã Nhận Thành Công"
                                                icon="pi pi-check"
                                                onClick={() => handleComplete(rowData)}
                                                severity="success"
                                            />
                                        );
                                    } else if (rowData.status === "Đã Nhận Được Hàng") {
                                        return (
                                            <Button
                                                label="Đánh Giá"
                                                icon="pi pi-star"
                                                onClick={() => handleFeedback(rowData)}
                                                severity="warning"
                                            />
                                        );
                                    } else {
                                        return null;
                                    }
                                }}
                                style={{ width: "15%" }}
                            />
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Thành Công">
                        <DataTable
                            value={dataOrderComplete}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 50]}
                            tableStyle={{ minWidth: "85rem" }}
                            loading={loading}
                            emptyMessage={
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <i className="pi pi-inbox" style={{ fontSize: '2rem', color: '#999' }}></i>
                                    <div style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#666' }}>
                                        Không có dữ liệu đơn hàng để hiển thị
                                    </div>
                                </div>
                            }
                        >
                            <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "2%" }} />
                            <Column field="nameProduct" header="Sản Phẩm" style={{ width: "15%" }} />
                            <Column field="id" header="Mã Đơn Hàng" style={{ width: "10%" }} />
                            <Column field="status" header="Trạng Thái" style={{ width: "10%" }} />
                            <Column field="quantity" header="Số Lượng" style={{ width: "7%" }} />
                            <Column body={(rowData) => doitien(rowData.subtotal)} header="Tổng Tiền" style={{ width: "10%" }} />
                            <Column
                                header="Chi Tiết"
                                body={(rowData) => (
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-secondary"
                                        onClick={() => handleViewDetails(rowData)}
                                    />
                                )}
                                style={{ width: "6%" }}
                            />
                            <Column
                                body={(rowData) => (
                                    <Button
                                        label="Đánh Giá"
                                        icon="pi pi-star"
                                        onClick={() => handleFeedback(rowData)}
                                        severity="warning"
                                    />
                                )}
                                style={{ width: "15%" }}
                            />

                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Đã Hủy">
                        <DataTable
                            value={dataOrderCancel}
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 50]}
                            tableStyle={{ minWidth: "85rem" }}
                            loading={loading}
                            emptyMessage={
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <i className="pi pi-inbox" style={{ fontSize: '2rem', color: '#999' }}></i>
                                    <div style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#666' }}>
                                        Không có dữ liệu đơn hàng để hiển thị
                                    </div>
                                </div>
                            }
                        >
                            <Column header="STT" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: "2%" }} />
                            <Column field="nameProduct" header="Sản Phẩm" style={{ width: "15%" }} />
                            <Column field="id" header="Mã Đơn Hàng" style={{ width: "10%" }} />
                            <Column field="status" header="Trạng Thái" style={{ width: "10%" }} />
                            <Column field="quantity" header="Số Lượng" style={{ width: "7%" }} />
                            <Column body={(rowData) => doitien(rowData.subtotal)} header="Tổng Tiền" style={{ width: "10%" }} />
                            <Column
                                header="Chi Tiết"
                                body={(rowData) => (
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-secondary"
                                        onClick={() => handleViewDetails(rowData)}
                                    />
                                )}
                                style={{ width: "6%" }}
                            />
                        </DataTable>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}