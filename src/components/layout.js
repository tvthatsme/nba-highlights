import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GlobalStyle } from '../theme/global-style.js'

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    <Background />
    {children}
    <footer>
      <Footer>
        © {new Date().getFullYear()}, Built by{' '}
        <FooterLink href="https://tvernon.tech/">Timothy Vernon</FooterLink>
      </Footer>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Background = styled.div`
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

const Footer = styled.p`
  text-align: center;
  margin: 64px 0 32px;
`

const FooterLink = styled.a`
  color: #fff;

  &:visited {
    color: #fff;
  }
`
