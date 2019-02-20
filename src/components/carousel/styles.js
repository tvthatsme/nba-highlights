import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`

export const ControlArea = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: ${props => (props.back ? '0' : 'auto')};
  right: ${props => (props.forward ? '0' : 'auto')};
`

export const Button = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  background-color: #111;
  color: white;
  border: none;
  z-index: 1;
  height: 50px;
  outline: none;
  opacity: 0.5;
  transition: opacity 0.2s ease-out;

  &:hover,
  &:focus {
    cursor: pointer;
    outline: none;
    opacity: 1;
  }

  svg {
    color: white;
  }
`

export const CarouselArea = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`

export const CarouselItem = styled.div`
  height: 100%;
  width: 100vw;

  @media (min-width: 600px) {
    width: 50vw;
  }

  @media (min-width: 900px) {
    width: 33.3333vw;
  }

  @media (min-width: 1200px) {
    width: 25vw;
  }

  @media (min-width: 1500px) {
    width: 20vw;
  }
`
