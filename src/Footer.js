import { Avatar } from '@material-ui/core';
import React from 'react';
import './Footer.css';
import logo from './kr7.jpg';
import {Card,CardContent} from '@material-ui/core';

function Footer(){
    return (
        <>

        <Card className="footer">
        <CardContent className="footer__content"  >
        <p className="footer__text" > Copyrights &copy; since 2021 , Developed by Kalpit Jindal  </p>

<a  href="https://kjjindal.github.io/profile/" target="__blank" className="footer__anchor" >  <Avatar  src={logo}  alt="kalpit" /> </a> 
  
        </CardContent>
        

        </Card>



        </>
    )
}

export default Footer


