import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavbarStyles from '../Styles/Navbar.module.css'
import noteLogo from '../assets/note-logo.png'

const Navbar = () => {
  const {pathname} = useLocation()
  return (
    <div className={NavbarStyles.navbar}>
        <Link to='/'><h3 style={{color: 'white'}}>Welcome to Notes! <img src={noteLogo} width={30} /></h3></Link>
        {pathname == '/createnote' ? <Link to='/'><button>Close</button></Link> :
        <Link to='createnote'><button>Write Note</button></Link>}
    </div>
  )
}

export default Navbar