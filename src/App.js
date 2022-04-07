import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material'

import { getPlacesData, getWeatherData } from './api/index'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'


const App = () => {
    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [filterRating, setFilterRating] = useState([])
    const [coordinates, setCoordinates] = useState({ lat: 52.520007, lng: 13.404954 })
    const [bounds, setBounds] = useState({})
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const handleScrollCard = (childClicked) => {
        const clickCard = document.getElementById(`card${childClicked}`)
        clickCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude } }) => {
    //         setCoordinates({ lat: latitude, lng: longitude })
    //     })
    // }, [])

    useEffect(() => {
        const filterRating = places?.filter((place) => place.rating > rating)
        setFilterRating(filterRating)
    }, [places, rating])

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true)

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => {
                    setWeatherData(data)
                })

            getPlacesData(type, bounds.ne, bounds.sw)
                .then((data) => {
                    setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
                    setIsLoading(false)
                })
        }
    }, [type, bounds])

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filterRating?.length ? filterRating : places}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filterRating?.length ? filterRating : places}
                        handleScrollCard={handleScrollCard}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>

        </>
    )
}


export default App