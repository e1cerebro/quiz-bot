import styled from 'styled-components';

export const QuizSummaryWrapper = styled.div`
  /* height: 25%;
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
  transform: translateY(-50%); */

  max-width: 1100px;
  background: #ebfeff;
  margin-bottom: 40px;
  border-radius: 10px;
  border: 2px solid #ce7706;
  padding: 10px 11px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  .summary-header {
    font-size: 45px;
    margin: 0;
  }

  .restart {
    margin: 20px;
  }

  span {
    text-transform: uppercase;
    font-size: 25px;
    color: #000000;
    font-family: 'Roboto Slab', cursive;
    font-weight: 900;
  }

  span.percentage {
    display: block;
    text-align: center;
    font-size: 2.5rem;
    color: #ffffff;
    text-shadow: 1px 2px black;
    background: #20798d;
    border-radius: 50%;
    width: 140px;
    height: 140px;
    line-height: 127px;
    margin: 10px auto;
    border: 6px solid #c6c6c6;
  }

  span.remark {
    font-size: 1.2rem;
    display: block;
    text-align: center;
    text-transform: revert;
  }
  .summary-text {
    text-align: center;
    display: block;
    font-size: 1.2rem;
    color: #c11818;
  }

  i.smiley {
    color: #c11818;
    display: block;
  }

  a.share-button {
    text-align: center;
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #11c4ec;
    font-size: 20px;
  }

  a.share-button:hover {
    color: #ce7706;
  }
`;
