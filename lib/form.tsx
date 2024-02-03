"use client";

import { CSSProperties } from "react";
import { useFormState } from "react-dom";
import { cn } from "./utils";

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
        <form action={formAction} style={style} className={cn('grid gap-8', className)}>
            {state?.errors && state.errors.length !== 0 && state.errors[0] !== '' &&
                <div className={cn("pl-6 pr-6 text-rose-500", "bg-red-500")} style={{ color: "rgb(239, 68, 68)" }} >
                    <ul className="pl-4" style={{ listStyleType: "disc", paddingRight: "16px" }}>
                        {state.errors && state.errors?.map((e) => (
                            <li key={e} className="text-red-500 bg-red-900">
                                {e}
                            </li>
                        ))}
                    </ul>
                </div>
            }

            {children}

        </form>
    );
}

export interface ActionResult {
    errors?: string[] | null;
}
