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
  difficulty: DIFFICULTY,
  selectedCategory: number
): Promise<QUESTIONSTATE[]> => {
  let endpoint = `https://opentdb.com/api.php?amount=${amount}`;

  endpoint += selectedCategory !== -1 ? `&category=${selectedCategory}` : '';
  endpoint += difficulty ? `&difficulty=${difficulty}` : '';
  endpoint += `&type=multiple`;

  const data = await requestData(endpoint);

  return data.results.map((question: QUESTION) => ({
    ...question,
    answers: shuffleArray<string>([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export const fetchcategories = async () => {
  const endpoint: string = `https://opentdb.com/api_category.php`;
  const data = requestData(endpoint);
  return data;
};

export const requestData = async (endpoint: string) => {
  const response = await fetch(endpoint);
  return await response.json();
};
