import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Clock3, Crosshair, Menu, ScanLine, Sparkles } from "lucide-react";

import degree1Image from "@/assets/optimized/baldness-degree-1.webp";
import degree2Image from "@/assets/optimized/baldness-degree-2.webp";
import degree3Image from "@/assets/optimized/baldness-degree-3.webp";
import degree4Image from "@/assets/optimized/baldness-degree-4.webp";
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

const degreeProfiles = {
  1: {
    image: degree1Image,
    level: "Atenção moderada",
    markerClass: "left-[12%]",
    alert: "Sinais iniciais de afinamento",
    description: "Seu padrão indica um estágio inicial. Este é um bom momento para adotar uma rotina consistente e cuidar dos fios antes que a queda avance.",
  },
  2: {
    image: degree2Image,
    level: "Atenção moderada",
    markerClass: "left-[28%]",
    alert: "Progressão visível da calvície",
    description: "Seu padrão já apresenta áreas de menor densidade. Uma rotina direcionada e contínua é importante para cuidar do couro cabeludo e fortalecer os fios.",
  },
  3: {
    image: degree3Image,
    level: "Atenção elevada",
    markerClass: "left-[63%]",
    alert: "Afinamento em estágio avançado",
    description: "Seu padrão mostra perda de densidade mais acentuada. Começar agora uma rotina específica para seu perfil deve ser uma prioridade.",
  },
  4: {
    image: degree4Image,
    level: "Atenção prioritária",
    markerClass: "left-[90%]",
    alert: "Padrão avançado de calvície",
    description: "Seu padrão exige atenção especial. Recomendamos uma rotina de cuidados Stanley’s Care acompanhada de avaliação com um profissional de saúde.",
  },
} as const;

const durationLabels: Record<HairLossDuration, string> = {
  "menos-6-meses": "Menos de 6 meses",
  "6-meses-1-ano": "De 6 meses a 1 ano",
  "1-3-anos": "De 1 a 3 anos",
  "mais-3-anos": "Mais de 3 anos",
  incerto: "Tempo incerto",
};

const areaLabels: Record<HairLossArea, string> = {
  entradas: "Entradas",
  topo: "Topo da cabeça",
  coroa: "Coroa",
  "entradas-topo": "Entradas e topo",
  "varias-regioes": "Várias regiões",
};

const thicknessLabels: Record<HairThickness, string> = {
  grossos: "Fios ainda grossos",
  "alguns-finos": "Alguns fios mais finos",
  "maioria-fina": "Maioria dos fios mais fina",
  "muito-finos": "Fios muito finos e frágeis",
  "nao-percebo": "Espessura não percebida",
};

const goalLabels: Record<MainGoal, string> = {
  "parar-queda": "Reduzir a queda",
  "recuperar-densidade": "Recuperar densidade",
  "fortalecer-fios": "Fortalecer os fios",
  "melhorar-entradas-coroa": "Cuidar das entradas e coroa",
  "rotina-completa": "Criar uma rotina completa",
};

export const Route = createFileRoute("/resultado-capilar")({
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
      { title: "Seu resultado capilar | Stanley’s Care" },
      { name: "description", content: "Veja o resumo personalizado do seu perfil capilar e o próximo cuidado recomendado." },
      { property: "og:title", content: "Seu resultado capilar | Stanley’s Care" },
      { property: "og:description", content: "Um resumo personalizado do seu grau de calvície, sinais percebidos e próximos cuidados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairResult,
});

function HairResult() {
  const search = Route.useSearch();
  const profile = degreeProfiles[search.grau];

  const insights = [
    { label: "Tempo percebido", value: durationLabels[search.tempo], icon: Clock3 },
    { label: "Região principal", value: areaLabels[search.regiao], icon: Crosshair },
    { label: "Condição dos fios", value: thicknessLabels[search.espessura], icon: ScanLine },
    { label: "Principal objetivo", value: goalLabels[search.objetivo], icon: Sparkles },
  ];

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background pb-24 text-foreground sm:pb-28">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <span aria-hidden="true" />
          <Link to="/" className="justify-self-center" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[52vw]" />
          </Link>
          <Button variant="outline" size="icon" className="size-10 rounded-full border-border bg-transparent text-foreground hover:bg-secondary" aria-label="Abrir menu">
            <Menu className="size-5" />
          </Button>
        </div>
        <QuizProgress currentStep={15} />
      </header>

      <main className="flex flex-1 px-4 py-8 sm:px-8 sm:py-10">
        <section className="mx-auto w-full max-w-[1160px]" aria-labelledby="result-title">
          <div className="mb-7 text-center sm:mb-9">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Avaliação concluída</p>
            <h1 id="result-title" className="mt-3 font-display text-[30px] font-normal leading-[1.2] sm:text-[38px]">
              {search.nome ? `${search.nome}, este é o resumo do seu perfil` : "Resumo do seu perfil capilar"}
            </h1>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)]">
            <div className="p-5 sm:p-8 lg:p-9">
              <h2 className="font-display text-xl font-normal sm:text-2xl">Nível de atenção capilar</h2>

              <div className="mt-8 px-1">
                <div className="relative pt-9">
                  <div className={`absolute top-0 -translate-x-1/2 ${profile.markerClass}`}>
                    <span className="block whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background">Seu nível</span>
                    <span className="mx-auto block h-3 w-px bg-foreground" />
                  </div>
                  <div className="result-level-track h-2 rounded-full" />
                  <span className={`absolute top-[2.05rem] size-4 -translate-x-1/2 rounded-full border-[3px] border-foreground bg-card ${profile.markerClass}`} />
                </div>
                 <div className="mt-3 grid grid-cols-3 text-[10px] text-muted-foreground sm:text-xs">
                   <span>Moderada</span><span className="text-center">Elevada</span><span className="text-right">Prioritária</span>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-destructive/70 bg-destructive/15 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="size-5 shrink-0 text-destructive" aria-hidden="true" />
                  <h2 className="font-semibold">{profile.alert}</h2>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{profile.description}</p>
              </div>

              <div className="mt-5 grid gap-2.5">
                {insights.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="grid min-h-[62px] grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border bg-background/35 px-4 py-2.5">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-0.5 text-sm font-semibold leading-5 text-foreground sm:text-base">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden border-t border-border bg-secondary lg:min-h-0 lg:border-l lg:border-t-0">
              <img src={profile.image} alt={`Referência visual selecionada para calvície grau ${search.grau}`} width={760} height={1018} decoding="async" className="absolute inset-0 size-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <div className="inline-flex rounded-md border border-primary/50 bg-card/90 px-3 py-1 text-xs font-semibold uppercase text-primary backdrop-blur-sm">Grau {search.grau}</div>
                <h2 className="mt-3 max-w-md font-display text-2xl font-normal leading-tight sm:text-3xl">{profile.level}</h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Seu perfil indica que uma rotina Stanley’s Care direcionada ao seu momento é o próximo passo recomendado.</p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-5 max-w-[850px] text-center text-[11px] leading-5 text-muted-foreground">
            Esta avaliação é baseada nas respostas informadas e não substitui diagnóstico ou orientação de um profissional de saúde.
          </p>
        </section>
      </main>

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-primary/30 bg-background/95 px-4 pt-3 shadow-[0_-12px_32px_hsl(var(--background)/0.72)] backdrop-blur-xl sm:px-8 sm:pt-4">
        <Button asChild className="mx-auto flex h-14 w-full max-w-[520px] justify-between rounded-lg px-6 text-base font-semibold shadow-[0_0_28px_hsl(var(--primary)/0.32)] transition-transform hover:scale-[1.01] sm:h-16 sm:text-lg">
          <Link to="/recado-dr-stanley" search={search}>
            Quero iniciar meu cuidado
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}