import styled from 'styled-components'

export const H1 = styled.h1`
  text-align: center;
  font-size: 60px;
  font-weight: 300;
  max-width: calc(100vw - 32px);
`

export const H2 = styled.h2`
  position: relative;
  text-align: left;
  font-size: 40px;
  margin: 64px auto 32px;
  font-weight: 200;
  max-width: calc(100vw - 32px);

  &:after {
    position: absolute;
    content: '';
    bottom: -16px;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: #fff;
  }
`
