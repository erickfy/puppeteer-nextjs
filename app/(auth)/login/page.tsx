import { validateRequest } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormCard from "@/components/cards/form-card";

import Link from "next/link";
import { redirect } from "next/navigation";
import { login } from "@/actions/authentication";
import { routes } from "@/routes";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/instagram");
  }
  return (
    <FormCard
      title="Ingresar a la cuenta"
      descriptionOne="Web Scrapping"
      descriptionTwo="🛍️📚🤖"
      action={login}
      content={
        <>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="username">Usuario</Label>
            <Input type="text" id="username" name="username" placeholder="Ej: dejanstipke" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="password">Contrasena</Label>
            <Input type="password" name="password" id="password" placeholder="Ingresa la contrasena" />
          </div>
        </>
      }
      footer={
        <>
          <Button className="w-full" type="submit">
            Continuar
          </Button>
          <div className="text-sm text-muted-foreground flex gap-2">
            <p className="text-black">
              Aun no tienes cuenta?
            </p>
            <Link className="text-blue-500 font-bold" href={routes.signUp}>
              Registrarme
            </Link>
          </div>
        </>
      }
    />
  );
}
