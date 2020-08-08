import styled from 'styled-components';

export const ActionControls = styled.div`
  margin: 6px auto;

  .start,
  .next,
  .end-game {
    cursor: pointer;
    background-color: #0e5e34;
    color: #fff;
    border: 1px solid #ffffff;
    border-radius: 7px;
    padding: 12px 33px;
    font-size: 1.2rem;
    text-transform: uppercase;
    margin: auto 5px;

    @media (max-width: 699px) {
      margin: 6px 2px;
      padding: 14px 43px;
      font-size: 0.8rem;
    }
  }

  .end-game {
    background-color: #c11818;
    color: #fff;
  }

  .start {
    max-width: 300px;
  }
`;
