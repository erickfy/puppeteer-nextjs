import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import UserFormDialog from "../../../../../../components/dialogs/user-form-dialog"

type Props = {
  searchParams: { image: string }
  params: any
}

export default async function InterceptDialogUserById({ searchParams, params }: Props) {

  const { user } = await validateRequest();

  if (!user) {
    return redirect("/");
  }
  return (
    <UserFormDialog user={user} />
  )
}