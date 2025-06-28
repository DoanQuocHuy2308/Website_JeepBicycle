"use client"
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { Rating } from 'primereact/rating';
import axios from 'axios';
export default function thongbao() {
    const [feedback, setFeedback] = useState([]);
    const router = useRouter();

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


    const imageBodyTemplate = (product) => {
        return <img src={`http://localhost:3000${product.image_user}`} className="w-16 h-16 border-1 border-gray-300 rounded-full" alt="logo" />;
    };
    const star = (value) =>{
        return <Rating value={value} readOnly cancel={false} />
    }
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Feedbacks</span>
            <Button icon="pi pi-refresh" rounded raised />
        </div>
    );
    return (
        <div className="shadow-lg rounded-lg overflow-hidden">
            <DataTable value={feedback} header={header} paginator rows={5} onRowClick={(e) => router.push(`/admin/feedbacks`)} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column body={imageBodyTemplate} header="Avatar" style={{ width: '5%' }}></Column>
                <Column field="user_name" header="Name" style={{ width: '15%' }}></Column>
                <Column field="product_name" header="Product" style={{ width: '25%' }}></Column>
                <Column body={(rowData) => star(rowData.star)} header="Stars" style={{ width: '5%' }}></Column>
                <Column field="content" header="Contents" style={{ width: '20%' }}></Column>
            </DataTable>
        </div>
    )
};
