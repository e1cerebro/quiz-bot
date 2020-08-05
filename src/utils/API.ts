import { shuffleArray } from './index';

export enum DIFFICULTY {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export type QUESTION = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
//Append a new property to the QUESTION type
export type QUESTIONSTATE = QUESTION & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: DIFFICULTY
): Promise<any[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data.results.map((question: QUESTION) => ({
    ...question,
    answers: shuffleArray<string>([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
