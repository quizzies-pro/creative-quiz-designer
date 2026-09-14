import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Menu, ScanSearch } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import historyImage from "@/assets/optimized/noticia-historico-capilar.webp";
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

  useEffect(() => {
    const startedAt = Date.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progressDuration = reduceMotion ? 150 : 1600;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / progressDuration) * 100)));
    }, 80);

    const transitionTimer = window.setTimeout(() => {
      setProgress(100);
      void navigate({
        to: "/regiao-queda",
        search: { nome, grau, tempo, regiao: undefined },
        replace: true,
      });
    }, reduceMotion ? 180 : 1750);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(transitionTimer);
    };
  }, [grau, navigate, nome, tempo]);

  return (
     <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
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

      <main className="flex flex-1 px-5 py-8 sm:px-8 sm:py-11">
        <section className="mx-auto grid w-full max-w-[1040px] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14" aria-labelledby="diagnosis-title">
          <div>
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Análise em andamento</p>
            <h1 id="diagnosis-title" className="mt-3 font-display text-[30px] font-normal leading-[1.2] sm:text-[38px]">
              Seu histórico já revela algo importante.
            </h1>
            <p className="mt-5 max-w-[590px] text-base leading-7 text-muted-foreground sm:text-lg">
              Quanto maior o tempo de evolução, mais importante é entender o padrão da queda e o nível de afinamento dos fios.
            </p>
            <div className="mt-7 flex items-start gap-3 border-l-2 border-primary pl-4">
              <ScanSearch className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-6 text-foreground sm:text-base">Estamos cruzando suas respostas para identificar o seu perfil capilar.</p>
            </div>
            <div className="mt-8" role="status" aria-live="polite">
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-medium text-foreground">Cruzando suas respostas</span>
                <span className="font-semibold tabular-nums text-primary">{progress}%</span>
              </div>
              <progress className="diagnosis-progress block h-2 w-full overflow-hidden rounded-full" value={progress} max={100} aria-label={`Análise em ${progress}%`} />
            </div>
            <p className="mt-7 text-sm leading-6 text-muted-foreground">
              <span className="font-semibold text-foreground">Próxima etapa:</span> vamos analisar onde a perda de cabelo está mais concentrada.
            </p>
          </div>

          <figure className="mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-lg border border-border bg-card">
            <img src={historyImage} alt="Informativo sobre a importância de observar há quanto tempo a queda de cabelo começou" width={840} height={840} decoding="async" className="h-full w-full object-contain" />
          </figure>
        </section>
      </main>
    </div>
  );
}