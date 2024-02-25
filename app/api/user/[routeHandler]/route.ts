import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/routes"
import { NextResponse } from "next/server"

enum TYPE {
    INSTAGRAM = 'instagram',
    AMAZON = 'amazon',
    BOOK_STORE = 'book-store',
    MERCADO_LIBRE = 'mercado-libre',
}

type PropsParams = {
    params: {
        routeHandler: 'instagram' | 'amazon' | 'mercado-libre' | 'book-store'
    }
}

export async function GET(req: Request, { params }: PropsParams) {
    try {

        const { routeHandler } = params

        const { user: currentUser } = await validateRequest()

        if (!currentUser) {
            // NO CONTENT USER NEEDS TO BE LOG IN
            return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, req.url))
        }

        const typeSearch = {
            instagram: TYPE.INSTAGRAM === routeHandler,
            amazon: TYPE.AMAZON === routeHandler,
            bookStore: TYPE.BOOK_STORE === routeHandler,
            mercadoLibre: TYPE.MERCADO_LIBRE === routeHandler,
        }


        const user = await db.user.findFirst({
            where: { id: currentUser.id },
            select: {
                instagramHistory: typeSearch.instagram,
                amazonHistory: typeSearch.amazon,
                bookStoreHistory: typeSearch.bookStore,
                mercadoLibreHistory: typeSearch.mercadoLibre,
            }
        })


        let cleanData: string[] = [];

        if (routeHandler === TYPE.INSTAGRAM) {
            cleanData = getRepeatedValues(user?.instagramHistory?.list ?? []);
        } else if (routeHandler === TYPE.AMAZON) {
            cleanData = getRepeatedValues(user?.amazonHistory?.list ?? []);
        } else if (routeHandler === TYPE.MERCADO_LIBRE) {
            cleanData = getRepeatedValues(user?.mercadoLibreHistory?.list ?? []);
        } else if (routeHandler === TYPE.BOOK_STORE) {
            cleanData = (user?.bookStoreHistory?.list ?? []);
        }


        return NextResponse.json({ values: cleanData });
    } catch (error) {
        return Response.json({ hasError: true }, { status: 400 })
    }
}


function getRepeatedValues(arr: string[]): string[] {
    const frequencyMap: Record<string, number> = {};
    const repeatedValues: string[] = [];

    arr.forEach(value => {
        frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    for (const [value, frequency] of Object.entries(frequencyMap)) {
        if (frequency > 0) {
            repeatedValues.push(`${value} (${frequency})`);
        }
    }


    return repeatedValues;
}