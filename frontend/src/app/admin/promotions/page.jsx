"use client";
import { Toast } from 'primereact/toast';
import { useState, useEffect, useRef } from 'react';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
const infor = {
    id: "",
    title: "",
    description: "",
    discount_percentage: 0,
    start_date: "",
    end_date: "",
    quantity_promotion: 0,
    is_active: 0,
    created_at: "",
    updated_at: ""
}

export default function page() {
    const toast = useRef(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [dataPromotions, setDataPromotions] = useState([]);
    const [promotions, setPromotions] = useState({ ...infor });
    const [form, setForm] = useState(false);
    const [title, setTitle] = useState('');
    const [formEdit, setFormEdit] = useState(false);
    const [formAdd, setFormAdd] = useState(false);
    const [formDetail, setFormDetail] = useState(false);
    const [key, setKey] = useState('');
    const [active, setActive] = useState(null);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/promotions/getAllPromotions');
            setDataPromotions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const status = [
        { name: 'Đang Khuyến Mại', code: 5 },
        { name: 'Hết Hạn', code: 4 },
        { name: 'Hết Số Lượng', code: 3 },
        { name: 'Đã Kích Hoạt', code: 2 },
        { name: 'Chưa Kích Hoạt', code: 1 }
    ];

    const is_active_options = [
        { name: 'Chưa Kích Hoạt', code: 1 },
        { name: 'Đã Kích Hoạt', code: 2 },
    ];

    const date = (value) => {
        const d = new Date(value);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const trangthai = (rowData) => {
        const now = new Date();
        const endDate = new Date(rowData.end_date);
        const quantity = rowData.quantity_promotion;
        if (quantity <= 0) {
            return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">Hết Số Lượng</span>;
        } else if (endDate < now) {
            return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">Hết Hạn</span>;
        } else {
            return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Đang Khuyến Mại</span>;
        }
    };

    const kichhoat = (rowData) => {
        return rowData.is_active === 2
            ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">Đã Kích Hoạt</span>
            : <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">Chưa Kích Hoạt</span>;
    };

    const btnAdd = () => {
        setTitle("Thêm mới khuyến mại");
        setForm(true);
        setFormAdd(true);
        setFormEdit(false);
        setFormDetail(false);
        setPromotions({ ...infor });
    };
    const btUpdate = (rowData) => {
        setTitle("Cập Nhật Thông Tin Khuyến Mại");
        setForm(true);
        setFormAdd(false);
        setFormEdit(true);
        setFormDetail(false);
        setPromotions(rowData);
    };
    const handleIsActiveChange = (e) => {
        setPromotions((prev) => ({
            ...prev,
            is_active: e.value.code
        }));
    };
    const handleAdd = async () => {
        try {
            const formattedPromotions = {
                ...promotions,
                start_date: date(promotions.start_date),
                end_date: date(promotions.end_date)
            };
            const response = await axios.post('http://localhost:3000/promotions/createPromotions', formattedPromotions);

            toast.current?.show({
                severity: 'success',
                summary: 'Thông Báo',
                detail: response.data.message || 'Thêm khuyến mãi thành công!',
                life: 3000
            });

            setForm(false);
            fetchData();
            setSelectedStatus(null);
            setPromotions({ ...infor });
        } catch (error) {
            console.error(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.message || 'Thêm khuyến mãi thất bại!',
                life: 3000
            });
        }
    };
    const handleUpdate = async () => {
        try {
            const formattedPromotions = {
                ...promotions,
                start_date: date(promotions.start_date),
                end_date: date(promotions.end_date)
            };
            const response = await axios.put(`http://localhost:3000/promotions/updatePromotions`, formattedPromotions, {
                params: {
                    id: promotions.id
                }
            });

            toast.current?.show({
                severity: 'success',
                summary: 'Thông Báo',
                detail: response.data.message || 'Cập nhật khuyến mãi thành công!',
                life: 3000
            });
            setForm(false);
            fetchData();
            setSelectedStatus(null);
            setPromotions({ ...infor });
        } catch (error) {
            console.error(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Lỗi',
                detail: error?.response?.data?.message || 'Cập nhật khuyến mãi thất bại!',
                life: 3000
            });
        }
    };
    const handleDelete = async (rowData) => {
        if (!window.confirm(`Bạn có muốn xóa khuyến mại ${rowData.id}?`)) return;
        try {
            await axios.delete(`http://localhost:3000/promotions/deletePromotions`, {
                params: { id: rowData.id }
            });
            toast.current.show({ severity: "success", summary: "Thành Công", detail: "Xóa khuyến mại", life: 3000 });
            setDataPromotions(dataPromotions.filter((item) => item.id !== rowData.id));
        } catch (error) {
            console.error(error);
        }
    }
    const handleDetail = async (rowData) => {
        setForm(true);
        setTitle("Chi Tiết Khuyến Mại");
        setFormAdd(false);
        setFormEdit(false)
        setFormDetail(true);
        setPromotions(rowData);
    }
    const filterData = () => {
        let filteredData = dataPromotions;

        if (selectedStatus) {
            filteredData = filteredData.filter((item) => {
                const now = new Date();
                const endDate = new Date(item.end_date);

                if (selectedStatus.code === 5) {
                    return endDate >= now && item.quantity_promotion > 0;
                }
                if (selectedStatus.code === 4) {
                    return endDate < now;
                }
                if (selectedStatus.code === 3) {
                    return item.quantity_promotion <= 0;
                }
                if (selectedStatus.code === 2) {
                    return item.is_active === 2;
                }
                if (selectedStatus.code === 1) {
                    return item.is_active === 1;
                }
                return true;
            });
        }
        if (active) {
            filteredData = filteredData.filter((item) => item.is_active === active.code);
        }
        if (key) {
            filteredData = filteredData.filter((item) =>
                item.title.toLowerCase().includes(key.toLowerCase())
            );
        }

        return filteredData;
    };

    return (
        <>
            <Toast ref={toast} />
            <h2 className="text-3xl font-bold text-orange-600 mx-5 mt-6 mb-4">Quản Lý Khuyến Mại</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-2xl shadow-md mx-5 items-center">

                <div className="flex flex-col gap-2">
                    <IconField iconPosition="left" className="w-full">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            placeholder="Tìm kiếm..."
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full"
                        />
                    </IconField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Dropdown
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.value)}
                        options={status}
                        optionLabel="name"
                        placeholder="Chọn trạng thái khuyến mại"
                        className="w-full"
                    />
                    <Dropdown
                        value={active}
                        onChange={(e) => setActive(e.value)}
                        options={is_active_options}
                        optionLabel="name"
                        placeholder="Chọn kích hoạt"
                        className="w-full"
                    />
                </div>

                <div className="flex justify-start md:justify-end">
                    <Button
                        label="Thêm Khuyến Mại"
                        icon="pi pi-plus"
                        onClick={btnAdd}
                        className="w-full md:w-auto bg-orange-500 border-none hover:bg-orange-600 transition duration-300"
                    />
                </div>
            </div>


            <Dialog header={title} visible={form} style={{ width: '50vw' }} onHide={() => setForm(false)}>
                <div className="grid grid-cols-1 mb-5 md:grid-cols-2 space-y-3 gap-4">
                    <FloatLabel>
                        <InputText id="id" value={promotions.id} className='w-full' disabled={formDetail} onChange={(e) => setPromotions({ ...promotions, id: e.target.value })} />
                        <label htmlFor="id">Mã Khuyến Mại</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="title" value={promotions.title} disabled={formDetail} className='w-full' onChange={(e) => setPromotions({ ...promotions, title: e.target.value })} />
                        <label htmlFor="title">Tiêu Đề</label>
                    </FloatLabel>
                    <div className="col-span-2">
                        <FloatLabel>
                            <InputTextarea id="description" className='w-full' disabled={formDetail} value={promotions.description} onChange={(e) => setPromotions({ ...promotions, description: e.target.value })} rows={5} />
                            <label htmlFor="description">Mô Tả</label>
                        </FloatLabel>
                    </div>
                    <FloatLabel>
                        <InputText id="discount_percentage" type="number" disabled={formDetail} value={promotions.discount_percentage} className='w-full' onChange={(e) => setPromotions({ ...promotions, discount_percentage: parseInt(e.target.value) })} />
                        <label htmlFor="discount_percentage">Phần Trăm Giảm Giá (%)</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText id="quantity_promotion" type="number" disabled={formDetail} value={promotions.quantity_promotion} className='w-full' onChange={(e) => setPromotions({ ...promotions, quantity_promotion: parseInt(e.target.value) })} />
                        <label htmlFor="quantity_promotion">Số Lượng Khuyến Mại</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Calendar
                            inputId="start_date"
                            value={promotions.start_date ? new Date(promotions.start_date) : null}
                            className='w-full'
                            disabled={formDetail}
                            onChange={(e) => setPromotions({ ...promotions, start_date: e.value })}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                        <label htmlFor="start_date">Ngày Bắt Đầu</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Calendar
                            disabled={formDetail}
                            inputId="end_date"
                            value={promotions.end_date ? new Date(promotions.end_date) : null}
                            className='w-full'
                            onChange={(e) => setPromotions({ ...promotions, end_date: e.value })}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                        <label htmlFor="end_date">Ngày Kết Thúc</label>
                    </FloatLabel>
                    <div className="col-span-2">
                        <Dropdown
                            disabled={formDetail}
                            value={is_active_options.find(opt => opt.code === promotions.is_active)}
                            onChange={handleIsActiveChange}
                            options={is_active_options}
                            optionLabel="name"
                            placeholder="Chọn Kích Hoạt"
                            className="w-full"
                        />
                    </div>
                    <FloatLabel>
                        <Calendar
                            disabled={formDetail}
                            inputId="start_date"
                            value={promotions.created_at ? new Date(promotions.created_at) : null}
                            className='w-full'
                            onChange={(e) => setPromotions({ ...promotions, created_at: e.value })}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                        <label htmlFor="start_date">Ngày Tạo</label>
                    </FloatLabel>
                    <FloatLabel>
                        <Calendar
                            inputId="end_date"
                            value={promotions.updated_at ? new Date(promotions.updated_at) : null}
                            className='w-full'
                            disabled={formDetail}
                            onChange={(e) => setPromotions({ ...promotions, updated_at: e.value })}
                            dateFormat="dd/mm/yy"
                            showIcon
                        />
                        <label htmlFor="end_date">Ngày Cập Nhật</label>
                    </FloatLabel>
                </div>
                {formAdd && <Button label="Thêm Mới" className='w-full' onClick={handleAdd} icon="pi pi-plus" iconPos="left" />}
                {formEdit && (
                    <Button
                        label="Cập Nhật Khuyến Mại"
                        className="w-full"
                        icon="pi pi-check"
                        severity="success"
                        iconPos="right"
                        onClick={handleUpdate}
                    />
                )}

            </Dialog>

            <div className="my-6 mx-5 bg-white p-4 rounded-2xl shadow-md">
                <DataTable
                    value={filterData()}
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: '50rem' }}
                    className="text-sm"
                >
                    <Column body={(rowData, { rowIndex }) => (rowIndex + 1)} header="STT" style={{ width: '5%' }} />
                    <Column field="id" header="Mã Khuyến Mại" style={{ width: '10%' }} />
                    <Column field="title" header="Tiêu Đề" style={{ width: '15%' }} />
                    <Column body={(rowData) => (rowData.discount_percentage + "%")} header="Trị Giá" style={{ width: '5%' }} />
                    <Column body={trangthai} header="Trạng Thái KM" style={{ width: '12%' }} />
                    <Column body={kichhoat} header="Kích Hoạt" style={{ width: '10%' }} />
                    <Column
                        header="Chi Tiết"
                        style={{ width: '6%' }}
                        body={(rowData) => (
                            <div className="flex justify-center">
                                <Button
                                    icon="pi pi-info-circle"
                                    rounded
                                    severity="secondary"
                                    onClick={() => handleDetail(rowData)}
                                />
                            </div>
                        )}
                    />

                    <Column
                        body={(rowData) => (<div className="flex justify-center"><Button icon="pi pi-pencil" onClick={() => btUpdate(rowData)} rounded severity="help" /></div>)}
                        header="Cập Nhật"
                        style={{ width: '6%' }}
                    />
                    <Column
                        body={(rowData) => <div className="flex justify-center"><Button icon="pi pi-trash"
                            onClick={() => handleDelete(rowData)} rounded severity="danger" /></div>}
                        header="Xóa"
                        style={{ width: '6%' }}
                    />
                </DataTable>
            </div>
        </>
    );
}
