import { useMemo, useState } from 'react';
import { ClipboardCheck, CircleCheck as CheckCircle2, Circle as XCircle, RotateCcw } from 'lucide-react';
import { useQuizResultsStore } from '../store';
import { Button, Badge, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { Quiz, QuizAttempt } from '../types';

interface QuizRendererProps {
  quiz: Quiz;
}

function scoreBadgeVariant(percent: number): 'success' | 'warning' | 'error' {
  if (percent >= 80) return 'success';
  if (percent >= 50) return 'warning';
  return 'error';
}

export function QuizRenderer({ quiz }: QuizRendererProps) {
  const attempt = useQuizResultsStore((s) => s.quizzes[quiz.id]);
  const saveAttempt = useQuizResultsStore((s) => s.saveAttempt);
  const clearAttempt = useQuizResultsStore((s) => s.clearAttempt);

  const [answers, setAnswers] = useState<Record<string, number>>({});

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);

  const handleSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    let score = 0;
    for (const question of quiz.questions) {
      if (answers[question.id] === question.correctIndex) score += 1;
    }
    const nextAttempt: QuizAttempt = {
      answers,
      score,
      total: quiz.questions.length,
      completedAt: new Date().toISOString(),
    };
    saveAttempt(quiz.id, nextAttempt);
  };

  const handleRetry = () => {
    setAnswers({});
    clearAttempt(quiz.id);
  };

  const percent = useMemo(
    () => (attempt ? Math.round((attempt.score / attempt.total) * 100) : 0),
    [attempt],
  );

  if (attempt) {
    return (
      <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 lg:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <ClipboardCheck className="h-4 w-4 text-neutral-400" />
            {quiz.title}
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={scoreBadgeVariant(percent)}>
              {attempt.score} / {attempt.total} correct &middot; {percent}%
            </Badge>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RotateCcw className="h-4 w-4" />
              Retry Quiz
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {quiz.questions.map((question, index) => {
            const selected = attempt.answers[question.id];
            const isCorrect = selected === question.correctIndex;

            return (
              <Card key={question.id} className="p-4">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-error-600" />
                  )}
                  <p className="text-sm font-medium text-neutral-900">
                    {index + 1}. {question.prompt}
                  </p>
                </div>

                <ul className="mt-3 space-y-1.5 pl-6">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selected === optionIndex;
                    const isCorrectOption = optionIndex === question.correctIndex;

                    return (
                      <li
                        key={optionIndex}
                        className={cn(
                          'rounded-lg border px-3 py-1.5 text-sm',
                          isCorrectOption
                            ? 'border-success-300 bg-success-50 text-success-800'
                            : isSelected
                              ? 'border-error-300 bg-error-50 text-error-800'
                              : 'border-neutral-200 text-neutral-500',
                        )}
                      >
                        {option}
                        {isSelected && !isCorrectOption && (
                          <span className="ml-2 text-xs font-medium">Your answer</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {question.explanation && (
                  <p className="mt-2 pl-6 text-xs text-neutral-500">{question.explanation}</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-4 lg:p-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
        <ClipboardCheck className="h-4 w-4 text-neutral-400" />
        {quiz.title}
      </div>

      <div className="space-y-3">
        {quiz.questions.map((question, index) => (
          <fieldset key={question.id} className="rounded-lg border border-neutral-200 p-4" role="radiogroup" aria-label={`Question ${index + 1}: ${question.prompt}`}>
            <legend className="px-1 text-sm font-medium text-neutral-900">
              {index + 1}. {question.prompt}
            </legend>
            <div className="mt-2 space-y-1.5">
              {question.options.map((option, optionIndex) => {
                const inputId = `${question.id}-${optionIndex}`;
                const isSelected = answers[question.id] === optionIndex;

                return (
                  <label
                    key={optionIndex}
                    htmlFor={inputId}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
                      isSelected
                        ? 'border-primary-400 bg-primary-50 text-primary-800'
                        : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50',
                    )}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={question.id}
                      checked={isSelected}
                      aria-checked={isSelected}
                      onChange={() => handleSelect(question.id, optionIndex)}
                      className="h-4 w-4 accent-primary-600"
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-neutral-400">
          {Object.keys(answers).length} / {quiz.questions.length} answered
        </p>
        <Button variant="primary" size="sm" onClick={handleSubmit} disabled={!allAnswered}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
