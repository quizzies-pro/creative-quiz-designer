import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comece sua avaliação capilar | Stanley’s Care" },
      {
        name: "description",
        content: "Comece sua avaliação capilar personalizada Stanley’s Care.",
      },
      { property: "og:title", content: "Avaliação capilar | Stanley’s Care" },
      {
        property: "og:description",
        content: "Dê o primeiro passo para entender melhor o seu perfil capilar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoOpening,
});

function VideoOpening() {
  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-3 px-5 sm:px-8">
          <span aria-hidden="true" />
          <Link to="/" className="justify-self-center" aria-label="Stanley’s Care — início">
            <img src={logoAsset.url} alt="Stanley’s Care" className="h-auto w-[190px] max-w-[58vw]" />
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="size-10 shrink-0 rounded-full border-border bg-transparent text-foreground hover:bg-secondary"
            aria-label="Abrir menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-4 py-6 sm:px-8 sm:py-7">
        <section className="flex w-full max-w-[500px] flex-col items-center gap-4" aria-labelledby="opening-title">
          <div className="max-w-[500px] text-center">
            <p className="mb-3 text-[10px] font-bold uppercase text-primary sm:text-xs">Avaliação capilar personalizada</p>
            <h1
              id="opening-title"
              className="font-display text-[30px] font-semibold leading-[1.02] sm:text-[38px]"
            >
              O produto certo com um diagnóstico personalizado, veja o que seu cabelo pode estar tentando dizer
            </h1>
            <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-muted-foreground sm:text-base">
              Assista ao vídeo e descubra por que entender os sinais da queda é o primeiro passo para cuidar melhor dos seus fios.
            </p>
          </div>

          <div
            className="aspect-[9/16] w-full max-w-[250px] max-h-[calc(100vh-330px)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl sm:max-w-[270px]"
            aria-label="Espaço reservado para o vídeo de apresentação"
          />

          <Button asChild className="h-12 w-full max-w-[360px] justify-center rounded-lg px-6 text-sm font-bold">
            <Link to="/idade">
              Começar agora
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}