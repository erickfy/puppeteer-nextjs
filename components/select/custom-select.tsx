import React from 'react'
import './styles.css'
import { Menu } from 'lucide-react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type Props = {}

export default function CustomSelect({ }: Props) {
    return (
        <>
            <select>
                <option selected value="0">Pure CSS Select</option>
                <option value="1">No Wrapper</option>
                <option value="2">No JS</option>
                <option value="3">Nice!</option>
            </select>
        </>
    )
}