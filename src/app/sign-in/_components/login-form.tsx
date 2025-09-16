"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { authClient } from "@/lib/auth-client"




const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
  
})
const signupSchema = z
  .object({
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(8, { message: "A confirmação de senha deve ter pelo menos 8 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  

    // O useForm agora escolhe o resolver dinamicamente!
  const form = useForm<LoginFormValues | SignupFormValues>({
      resolver: zodResolver(view === 'login' ? loginSchema : signupSchema),
      defaultValues: {
          email: "",
          password: "",
          name: "", // Mesmo que não seja usado no login, precisa ser declarado
          confirmPassword: "",
      },
  });
  // Observa os valores dos campos de email e senha
    const emailValue = form.watch('email');
    const passwordValue = form.watch('password');

  useEffect(() => {
      // Agora, este efeito só roda quando o texto no email ou na senha mudar.
      // Se houver um erro visível, ele será limpo.
        if (authError) {
          setAuthError(null);
        }
  }, [emailValue, passwordValue]); // A dependência agora são os valores dos campos


async function onSubmit(formData: LoginFormValues | SignupFormValues) {
  setAuthError(null);
  setIsLoading(true);

  try {
    if (view === 'login') {
      // Lógica de LOGIN
      await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/"
      }, {
        onSuccess: (ctx) => {
          console.log("LOGADO: ", ctx)
          router.replace("/")
        },
        onError: (ctx) => {
          setAuthError("Credenciais inválidas.");
          console.log("ERRRO AO LOGAR")

        }
      });

    } else {
      // Lógica de CADASTRO
      const signupData = formData as SignupFormValues;
      const { data, error } = await authClient.signUp.email({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        callbackURL: "/"
      }, {
        onSuccess: (ctx) => {
          console.log("CADASTRADO: ", ctx)
          router.replace("/")
        },
        onError: (ctx) => {
          console.log("ERRRO AO CRIAR CONTA")
          console.log(ctx)
          // Opcional: Adicionar um erro de cadastro aqui também
          // setAuthError("Não foi possível criar a conta. Tente novamente.");
        }
      });
    }
  } finally {
    setIsLoading(false); // Agora o finally está no lugar certo
  }
}
      return (
    // O return agora começa com o título
    <> {/* Usamos um Fragment <>...</> para agrupar tudo */}
      
      {/* O TÍTULO E SUBTÍTULO AGORA ESTÃO AQUI E SÃO DINÂMICOS */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">
          {view === 'login' ? 'Login' : 'Crie sua Conta'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {view === 'login'
            ? 'Entre com suas credenciais para acessar sua conta'
            : 'Preencha os dados abaixo para começar a usar'}
        </p>
      </div>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Estes campos aparecem SÓ se a view for 'signup' */}
          {view === 'signup' && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome completo" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
            />
          )}
        {/* Campo de Email (aparece sempre) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" type="email" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      {/* Campo de Email (aparece sempre) */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {view === 'signup' && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  placeholder="••••••••"
                                  type={showConfirmPassword ? "text" : "password"}
                                  {...field}
                                  disabled={isLoading}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  disabled={isLoading}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span className="sr-only">{showConfirmPassword ? "Esconder senha" : "Mostrar senha"}</span>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
            />
         )}
        {authError && (
          <p className="text-sm font-medium text-destructive text-center">{authError}</p>
        )}
        <Button type="submit" className="w-full">
            {/* O texto do botão também muda! */}
            {view === 'login' ? "Entrar" : "Cadastrar"}
          </Button>
      </form>
         <div className="mt-6 text-center text-sm">
                {view === 'login' ? (
                  <p>
                    Não tem uma conta?{" "}
                    <button 
                      onClick={() => {
                        setView('signup'); 
                        setAuthError(null); // <-- ADICIONE AQUI
                      }}
                    >
                      Cadastre-se
                    </button>
                  </p>
                ) : (
                  <p>
                    Já tem uma conta?{" "}
                    <button 
                      onClick={() => {
                        setView('login');
                        setAuthError(null); // <-- E AQUI TAMBÉM
                      }}
                    >
                      Faça login
                    </button>
                  </p>
                )}
            </div>

    </Form>
      
    </>
  )
}
