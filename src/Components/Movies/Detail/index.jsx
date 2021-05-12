import React, { Component } from 'react'
import { getMovie, deleteMovie } from '../../../Services'
import placeholderImg from '../../../Assets/placeholder.png'
import './index.scss'
import { toast } from 'react-toastify'

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

    redirectToUpdateMovie = () =>{
        const { _id } = this.state.movie
        this.props.history.push(`/peliculas/editar/${_id}`)
    }

    deleteMovie = async () => {
        if (window.confirm('¿Deseas eliminar esta pelicula?')){
            try {
                const movieId = this.state.movie._id
                const response = await deleteMovie(movieId)

                if (!response.hasError) {
                    toast.info('Pelicula eliminada con exito')
                } else {
                    toast.error('Ha ocurrido un error al elimnar la pelicula')
                }
            } catch (error) {
                toast.error('Ha ocurrido un error al elimnar la pelicula')
            }
        }
    }

    render() {
        const {
            movie,
            isReady,
            hasError,
            error
        } = this.state

        return (
            <>
                {
                    isReady ?
                        <DetailComponent
                            movie={movie}
                            redirectToUpdateMovie={this.redirectToUpdateMovie}
                            deleteMovie={this.deleteMovie}
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

const DetailComponent = ({ 
    movie,
    redirectToUpdateMovie,
    deleteMovie
 }) => {
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
                    <button 
                        className="action-button edit-movie"
                        onClick={() => redirectToUpdateMovie()}
                    >
                        Editar pelicula
                    </button>
                    <button 
                        className="action-button delete-movie"
                        onClick={() => deleteMovie()}
                    >
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