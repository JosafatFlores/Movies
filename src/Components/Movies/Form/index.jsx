import React, { Component } from 'react'
import { createMovie, getMovie, updateMovie } from '../../../Services'
import { schedulesOptions as SOptions } from '../../../Consts'
import moment from 'moment';
import { toast } from 'react-toastify'
import './index.scss'

export default class MovieForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newMovie: {
                title: '',
                description: '',
                duration: '',
                ticketPrice: '',
                isOnCinemas: false,
                schedules: []
            },
            scheduleOptions: [],
            isCreate: false,
            isReady: false
        }
    }

    componentDidMount = async  () => {

        if (this.props.match.params.movieId) {
            try {
                const { movieId } = this.props.match.params
                const data = await getMovie(movieId)
                
                if (!data.hasError) {
                    data.schedules = this.unformatSchedulesOptions(data.schedules)
                    this.setState({
                        newMovie: data,
                        isReady: true,
                        scheduleOptions:  await this.filterScheduleOptions(data.schedules)
                    })
                } else {
                    toast.error('No encontramos informacion')
                }
            } catch (error) {
                toast.error('Hubo un error con el servidor')
            }
        } else {
            this.setState({
                scheduleOptions: SOptions,
                isReady: true
            })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const { newMovie } = this.state
        newMovie[name] = value
        this.setState({
            newMovie
        })
    }

    handleChangeIsOnCinemas = (event) => {
        const { newMovie } = this.state

        newMovie.isOnCinemas =
            event.target.value === "true"
                ? true
                : false

        this.setState({
            newMovie
        })
    }

    filterScheduleOptions = (schedules) => {
        let { scheduleOptions } = this.state;
        scheduleOptions = SOptions.filter(
            schedule => {
                return !schedules.includes(schedule)
            }
        );
        console.log(scheduleOptions)
        return scheduleOptions;
    }

    addSchedule = value => {
        const { newMovie } = this.state
        newMovie.schedules.push(value)
        this.setState({
            newMovie,
            scheduleOptions: this.filterScheduleOptions(newMovie.schedules)
        })
    }

    deleteSchedule = index => {
        const { newMovie } = this.state
        newMovie.schedules.splice(index, 1)
        this.setState({
            newMovie,
            scheduleOptions: this.filterScheduleOptions(newMovie.schedules)
        })

    }

    formatScheduleTimes = schedules => {
        return schedules.map(schedule => {
            return {
                time: moment(`${moment().format('YYYY-MM-DD')} ${schedule}`)
                    .format('YYYY-MM-DD:HH:mm:ss')
            }
        })
    }

    unformatSchedulesOptions = schedules => {
        return schedules.map(schedule => {
            return moment(schedule.time).format('HH:mm')
        })
    }

    handleSubmit = async () => {
        const { newMovie, isCreate } = this.state
        let id = null

        const successResponse = 
            isCreate
                ? 'Pelicula se creo con exito'
                : 'PElicula editada con exito'
        const errorResponse =
            isCreate
                ? 'Ocurrio un error al crear la pelicula'
                : 'Ocurrio un error al editar la pelicula'

        try {
            newMovie.schedules = this.formatScheduleTimes(newMovie.schedules)
            newMovie.ticketPrice = parseFloat(newMovie.ticketPrice).toFixed(2)
            newMovie.duration = parseInt(newMovie.duration)
            console.log(newMovie)
            if (!isCreate){
                id = newMovie._id
                delete newMovie._id
                delete newMovie.createdAt
                delete newMovie.updatedAt
                delete newMovie.deletedAt
            }

            const result = await 
                isCreate 
                ? createMovie(newMovie)
                : updateMovie(id, newMovie)

            if (!result.hasError) {
                toast.success(successResponse)
                this.resetForm()
            } else {
                toast.error(errorResponse)
            }
        } catch (error) {
            toast.error(errorResponse)
        }
    }

    resetForm = () => {
        this.setState({
            newMovie: {
                title: '',
                description: '',
                duration: '',
                ticketPrice: '',
                isOnCinemas: false,
                schedules: []
            }
        })
    }

    render() {

        const {
            title,
            description,
            duration,
            ticketPrice,
            isOnCinemas,
            schedules
        } = this.state.newMovie

        const {
            scheduleOptions,
            isCreate,
            isReady
        } = this.state

        const formTitle = isCreate
            ? 'Crear pelicula'
            : 'Editar pelicula'

        const textButton = isCreate
            ? 'Guardar'
            : 'Guardar cambios'


        return (
            <>
                {
                    isReady &&
                        <div className="movies-form-container">
                            <p>{formTitle}</p>
                            <div className="input-data-container">
                                <div className="input-data-container-left">
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        placeholder="Titulo de la pelicula"
                                        onChange={(event) => this.handleChange(event)}
                                    />

                                    <textarea
                                        name="description"
                                        value={description}
                                        placeholder="Sinopsis"
                                        onChange={(event) => this.handleChange(event)}
                                    />

                                    <input
                                        type="number"
                                        name="duration"
                                        value={duration}
                                        placeholder="Duracion de la pelicula (Min)"
                                        onChange={(event) => this.handleChange(event)}
                                    />
                                </div>
                                <div className="input-data-container-right">
                                    <input
                                        type="text"
                                        name="ticketPrice"
                                        value={ticketPrice}
                                        placeholder="Precio entrada"
                                        onChange={(event) => this.handleChange(event)}
                                    />

                                    <select
                                        name="isOnCinemas"
                                        defaultValue={isOnCinemas}
                                        onChange={(event) => this.handleChangeIsOnCinemas(event)}
                                    >
                                        <option value="" disabled>¿Disponible en cineas?</option>
                                        <option value="true">Disponibe</option>
                                        <option value="false">No Disponibe</option>
                                    </select>

                                    <select
                                        name="schedules"
                                        onChange={(event) => this.addSchedule(event.target.value)}
                                    >
                                        <option value="" defaultValue>Selecciona horarios de transmision</option>
                                        {
                                            scheduleOptions.map((schedule) => (
                                                <option value={schedule}>
                                                    {schedule}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <div className="schedules-selected-container">
                                        {

                                            schedules.length > 0 ?
                                                schedules.map((schedule, index) =>
                                                    <div
                                                        key={index}
                                                        className="schedule-item"
                                                    >
                                                        <p className="schedule-front">
                                                            {schedule}
                                                        </p>
                                                        <p
                                                            className="schedule-back"
                                                            onClick={() => this.deleteSchedule(index)}
                                                        >
                                                            Eliminar
                                                    </p>
                                                    </div>
                                                )
                                                : <p>
                                                    No se han seleccionado horarios
                                    </p>
                                        }
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => this.handleSubmit()}
                            >
                                {textButton}
                            </button>
                        </div>
                }
            </>
        )
    }



}
