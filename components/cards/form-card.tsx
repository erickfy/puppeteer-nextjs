import { ActionResult, Form } from "@/lib/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
    content: React.ReactNode
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
    footer: React.ReactNode;
    action: (_: any, formData: FormData) => Promise<ActionResult>
    classNameHeader?: string;
    classNameCard?: string;
}

export default function FormCard({
    content, title, descriptionOne, descriptionTwo, footer, action, classNameHeader = '',
    classNameCard = "w-[350px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
}: Props) {
    return (
        <Card className={classNameCard}>
            <CardHeader className={cn("items-center", classNameHeader)}>
                <CardTitle className="font-semibold text-xl">
                    {title}
                </CardTitle>
                <CardDescription>{descriptionOne}</CardDescription>
                <CardDescription>{descriptionTwo}</CardDescription>
            </CardHeader>
            <Form action={action} className="max-w-md mx-auto w-full">
                <CardContent className="grid w-full items-center gap-6">
                    {content}
                </CardContent>
                <CardFooter className="flex flex-col gap-6">
                    {footer}
                </CardFooter>
            </Form>
        </Card >
    )
}