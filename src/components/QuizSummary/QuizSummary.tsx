import React, { FC, useState, useEffect } from 'react';
import { getPercentage } from '../../utils';
import { QuizSummaryWrapper } from './QuizSummary.styles';

type Props = {
  totalScore: number;
  totalQuestions: number;
  callback: () => void;
};

const QuizSummary: FC<Props> = ({ totalScore, totalQuestions, callback }) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    setPercentage(getPercentage(totalScore, totalQuestions));
  }, [totalScore, totalQuestions]);

  const constructRemark = (): string => {
    let remark = 'Maybe you should try a little harder.';
    if (percentage >= 0 && percentage <= 30) {
      remark = 'Maybe you should try a little harder.';
    } else if (percentage > 30 && percentage <= 69) {
      remark = 'Fair result, keep it up.';
    } else if (percentage >= 70) {
      remark = 'Excellent, you are a genius!!!';
    }

    return remark;
  };

  return (
    <QuizSummaryWrapper>
      <h1 className='summary-header'>
        <i className='smiley fa fa-smile-o'></i>
        <span> Your Score</span>
      </h1>
      <span className='percentage'>{percentage}%</span>
      <span className='remark'> {constructRemark()}</span>
      <span className='summary-text'>
        {totalScore} Out of {totalQuestions} questions were correct.
      </span>
      <button className='end-game restart' onClick={callback}>
        Restart
      </button>
    </QuizSummaryWrapper>
  );
};

export default QuizSummary;
