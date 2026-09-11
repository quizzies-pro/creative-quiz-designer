import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu } from "lucide-react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";
type HairLossArea = "entradas" | "topo" | "coroa" | "entradas-topo" | "varias-regioes";
type HairThickness = "grossos" | "alguns-finos" | "maioria-fina" | "muito-finos" | "nao-percebo";

const validDurations: HairLossDuration[] = ["menos-6-meses", "6-meses-1-ano", "1-3-anos", "mais-3-anos", "incerto"];
const validAreas: HairLossArea[] = ["entradas", "topo", "coroa", "entradas-topo", "varias-regioes"];
const validThicknesses: HairThickness[] = ["grossos", "alguns-finos", "maioria-fina", "muito-finos", "nao-percebo"];

const thicknessOptions: Array<{
  value: HairThickness;
  label: string;
  strands: Array<"thick" | "medium" | "thin">;
}> = [
  { value: "grossos", label: "Meus fios ainda são grossos", strands: ["thick", "thick", "thick"] },
  { value: "alguns-finos", label: "Alguns fios estão mais finos", strands: ["thick", "medium", "thick"] },
  { value: "maioria-fina", label: "A maioria está mais fina", strands: ["medium", "medium", "thick"] },
  { value: "muito-finos", label: "Meus fios estão muito finos e frágeis", strands: ["thin", "thin", "thin"] },
  { value: "nao-percebo", label: "Não consigo perceber", strands: [] },
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

function parseThickness(value: unknown): HairThickness | undefined {
  return typeof value === "string" && validThicknesses.includes(value as HairThickness)
    ? (value as HairThickness)
    : undefined;
}

export const Route = createFileRoute("/espessura-fios")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseDuration(search["tempo"]),
    regiao: parseArea(search["regiao"]),
    espessura: parseThickness(search["espessura"]),
  }),
  head: () => ({
    meta: [
      { title: "Espessura dos fios | Stanley’s Care" },
      {
        name: "description",
        content: "Identifique a intensidade do afinamento dos fios para aprofundar sua análise capilar.",
      },
      { property: "og:title", content: "Espessura dos fios | Stanley’s Care" },
      {
        property: "og:description",
        content: "Conte como você percebe a espessura atual dos seus fios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairThicknessQuestion,
});

function HairThicknessQuestion() {
  const { nome, grau, tempo, regiao, espessura } = Route.useSearch();
  const navigate = useNavigate({ from: "/espessura-fios" });

  const selectThickness = (value: HairThickness) => {
    void navigate({
      to: "/couro-cabeludo",
      search: { nome, grau, tempo, regiao, espessura: value, couro: undefined },
    });
  };

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/regiao-queda"
              search={{ nome, grau, tempo, regiao }}
              aria-label="Voltar para a escolha da região da queda"
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
        <div className="absolute inset-x-0 -bottom-px h-1" aria-label="Etapa 7 do questionário">
          <div className="h-full w-[96%] bg-primary" />
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-10 sm:px-8 sm:py-14 lg:items-center lg:py-10">
        <section className="w-full max-w-[700px]" aria-labelledby="thickness-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Intensidade do afinamento</p>
            <h1 id="thickness-question" className="mx-auto mt-4 max-w-[670px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Como você percebe a espessura dos seus fios atualmente?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Escolha a opção que mais se aproxima da condição atual dos seus fios.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10">
            {thicknessOptions.map((option) => {
              const isSelected = espessura === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => selectThickness(option.value)}
                  className="group grid h-auto min-h-[68px] w-full grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border-border bg-card px-4 py-3 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[76px] sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:px-5"
                >
                  <span className="flex h-10 items-center justify-center gap-1 rounded-md bg-muted" aria-hidden="true">
                    {option.strands.length > 0 ? option.strands.map((strand, index) => (
                      <span
                        key={`${option.value}-${index}`}
                        className={`h-6 rounded-full bg-primary ${strand === "thick" ? "w-1" : strand === "medium" ? "w-0.5" : "w-px"}`}
                      />
                    )) : <span className="font-display text-lg font-normal text-muted-foreground">?</span>}
                  </span>
                  <span className="min-w-0 whitespace-normal text-sm font-semibold leading-5 sm:text-base">
                    {option.label}
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