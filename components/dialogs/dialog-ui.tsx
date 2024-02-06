"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Form } from '@/lib/form'
import { useRouter } from "next/navigation";
import { ActionResult } from "@/lib/form";
type Props = {
    action: (_: any, formData: FormData) => Promise<ActionResult>
    title: string;
    description: string;
    content: React.ReactNode
    buttonClose: React.ReactNode
    buttonSubmit: React.ReactNode

}
export default function DialogUI({ action, title, description, content, buttonClose, buttonSubmit }: Props) {
    const router = useRouter();
    return (
        <Dialog
            defaultOpen={true}
            onOpenChange={(v) => { router.back() }}
        >
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <Form action={action} className=" mx-auto sm:max-w-sm w-full">
                    {content}
                    <DialogFooter className="sm:!justify-between gap-4">
                        <DialogClose>
                            {buttonClose}
                        </DialogClose>
                        {buttonSubmit}
                    </DialogFooter>
                </Form>

            </DialogContent >
        </Dialog >
    );
}