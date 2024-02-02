import Link from "next/link";

import { redirect } from "next/navigation";

import { validateRequest } from "@/lib/auth";
import { Form } from "@/lib/form";
import { login } from "@/actions/authentication";

export default async function Page() {
    const { user } = await validateRequest();
    if (user) {
        return redirect("/instagram");
    }
    return (
        <>
            <h1 className="text-3xl mb-8 text-center">Sign in</h1>
            <Form action={login} className="max-w-md mx-auto">
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
                    className="bg-blue-500 text-white p-2 rounded w-full cursor-pointer"
                    type="submit"
                >
                    Continue
                </button>
            </Form>
            <p className="text-center mt-4">
                <Link href="/lucia/signup" className="text-green-500">
                    Create an account
                </Link>
            </p>
        </>
    );
}
