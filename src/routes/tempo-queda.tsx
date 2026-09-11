import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, HelpCircle, Menu } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;

type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";

const durationOptions: Array<{
  value: HairLossDuration;
  emoji: string;
  label: string;
}> = [
  { value: "menos-6-meses", emoji: "🟢", label: "Menos de 6 meses" },
  { value: "6-meses-1-ano", emoji: "🟡", label: "De 6 meses a 1 ano" },
  { value: "1-3-anos", emoji: "🟠", label: "De 1 a 3 anos" },
  { value: "mais-3-anos", emoji: "🔴", label: "Mais de 3 anos" },
  { value: "incerto", emoji: "🤔", label: "Não tenho certeza" },
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

export const Route = createFileRoute("/tempo-queda")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
  }),
  head: () => ({
    meta: [
      { title: "Tempo de queda de cabelo | Stanley’s Care" },
      {
        name: "description",
        content: "Informe há quanto tempo você percebe queda ou afinamento dos cabelos para personalizar seu plano.",
      },
      { property: "og:title", content: "Tempo de queda de cabelo | Stanley’s Care" },
      {
        property: "og:description",
        content: "Conte há quanto tempo percebe mudanças no cabelo e avance em sua avaliação personalizada.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairLossDurationQuestion,
});

function HairLossDurationQuestion() {
  const { nome, grau } = Route.useSearch();
  const [selectedDuration, setSelectedDuration] = useState<HairLossDuration | null>(null);

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/motivacional" search={{ nome, grau }} aria-label="Voltar para a página motivacional">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <Link to="/" className="justify-self-center" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[52vw]" />
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="size-10 rounded-full border-border bg-transparent text-foreground hover:bg-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
        <div className="absolute inset-x-0 -bottom-px h-1" aria-label="Etapa 5 do questionário">
          <div className="h-full w-[70%] bg-primary" />
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-10 sm:px-8 sm:py-14 lg:items-center lg:py-10">
        <section className="w-full max-w-[680px]" aria-labelledby="duration-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Seu histórico capilar</p>
            <h1 id="duration-question" className="mx-auto mt-4 max-w-[650px] font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[42px]">
              Há quanto tempo você percebe que seu cabelo está caindo ou ficando mais fino?
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {durationOptions.map((option) => {
              const isSelected = selectedDuration === option.value;
              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedDuration(option.value)}
                  className="group grid min-h-[66px] w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border-border bg-card px-5 py-3 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[72px] sm:px-6"
                >
                  <span className="text-xl" aria-hidden="true">{option.emoji}</span>
                  <span className="min-w-0 whitespace-normal text-sm font-semibold sm:text-base">{option.label}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-muted-foreground/70 text-transparent transition group-aria-pressed:border-primary group-aria-pressed:bg-primary group-aria-pressed:text-primary-foreground">
                    <Check className="size-4" />
                  </span>
                </Button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[680px] justify-center">
          <Button type="button" disabled={!selectedDuration} className="h-12 w-full max-w-[360px] rounded-full text-sm font-bold uppercase">
            Continuar
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </footer>

      <Button
        variant="secondary"
        className="fixed bottom-5 right-6 hidden h-10 rounded-full border border-border px-4 shadow-lg sm:inline-flex"
        aria-label="Abrir ajuda"
      >
        <HelpCircle className="size-4" />
        <span>Ajuda</span>
      </Button>
    </div>
  );
}