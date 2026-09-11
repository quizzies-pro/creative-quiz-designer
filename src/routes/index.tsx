import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CircleHelp, Menu } from "lucide-react";
import { useState } from "react";

import age1829Asset from "@/assets/age-18-29.jpg.asset.json";
import age3039Asset from "@/assets/age-30-39.jpg.asset.json";
import age4049Asset from "@/assets/age-40-49.jpg.asset.json";
import age50PlusAsset from "@/assets/age-50-plus.jpg.asset.json";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Escolha sua idade | Stanley’s Care" },
      {
        name: "description",
        content: "Comece seu plano personalizado Stanley’s Care escolhendo sua faixa etária.",
      },
      { property: "og:title", content: "Plano personalizado | Stanley’s Care" },
      {
        property: "og:description",
        content: "Escolha sua faixa etária para iniciar seu plano personalizado Stanley’s Care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ageRanges = [
  { label: "18–29", image: age1829Asset.url },
  { label: "30–39", image: age3039Asset.url },
  { label: "40–49", image: age4049Asset.url },
  { label: "50+", image: age50PlusAsset.url },
] as const;

type AgeRange = (typeof ageRanges)[number]["label"];

function Index() {
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);
  const navigate = useNavigate();

  return (
    <div className="quiz-page-background relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      <header className="border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-12">
          <a href="/" className="min-w-0" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[58vw]" />
          </a>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full border-border bg-transparent text-foreground hover:bg-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <main className="relative flex flex-1 items-start justify-center px-4 pb-10 pt-10 sm:px-8 sm:pb-28 sm:pt-16 lg:pt-14">
        <section className="relative w-full max-w-[930px]" aria-labelledby="page-title">
          <div className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase text-primary sm:text-sm">Seu plano personalizado</p>
            <h1 id="page-title" className="font-display text-3xl font-bold uppercase sm:text-4xl lg:text-[42px]">
              Plano de tratamento
            </h1>
            <p className="mt-5 text-base font-semibold uppercase text-muted-foreground sm:text-lg">
              Escolha a sua idade
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
            {ageRanges.map(({ label, image }) => {
              const isSelected = selectedAge === label;
              return (
                <Button
                  key={label}
                  type="button"
                  variant="outline"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelectedAge(label);
                    void navigate({ to: "/nome" });
                  }}
                  className="group relative aspect-[0.76] h-auto min-w-0 overflow-hidden rounded-2xl border-border bg-card p-0 text-left text-card-foreground shadow-none transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-card focus-visible:ring-2 focus-visible:ring-primary aria-pressed:border-primary aria-pressed:bg-card"
                >
                  <span className="absolute inset-0 overflow-hidden bg-secondary">
                    <img
                      src={image}
                      alt={`Homem representando a faixa etária de ${label} anos`}
                      className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  </span>
                  <span className="absolute inset-x-1.5 bottom-1.5 grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-xl bg-foreground px-3 py-2 text-background sm:inset-x-2 sm:bottom-2 sm:min-h-14 sm:px-4">
                    <span className="min-w-0 truncate text-sm font-bold sm:text-base">Idade: {label}</span>
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-0.5 sm:size-9">
                      <ArrowRight className="size-4 sm:size-5" />
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-border pt-5 text-center text-xs leading-5 text-muted-foreground sm:text-sm">
            <p>
              Ao escolher sua idade e continuar, você concorda com nossos{" "}
              <a href="/termos" className="text-primary underline underline-offset-4">Termos de Serviço</a>{" "}
              e{" "}<a href="/privacidade" className="text-primary underline underline-offset-4">Política de Privacidade</a>.
            </p>
            <p>Leia antes de continuar.</p>
          </div>
        </section>
      </main>

      <Button
        variant="secondary"
        className="fixed bottom-5 right-6 hidden h-10 rounded-full border border-border px-4 shadow-lg sm:inline-flex"
        aria-label="Abrir ajuda"
      >
        <CircleHelp className="size-4" />
        <span>Ajuda</span>
      </Button>
    </div>
  );
}
