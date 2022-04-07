import { makeStyles } from '@mui/styles'

export default makeStyles({
    box: {
        display: 'flex',
    },
    search: {
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        padding: '0px 16px'
    },
    searchIcon: {
        position: 'absolute',
        padding: '0px 8px',
        height: '100%',
        top: 0,
        right: 0,
    },
    toolbar: {
        display: 'flex', justifyContent: 'space-between',
    },
    inputSearch: {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        width: '240px',
        height: '32px',
        padding: '0 12px',
        borderRadius: '3px',
        fontSize: '14px',
        outline: 'none',
    }
})