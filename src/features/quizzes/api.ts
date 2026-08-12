import quizzesData from '@/data/quizzes.json';
import { quizzesSchema } from './schemas';
import type { Quiz } from './types';

const quizzes = quizzesSchema.parse(quizzesData) as readonly Quiz[];

export function getQuizByLessonId(lessonId: string): Quiz | undefined {
  return quizzes.find((q) => q.lessonId === lessonId);
}

export function getQuizById(quizId: string): Quiz | undefined {
  return quizzes.find((q) => q.id === quizId);
}
