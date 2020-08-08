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

  const constructShareMessage = (): string => {
    return `Hey guys!%0AI just played quizz bott. Here is how I performed:!%0A-${totalScore} Out of ${totalQuestions} questions was answered correctly.%0A-With an accuracy of ${percentage} %25 %0ATRY IT AND SHARE%0A`;
  };

  return (
    <QuizSummaryWrapper>
      <h1 className='summary-header'>
        <i className='smiley fa fa-smile-o'></i>
        <span> Your Score</span>
      </h1>
      <span className='percentage'>{percentage}%</span>
      <span className='remark'> {constructRemark()}</span>
      {/* <span className='summary-text'>
        {totalScore} Out of {totalQuestions} questions were correct.
      </span> */}
      {/* <button className='end-game restart' onClick={callback}>
        Restart
      </button> */}
      <a
        className='share-button'
        href={`https://twitter.com/share?text=${constructShareMessage()}&url=https://quizz-bott.herokuapp.com&hashtags=quiz,learning,educate,programmer,coding`}
        target='_blank'
        rel='noopener noreferrer'>
        <i className='fa fa-twitter' aria-hidden='true'></i> Share on Twitter{' '}
      </a>
      {/* 
      <a
        title='send to Facebook'
        onClick={() =>
          !window.open(window.location.href, 'Facebook', 'width=640,height=300')
        }
        href={`http://www.facebook.com/sharer.php?s=100&p[title]=Quizz%Bot%Result&p[summary]=${constructShareMessage()}&p[url]=https://quizz-bott.herokuapp.com`}
        target='_blank'>
        <span>
          <img width='14' height='14' src="'icons/fb.gif" alt='Facebook' />{' '}
          Facebook
        </span>
      </a> */}
    </QuizSummaryWrapper>
  );
};

export default QuizSummary;
