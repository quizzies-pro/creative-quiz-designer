import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CircleHelp, Menu } from "lucide-react";
import { useState } from "react";

import degree1Image from "@/assets/optimized/baldness-degree-1.webp";
import degree2Image from "@/assets/optimized/baldness-degree-2.webp";
import degree3Image from "@/assets/optimized/baldness-degree-3.webp";
import degree4Image from "@/assets/optimized/baldness-degree-4.webp";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/calvicie")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
  }),
  head: () => ({
    meta: [
      { title: "Grau de calvície | Stanley’s Care" },
      {
        name: "description",
        content: "Selecione o grau de calvície que mais se aproxima do seu caso para personalizar seu plano.",
      },
      { property: "og:title", content: "Grau de calvície | Stanley’s Care" },
      {
        property: "og:description",
        content: "Identifique seu grau de calvície e continue seu plano personalizado Stanley’s Care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BaldnessQuestion,
});

const baldnessDegrees = [
  { degree: 1, image: degree1Image },
  { degree: 2, image: degree2Image },
  { degree: 3, image: degree3Image },
  { degree: 4, image: degree4Image },
] as const;

type BaldnessDegree = (typeof baldnessDegrees)[number]["degree"];

function BaldnessQuestion() {
  const [selectedDegree, setSelectedDegree] = useState<BaldnessDegree | null>(null);
  const { nome } = Route.useSearch();
  const navigate = useNavigate();

  return (
    <div className="quiz-page-background relative flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/nome" search={{ nome }} aria-label="Voltar para a pergunta de nome">
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
        <QuizProgress currentStep={3} />
      </header>

      <main className="relative flex flex-1 items-start justify-center px-4 pb-10 pt-10 sm:px-8 sm:pb-24 sm:pt-12">
        <section className="relative w-full max-w-[930px]" aria-labelledby="baldness-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Seu plano personalizado</p>
            <h1 id="baldness-question" className="mt-3 font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              {nome ? `${nome}, qual é o seu grau de calvície?` : "Qual é o seu grau de calvície?"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Escolha a imagem que mais se aproxima do seu caso atual.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
            {baldnessDegrees.map(({ degree, image }) => {
              const isSelected = selectedDegree === degree;
              return (
                <Button
                  key={degree}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedDegree(degree);
                    void navigate({
                      to: "/motivacional",
                      search: { nome, grau: degree },
                    });
                  }}
                  className="group relative aspect-[0.76] h-auto min-w-0 overflow-hidden rounded-2xl border-border bg-card p-0 text-left text-card-foreground shadow-none transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-card"
                >
                  <span className="absolute inset-0 overflow-hidden bg-secondary">
                    <img
                      src={image}
                      alt={`Exemplo visual do grau ${degree} de calvície`}
                      width={760}
                      height={1018}
                      loading="eager"
                      decoding="async"
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </span>
                  <span className="absolute inset-x-1.5 bottom-1.5 grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-foreground px-3 py-2 text-background sm:inset-x-2 sm:bottom-2 sm:min-h-14 sm:px-4">
                    <span className="min-w-0 truncate text-sm font-bold sm:text-base">Grau {degree}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-0.5 sm:size-9">
                      <ArrowRight className="size-4 sm:size-5" />
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>
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