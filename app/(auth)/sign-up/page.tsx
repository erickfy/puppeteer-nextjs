import Link from "next/link";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

import FormCard from "@/app/(auth)/_components/form-card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "@/actions/authentication";
import { USER_ROLE } from "@prisma/client";
import { routes } from "@/routes";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/instagram");
  }
  return (
    <FormCard
      title="Registro"
      descriptionOne="Añadir un nuevo usuario"
      descriptionTwo="👤"
      action={signup}
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
          <div className="grid w-full max-w-sm items-center gap-2 relative">
            <Label htmlFor="role">Rol</Label>
            <div className="relative inline-block text-left">
              <select id="role"
                name="role"
                className="appearance-none bg-transparent border border-gray-300 p-2 rounded-md leading-5 focus:outline-none focus:border-blue-500 transition ease-in-out duration-150 w-full"
                defaultValue={USER_ROLE.CLIENT}
              >
                <option value={USER_ROLE.ADMIN}>
                  Administrador
                </option>
                <option value={USER_ROLE.CLIENT}>
                  Usuario
                </option>
              </select>
            </div>
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
              Ya tienes cuenta?
            </p>
            <Link className="text-blue-500 font-bold" href={routes.login}>
              Ingresar
            </Link>
          </div>
        </>
      }
    />
  );
}