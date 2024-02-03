import { ActionResult, Form } from "@/lib/form";
import { login } from "@/actions/authentication";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    content: React.ReactNode
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
    footer: React.ReactNode;
    action: (_: any, formData: FormData) => Promise<ActionResult>
}

export default function FormCard({
    content, title, descriptionOne, descriptionTwo, footer, action
}: Props) {
    return (
        <Card className="w-[350px]  absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CardHeader className="items-center">
                <CardTitle className="font-semibold text-xl">
                    {title}
                </CardTitle>
                <CardDescription>{descriptionOne}</CardDescription>
                <CardDescription>{descriptionTwo}</CardDescription>
            </CardHeader>
            <Form action={action} className="max-w-md mx-auto">
                <CardContent className="grid w-full items-center gap-6">
                    {content}
                </CardContent>
                <CardFooter className="flex flex-col gap-6">
                    {footer}
                </CardFooter>
            </Form>
        </Card>
    )
}