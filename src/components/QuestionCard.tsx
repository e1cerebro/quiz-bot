import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, BottomWrapper } from './QuestionCard.styles';
type Props = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <>
      <Wrapper>
        <p className='number'>
          Question: {questionNumber}/{totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div className='answers'>
          {answers.map((answer: string) => (
            <BottomWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}>
              <button
                value={answer}
                disabled={userAnswer ? true : false}
                onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </BottomWrapper>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default QuestionCard;
