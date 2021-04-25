import React, { Component } from 'react'
import { getMovies } from '../../../Services'
import './index.scss'
import moment from 'moment'
import { Link } from 'react-router-dom'

export default class MoviesList extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            isReady: false,
            hasError: false,
            error: null
        }
    }

    componentDidMount = async () => {
        const movies = await getMovies();
        if (!movies.hasError) {
            this.setState({
                movies,
                isReady: true
            })
        } else {
            this.setState({
                hasError: true,
                error: movies.error
            })
        }
    }

    render() {

        const {
            movies,
            isReady,
            hasError,
            error
        } = this.state

        return (
            <>
                {
                    isReady ?
                        <ListComponent
                            movies={movies}
                        />
                    :hasError ?
                            <ErrorComponent
                                error={error}
                            />
                    : <LoadingComponent />
                }
            </>
        )
    }
}

const ListComponent = (props) => {
    return (
        <>
            {
                props.movies.data.length > 0 ?
                    props.movies.data.map(movie => (
                        <Link
                            className="link-movie-detail"
                            to={`/peliculas/${movie._id}`}>
                            <MovieCard
                                movie={movie}
                            />
                        </Link>
                    ))
                    : <p>No hay informacion</p>
            }
        </>
    )
}

const MovieCard = ({ movie }) => {
    return (
        <>
            <div className="movie-card-container">
                <div className="movie-card-info">
                    <div className="movie-card-basic-info">
                        <p className="movie-card-title">
                            {movie.title}
                        </p>
                        <p className="movie-card-desc">
                            {movie.description}
                        </p>
                    </div>
                    <div className="movie-card-details ">
                        <p>
                            Costo de la entrada:
                        <span>
                                {movie.ticketPrice}
                            </span>
                        </p>
                        <p>
                            Duracion:
                        <span>
                                {movie.duration} (min.)
                        </span>
                        </p>
                        <p>
                            En cines:
                        <span>
                                {movie.isOnCinemas ? 'Si' : 'No'}
                            </span>
                        </p>
                    </div>
                </div>
                <div className="movie-card-schedules-container">
                    <p>
                        Horarios:
                </p>
                    <div className="movie-card-schedules">
                        {
                            movie.schedules.length > 0 ?
                                movie.schedules.map(schedule => (
                                    <p>
                                        {moment(schedule.time).format('HH:mm')}
                                    </p>
                                ))
                                :
                                <p>
                                    No hay horarios
                            </p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const ErrorComponent = ({ error }) => {
    return (
        <>
            <p>
                Algo fallo al obtener la informacion de las peliculas
            </p>
            <p>
                {error}
            </p>
        </>
    )
}

const LoadingComponent = () => {
    return (
        <>
            <p>Cargando....</p>
        </>
    )
}