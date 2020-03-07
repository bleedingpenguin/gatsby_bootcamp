import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import headerStyles from './header.module.scss'

const Header = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to='/'>
          {data.site.siteMetadata.title}
        </Link>
      </h1>
      <ul className={headerStyles.navList}>
        <li>
          <Link
            className={headerStyles.navItem} to='/'
            activeClassName={headerStyles.activeNavItem}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.navItem} to='/blog'
            activeClassName={headerStyles.activeNavItem}
          >
            Blog
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.navItem} to='/about'
            activeClassName={headerStyles.activeNavItem}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={headerStyles.navItem} to='/contact'
            activeClassName={headerStyles.activeNavItem}
          >
            Contact
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
