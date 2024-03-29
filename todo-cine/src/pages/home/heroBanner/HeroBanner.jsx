import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './heroBanner.scss'

import useFetch from '../../../hooks/useFetch.jsx'

import Img from '../../../components/lazyLoadImg/Img.jsx'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper.jsx'

const HeroBanner = () => {

  const [ background, setBackground ] = useState("");
  const [ query, setQuery ] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data])

  // const searchQueryHandler = (e) => {
  //   if(e.key === "Enter" && query.length > 0){
  //     navigate(`/search/${query}`);
  //   }
  // }

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleSearchButtonClick = () => {
    searchQueryHandler();
  };

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className="backdrop-img">                    
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>
        <ContentWrapper>
          <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Endless variety of Movies and TV shows to discover. 
              Explore now!
            </span>
            <div className="searchInput">
              <input 
                type="text" 
                placeholder='Search for a movie or tv show...'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={(e) => {
                  if(e.key === "Enter"){
                    searchQueryHandler();
                  }
                }}
              />
              <button onClick={handleSearchButtonClick}>Search</button>
            </div>
          </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner