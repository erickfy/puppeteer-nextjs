import ImageCard from "@/app/(scrapping)/_components/cards/image-card"
import Logo from "@/components/logo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { validateRequest } from "@/lib/auth"
import { redirect } from "next/navigation"
import UserFormDialog from "../../../_components/user-form-dialog"
import { getUser } from "@/app/(scrapping)/layout"

type Props = {
  searchParams: { image: string }
  params: any
}

export default async function InterceptDialogUserById({ searchParams,params }: Props) {

  // const { user } = await validateRequest();

  // if (!user) {
  //   return redirect("/");
  // }

  const usering = getUser()

  console.log(usering)
  console.log(params)

  return (
    <UserFormDialog user={usering} />
  )
}