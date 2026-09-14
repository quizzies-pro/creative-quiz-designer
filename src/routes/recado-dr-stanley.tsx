import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Play } from "lucide-react";

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

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

export const Route = createFileRoute("/recado-dr-stanley")({
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
      { title: "Recado do Dr. Stanley Bittar | Stanley’s Care" },
      { name: "description", content: "Assista a um recado importante do Dr. Stanley Bittar sobre os próximos passos do seu cuidado capilar." },
      { property: "og:title", content: "Recado do Dr. Stanley Bittar | Stanley’s Care" },
      { property: "og:description", content: "Uma orientação importante antes de conhecer o próximo passo do seu cuidado capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DoctorMessage,
});

function DoctorMessage() {
  const search = Route.useSearch();
  const firstName = search.nome.split(" ")[0] || "você";

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <span aria-hidden="true" />
          <Link to="/" className="justify-self-center" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[52vw]" />
          </Link>
          <Button variant="outline" size="icon" className="size-10 rounded-full border-border bg-transparent text-foreground hover:bg-secondary" aria-label="Abrir menu">
            <Menu className="size-5" />
          </Button>
        </div>
        <QuizProgress currentStep={16} />
      </header>

      <main className="flex flex-1 justify-center px-4 py-8 sm:px-8 sm:py-10">
        <section className="flex w-full max-w-[520px] flex-col items-center" aria-labelledby="doctor-message-title">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Orientação do especialista</p>
            <h1 id="doctor-message-title" className="mt-3 font-display text-[28px] font-normal leading-tight sm:text-[36px]">
              Recado importante para {firstName}, do Dr. Stanley Bittar
            </h1>
            <p className="mx-auto mt-4 max-w-[480px] text-sm leading-6 text-muted-foreground sm:text-base">
              Antes de seguir, assista a esta orientação. Ela explica por que agir no momento certo pode fazer diferença no cuidado com seus cabelos.
            </p>
          </div>

          <div className="relative mt-7 aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-lg border border-border bg-card shadow-2xl sm:max-w-[300px]" aria-label="Espaço reservado para o vídeo do Dr. Stanley Bittar">
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full border border-primary/40 bg-primary/15 text-primary" aria-hidden="true">
                <Play className="ml-1 size-7" />
              </span>
            </div>
          </div>

          <Button type="button" disabled className="mt-5 h-14 w-full max-w-[420px] justify-between rounded-lg px-6 text-base font-semibold">
            Continuar
            <ArrowRight className="size-5" aria-hidden="true" />
          </Button>
        </section>
      </main>
    </div>
  );
}