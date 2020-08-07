import styled, { createGlobalStyle } from 'styled-components';
import BackgroundImage from './images/summer-bg-4.jpg';

export const GlobalStyle = createGlobalStyle`
 html{
   height: 100%
 }


 body{
  background: linear-gradient(45deg, #046b79, #ffd5a4);
   background-image: url(${BackgroundImage});
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center bottom;
   margin: 0;
   padding: 0 20px;
   display: flex;
   justify-content: center;
   height: 100%;
   box-shadow: inset 0 0 0 2000px rgb(0 0 0 / 27%);
 }

 *{
   box-sizing: border-box;
   font-family: 'Righteous', cursive;
 }
`;

export const ImageWrapper = styled.div`
  background-color: #20798d;
  padding: 0 20px;
  margin-top: 40px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;

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
    font-size: 70px;
    font-weight: 400;
    padding: 10px 20px;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next,
  .end-game {
    cursor: pointer;
    background-color: #0e5e34;
    color: #fff;
    border: 1px solid #ffffff;
    border-radius: 7px;
    padding: 19px 72px;
    font-size: 1.3rem;
    text-transform: uppercase;
    margin: auto 10px;
  }

  .end-game {
    background-color: #c11818;
    color: #fff;
  }

  .start {
    max-width: 300px;
  }
`;

export const ActionControls = styled.div`
  margin: 6px auto;
`;
export const SelectWrapper = styled.div`
  position: relative;
  width: 350px;
  margin: 6px auto;
  // Dropdown icon
  &::after {
    color: black;
    content: '▾';
    margin-right: 10px;
    pointer-events: none;
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 20px;
  }

  .select {
    -moz-appearance: none;
    -webkit-appearance: none;
    background: white;
    border: none;
    border-radius: 0;
    cursor: pointer;
    padding: 12px;
    width: 100%;
    font-size: 18px;
    &:focus {
      color: black;
    }
    // Hack for IE 11+
    &::-ms-expand {
      display: none;
    }
  }
`;
