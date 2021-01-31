import './App.css';
import {Card, FormControl, MenuItem, Select,CardContent}from '@material-ui/core';
import React,{ useEffect, useState } from 'react';
import Infobox from './Infobox';
import Map  from './Map';
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import Linegraph from './Linegraph';
import "leaflet/dist/leaflet.css";
import Footer from './Footer';

function App() {

  const [countries,setcountries]=useState([]);
  const [country,setcountry]=useState("worldwide");
  const [countryinfo,setcountryinfo]=useState({});
  const [tabledata,settabledata]=useState([]);
  const [mapcenter,setmapcenter]=useState({
    lat:20,lng:77
  })
  const [mapzoom,setmapzoom]=useState(4);
  const [mapcountries,setmapcountries]=useState([]);
  const [casestype,setcasestype]=useState('cases');



  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
   .then(response=>response.json())
   .then(data=>{

     setcountryinfo(data);

 })

},[])
  



  useEffect(()=>{

    const getcountriesdata=async ()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        const countries=data.map((country)=>({
          name:country.country,
          value:country.countryInfo.iso2
        }));

         const sortedData=sortData(data);
         settabledata(sortedData);
        setcountries(countries);
        setmapcountries(data);

      })
    }
    getcountriesdata();


  },[])

  const oncountrychange= async (e)=>{
    const countrycode=e.target.value;

    const url= countrycode==="worldwide" ? "https://disease.sh/v3/covid-19/all" :`https://disease.sh/v3/covid-19/countries/${countrycode}` ;
     
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
    setcountry(countrycode)  

      setcountryinfo(data);
      setmapcenter([data.countryInfo.lat,data.countryInfo.long]);

      setmapzoom(5);

    
    })

  }


 console.log(countryinfo);

  return (
    <>
    <div className="app">
    <div className="app__left">
    <div className="app__header">
    <h1 className="app__header__name"  > { countryinfo?.country?.toUpperCase() }  COVID-19 TRACKER</h1>
    <FormControl  className="app__dropdown"  >
    <Select 
    variant="outlined"
    value={country}
    onChange={oncountrychange}
    
    >
    <MenuItem value="worldwide" >worldwide</MenuItem>
    {countries.map((country)=>{
      
      return  <MenuItem value={country.value} >{country.name}</MenuItem>
    })}
    

    </Select>


    </FormControl>    
    </div>
    <div className="app__stats">
    <Infobox isred active={casestype==="cases"} onClick={e=>setcasestype('cases')}  title="Coronavirus Cases" total={countryinfo.cases} cases={prettyPrintStat(countryinfo.todayCases)} />
    <Infobox  active={casestype==="recovered"} onClick={e=>setcasestype('recovered')} title="Recovered" total={countryinfo.recovered} cases={prettyPrintStat(countryinfo.todayRecovered)}   />
    <Infobox isred active={casestype==="deaths"} onClick={e=>setcasestype('deaths')} title="Deaths" total={countryinfo.deaths} cases={prettyPrintStat(countryinfo.todayDeaths)}  />

      

    </div>

    <Map center={mapcenter} zoom={mapzoom} countries={mapcountries} casesType={casestype}  />



    </div>
    <Card className="app__right">
    <CardContent >
    <h3>  Live Cases </h3>
    <Table  countries={tabledata}  />
    <h3 className="app__graphtitle"> World Wide {casestype} </h3>
    <Linegraph className="app__graph" casesType={casestype} />


    </CardContent>

    </Card>
    
   
    
    </div>
    <Footer  />
    </>
  );
}

export default App;
