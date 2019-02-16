import React from 'react'
import PropTypes from 'prop-types'

// styled-components
import { GlobalStyle } from '../../theme/global-style.js'
import { Background, Footer, FooterLink } from './styles.js'

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
