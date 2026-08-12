export type QuizQuestionType = 'multiple-choice' | 'true-false';

export interface QuizQuestion {
  readonly id: string;
  readonly type: QuizQuestionType;
  readonly prompt: string;
  readonly options: string[];
  readonly correctIndex: number;
  readonly explanation?: string;
}

export interface Quiz {
  readonly id: string;
  readonly lessonId: string;
  readonly title: string;
  readonly questions: QuizQuestion[];
}

/** A single completed run of a quiz. Retrying overwrites the stored attempt. */
export interface QuizAttempt {
  readonly answers: Record<string, number>;
  readonly score: number;
  readonly total: number;
  readonly completedAt: string;
}

export interface QuizResultsState {
  readonly quizzes: Record<string, QuizAttempt>;
}
