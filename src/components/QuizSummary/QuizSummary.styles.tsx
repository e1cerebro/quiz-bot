import styled from 'styled-components';

export const QuizSummaryWrapper = styled.div`
  height: 25%;
  z-index: 2000;
  text-align: center;
  min-width: 350px;
  padding: 44px 20px;
  border-radius: 0px 10%;
  border: 3px solid rgba(255, 255, 255, 1);
  background-color: #20798d;
  border-radius: 0px 10%;
  box-shadow: 0px 0px 13px 2px rgb(0, 0, 0);
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);

  .summary-header {
    font-size: 45px;
    margin: 0;
  }

  .restart {
    margin: 20px;
  }

  span {
    text-transform: uppercase;
    font-size: 33px;
    color: #fff;
    font-family: 'Roboto Slab', cursive;
    font-weight: 900;
  }

  span.percentage {
    display: block;
    text-align: center;
    font-size: 5.1rem;
    color: #ffffff;
    text-shadow: 1px 2px black;
    background: #c11818;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    line-height: 200px;
    margin: 10px auto;
    border: 6px solid #ffffff;
  }

  span.remark {
    font-size: 1.5rem;
    display: block;
    text-align: center;
    font-family: 'Catamaran', san-serif;
  }
  .summary-text {
    text-align: center;
    display: block;
    font-size: 1.7rem;
    color: #ffd6a2;
    text-shadow: 1px 2px black;
  }

  i {
    color: white;
    display: block;
  }
`;
