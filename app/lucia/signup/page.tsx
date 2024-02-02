import Link from "next/link";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";

import { signup } from "@/actions/authentication";

export default async function Page() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/instagram");
    }
    return (
        <>
            <h1 className="text-3xl mb-8 text-center">Create an account</h1>
            <Form action={signup} className="max-w-md mx-auto">
                <label className="block mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="text"
                    name="username"
                    id="username"
                />
                <label className="block mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    type="password"
                    name="password"
                    id="password"
                />
                <button
                    className="bg-green-500 text-white p-2 rounded w-full cursor-pointer"
                    type="submit"
                >
                    Continue
                </button>
            </Form>
            <p className="text-center mt-4">
                <Link href="/lucia/login" className="text-blue-500">
                    Sign in
                </Link>
            </p>
        </>

    );
}