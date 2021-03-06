import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1100px;
  min-width: 350px;
  background: #ebfeff;
  border: 2px solid #ce7706;
  padding: 10px 11px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  p {
    font-size: 1.2rem;
    text-align: center;
  }

  p.timer {
    color: #c11818;
  }

  .quiz-current-score {
    color: #ce7706;
  }

  .question-card-top {
    display: flex;
    flex-direction: inherit;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 4px 0 22px 0;
    border-bottom: 8px solid #252525;
    p {
      font-family: 'Luckiest Guy', cursive;
    }
    p::nth-of-type(2) {
      margin: 0 10px;
    }
  }
`;

type BottomWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const BottomWrapper = styled.div<BottomWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1.2rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background-color: ${({ correct, userClicked }) =>
      correct
        ? '#56ffa4' //if answer is correct
        : !correct && userClicked //if answer is wrong and the user has clicked on the button
        ? ' #ff5656'
        : ' #f2ddb0'} ;
        /* background-color: ${({ correct, userClicked }) =>
          correct && userClicked ? 'green' : 'red'}; */

    border: 3px solid #fff;
    box-shadow: -1px 1px 4px 1px rgb(0 0 0 / 9%);
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
