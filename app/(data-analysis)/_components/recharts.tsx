'use client'

import React from 'react'
import { RadarChart, PolarGrid, Radar, Legend, PolarRadiusAxis, PolarAngleAxis, Tooltip } from 'recharts'

type Data = {
    subject: TYPE_RADAR;
    [x: string]: number | TYPE_RADAR;
    fullMark: number;
}

type Props = {
    users: {
        username: string;
    }[]
    data: Data[];
    max: number
}

enum TYPE_RADAR {
    INSTAGRAM = 'Instagram',
    MERCADO_LIBRE = 'Mercado Libre',
    AMAZON = 'Amazon',
    BOOK_STORE = 'Tienda de Libros',
}

export default function Recharts({ users, data, max }: Props) {
    return (
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, max]} />
            {users.map(user =>
                <Radar name={user.username ?? 'Mi cuenta'} dataKey={user.username} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6}
                    key={user.username}
                />
            )}
            <Tooltip />
            <Legend />
        </RadarChart>
    )
}

const data = [
    {
        "subject": "Math",
        "A": 120,
        "B": 110,
        "fullMark": 150
    },
    {
        "subject": "Chinese",
        "A": 98,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "English",
        "A": 86,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "Geography",
        "A": 99,
        "B": 100,
        "fullMark": 150
    },
    {
        "subject": "Physics",
        "A": 85,
        "B": 90,
        "fullMark": 150
    },
    {
        "subject": "History",
        "A": 65,
        "B": 85,
        "fullMark": 150
    }
]
