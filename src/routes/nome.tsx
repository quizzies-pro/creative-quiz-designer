import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CircleHelp, Menu } from "lucide-react";
import { useState } from "react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/nome")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80) : "",
  }),
  head: () => ({
    meta: [
      { title: "Qual é o seu nome? | Stanley’s Care" },
      {
        name: "description",
        content: "Informe seu nome para continuar seu plano personalizado Stanley’s Care.",
      },
      { property: "og:title", content: "Qual é o seu nome? | Stanley’s Care" },
      {
        property: "og:description",
        content: "Continue seu plano personalizado informando seu nome.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NameQuestion,
});

function NameQuestion() {
  const search = Route.useSearch();
  const [name, setName] = useState(search.nome);
  const canContinue = name.trim().length > 0;
  const navigate = useNavigate();

  return (
    <div className="quiz-page-background relative flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/idade" aria-label="Voltar para escolha de idade">
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
        <QuizProgress currentStep={2} />
      </header>

      <main className="relative flex flex-1 items-start justify-center px-5 pb-12 pt-10 sm:px-8 sm:pt-10">
        <section className="w-full max-w-[560px] text-center" aria-labelledby="name-question">
          <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Seu plano personalizado</p>
          <h1 id="name-question" className="mt-4 font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
            Qual é o seu nome?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
            Assim, podemos personalizar melhor a sua experiência.
          </p>

          <form
            className="mx-auto mt-8 max-w-[520px]"
            onSubmit={(event) => {
              event.preventDefault();
              if (canContinue) {
                void navigate({
                  to: "/calvicie",
                  search: { nome: name.trim() },
                });
              }
            }}
          >
            <label htmlFor="name" className="sr-only">Seu nome</label>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="given-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Digite seu nome"
              className="h-14 rounded-lg border-border bg-card px-5 text-base text-foreground shadow-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            <Button
              type="submit"
              disabled={!canContinue}
              className="mt-3 h-12 w-full rounded-lg text-sm font-bold"
            >
              Continuar
              <ArrowRight className="size-5" />
            </Button>
          </form>
        </section>
      </main>

      <Button
        variant="secondary"
        className="fixed bottom-5 right-6 hidden h-10 rounded-full border border-border px-4 shadow-lg sm:inline-flex"
        aria-label="Abrir ajuda"
      >
        <CircleHelp className="size-4" />
        <span>Ajuda</span>
      </Button>
    </div>
  );
}