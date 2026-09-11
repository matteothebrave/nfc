export default function LinkNaoEncontrado() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 p-6 text-center text-neutral-100">
      <div>
        <h1 className="text-2xl font-semibold">Link não disponível</h1>
        <p className="mt-2 text-neutral-400">
          Este código não está mais ativo. Fale com o estabelecimento para
          mais informações.
        </p>
      </div>
    </main>
  );
}
