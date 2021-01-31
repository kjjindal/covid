import React, { useState,useEffect } from 'react';
import {Line } from 'react-chartjs-2';
import numeral from 'numeral';

const casesTypeColors={
    cases:{
        hex:"#00ffff",
        rgb:"rgb(204,16,52)"
       
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)"
        

    },
    deaths:{
        hex:"#cc1034",
        rgb:"rgb(251,68,67)"
       
    }
}

const options={
    legend:{
        display:false,
    },
    elements:{
        point:{
            radius:0,
        },

    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intesect:false,
        callbacks:{
            label:function (tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes:[
            {
                type:'time',
                time:{
                    format:'MM/DD/YY',
                    tooltipFormat:'ll',
                },
        },
        ],
        yAxes:[
            {
                gridLines:{
                    display:false,

                },
                ticks:{
                    callback:function(value,index,values)
{
    return numeral(value).format("0a");
}                }

            }
        ]
    }
}

function Linegraph({casesType='cases',...props}) {
    

    const [data,setdata]=useState({});

 

    const buildchartdata=(data,casesType='cases')=>{
        const chartdata=[];
        let lastdatapoint;

        // data[casesType].forEach(date=>{
            for(let date in data.cases){
            if (lastdatapoint){
                const newdatapoint={
                    x:date,
                    y:data[casesType][date]-lastdatapoint
                }
                chartdata.push(newdatapoint)

            }
            lastdatapoint=data[casesType][date];


        }
        return chartdata;
    }
    useEffect(() => {
         
        const fetchData=async ()=>{
        await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response=>response.json())
        .then(data=>{
            const chartdata=buildchartdata(data,casesType);
            setdata(chartdata);

        })  
        }
        fetchData();

        
     
       
    }, [casesType])

    return (
        <div className={props.className} >
        {data?.length>0 && (
            <Line 
        options={options}

        data={
            {
              
              
               datasets:[{data:data, backgroundColor: casesTypeColors[casesType].hex,  borderColor: casesTypeColors[casesType].hex}]
            }
        }


        />
        )}
      
            
        </div>
    )
}

export default Linegraph
