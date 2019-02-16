import styled from 'styled-components'

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    #0b0b0b,
    #120c21,
    #140d34,
    #180b47,
    #200259
  );
`

export const Footer = styled.p`
  text-align: center;
  margin: 64px 0 32px;
`

export const FooterLink = styled.a`
  color: #fff;

  &:visited {
    color: #fff;
  }
`
