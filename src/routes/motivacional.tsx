import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";

import motivationalMenImage from "@/assets/optimized/motivational-men.webp";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;

const motivationalCopy: Record<
  BaldnessDegree,
  { total: string; context: string; next: string }
> = {
  1: {
    total: "Mais de 12.000 homens",
    context:
      "com sinais iniciais de calvície já começaram a cuidar do cabelo antes que a queda avançasse.",
    next: "Você também pode começar agora.",
  },
  2: {
    total: "Mais de 18.000 homens",
    context:
      "com um grau de calvície semelhante ao seu já buscaram uma rotina personalizada para cuidar dos cabelos.",
    next: "O próximo passo é entender o seu caso.",
  },
  3: {
    total: "Mais de 25.000 homens",
    context:
      "com sinais mais avançados de calvície já começaram a buscar uma rotina específica para o seu perfil.",
    next: "Ainda existe um próximo passo para você.",
  },
  4: {
    total: "Mais de 30.000 homens",
    context:
      "com um grau avançado de calvície já passaram por uma avaliação para entender melhor suas possibilidades de cuidado.",
    next: "Agora é a sua vez de descobrir o seu caminho.",
  },
};

function parseDegree(value: unknown): BaldnessDegree {
  const degree = Number(value);
  return degree === 1 || degree === 2 || degree === 3 || degree === 4 ? degree : 1;
}

export const Route = createFileRoute("/motivacional")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
  }),
  head: () => ({
    meta: [
      { title: "Você não está sozinho | Stanley’s Care" },
      {
        name: "description",
        content: "Conheça homens que também decidiram dar o próximo passo no cuidado com os cabelos.",
      },
      { property: "og:title", content: "Você não está sozinho | Stanley’s Care" },
      {
        property: "og:description",
        content: "Descubra o próximo passo para uma rotina personalizada de cuidado capilar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MotivationalPage,
});

function MotivationalPage() {
  const { nome, grau } = Route.useSearch();
  const copy = motivationalCopy[grau];

  return (
    <div className="quiz-page-background flex min-h-dvh flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[60px] max-w-[1180px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-8">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/calvicie" search={{ nome }} aria-label="Voltar para a escolha do grau de calvície">
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
        <QuizProgress currentStep={4} />
      </header>

      <main className="flex flex-1 items-center px-5 py-10 sm:px-8 sm:py-14 lg:py-10">
        <section className="mx-auto grid w-full max-w-[980px] items-center gap-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)] lg:gap-16" aria-labelledby="motivational-title">
          <div className="max-w-[500px] lg:py-8">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Você não está sozinho</p>
            <h1 id="motivational-title" className="mt-4 font-display text-3xl font-semibold leading-none sm:text-4xl lg:text-[42px]">
              {copy.total}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              {copy.context}
            </p>
            <div className="mt-7 h-px w-full bg-border" />
            <p className="mt-7 font-display text-xl font-semibold leading-8 text-foreground sm:text-2xl">
              {copy.next}
            </p>
          </div>

          <div className="relative aspect-[4/3] min-h-0 overflow-hidden rounded-lg border border-border bg-card">
            <img
              src={motivationalMenImage}
              alt="Três homens em diferentes fases da vida que decidiram cuidar dos cabelos"
              width={1200}
              height={896}
              decoding="async"
              className="size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/60 to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase backdrop-blur-sm">
              Grau {grau}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[980px] justify-center">
          <Button asChild className="h-12 w-full max-w-[360px] rounded-lg text-sm font-bold">
            <Link to="/tempo-queda" search={{ nome, grau }}>
              Continuar
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}