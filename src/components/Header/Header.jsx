import React, { useState } from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { AppBar, Toolbar, Typography, InputBase, Stack } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import useStyles from './styles'

const Header = ({ setCoordinates }) => {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => setAutocomplete(autoC)
    const onPlaceChanged = () => {
        const lat = autocomplete?.getPlace().geometry.location.lat()
        const lng = autocomplete?.getPlace().geometry.location.lng()
        setCoordinates({ lat, lng })
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' className={classes.title}>
                    Travel Advisor
                </Typography>
                <Stack direction="row" spacing={4}>
                    <Typography variant='h6' className={classes.titleBox}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <input
                            type="text"
                            placeholder="Search"
                            className={classes.inputSearch}
                        />
                        {/* <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Search...' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div> */}
                    </Autocomplete>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header