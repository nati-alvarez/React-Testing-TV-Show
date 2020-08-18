import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";
import axios from "axios";

import { formatSeasons } from "./utils/formatSeasons";

import Episodes from "./components/Episodes";
import "./styles.css";

import fetchShow from "./api/fetchShow";

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow().then(data=>{
      setShow(data);
      if(data) setSeasons(formatSeasons(data._embedded.episodes));
    });
  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };

  const selectShow = e => {
    console.log(e.value)
    axios.get(
      `https://api.tvmaze.com/singlesearch/shows?q=${e.value}&embed=episodes`
    ).then(({data})=>{
      setShow(data);
      console.log(data._embedded)
      setSeasons(formatSeasons(data._embedded.episodes))
    }).catch(err=>{
      console.log(err);
    })
  }

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <Dropdown
        options={["Stranger Things", "Euphoria", "Agents of S.H.I.E.L.D", "On My Block", "The Umbrella Academy", "Black Mirror"]}
        onChange={selectShow}
        value={show.name || "Select a show"}
        placeholder="Select a show"
      />
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} />
    </div>
  );
}
