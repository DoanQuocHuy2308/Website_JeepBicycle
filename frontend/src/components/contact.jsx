"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function page() {
    const [dataContacts, setDataContacts] = useState([]);
    const router = useRouter();
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
    return (
        <div className="">
            <DataTable header="Danh Sách Liên Hệ" scrollHeight='400px' value={dataContacts} paginator rows={5} onRowClick={(e) => router.push(`/admin/contacts`)} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Họ Tên" style={{ width: '10%' }}></Column>
                <Column field="message" header="Nội Dung" style={{ width: '25%' }}></Column>
                <Column body={(rowData) => date(rowData.created_at)} header="Ngày Gửi" style={{ width: '15%' }}></Column>
            </DataTable>
        </div>
    )
};
