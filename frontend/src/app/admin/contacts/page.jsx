"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import axios from 'axios';
export default function page() {
    const [dataContacts, setDataContacts] = useState([]);
    const toast = useRef(null);
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
    const date = (value) => {
        const d = new Date(value);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const btnDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/contacts/deleteContacts`,{
                params: {
                    id: id
                }
            });
            getAllContacts();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Xóa Liên Hệ Thành Công', life: 3000 });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="">
            <Toast ref={toast} />
            <h2 className="text-[28px] font-bold text-orange-600 mx-5 mt-6 mb-4">
                Quản Lý Liên Hệ
            </h2>
            <DataTable value={dataContacts} tableStyle={{ minWidth: '50rem' }}>
                <Column body={(rowData, { rowIndex }) => rowIndex + 1} header="STT" style={{ width: '5%' }}></Column>
                <Column field="name" header="Họ Tên" style={{ width: '10%' }}></Column>
                <Column field="phone" header="SĐT" style={{ width: '10%' }}></Column>
                <Column field="email" header="Email" style={{ width: '10%' }}></Column>
                <Column field="message" header="Nội Dung" style={{ width: '25%' }}></Column>
                <Column body={(rowData) => date(rowData.created_at)} header="Ngày Gửi" style={{ width: '15%' }}></Column>
                <Column body={(rowData) => <Button icon="pi pi-times" rounded outlined severity="danger" onClick={() => btnDelete(rowData.id)} aria-label="Cancel" />} header="Xóa" style={{ width: '5%' }}></Column>
            </DataTable>
        </div>
    )
};
