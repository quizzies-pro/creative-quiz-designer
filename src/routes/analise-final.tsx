import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu, ScanSearch } from "lucide-react";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";
type HairLossArea = "entradas" | "topo" | "coroa" | "entradas-topo" | "varias-regioes";
type HairThickness = "grossos" | "alguns-finos" | "maioria-fina" | "muito-finos" | "nao-percebo";
type ScalpCondition = "normal" | "oleoso" | "muito-oleoso" | "seco" | "sensivel" | "nao-sei";
type PreviousTreatment = "nunca" | "shampoos-locoes" | "vitaminas-suplementos" | "indicado-profissional" | "varios" | "atualmente";
type CareFrequency = "todos-dias" | "algumas-vezes-semana" | "raramente" | "praticamente-nunca" | "sem-rotina";
type PerceivedPeriod = "dias" | "meses" | "um-ano" | "mais-de-um-ano";
type MainGoal = "parar-queda" | "recuperar-densidade" | "fortalecer-fios" | "melhorar-entradas-coroa" | "rotina-completa";

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];
const validScalpConditions: ScalpCondition[] = ["normal", "oleoso", "muito-oleoso", "seco", "sensivel", "nao-sei"];
const validTreatments: PreviousTreatment[] = ["nunca", "shampoos-locoes", "vitaminas-suplementos", "indicado-profissional", "varios", "atualmente"];
const validFrequencies: CareFrequency[] = ["todos-dias", "algumas-vezes-semana", "raramente", "praticamente-nunca", "sem-rotina"];
const validPeriods: PerceivedPeriod[] = ["dias", "meses", "um-ano", "mais-de-um-ano"];
const validGoals: MainGoal[] = ["parar-queda", "recuperar-densidade", "fortalecer-fios", "melhorar-entradas-coroa", "rotina-completa"];

const analysisStages = [
  "Analisando seu histórico de queda",
  "Interpretando o padrão e a espessura dos fios",
  "Avaliando couro cabeludo e rotina de cuidados",
  "Preparando seu perfil capilar personalizado",
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

export const Route = createFileRoute("/analise-final")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseOption(search["tempo"], validDurations, "incerto"),
    regiao: parseOption(search["regiao"], validAreas, "entradas"),
    espessura: parseOption(search["espessura"], validThicknesses, "nao-percebo"),
    couro: parseOption(search["couro"], validScalpConditions, "nao-sei"),
    tratamento: parseOption(search["tratamento"], validTreatments, "nunca"),
    frequencia: parseOption(search["frequencia"], validFrequencies, "sem-rotina"),
    periodo: parseOption(search["periodo"], validPeriods, "meses"),
    objetivo: parseOption(search["objetivo"], validGoals, "rotina-completa"),
  }),
  head: () => ({
    meta: [
      { title: "Analisando seu perfil capilar | Stanley’s Care" },
      { name: "description", content: "Estamos analisando suas respostas para preparar seu perfil capilar personalizado." },
      { property: "og:title", content: "Analisando seu perfil capilar | Stanley’s Care" },
      { property: "og:description", content: "Suas respostas estão sendo combinadas para construir sua análise capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FinalAnalysis,
});

function FinalAnalysis() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const stageProgress = (index: number) => Math.min(100, Math.max(0, Math.round((progress - index * 25) * 4)));
  const activeStage = Math.min(Math.floor(progress / 25), analysisStages.length - 1);

  useEffect(() => {
    const startedAt = Date.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 180 : 2400;
    const timer = window.setInterval(() => {
      const nextProgress = Math.min(100, Math.round(((Date.now() - startedAt) / duration) * 100));
      setProgress(nextProgress);
      if (nextProgress === 100) window.clearInterval(timer);
    }, 80);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 100) return;

    const transitionTimer = window.setTimeout(() => {
      void navigate({
        to: "/resultado-capilar",
        search,
        replace: true,
      });
    }, 200);

    return () => window.clearTimeout(transitionTimer);
  }, [navigate, progress, search]);

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/objetivo-principal" search={search} aria-label="Voltar para a pergunta sobre seu objetivo">
              <ArrowLeft className="size-5" />
            </Link>
          </Button>
          <Link to="/" className="justify-self-center" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[52vw]" />
          </Link>
          <Button variant="outline" size="icon" className="size-10 rounded-full border-border bg-transparent text-foreground hover:bg-secondary" aria-label="Abrir menu">
            <Menu className="size-5" />
          </Button>
        </div>
        <QuizProgress currentStep={14} />
      </header>

      <main className="flex flex-1 px-5 py-9 sm:px-8 sm:py-12">
        <section className="mx-auto flex w-full max-w-[680px] flex-col" aria-labelledby="final-analysis-title">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Análise personalizada</p>
            <h1 id="final-analysis-title" className="mt-3 font-display text-[30px] font-normal leading-[1.2] sm:text-[38px]">
              {search.nome ? `${search.nome}, estamos analisando suas respostas` : "Estamos analisando suas respostas"}
            </h1>
            <p className="mx-auto mt-4 max-w-[560px] text-sm leading-6 text-muted-foreground sm:text-base">
              Estamos conectando cada detalhe para compreender seu momento capilar e suas prioridades.
            </p>
          </div>

          <div className="mt-9 space-y-6 sm:mt-11 sm:space-y-7" role="status" aria-live="polite" aria-label="Análise final do perfil capilar em andamento">
            {analysisStages.map((stage, index) => {
              const value = stageProgress(index);
              const isActive = index === activeStage && progress < 100;
              const isComplete = value === 100;
              return (
                <div key={stage}>
                  <div className="mb-2.5 flex min-h-6 items-center justify-between gap-4">
                    <span className={isActive || isComplete ? "text-sm font-medium text-foreground sm:text-base" : "text-sm font-medium text-muted-foreground sm:text-base"}>{stage}</span>
                    {isActive ? <span className="min-w-11 text-right text-sm font-semibold tabular-nums text-primary">{value}%</span> : isComplete ? <Check className="size-4 shrink-0 text-primary" aria-label="Concluído" /> : null}
                  </div>
                  <progress className="diagnosis-progress block h-2 w-full overflow-hidden rounded-full" value={value} max={100} aria-label={`${stage}: ${value}%`} />
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-10 flex items-center gap-4 border-t border-border px-5 pt-7 text-left sm:mt-12 sm:px-8">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary" aria-hidden="true"><ScanSearch className="size-5" /></span>
            <div>
              <p className="text-sm font-semibold text-foreground">Construindo seu perfil capilar</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Suas respostas estão sendo organizadas em uma análise feita para o seu momento.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}