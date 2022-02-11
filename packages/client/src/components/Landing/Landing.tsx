import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import {AiFillGithub, AiOutlineInfoCircle} from 'react-icons/ai'
import {ImNewspaper} from 'react-icons/im'
import {FiLogIn} from 'react-icons/fi'
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Landing.scss'
export const Landing: FC<unknown> = () => {
  return (
    <>
      <div className='content'>
        <header>
          <div className='header-name'>
            <span className='header-name_text'>Notwidgets</span>
          </div>
          <div className='header-buttons'>
            <Link to='/about'><AiOutlineInfoCircle /> About</Link>
            <a href='https://github.com/vladdenisov/notwidget' target='_ blank' rel="noreferrer noopener"><AiFillGithub /> Github</a>
            <Link to='/blog'><ImNewspaper /> Blog</Link>
            <Link to='/login'><FiLogIn /> Login</Link>
            <Link to='register'><div className='header-buttons_getstarted'>Get Started</div></Link>
          </div>
        </header>
        <main></main>
        <footer></footer>
      </div>
    </>
  );
};
