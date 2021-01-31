import React from 'react';
import './Infobox.css';
import {Card,CardContent,Typography} from '@material-ui/core';


function Infobox({title,cases,total,active,isred,...props}){
    return (
        <>
        {/* <div > */}
        <Card className={`infobox ${active && 'infobox__selected'} ${isred && 'infobox__red'} `}  onClick={props.onClick}   >
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={` infobox__cases ${!isred && 'infobox__cases__green'}`}> {cases} </h2>
                <Typography color="textSecondary" className="infobox__total">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>


        {/* </div> */}



        </>

    )
}

export default Infobox;