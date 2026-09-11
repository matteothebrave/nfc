export default function LinkNaoEncontrado() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--cream)] p-6 text-center">
      <div
        className="blob h-72 w-72 bg-[var(--red)]"
        style={{ top: "-4rem", left: "-4rem" }}
      />
      <div
        className="blob h-56 w-56 bg-orange-200"
        style={{ bottom: "-4rem", right: "-4rem", animationDelay: "3s" }}
      />
      <div className="relative rounded-[28px] border-2 border-[var(--foreground)] bg-white p-10 shadow-[6px_6px_0_0_var(--red)]">
        <span className="text-4xl">📡</span>
        <h1 className="mt-3 text-2xl font-bold text-[var(--foreground)]">
          Link não disponível
        </h1>
        <p className="mt-2 max-w-xs text-sm text-neutral-500">
          Este código não está mais ativo. Fale com o estabelecimento para
          mais informações.
        </p>
      </div>
    </main>
  );
}
