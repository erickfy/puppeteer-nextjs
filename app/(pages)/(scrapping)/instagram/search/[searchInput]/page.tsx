import axios from 'axios'
import React from 'react'

type Props = {
    params: { searchInput: string },
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export default async function SearchInput({ params: { searchInput } }: Props) {
    // const { page, per_page } = searchUserParamsSchema.parse(searchParams)

    console.log("search", searchInput)
    let request;
    // if (searchInput) {
    //     try {
    //         request = await axios.post(`/api/scrapping/instagram`,
    //             // app/api/scrapping/instagram
    //             { searchInput }
    //         )
    //         console.log(request.data)

    //     } catch (error) {
    //         console.log(error)

    //     }
    // }

    return (
        <div>Init</div>
    )
}