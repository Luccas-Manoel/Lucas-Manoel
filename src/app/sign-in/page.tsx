import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoginForm } from "./_components/login-form"
import { headers} from "next/headers"
import {auth} from "@/lib/auth"
import {redirect} from "next/navigation"

export default async function signIn() {
  const session = await auth.api.getSession({ // aqui faz a pesquisa se o usuario esta logado
        headers: await headers() // you need to pass the headers object.
    })
    if(session){
      redirect("/")
    }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <LoginForm/>
      </div>
    </div>
  )
}