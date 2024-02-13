import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ParamsEditUserSchema } from "@/schemas/param-schema"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Uploader from "@/components/uploader"
import { editUser, changePasswordAction } from "@/actions/user"
import DialogUI from "@/components/dialogs/dialog-ui"
import { Button } from "@/components/ui/button"
import ButtonUI from "@/components/buttons/button-ui"

type Props = {
  searchParams: { image: string }
  params: any
}

export default async function InterceptDialogUserById({ searchParams, params }: Props) {
  const { changePassword } = ParamsEditUserSchema.parse(searchParams)
  console.log(changePassword)

  const { user, session } = await validateRequest();
  console.log(user)
  console.log(session)

  if (!user && !session) {
    return redirect("/");
  }

  let content;

  const isChangePassword = changePassword !== undefined && Boolean(changePassword)

  if (isChangePassword) {
    content = <>
      <Input name='id' className='hidden' defaultValue={user.id} />
      <div className="grid w-full max-w-xs items-center gap-2">
        <Label htmlFor="password">Contrasena</Label>
        <Input type="password" name="password" id="password" />
      </div>
      <div className="grid w-full max-w-xs items-center gap-2">
        <Label htmlFor="confirmPassword">Confirmar Contrasena</Label>
        <Input type="password" name="confirmPassword" id="confirmPassword" />
      </div>
    </>
  } else {

    content = <>
      <Input name='id' className='hidden' defaultValue={user.id} />
      <div className="grid w-full max-w-xs items-center gap-2">
        <Label htmlFor="fullNames">Nombres Completos</Label>
        <Input type="text" name="fullNames" id="fullNames" placeholder="Ej: Johan Quinatoa" defaultValue={user.fullNames ? user.fullNames : ''} />
      </div>
      <div className="grid w-full max-w-xs items-center gap-2">
        <Uploader id='image-upload' name='image' src={user.image ? user.image : undefined} />
      </div>
    </>
  }

  const buttonClose = (<Button type="button" variant="ghost" className="w-full" id="close-button">Cerrar</Button>)
  const buttonSubmit = <ButtonUI title={isChangePassword ? 'Cambiar' : 'Actualizar'}
    id={`${isChangePassword ? 'change' : 'update'}-submit`}
  />

  return (
    <DialogUI
      title={isChangePassword ? 'Cambiar contrasena' : 'Editar Usuario'}
      description={user.username.toLocaleUpperCase()}
      action={isChangePassword ? changePasswordAction : editUser}
      buttonClose={buttonClose}
      buttonSubmit={buttonSubmit}
      content={content}
    />)
}