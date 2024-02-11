'use client'

import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

/**
 * DOCS: 
 * https://recharts.org/en-US/api/BarChart
 * https://recharts.org/en-US/examples/CustomContentOfTooltip
 */

export type TBarCharData = {
    name: string;
    extraName: string;
    max: number;
    min: number;
}
interface Props {
    data: TBarCharData[]
}

export default function Barchars({ data }: Props) {

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data: TBarCharData = payload[0].payload;
            const { extraName } = data
            return (
                <div className='flex flex-col bg-[#fff] gap-4 p-4 '>
                    <p className='font-bold'>{data.name}</p>
                    <p className='font-light text-muted-foreground'>{extraName}</p>
                    <p className='text-[#82ca9d]'>{`Max: ${data.max}`}</p>
                    <p className='text-[#8884d8]'>{`Min: ${data.min}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip payload={data} content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="min" fill="#82ca9d" />
            <Bar dataKey="max" fill="#8884d8" />
        </BarChart>
    )
}
