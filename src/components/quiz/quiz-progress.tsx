type QuizProgressProps = {
  currentStep: number;
};

const TOTAL_QUIZ_STEPS = 15;

export function QuizProgress({ currentStep }: QuizProgressProps) {
  const safeStep = Math.min(Math.max(currentStep, 1), TOTAL_QUIZ_STEPS);

  return (
    <div className="absolute inset-x-0 -bottom-px h-1">
      <progress
        className="quiz-progress block h-full w-full"
        value={safeStep}
        max={TOTAL_QUIZ_STEPS}
        aria-label={`Etapa ${safeStep} de ${TOTAL_QUIZ_STEPS} do questionário`}
      />
    </div>
  );
}
