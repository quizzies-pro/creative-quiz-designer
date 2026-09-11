import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Menu, ScanSearch, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import newsHistoryAsset from "@/assets/noticia-historico-capilar.png.asset.json";
import logoAsset from "@/assets/stanleys-care-logo.webp.asset.json";
import { QuizProgress } from "@/components/quiz/quiz-progress";
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
  const { nome, grau, tempo } = Route.useSearch();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const progressDuration = 2600;

    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      setProgress(Math.min(100, Math.round((elapsed / progressDuration) * 100)));
    }, 30);

    const transitionTimer = window.setTimeout(() => {
      setProgress(100);
      void navigate({
        to: "/regiao-queda",
        search: { nome, grau, tempo, regiao: undefined },
        replace: true,
      });
    }, 2800);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(transitionTimer);
    };
  }, [grau, navigate, nome, tempo]);

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
        <QuizProgress currentStep={6} />
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

          <div className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-xl border border-border bg-card" aria-label="Análise do perfil capilar em andamento">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={newsHistoryAsset.url}
                alt="Notícia sobre a importância do histórico da queda e do afinamento dos cabelos"
                width={768}
                height={768}
                className="size-full object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
              <span className="absolute bottom-4 left-5 rounded-full border border-primary/30 bg-background/85 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm">
                Análise em processamento
              </span>
            </div>

            <div className="flex flex-col items-center px-6 pb-7 pt-5 text-center sm:px-8 sm:pb-8">
              <div>
                <p className="font-display text-xl font-semibold text-foreground">Processando seu perfil</p>
                <p className="mx-auto mt-2 max-w-[330px] text-sm leading-6 text-muted-foreground">
                  Estamos avaliando suas respostas para identificar os principais sinais do seu histórico capilar.
                </p>
              </div>

              <div className="mt-7 w-full" role="status" aria-live="polite">
                <div className="flex items-center justify-between gap-4 text-primary">
                  <span className="text-xs font-bold uppercase">Cruzando suas respostas</span>
                  <span className="min-w-10 text-right text-sm font-semibold tabular-nums">{progress}%</span>
                </div>
                <progress
                  className="diagnosis-progress mt-3 h-2 w-full overflow-hidden rounded-full"
                  value={progress}
                  max={100}
                  aria-label={`Análise do perfil capilar: ${progress}%`}
                />
              </div>

              <div className="mt-7 flex items-center gap-2 border-t border-border pt-5 text-muted-foreground">
                <ShieldCheck className="size-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase">Análise segura do seu histórico</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}