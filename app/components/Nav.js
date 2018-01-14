import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav(){
  return (
    <ul className='nav'>
      <li className='nav__item'>
        <NavLink exact activeClassName='link link--active' to='/'>
          Home
        </NavLink>
      </li>
      <li className='nav__item'>
        <NavLink activeClassName='link link--active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li className='nav__item'>
        <NavLink activeClassName='link link--active' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}