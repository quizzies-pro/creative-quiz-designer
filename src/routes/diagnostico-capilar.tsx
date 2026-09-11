import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, Check, Menu, ScanSearch } from "lucide-react";

import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { Button } from "@/components/ui/button";

type BaldnessDegree = 1 | 2 | 3 | 4;
type HairLossDuration = "menos-6-meses" | "6-meses-1-ano" | "1-3-anos" | "mais-3-anos" | "incerto";

const validDurations: HairLossDuration[] = [
  "menos-6-meses",
  "6-meses-1-ano",
  "1-3-anos",
  "mais-3-anos",
  "incerto",
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

export const Route = createFileRoute("/diagnostico-capilar")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search["nome"] === "string" ? search["nome"].slice(0, 80).trim() : "",
    grau: parseDegree(search["grau"]),
    tempo: parseDuration(search["tempo"]),
  }),
  head: () => ({
    meta: [
      { title: "Análise do seu histórico capilar | Stanley’s Care" },
      {
        name: "description",
        content: "Entenda por que o histórico da queda ajuda a identificar seu perfil capilar.",
      },
      { property: "og:title", content: "Análise do seu histórico capilar | Stanley’s Care" },
      {
        property: "og:description",
        content: "Seu histórico ajuda a orientar a análise do padrão da queda e do afinamento dos fios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HairDiagnosisTransition,
});

function HairDiagnosisTransition() {
  const { nome, grau } = Route.useSearch();

  return (
    <div className="quiz-page-background flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative border-b border-border/70">
        <div className="mx-auto grid h-[72px] max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 sm:px-8 lg:px-12">
          <Button asChild variant="ghost" size="icon" className="size-10 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Link to="/tempo-queda" search={{ nome, grau }} aria-label="Voltar para a pergunta sobre o tempo de queda">
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
        <div className="absolute inset-x-0 -bottom-px h-1" aria-label="Análise do histórico em andamento">
          <div className="h-full w-[82%] bg-primary" />
        </div>
      </header>

      <main className="flex flex-1 items-center px-5 py-10 sm:px-8 sm:py-14 lg:py-12">
        <section className="mx-auto grid w-full max-w-[1040px] items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-20" aria-labelledby="diagnosis-title">
          <div className="max-w-[620px]">
            <p className="text-xs font-semibold uppercase text-primary sm:text-sm">Análise do seu histórico</p>
            <h1 id="diagnosis-title" className="mt-4 font-display text-[30px] font-normal leading-[1.2] sm:text-[38px]">
              {nome ? `${nome}, seu histórico já revela algo importante.` : "Seu histórico já revela algo importante."}
            </h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Quanto maior o tempo de evolução, mais importante é entender o padrão da queda e o nível de afinamento dos fios.
            </p>

            <div className="mt-8 flex items-start gap-4 border-y border-border py-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-primary" aria-hidden="true">
                <ScanSearch className="size-5" />
              </span>
              <p className="pt-1 text-sm font-medium leading-6 text-foreground sm:text-base">
                Estamos cruzando suas respostas para identificar o seu perfil capilar.
              </p>
            </div>

            <div className="mt-7 flex items-start gap-3">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                <span className="font-semibold text-foreground">Próxima etapa:</span> vamos analisar onde a perda de cabelo está mais concentrada.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8" aria-label="Representação da análise do perfil capilar">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Perfil capilar</p>
                <p className="mt-1 font-display text-lg font-medium">Análise em andamento</p>
              </div>
              <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                <Activity className="size-5" />
              </span>
            </div>

            <div className="relative mx-auto my-9 grid aspect-square w-[72%] place-items-center rounded-full border border-border bg-background/50">
              <div className="absolute inset-[12%] rounded-full border border-primary/30" />
              <div className="absolute inset-x-[4%] top-1/2 h-px bg-primary/40" />
              <div className="absolute inset-y-[4%] left-1/2 w-px bg-primary/40" />
              <ScanSearch className="relative size-20 text-primary" strokeWidth={1.25} />
              <span className="absolute right-[15%] top-[20%] size-2 rounded-full bg-primary" />
              <span className="absolute bottom-[22%] left-[18%] size-1.5 rounded-full bg-muted-foreground" />
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border pt-5 text-center">
              {['Histórico', 'Padrão', 'Fios'].map((item) => (
                <div key={item}>
                  <span className="mx-auto block h-1 w-full rounded-full bg-primary/70" />
                  <span className="mt-2 block text-xs font-medium text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}