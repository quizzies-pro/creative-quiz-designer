import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu, ScanSearch } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";

const validDurations: HairLossDuration[] = [
  "menos-6-meses",
  "6-meses-1-ano",
  "1-3-anos",
  "mais-3-anos",
  "incerto",
];

const analysisStages = [
  "Analisando seu histórico de queda",
  "Mapeando as regiões mais afetadas",
  "Avaliando a espessura dos fios",
  "Preparando seu perfil capilar",
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseDuration(value: unknown): HairLossDuration {
  return typeof value === "string" && validDurations.includes(value as HairLossDuration)
    ? (value as HairLossDuration)
    : "incerto";
}

export const Route = createFileRoute("/diagnostico-capilar")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseDuration(search["tempo"]),
  }),
  head: () => ({
    meta: [
      { title: "Análise do seu histórico capilar | Stanley’s Care" },
      {
        name: "description",
        content: "Entenda por que o histórico da queda ajuda a identificar seu perfil capilar.",
      },
      { property: "og:title", content: "Análise do seu histórico capilar | Stanley’s Care" },
      {
        property: "og:description",
        content: "Seu histórico ajuda a orientar a análise do padrão da queda e do afinamento dos fios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairDiagnosisTransition,
});

function HairDiagnosisTransition() {
  const { nome, grau, tempo } = Route.useSearch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const stageProgress = (stageIndex: number) =>
    Math.min(100, Math.max(0, Math.round((progress - stageIndex * 25) * 4)));

  const activeStage = Math.min(Math.floor(progress / 25), analysisStages.length - 1);

  useEffect(() => {
    const startedAt = Date.now();
    const progressDuration = 2600;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / progressDuration) * 100)));
    }, 30);

    const transitionTimer = window.setTimeout(() => {
      setProgress(100);
      void navigate({
        to: "/regiao-queda",
        search: { nome, grau, tempo, regiao: undefined },
        replace: true,
      });
    }, 2800);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(transitionTimer);
    };
  }, [grau, navigate, nome, tempo]);

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/tempo-queda" search={{ nome, grau }} aria-label="Voltar para a pergunta sobre o tempo de queda">
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
        <QuizProgress currentStep={6} />
      </header>

      <main className="flex flex-1 px-5 py-9 sm:px-8 sm:py-12">
        <section className="mx-auto flex w-full max-w-[680px] flex-col" aria-labelledby="diagnosis-title">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Diagnóstico capilar</p>
            <h1 id="diagnosis-title" className="mt-3 font-display text-[30px] font-normal leading-[1.2] sm:text-[38px]">
              {nome ? `${nome}, estamos analisando suas respostas` : "Estamos analisando suas respostas"}
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-muted-foreground sm:text-base">
              Estamos conectando cada detalhe para entender melhor o momento atual do seu cabelo.
            </p>
          </div>

          <div className="mt-9 space-y-6 sm:mt-11 sm:space-y-7" role="status" aria-live="polite" aria-label="Análise do perfil capilar em andamento">
            {analysisStages.map((stage, index) => {
              const value = stageProgress(index);
              const isActive = index === activeStage && progress < 100;
              const isComplete = value === 100;

              return (
                <div key={stage}>
                  <div className="mb-2.5 flex min-h-6 items-center justify-between gap-4">
                    <span className={isActive || isComplete ? "text-sm font-medium text-foreground sm:text-base" : "text-sm font-medium text-muted-foreground sm:text-base"}>
                      {stage}
                    </span>
                    {isActive ? (
                      <span className="min-w-11 text-right text-sm font-semibold tabular-nums text-primary">{value}%</span>
                    ) : isComplete ? (
                      <Check className="size-4 shrink-0 text-primary" aria-label="Concluído" />
                    ) : null}
                  </div>
                  <progress
                    className="diagnosis-progress block h-2 w-full overflow-hidden rounded-full"
                    value={value}
                    max={100}
                    aria-label={`${stage}: ${value}%`}
                  />
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-10 flex items-center gap-4 border-t border-border px-5 pt-7 text-left sm:mt-12 sm:px-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary" aria-hidden="true">
              <ScanSearch className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Construindo seu perfil capilar</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">A próxima pergunta ajuda a localizar onde o afinamento está mais concentrado.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}