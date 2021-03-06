import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Rating from '@mui/material/Rating'


import useStyles from './styles'
const urlImageDefault = process.env.REACT_APP_PLACE_IMG_DEFAULT


const Map = ({ setCoordinates, setBounds, coordinates, places, handleScrollCard, weatherData }) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width: 600px)')

    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={''}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng })
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => handleScrollCard(child)}
            >
                {places?.map((place, i) => {
                    return (
                        <div
                            className={classes.markerContainer}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                        >
                            {!isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant='subtitle2' className={classes.typography} gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url : urlImageDefault}
                                    />
                                </Paper>
                            )}
                        </div>
                    )
                })
                }
                {/* {
                    weatherData?.list?.map((data, i) => (
                        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                            Temp: ${data.main.temp}
                        </div>
                    ))
                } */}
            </GoogleMapReact>
        </div>
    )
}

export default Map