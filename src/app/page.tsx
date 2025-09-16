import { headers} from "next/headers"
import {auth} from "@/lib/auth"
import { ButtonSignOut } from "./_components/button-signout";
import {redirect} from "next/navigation"

export default async function Home() { // para qualquer pagina privada precisa desse export ele é async!

  const session = await auth.api.getSession({ // aqui faz a pesquisa se o usuario esta logado
      headers: await headers() // you need to pass the headers object.
  })
  if(!session){
    redirect("/sign-in")
  }
  return ( // depois da verificação padrao vem o conteudo da pagina dentro de return
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
      <h3>Usuario logado: Visitante</h3>
      <ButtonSignOut />
    </div>
  );
}