"use client";

import { CSSProperties } from "react";
import { useFormState } from "react-dom";

export function Form({
    children,
    action,
    style,
    className
}: {
    children: React.ReactNode;
    action: (prevState: any, formData: FormData) => Promise<ActionResult>;
    style?: CSSProperties | undefined;
    className?: string | undefined
}) {

    const initState = {
        errors: null
    }

    const [state, formAction] = useFormState(action, initState);

    return (
        <form action={formAction} style={style} className={className}>
            {children}

            <ul className="flex flex-col gap-2 text-rose-500">
                {state.errors && state.errors?.map((e) => (
                    <li key={e}>
                        {e}
                    </li>
                ))}
            </ul>

        </form>
    );
}

export interface ActionResult {
    errors?: string[] | null;
}
