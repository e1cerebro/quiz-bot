import styled, { createGlobalStyle } from 'styled-components';
import BackgroundImage from './images/summer-bg.jpg';

export const GlobalStyle = createGlobalStyle`
 html{
   height: 100%
 }


 body{
   background-image: url(${BackgroundImage});
   background-size: cover;
   margin: 0;
   padding: 0 20px;
   display: flex;
   justify-content: center
 }

 *{
   box-sizing: border-box;
   font-family: 'Catamaran', san-serif;
 }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Fascinate Impact, Haettenschweiler, 'Arial Narrow Bold',
      sans-serif;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-clip: text;
    --webkit--moz-background-clip: text;
    --webkit-text-fill-color: transparent;
    --moz-background-clip: text;
    --moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #0085a3);
    font-size: 70px;
    font-weight: 400;
    padding: 10px 20px;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38655;
    padding: 10px 50px;
    font-size: 1.5rem;
  }

  .start {
    max-width: 300px;
  }
`;
