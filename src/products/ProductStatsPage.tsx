import React, { useState } from 'react';
import { Loading, useGetList } from 'react-admin';
import { 
    ScatterChart, 
    Scatter, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts';
import { Product } from '../types';


export const ProductStatsPage = () => {
    const { data, ids, loading } = useGetList<Product>(
        'products',
        { perPage: 1000, page: 1 }
    );

    if (loading) { return <Loading />; }
    return (
        <>
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
            width={400}
            height={400}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="stature" unit="cm" />
                <YAxis type="number" dataKey="y" name="weight" unit="kg" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                {/* <Scatter name="A school" data={data} fill="#8884d8" /> */}
            </ScatterChart>
        </ResponsiveContainer>
        </>
    );
};