import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChartNoAxesColumnIncreasing, Check, Menu, RefreshCw, ScanLine, ShieldCheck, Sparkles } from "lucide-react";

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

const goalOptions = [
  { value: "parar-queda" as const, label: "Parar a queda", icon: ShieldCheck },
  { value: "recuperar-densidade" as const, label: "Recuperar densidade", icon: ChartNoAxesColumnIncreasing },
  { value: "fortalecer-fios" as const, label: "Fortalecer os fios", icon: Sparkles },
  { value: "melhorar-entradas-coroa" as const, label: "Melhorar entradas/coroa", icon: ScanLine },
  { value: "rotina-completa" as const, label: "Ter uma rotina completa de cuidados", icon: RefreshCw },
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

function parseGoal(value: unknown): MainGoal | undefined {
  return typeof value === "string" && validGoals.includes(value as MainGoal) ? (value as MainGoal) : undefined;
}

export const Route = createFileRoute("/objetivo-principal")({
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
    objetivo: parseGoal(search["objetivo"]),
  }),
  head: () => ({
    meta: [
      { title: "Objetivo do cuidado capilar | Stanley’s Care" },
      { name: "description", content: "Escolha o principal objetivo que você deseja alcançar com seus cuidados capilares." },
      { property: "og:title", content: "Objetivo do cuidado capilar | Stanley’s Care" },
      { property: "og:description", content: "Defina sua prioridade para personalizar sua avaliação capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MainGoalQuestion,
});

function MainGoalQuestion() {
  const { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia, periodo, objetivo } = Route.useSearch();
  const navigate = useNavigate();

  const selectGoal = (value: MainGoal) => {
    void navigate({
      to: "/analise-final",
      search: { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia, periodo, objetivo: value },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/periodo-afinamento"
              search={{ nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia, periodo }}
              aria-label="Voltar para a pergunta sobre o período do afinamento"
            >
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
        <QuizProgress currentStep={13} />
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-9 sm:px-8 sm:py-12 lg:items-center lg:py-9">
        <section className="w-full max-w-[720px]" aria-labelledby="goal-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Seu objetivo</p>
            <h1 id="goal-question" className="mx-auto mt-4 max-w-[680px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Qual é o seu principal objetivo hoje?
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {goalOptions.map((option) => {
              const isSelected = objetivo === option.value;
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectGoal(option.value)}
                  className="group grid h-auto min-h-[68px] w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border-border bg-card px-4 py-3 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[74px] sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5"
                >
                  <span className="grid size-9 place-items-center rounded-md bg-muted text-primary" aria-hidden="true">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 whitespace-normal text-sm font-semibold leading-5 sm:text-base">{option.label}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-muted-foreground/60 text-transparent transition group-aria-pressed:border-primary group-aria-pressed:bg-primary group-aria-pressed:text-primary-foreground sm:size-8">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                </Button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}