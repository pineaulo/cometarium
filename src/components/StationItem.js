import React, { useState, useEffect } from "react";
import { getAsteroids, getAsteroidDetail } from '../api'
import '../styles/table.scss'
import Popup from './Popup'

const header = ['Nom', 'Diamètre', 'Distance', 'Prochain passage']

function StationItem(props) {
  const [asteroidList, setAsteroidList] = useState([])
  const [asteroidsDetail, setAsteroidsDetail] = useState({})
  const [selectedAsteroid, setSelectedAsteroid] = useState(false)

  const getAsteroidList = () => {
    getAsteroids(props.start, props.end).then((ans) => {
      const reduced = Object.values(ans.data.near_earth_objects).flat().map(a => {return {
        id: a.id,
        name: a.name,
        estimated_diameter: {
          max: a.estimated_diameter.meters.estimated_diameter_max,
          min: a.estimated_diameter.meters.estimated_diameter_min
        },
        earth_dist: Number(a.close_approach_data[0].miss_distance.lunar),
        epoch_date_close_approach: a.close_approach_data[0].epoch_date_close_approach
      }}).sort((a, b) => a.epoch_date_close_approach - b.epoch_date_close_approach)
      setAsteroidList(reduced)
    })
  }

  useEffect(getAsteroidList, []);
  useEffect(getAsteroidList, [props.start, props.end]);

  useEffect(() => {
    if(selectedAsteroid && !asteroidsDetail[selectedAsteroid])
    getAsteroidDetail(selectedAsteroid).then(({data}) => {
      const reduced = {
        id: data.id,
        name: data.name,
        close_approach_data: data.close_approach_data.map(a => {
          return {
            epoch_date_close_approach: a.epoch_date_close_approach,
            miss_distance: Number(a.miss_distance.lunar)
          }
        }).sort((a, b) => b.epoch_date_close_approach - a.epoch_date_close_approach)
      }
      setAsteroidsDetail({ ...asteroidsDetail, [data.id]: reduced })
    })
  }, [selectedAsteroid]);

  const selectAsteroid = (id) => {
    setSelectedAsteroid(id)
  }
  
  const thead = header.map((h, i) => 
    <th key={i}>{h}</th>
  )
  const numOpt = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  const tbody = asteroidList.map((a) => 
    <tr onClick={(e) => selectAsteroid(a.id, e)} key={a.id} className="clickable">
      <td className="l">
        {a.name}
      </td>
      <td>
        {a.estimated_diameter.min.toLocaleString(undefined, numOpt)} m<br/>
        {a.estimated_diameter.max.toLocaleString(undefined, numOpt)} m
      </td>
      <td>
        {a.earth_dist.toLocaleString(undefined, numOpt)} LD
      </td>
      <td className="c">
        {new Date(a.epoch_date_close_approach).toLocaleString()}
      </td>
    </tr>
  )
  return (
    <>
      <table style={{width: '800px'}}>
        <caption>Comètarium</caption>
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>
          {tbody}
        </tbody>
      </table>
      <Popup data={asteroidsDetail} selected={selectedAsteroid} close={() => selectAsteroid(false)} />
    </>
  );
}

export default StationItem;
