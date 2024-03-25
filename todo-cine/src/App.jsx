import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { fetchDataFromApi } from './utils/api.js'

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice.js'

import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Details from './pages/details/Details.jsx'
import SearchResult from './pages/searchResult/SearchResult.jsx'
import Explore from './pages/explore/Explore.jsx'
import PageNotFound from './pages/404/PageNotFound.jsx'

function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  // this function fetches the required images from the TMDB api
  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
    .then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  }

  // using this function we fetch the Genre from the TMDB api but the api gives us
  // the genres in form of IDs so we store them into an object for the Genre(Genre.jsx) component,
  // to convert them into the ID's corresponding name and we store these IDs,
  // both of the Movies and the TV Shows in the Store(HomeSlice.jsx)
  const genresCall = async () => {
    let promises = [];
    let endpoints = ["movie", "tv"];
    let allGenres = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
  )
}

export default App
