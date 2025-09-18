

export default function Loading() {
  // Você pode adicionar qualquer UI aqui, incluindo um "esqueleto" (skeleton).
  // Vamos usar o mesmo spinner que você já tem!
  return (
    <main>
      <div className="flex justify-center items-center min-h-screen">
        <i className="fas fa-spinner animate-spin text-4xl text-amber-800 dark:text-amber-300"></i>
      </div>
    </main>
  );
}