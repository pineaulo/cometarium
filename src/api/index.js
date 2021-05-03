import api from './axios'
import dateformat from 'dateformat'
import data from '../test-data'
import config from '../config'

const debug = config.debug

export const getAsteroidDetail = (id) => {
    if(!debug)
        return api.get(`/neo/${id}`)
    else
    return data.detail
}
export const getAsteroids = (start_date, end_date) => {
    const date_format = 'yyyy-mm-dd'
    let url = '/feed'
    if(!start_date) {
        url += '/today'
    } else if(!end_date) {
        start_date = dateformat(start_date, date_format)
        end_date = start_date
    } else {
        end_date = dateformat(end_date, date_format)
    }
    if(!debug)
        return api.get(url, (!start_date)?null:{
            params: {
                start_date,
                end_date,
                detailed: false
            }
        })
    else
        return data.list
}




/*async (start_date, end_date) => {
    let url = '/feed/'
    if(!start_date)
        url += 'today'
    else {
        if(!end_date)
            end_date = start_date
        api

    }
}*/