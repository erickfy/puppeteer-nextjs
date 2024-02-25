import { validateRequest } from "@/lib/auth"
import { db } from "@/lib/db"
import { DEFAULT_UNAUTHORIZED_REDIRECT } from "@/routes"
import { NextResponse } from "next/server"
/**
 * @params userId: string
 * @params searchInput: string
 * @params type: 'instagram' | 'amazon' | 'mercado-libre' | 'book-store';
 * 
 */

enum TYPE {
    INSTAGRAM = 'instagram',
    AMAZON = 'amazon',
    BOOK_STORE = 'book-store',
    MERCADO_LIBRE = 'mercado-libre',
    BOT_DETECT= 'bot-detect'
}

export async function POST(req: Request) {
    try {

        const data = await req.json()
        // const userId = data.userId as string
        const searchInput = data.searchInput as string
        const type = data.type as string

        const { user: currentUser } = await validateRequest()

        if (!currentUser) {
            // NO CONTENT USER NEEDS TO BE LOG IN
            // return redirect('/')
            return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, req.url))
        }

        if (type === TYPE.BOT_DETECT) {
            // NO CONTENT
            return new Response(null, {status: 204})
        }

        const userId = currentUser.id

        const typeSearch = {
            instagram: TYPE.INSTAGRAM === type,
            amazon: TYPE.AMAZON === type,
            bookStore: TYPE.BOOK_STORE === type,
            mercadoLibre: TYPE.MERCADO_LIBRE === type,
        }

        const user = await db.user.findFirst({
            where: { id: userId },
            include: {
                instagramHistory: typeSearch.instagram,
                amazonHistory: typeSearch.amazon,
                bookStoreHistory: typeSearch.bookStore,
                mercadoLibreHistory: typeSearch.mercadoLibre,
            }
        })

        if (!user) {
            // NO CONTENT NOT FOUND USER
            return new Response(null, { status: 204 })
        }

        // COUNTING WORD INSTAGRAM
        if (typeSearch.instagram) {
            await db.user.update({
                where: { id: userId },
                data: {
                    instagramHistory: {
                        upsert: {
                            where: {
                                userId
                            },
                            update: {
                                list: {
                                    push: searchInput
                                }
                            },
                            create: {
                                list: [searchInput]
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD AMAZON
        else if (typeSearch.amazon) {
            await db.user.update({
                where: { id: userId },
                data: {
                    amazonHistory: {
                        upsert: {
                            where: {
                                userId
                            },
                            update: {
                                list: {
                                    push: searchInput
                                }
                            },
                            create: {
                                list: [searchInput]
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD BOOKSTORE
        // register date searching due to not exist searchInput
        else if (typeSearch.bookStore) {
            const dateString = (new Date()).toISOString()
            await db.user.update({
                where: { id: userId },
                data: {
                    bookStoreHistory: {
                        upsert: {
                            where: {
                                userId
                            },
                            update: {
                                list: {
                                    push: dateString
                                }
                            },
                            create: {
                                list: [dateString]
                            }
                        }
                    }
                }
            })
        }

        // COUNTING WORD MERCADOLIBRE
        else if (typeSearch.mercadoLibre) {
            await db.user.update({
                where: { id: userId },
                data: {
                    mercadoLibreHistory: {
                        upsert: {
                            where: {
                                userId
                            },
                            update: {
                                list: {
                                    push: searchInput
                                }
                            },
                            create: {
                                list: [searchInput]
                            }
                        }
                    }
                }
            })
        }

        return new Response(null, { status: 200 })
    } catch (error) {

        if (error instanceof Error) {
    
          const gistApiUrl = 'https://api.github.com/gists';
          const routeHandler = 'count-word'
          const nameFile = `error-${routeHandler}-${(new Date()).toISOString()}.txt`
          const accessToken = process.env.GIST as string ?? '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';
    
          const gistData = {
            public: true,
            files: {
              [nameFile]: {
                content: `Stack error: \n
                Name: ${JSON.stringify(error.name)}
                Cause: ${JSON.stringify(error.cause)}
                Message: ${JSON.stringify(error.message)}
                Stack: ${JSON.stringify(error.stack)}
                `,
              },
            },
          };
    
    
          const response = await fetch(gistApiUrl, {
            method: 'POST',
            body: JSON.stringify(gistData),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          });
    
          const responseData = await response.json();
    
          if (response.ok) {
    
            return Response.json({
              error: 'Archivo de error enviado a GitHub Gist',
              hasError: true,
              urlError: responseData.html_url,
              data: []
            });
          } else {
    
            return Response.json({
              error: `Error al enviar el archivo a GitHub Gist \n ${responseData.message}`,
              hasError: true,
              data: []
            },
              { status: response.status }
            );
          }
    
        }
    
        return Response.json({
          error: "Error desconocido",
          hasError: true,
          data: []
        })
      }
}