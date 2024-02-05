import React from 'react'
import './styles.css'
import Link from 'next/link'
type Props = {
    status: string;
    descriptionOne: string;
    descriptionTwo: string;
    href: string;
    hrefTitle: string
}

export default function ErrorPage({ status, descriptionOne, descriptionTwo, href, hrefTitle }: Props) {

    return (
        <div className='body'>
            <div className="scene">
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <div className="overlay"></div>
                <span className="bg-403">{status}</span>
                <div className="text">
                    <span className="hero-text"></span>
                    <span className="msg">No podemos <span>{descriptionOne}</span> {descriptionTwo}.</span>
                    <span className="support">
                        <span>Inesperado?</span>
                        <Link href={href}>{hrefTitle}</Link>
                    </span>
                </div>
                <div className="lock"></div>
            </div>
        </div>

    )
}