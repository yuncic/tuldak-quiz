export interface Quiz {
  id: number;
  question_text: string;
  question_image: string | null;
  options: string[];
  correct_answer: number;
  custom_message: string;
  rates: Record<string, number>;
  weight: number;
}

export interface ResultRange {
  type: string;
  min: number;
  max: number;
  message: string;
}

export type QuizState = 'question' | 'result';
