import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu } from "lucide-react";

import currentIcon from "@/assets/treatment-icons/current.svg";
import neverIcon from "@/assets/treatment-icons/never.svg";
import professionalIcon from "@/assets/treatment-icons/professional.svg";
import severalIcon from "@/assets/treatment-icons/several.svg";
import supplementsIcon from "@/assets/treatment-icons/supplements.svg";
import topicalIcon from "@/assets/treatment-icons/topical.svg";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";
type HairLossArea = "entradas" | "topo" | "coroa" | "entradas-topo" | "varias-regioes";
type HairThickness = "grossos" | "alguns-finos" | "maioria-fina" | "muito-finos" | "nao-percebo";
type ScalpCondition = "normal" | "oleoso" | "muito-oleoso" | "seco" | "sensivel" | "nao-sei";
type PreviousTreatment = "nunca" | "shampoos-locoes" | "vitaminas-suplementos" | "indicado-profissional" | "varios" | "atualmente";

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];
const validScalpConditions: ScalpCondition[] = ["normal", "oleoso", "muito-oleoso", "seco", "sensivel", "nao-sei"];
const validTreatments: PreviousTreatment[] = ["nunca", "shampoos-locoes", "vitaminas-suplementos", "indicado-profissional", "varios", "atualmente"];

const treatmentOptions: Array<{ value: PreviousTreatment; icon: string; label: string }> = [
  { value: "nunca", icon: neverIcon, label: "Nunca fiz nenhum tratamento" },
  { value: "shampoos-locoes", icon: topicalIcon, label: "Usei shampoos ou loções" },
  { value: "vitaminas-suplementos", icon: supplementsIcon, label: "Usei vitaminas ou suplementos" },
  { value: "indicado-profissional", icon: professionalIcon, label: "Usei medicamentos/tratamentos indicados por profissional" },
  { value: "varios", icon: severalIcon, label: "Já tentei vários tratamentos" },
  { value: "atualmente", icon: currentIcon, label: "Estou fazendo algum tratamento atualmente" },
];

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

function parseOption<T extends string>(value: unknown, options: T[], fallback: T): T {
  return typeof value === "string" && options.includes(value as T) ? (value as T) : fallback;
}

function parseTreatment(value: unknown): PreviousTreatment | undefined {
  return typeof value === "string" && validTreatments.includes(value as PreviousTreatment)
    ? (value as PreviousTreatment)
    : undefined;
}

export const Route = createFileRoute("/tratamento-anterior")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseOption(search["tempo"], validDurations, "incerto"),
    regiao: parseOption(search["regiao"], validAreas, "entradas"),
    espessura: parseOption(search["espessura"], validThicknesses, "nao-percebo"),
    couro: parseOption(search["couro"], validScalpConditions, "nao-sei"),
    tratamento: parseTreatment(search["tratamento"]),
  }),
  head: () => ({
    meta: [
      { title: "Tratamentos capilares anteriores | Stanley’s Care" },
      { name: "description", content: "Conte se você já realizou algum tratamento para queda ou afinamento dos cabelos." },
      { property: "og:title", content: "Tratamentos capilares anteriores | Stanley’s Care" },
      { property: "og:description", content: "Seu histórico de tratamentos ajuda a personalizar sua avaliação capilar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PreviousTreatmentQuestion,
});

function PreviousTreatmentQuestion() {
  const { nome, grau, tempo, regiao, espessura, couro, tratamento } = Route.useSearch();
  const navigate = useNavigate({ from: "/tratamento-anterior" });

  const selectTreatment = (value: PreviousTreatment) => {
    void navigate({
      to: "/frequencia-cuidados",
      search: { nome, grau, tempo, regiao, espessura, couro, tratamento: value, frequencia: undefined },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/couro-cabeludo"
              search={{ nome, grau, tempo, regiao, espessura, couro }}
              aria-label="Voltar para a pergunta sobre o couro cabeludo"
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
        <QuizProgress currentStep={10} />
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-9 sm:px-8 sm:py-12 lg:items-center lg:py-9">
        <section className="w-full max-w-[720px]" aria-labelledby="treatment-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Histórico de cuidados</p>
            <h1 id="treatment-question" className="mx-auto mt-4 max-w-[690px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Você já fez algum tratamento para queda ou afinamento dos cabelos?
            </h1>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {treatmentOptions.map((option) => {
              const isSelected = tratamento === option.value;
              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectTreatment(option.value)}
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