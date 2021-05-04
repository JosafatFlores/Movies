import { API_URL, moviesEndPoint } from '../../Consts/index'
import axios from 'axios'

export const getMovies = async () => {
    try {
        const response = await axios.get(`${API_URL}${moviesEndPoint}`)
        if (response.data) {
            return response
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
}

export const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`${API_URL}${moviesEndPoint}/${movieId}`)
        if (response.data) {
            return response
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
}


export const createMovie = async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}${moviesEndPoint}/${data}`,
            data
        )

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
}
