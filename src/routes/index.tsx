import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
    <main className="quiz-page-background flex min-h-screen items-center justify-center bg-background px-4 py-6 text-foreground sm:px-8 sm:py-10">
      <section className="flex w-full max-w-[420px] flex-col items-center gap-5" aria-label="Introdução ao quiz">
        <div
          className="aspect-[9/16] w-full max-h-[calc(100vh-120px)] overflow-hidden rounded-lg border border-border bg-card shadow-2xl"
          aria-label="Espaço reservado para o vídeo de apresentação"
        />

        <Button asChild className="h-14 w-full justify-between rounded-lg px-6 text-base font-semibold shadow-lg">
          <Link to="/idade">
            Começar agora
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </Button>
      </section>
    </main>
  );
}