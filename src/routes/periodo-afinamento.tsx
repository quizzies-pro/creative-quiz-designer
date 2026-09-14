import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock, CalendarDays, CalendarRange, CalendarSync, Check, Menu } from "lucide-react";

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

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];
const validScalpConditions: ScalpCondition[] = ["normal", "oleoso", "muito-oleoso", "seco", "sensivel", "nao-sei"];
const validTreatments: PreviousTreatment[] = ["nunca", "shampoos-locoes", "vitaminas-suplementos", "indicado-profissional", "varios", "atualmente"];
const validFrequencies: CareFrequency[] = ["todos-dias", "algumas-vezes-semana", "raramente", "praticamente-nunca", "sem-rotina"];
const validPeriods: PerceivedPeriod[] = ["dias", "meses", "um-ano", "mais-de-um-ano"];

const periodOptions = [
  { value: "dias" as const, label: "Dias", icon: CalendarDays },
  { value: "meses" as const, label: "Meses", icon: CalendarRange },
  { value: "um-ano" as const, label: "1 ano", icon: CalendarClock },
  { value: "mais-de-um-ano" as const, label: "Mais de 1 ano", icon: CalendarSync },
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

function parsePeriod(value: unknown): PerceivedPeriod | undefined {
  return typeof value === "string" && validPeriods.includes(value as PerceivedPeriod)
    ? (value as PerceivedPeriod)
    : undefined;
}

export const Route = createFileRoute("/periodo-afinamento")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseOption(search["tempo"], validDurations, "incerto"),
    regiao: parseOption(search["regiao"], validAreas, "entradas"),
    espessura: parseOption(search["espessura"], validThicknesses, "nao-percebo"),
    couro: parseOption(search["couro"], validScalpConditions, "nao-sei"),
    tratamento: parseOption(search["tratamento"], validTreatments, "nunca"),
    frequencia: parseOption(search["frequencia"], validFrequencies, "sem-rotina"),
    periodo: parsePeriod(search["periodo"]),
  }),
  head: () => ({
    meta: [
      { title: "Período do afinamento capilar | Stanley’s Care" },
      { name: "description", content: "Informe se você percebe o afinamento ou a queda dos cabelos há dias, meses ou anos." },
      { property: "og:title", content: "Período do afinamento capilar | Stanley’s Care" },
      { property: "og:description", content: "Identifique há quanto tempo o afinamento ou a queda se tornou perceptível." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PerceivedPeriodQuestion,
});

function PerceivedPeriodQuestion() {
  const { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia, periodo } = Route.useSearch();
  const navigate = useNavigate({ from: "/periodo-afinamento" });

  const selectPeriod = (value: PerceivedPeriod) => {
    void navigate({
      to: "/objetivo-principal",
      search: { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia, periodo: value, objetivo: undefined },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/frequencia-cuidados"
              search={{ nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia }}
              aria-label="Voltar para a pergunta sobre frequência de cuidados"
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
        <QuizProgress currentStep={12} />
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-12 sm:px-8 sm:py-16 lg:items-center lg:py-10">
        <section className="w-full max-w-[720px]" aria-labelledby="period-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Tempo percebido</p>
            <h1 id="period-question" className="mx-auto mt-4 max-w-[680px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Há quanto tempo você percebe o afinamento/queda?
            </h1>
          </div>

          <div className="mx-auto mt-8 grid max-w-[620px] gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
            {periodOptions.map((option) => {
              const isSelected = periodo === option.value;
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectPeriod(option.value)}
                  className="group grid h-auto min-h-[88px] w-full grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border-border bg-card px-5 py-4 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[104px]"
                >
                  <span className="grid size-10 place-items-center rounded-md bg-muted text-primary" aria-hidden="true">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 whitespace-normal text-base font-semibold leading-5 sm:text-lg">{option.label}</span>
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