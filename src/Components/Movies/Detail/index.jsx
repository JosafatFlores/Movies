import React, { Component } from 'react'
import { getMovie } from '../../../Services'
import placeholderImg from '../../../Assets/placeholder.png'
import './index.scss'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: {},
            isReady: false,
            hasError: false,
            error: null
        }
    }

    componentDidMount = async () => {

        try {
            const movieId = this.props.match.params.movieId
            if (!movieId) {
                this.setState({
                    hasError: true,
                    error: 'No obtuvimos el ID de la pelicula'
                })
            } else {
                const movie = await getMovie(movieId)
                if (!movie.hasError) {
                    this.setState({
                        movie: movie,
                        isReady: true
                    })
                }
            }
        } catch (error) {
            this.setState({
                hasError: true,
                error
            })
        }
    }

    render() {
        const {
            movie,
            isReady,
            hasError,
            error
        } = this.state

        console.log('el estado', this.state)
        return (
            <>
                {
                    isReady ?
                        <DetailComponent
                            movie={movie.data}
                        />
                        : hasError ?
                            <ErrorComponent
                                error={error}
                            />
                            : <LoadingComponent />
                }
            </>
        )
    }
}

const DetailComponent = ({ movie }) => {
    return (
        <>
            <div className="movie-detail-container">
                <div className="movie-detail-header">
                    <img src={placeholderImg} alt="movie img" />
                    <p>
                        {movie.title}
                    </p>
                </div>
                <div className="movie-detail-body">
                    <div className="movie-detail-body-left">
                        <p className="sinopsis">
                            Sinopsis
                    </p>
                        <p className="movie-description">
                            {movie.description}
                        </p>
                    </div>
                    <div className="movie-detail-body-right">
                        <p>
                            Costo de la entrada:
                        <span>
                                {parseFloat(movie.ticketPrice).toFixed(2)}
                            </span>
                        </p>
                        <p>
                            Duracion (Minutos):
                        <span>
                                {movie.duration}
                            </span>
                        </p>
                        <p className="is-on-cinema">
                            {
                                movie.isOnCinemas ?
                                    'En cartelera'
                                    : 'No disponible en cienas'
                            }
                        </p>
                    </div>
                </div>
                <div className="movie-detail-actions">
                    <button className="action-button edit-movie">
                        Editar pelicula
                    </button>
                    <button className="action-button delete-movie">
                        Eliminar pelicula
                    </button>
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