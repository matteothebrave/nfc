"use client";

import { useEffect, useState } from "react";

const STEPS = [
  "Cliente aproxima o celular",
  "Placa lida em um segundo",
  "Avaliação aberta no Google",
];

export default function TapDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const near = step > 0;

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[420px]">
      <div
        className={`absolute bottom-8 left-0 w-56 -rotate-6 rounded-[28px] border-2 border-[var(--foreground)] bg-[var(--foreground)] p-6 text-white shadow-[8px_8px_0_0_var(--red)] transition-transform duration-500 motion-reduce:transition-none ${
          step === 1 ? "scale-105" : ""
        }`}
      >
        <NfcWaves active={step === 1} />
        <p className="mt-4 text-xl leading-tight font-bold">
          Gostou? Avalie a gente ⭐
        </p>
        <p className="mt-1 text-xs text-white/70">
          Aproxime o celular ou leia o QR code
        </p>
      </div>

      <div
        className={`absolute top-0 right-0 z-10 h-80 w-44 rounded-[2rem] border-[3px] border-[var(--foreground)] bg-white p-3 shadow-[6px_6px_0_0_var(--foreground)] transition-transform duration-700 ease-out motion-reduce:transition-none ${
          near ? "translate-x-[-7rem] translate-y-12 -rotate-3" : "rotate-6"
        }`}
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-200" />
        <div className="mt-4 h-[calc(100%-2rem)]">
          {step === 0 && <HomeScreen />}
          {step === 1 && <LoadingScreen />}
          {step === 2 && <ReviewScreen />}
        </div>
      </div>

      <div className="absolute right-0 bottom-0 flex items-center gap-2 rounded-full border-2 border-[var(--foreground)] bg-white px-3 py-1 text-xs font-bold">
        <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--red)]" />
        {step + 1}/3 · {STEPS[step]}
      </div>
    </div>
  );
}

function NfcWaves({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`h-12 w-12 transition-colors duration-300 ${
        active ? "text-[var(--red)]" : "text-white"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="8" cy="24" r="3" fill="currentColor" stroke="none" />
      <path d="M14 16a12 12 0 0 1 0 16" />
      <path d="M21 11a19 19 0 0 1 0 26" />
      <path d="M28 6a26 26 0 0 1 0 36" />
    </svg>
  );
}

function HomeScreen() {
  return (
    <div className="fade-up">
      <p className="text-center text-2xl font-bold">9:41</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          "bg-red-200",
          "bg-orange-200",
          "bg-neutral-200",
          "bg-neutral-200",
          "bg-red-100",
          "bg-orange-100",
        ].map((color, i) => (
          <div key={i} className={`aspect-square rounded-xl ${color}`} />
        ))}
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fade-up flex h-full flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-100 border-t-[var(--red)] motion-reduce:animate-none" />
      <p className="text-center font-mono text-[10px] text-neutral-500">
        seudominio.com/r/padaria
      </p>
    </div>
  );
}

function ReviewScreen() {
  return (
    <div className="fade-up">
      <p className="text-sm font-bold">Padaria do João</p>
      <p className="text-[11px] text-neutral-500">Deixe sua avaliação</p>
      <div className="mt-4 flex justify-between text-2xl text-[var(--red)]">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="pop"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            ★
          </span>
        ))}
      </div>
      <div className="mt-4 h-16 rounded-xl border-2 border-neutral-200 p-2 text-[10px] text-neutral-400">
        Pão quentinho e atendimento ótimo!
      </div>
      <div className="mt-3 rounded-full bg-[var(--red)] py-1.5 text-center text-xs font-bold text-white">
        Publicar
      </div>
    </div>
  );
}
