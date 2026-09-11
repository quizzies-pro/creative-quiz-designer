import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CircleHelp, Menu, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escolha sua idade | Stanley’s Care" },
      {
        name: "description",
        content: "Comece seu plano personalizado Stanley’s Care escolhendo sua faixa etária.",
      },
      { property: "og:title", content: "Plano personalizado | Stanley’s Care" },
      {
        property: "og:description",
        content: "Escolha sua faixa etária para iniciar seu plano personalizado Stanley’s Care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ageRanges = ["18–29", "30–39", "40–49", "50+"] as const;

function Index() {
  const [selectedAge, setSelectedAge] = useState<(typeof ageRanges)[number] | null>(null);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
          <a href="/" className="min-w-0 font-display text-xl font-bold sm:text-2xl" aria-label="Stanley’s Care — início">
            Stanley’s <span className="text-primary">Care</span>
          </a>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full border-border bg-transparent text-foreground hover:bg-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <main className="relative flex flex-1 items-start justify-center px-4 pb-28 pt-12 sm:px-8 sm:pt-16 lg:pt-14">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[70%] -translate-x-1/2 bg-[radial-gradient(circle,var(--primary-glow),transparent_68%)] opacity-20" />

        <section className="relative w-full max-w-[930px]" aria-labelledby="page-title">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase text-primary sm:text-sm">Seu plano personalizado</p>
            <h1 id="page-title" className="font-display text-3xl font-bold uppercase sm:text-4xl lg:text-[42px]">
              Plano de tratamento
            </h1>
            <p className="mt-5 text-base font-semibold uppercase text-muted-foreground sm:text-lg">
              Escolha a sua idade
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {ageRanges.map((age) => {
              const isSelected = selectedAge === age;
              return (
                <Button
                  key={age}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedAge(age)}
                  className="group h-auto min-w-0 flex-col gap-0 overflow-hidden rounded-xl border-border bg-card p-0 text-left text-card-foreground shadow-none transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-card"
                >
                  <span className="relative flex aspect-[.94] w-full items-center justify-center overflow-hidden bg-secondary">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,var(--primary-glow),transparent_56%)] opacity-25 transition-opacity group-hover:opacity-40" />
                    <UserRound aria-hidden="true" className="size-20 text-muted-foreground/45 sm:size-24" strokeWidth={1} />
                    <span className="absolute bottom-3 text-[10px] font-medium uppercase text-muted-foreground">Foto em breve</span>
                  </span>
                  <span className="m-1.5 grid w-[calc(100%-0.75rem)] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg bg-foreground px-3 py-2.5 text-background sm:m-2 sm:w-[calc(100%-1rem)] sm:px-4">
                    <span className="min-w-0 truncate text-sm font-bold sm:text-base">Idade: {age}</span>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" />
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground sm:text-sm">
            <p>
              Ao escolher sua idade e continuar, você concorda com nossos{" "}
              <a href="/termos" className="text-primary underline underline-offset-4">Termos de Serviço</a>{" "}
              e{" "}<a href="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</a>.
            </p>
            <p>Leia antes de continuar.</p>
          </div>
        </section>
      </main>

      <Button
        variant="secondary"
        className="fixed bottom-4 right-4 h-10 rounded-full border border-border px-4 shadow-lg sm:bottom-5 sm:right-6"
        aria-label="Abrir ajuda"
      >
        <CircleHelp className="size-4" />
        <span>Ajuda</span>
      </Button>
    </div>
  );
}
