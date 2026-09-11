import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu } from "lucide-react";

import dailyIcon from "@/assets/routine-icons/daily.svg";
import neverIcon from "@/assets/routine-icons/never.svg";
import rarelyIcon from "@/assets/routine-icons/rarely.svg";
import weeklyIcon from "@/assets/routine-icons/weekly.svg";
import unsureIcon from "@/assets/scalp-icons/unsure.svg";
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

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];
const validScalpConditions: ScalpCondition[] = ["normal", "oleoso", "muito-oleoso", "seco", "sensivel", "nao-sei"];
const validTreatments: PreviousTreatment[] = ["nunca", "shampoos-locoes", "vitaminas-suplementos", "indicado-profissional", "varios", "atualmente"];
const validFrequencies: CareFrequency[] = ["todos-dias", "algumas-vezes-semana", "raramente", "praticamente-nunca", "sem-rotina"];

const frequencyOptions: Array<{ value: CareFrequency; icon: string; label: string }> = [
  { value: "todos-dias", icon: dailyIcon, label: "Todos os dias" },
  { value: "algumas-vezes-semana", icon: weeklyIcon, label: "Algumas vezes por semana" },
  { value: "raramente", icon: rarelyIcon, label: "Raramente" },
  { value: "praticamente-nunca", icon: neverIcon, label: "Praticamente nunca" },
  { value: "sem-rotina", icon: unsureIcon, label: "Não tenho uma rotina definida" },
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

function parseFrequency(value: unknown): CareFrequency | undefined {
  return typeof value === "string" && validFrequencies.includes(value as CareFrequency)
    ? (value as CareFrequency)
    : undefined;
}

export const Route = createFileRoute("/frequencia-cuidados")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseOption(search["tempo"], validDurations, "incerto"),
    regiao: parseOption(search["regiao"], validAreas, "entradas"),
    espessura: parseOption(search["espessura"], validThicknesses, "nao-percebo"),
    couro: parseOption(search["couro"], validScalpConditions, "nao-sei"),
    tratamento: parseOption(search["tratamento"], validTreatments, "nunca"),
    frequencia: parseFrequency(search["frequencia"]),
  }),
  head: () => ({
    meta: [
      { title: "Frequência de cuidados capilares | Stanley’s Care" },
      { name: "description", content: "Conte com que frequência você usa produtos específicos no cabelo e couro cabeludo." },
      { property: "og:title", content: "Frequência de cuidados capilares | Stanley’s Care" },
      { property: "og:description", content: "Sua rotina de cuidados ajuda a personalizar sua avaliação capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareFrequencyQuestion,
});

function CareFrequencyQuestion() {
  const { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia } = Route.useSearch();
  const navigate = useNavigate({ from: "/frequencia-cuidados" });

  const selectFrequency = (value: CareFrequency) => {
    void navigate({
      to: "/periodo-afinamento",
      search: { nome, grau, tempo, regiao, espessura, couro, tratamento, frequencia: value, periodo: undefined },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/tratamento-anterior"
              search={{ nome, grau, tempo, regiao, espessura, couro, tratamento }}
              aria-label="Voltar para a pergunta sobre tratamentos anteriores"
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
        <QuizProgress currentStep={11} />
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-9 sm:px-8 sm:py-12 lg:items-center lg:py-9">
        <section className="w-full max-w-[720px]" aria-labelledby="frequency-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Rotina de cuidados</p>
            <h1 id="frequency-question" className="mx-auto mt-4 max-w-[700px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Com que frequência você cuida do seu cabelo e couro cabeludo com algum produto específico?
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {frequencyOptions.map((option) => {
              const isSelected = frequencia === option.value;
              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectFrequency(option.value)}
                  className="group grid h-auto min-h-[68px] w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border-border bg-card px-4 py-3 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[74px] sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5"
                >
                  <span className="grid size-9 place-items-center rounded-md bg-muted" aria-hidden="true">
                    <img src={option.icon} alt="" className="size-5 sm:size-6" />
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