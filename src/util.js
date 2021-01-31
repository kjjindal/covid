import React from 'react';
import {Circle,Popup} from 'react-leaflet';

import numeral from 'numeral';


const casesTypeColors={
    cases:{
        hex:"#00ffff",
        rgb:"rgb(204,16,52)",
        half_op:"rgba(204,16,52,0.5)",
        multiplier:200,
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)",
        half_op:"rgba(125,125,29,0.5)",
        multiplier:400,

    },
    deaths:{
        hex:"#cc1034",
        rgb:"rgb(251,68,67)",
        half_op:"rgba(251,68,67,0.5)",
        multiplier:600,
    }
}

export const sortData=(data)=>{
    const sortedData=[...data];

    return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1))
    
}


export const showDataOnMap=(data,casesType="cases")=>{
   console.log(casesType);
   console.log(casesTypeColors[casesType].hex);

 return (
     
    data?.map(country=>(

        <Circle 

pathOptions={{color: casesTypeColors[casesType].hex,
                     fillColor: casesTypeColors[casesType].hex }}
        center={[country.countryInfo.lat,country.countryInfo.long]}


        fillOpacity={0.4}
       

        radius={
            Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
        }


         >
         <Popup>
             <div  className="info__container" >
             <div className="info__flag"
             style={{backgroundImage:`url(${country.countryInfo.flag})`}}
             
             ></div>
             <div className="info__name">{country.country} </div>
             <div className="info__cases">Cases:{numeral(country.cases).format("0,0")} </div>
             <div className="info__recoverd">Recoverd:{numeral(country.recovered).format("0,0")} </div>
             <div className="info__deaths">Deaths:{numeral(country.deaths).format("0,0")} </div>


             </div>
         </Popup>


         </Circle>


    )))
   
    }



export const prettyPrintStat=(stat)=>(
    stat ?`+${numeral(stat).format("0.0a")}`:"+0"

)

