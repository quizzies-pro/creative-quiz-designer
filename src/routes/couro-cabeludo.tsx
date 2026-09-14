import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu } from "lucide-react";

import dryIcon from "@/assets/scalp-icons/dry.svg";
import normalIcon from "@/assets/scalp-icons/normal.svg";
import oilyIcon from "@/assets/scalp-icons/oily.svg";
import sensitiveIcon from "@/assets/scalp-icons/sensitive.svg";
import unsureIcon from "@/assets/scalp-icons/unsure.svg";
import veryOilyIcon from "@/assets/scalp-icons/very-oily.svg";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";
type HairLossArea = "entradas" | "topo" | "coroa" | "entradas-topo" | "varias-regioes";
type HairThickness = "grossos" | "alguns-finos" | "maioria-fina" | "muito-finos" | "nao-percebo";
type ScalpCondition = "normal" | "oleoso" | "muito-oleoso" | "seco" | "sensivel" | "nao-sei";

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];
const validScalpConditions: ScalpCondition[] = ["normal", "oleoso", "muito-oleoso", "seco", "sensivel", "nao-sei"];

const scalpOptions: Array<{
  value: ScalpCondition;
  icon: string;
  title: string;
  description: string;
}> = [
  { value: "normal", icon: normalIcon, title: "Normal", description: "não é muito oleoso nem seco" },
  { value: "oleoso", icon: oilyIcon, title: "Oleoso", description: "fica com aspecto de oleosidade ao longo do dia" },
  { value: "muito-oleoso", icon: veryOilyIcon, title: "Muito oleoso", description: "preciso lavar com frequência" },
  { value: "seco", icon: dryIcon, title: "Seco", description: "sinto ressecamento ou descamação" },
  { value: "sensivel", icon: sensitiveIcon, title: "Sensível", description: "sinto coceira, irritação ou desconforto" },
  { value: "nao-sei", icon: unsureIcon, title: "Não sei dizer", description: "" },
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

function parseArea(value: unknown): HairLossArea {
  return typeof value === "string" && validAreas.includes(value as HairLossArea)
    ? (value as HairLossArea)
    : "entradas";
}

function parseThickness(value: unknown): HairThickness {
  return typeof value === "string" && validThicknesses.includes(value as HairThickness)
    ? (value as HairThickness)
    : "nao-percebo";
}

function parseScalpCondition(value: unknown): ScalpCondition | undefined {
  return typeof value === "string" && validScalpConditions.includes(value as ScalpCondition)
    ? (value as ScalpCondition)
    : undefined;
}

export const Route = createFileRoute("/couro-cabeludo")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseDuration(search["tempo"]),
    regiao: parseArea(search["regiao"]),
    espessura: parseThickness(search["espessura"]),
    couro: parseScalpCondition(search["couro"]),
  }),
  head: () => ({
    meta: [
      { title: "Condição do couro cabeludo | Stanley’s Care" },
      {
        name: "description",
        content: "Descreva como seu couro cabeludo se apresenta durante a maior parte do dia.",
      },
      { property: "og:title", content: "Condição do couro cabeludo | Stanley’s Care" },
      {
        property: "og:description",
        content: "Identifique a condição atual do seu couro cabeludo para personalizar sua avaliação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScalpConditionQuestion,
});

function ScalpConditionQuestion() {
  const { nome, grau, tempo, regiao, espessura, couro } = Route.useSearch();
  const navigate = useNavigate({ from: "/couro-cabeludo" });

  const selectCondition = (value: ScalpCondition) => {
    void navigate({
      to: "/tratamento-anterior",
      search: { nome, grau, tempo, regiao, espessura, couro: value, tratamento: undefined },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/espessura-fios"
              search={{ nome, grau, tempo, regiao, espessura }}
              aria-label="Voltar para a pergunta sobre a espessura dos fios"
            >
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
        <QuizProgress currentStep={9} />
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-9 sm:px-8 sm:py-12 lg:items-center lg:py-9">
        <section className="w-full max-w-[720px]" aria-labelledby="scalp-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Saúde do couro cabeludo</p>
            <h1 id="scalp-question" className="mx-auto mt-4 max-w-[680px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Como você descreveria seu couro cabeludo na maior parte do dia?
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {scalpOptions.map((option) => {
              const isSelected = couro === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectCondition(option.value)}
                  className="group grid h-auto min-h-[68px] w-full grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border-border bg-card px-4 py-3 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[74px] sm:grid-cols-[44px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5"
                >
                  <span className="grid size-9 place-items-center rounded-md bg-muted" aria-hidden="true">
                    <img src={option.icon} alt="" className="size-5 sm:size-6" />
                  </span>
                  <span className="min-w-0 whitespace-normal text-sm leading-5 sm:text-base">
                    <span className="font-semibold">{option.title}</span>
                    {option.description ? <span className="text-muted-foreground"> — {option.description}</span> : null}
                  </span>
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