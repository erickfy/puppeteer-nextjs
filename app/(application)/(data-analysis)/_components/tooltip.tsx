'use client'

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCallback, useMemo, useState } from "react"
import LoadingDots from "@/components/loading-dots"
import { Info } from "lucide-react"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { MagicMotion } from "react-magic-motion";


const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
type Props = {
    titleToolTip: string;
    routeHandler: 'instagram' | 'amazon' | 'mercado-libre' | 'book-store'
}

export default function ToolTip({ routeHandler, titleToolTip }: Props) {
    const [values, setValues] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function handlerToolTip() {
        setLoading(true)
        const response = await axios.get(`/api/user/${routeHandler}`)
        if (response.status === 200) {
            setValues(response.data.values)
            setLoading(false)
        } else {
            setLoading(false)
        }
    }

    const memoizedValues = useMemo(() => values, [values]);

    return (
        <TooltipProvider delayDuration={100} >
            <Tooltip onOpenChange={handlerToolTip}>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size={'icon'}>
                        <Info className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <MagicMotion>
                        <div>
                            {loading ?
                                // <LoadingDots color="#808080" />
                                <ReloadIcon className="h-4 w-4 animate-spin" />
                                :
                                <ScrollArea className="h-72 w-48">
                                    <div className="p-2">
                                        <h4 className="mb-4 text-sm font-medium leading-none">{titleToolTip}</h4>
                                        {memoizedValues.map((tag) => (
                                            <div key={tag}>
                                                <div key={tag} className="text-sm">
                                                    {tag}
                                                </div>
                                                <Separator className="my-2" />
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            }
                        </div>
                    </MagicMotion>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
