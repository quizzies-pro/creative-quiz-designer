import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu } from "lucide-react";
import { useState } from "react";

import crownAsset from "@/assets/regiao-coroa.jpg.asset.json";
import hairlineAsset from "@/assets/regiao-entradas.jpg.asset.json";
import hairlineTopAsset from "@/assets/regiao-entradas-topo.jpg.asset.json";
import topAsset from "@/assets/regiao-topo-da-cabeca.jpg.asset.json";
import multipleAreasAsset from "@/assets/regiao-varias-regioes.jpg.asset.json";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";
type HairLossArea = "entradas" | "topo" | "coroa" | "entradas-topo" | "varias-regioes";

const validDurations: HairLossDuration[] = [
  "menos-6-meses",
  "6-meses-1-ano",
  "1-3-anos",
  "mais-3-anos",
  "incerto",
];

const areaOptions: Array<{
  value: HairLossArea;
  label: string;
  image: string;
  imagePosition?: string;
}> = [
  { value: "entradas", label: "Entradas", image: hairlineAsset.url },
  { value: "topo", label: "Topo da cabeça", image: topAsset.url },
  { value: "coroa", label: "Coroa", image: crownAsset.url },
  { value: "entradas-topo", label: "Entradas + topo", image: hairlineTopAsset.url },
  { value: "varias-regioes", label: "Em várias regiões da cabeça", image: multipleAreasAsset.url },
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

export const Route = createFileRoute("/regiao-queda")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseDuration(search["tempo"]),
  }),
  head: () => ({
    meta: [
      { title: "Região da queda de cabelo | Stanley’s Care" },
      {
        name: "description",
        content: "Identifique onde o cabelo está ficando mais fino ou rarefeito para personalizar sua análise.",
      },
      { property: "og:title", content: "Região da queda de cabelo | Stanley’s Care" },
      {
        property: "og:description",
        content: "Selecione visualmente a região em que você percebe maior afinamento ou queda de cabelo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairLossAreaQuestion,
});

function HairLossAreaQuestion() {
  const { nome, grau, tempo } = Route.useSearch();
  const [selectedArea, setSelectedArea] = useState<HairLossArea | null>(null);

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link
              to="/diagnostico-capilar"
              search={{ nome, grau, tempo }}
              aria-label="Voltar para a análise do histórico capilar"
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
        <div className="absolute inset-x-0 -bottom-px h-1" aria-label="Etapa 6 do questionário">
          <div className="h-full w-[88%] bg-primary" />
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-5 py-9 sm:px-8 sm:py-12">
        <section className="w-full max-w-[760px]" aria-labelledby="area-question">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Padrão da queda</p>
            <h1 id="area-question" className="mx-auto mt-3 max-w-[700px] font-display text-[28px] font-normal leading-[1.2] sm:text-[34px]">
              Onde você percebe que seu cabelo está ficando mais fino ou rarefeito?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Escolha a imagem que melhor representa o que você percebe hoje.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:mt-9">
            {areaOptions.map((option) => {
              const isSelected = selectedArea === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedArea(option.value)}
                  className="group grid h-auto min-h-[92px] w-full grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-4 overflow-hidden rounded-lg border-border bg-card p-2 pr-4 text-left text-card-foreground shadow-none transition duration-200 hover:border-primary/70 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-secondary sm:min-h-[108px] sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:gap-5 sm:p-2.5 sm:pr-5"
                >
                  <span className="aspect-square size-[76px] overflow-hidden rounded-md bg-muted sm:size-[88px]">
                    <img
                      src={option.image}
                      alt={`Exemplo visual: ${option.label}`}
                      width={1792}
                      height={2400}
                      className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.035]"
                    />
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