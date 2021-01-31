import React from 'react';
import './Map.css';
import {MapContainer as LeafletMap,TileLayer,useMap} from 'react-leaflet';
import  {showDataOnMap}    from './util';


function SetViewOnClick({ center }) {
    const map = useMap();
    map.setView(center, map.getZoom());
  
    return null;
  }

function Map({zoom,center,countries,casesType}){
    return (
        <>
        <div className="map">
         <LeafletMap zoom={zoom} center={center} >
             <TileLayer 

             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'



             />
             <SetViewOnClick center={center} />
             {/* <Circle  radius={5000} fillColor="#cc1034" center={center}  fillOpacity={0.5} color="#cc1034"    >    </Circle> */}
             {showDataOnMap(countries,casesType)}
         </LeafletMap>
        </div>


        </>
    )
}

export default Map;