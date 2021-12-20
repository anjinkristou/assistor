import React from 'react';
import { Loading, useGetList } from 'react-admin';
import { 
    PieChart, 
    Pie, 
    Sector, 
    Cell, 
    ResponsiveContainer, 
    Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ProductCategoryPie = ({ ...props}: any) => {
    const { data, ids, loading, error } = useGetList(
        'productCategories',
        { page: 1, perPage: 50 },
        { field: 'name', order: 'DESC' }
    );
    if (loading) { return <Loading />; }
    if (error) { return <p>ERROR</p>; }

    const theData = ids.map(id => ({
        name: data[id].name,
        value: data[id].nb_products
    }))
    return (
        <ResponsiveContainer {...props}>
            <PieChart width={200} height={200}>
                <Pie 
                    data={theData} 
                    nameKey="name"
                    dataKey="value" 
                    cx="50%" 
                    cy="50%" 
                    // innerRadius={70}
                    outerRadius={60}
                    fill="#8884d8" 
                    label 
                >
                    {theData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default ProductCategoryPie;