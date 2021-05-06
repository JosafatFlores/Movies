import React, { Component } from 'react'
import { createMovie } from '../../../Services'
import { schedulesOptions, schedulesOptions as SOptions } from '../../../Consts'
import moment from 'moment';
import './index.scss'

export default class MovieForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newMovie: {
                title: 'title',
                description: '',
                duration: '',
                ticketPrice: '',
                isOnCinemas: false,
                schedules: []
            },
            scheduleOptions: []
        }
    }

    componentDidMount = () => {
        this.setState({
            scheduleOptions: SOptions
        })
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
        debugger
        return schedules.map(schedule => {
            return {
                time: moment(`${moment().format('YYYY-MM-DD')} ${schedule}`)
                .format('YYYY-MM-DD:HH:mm:ss')
            }
        })
    }

    handleSubmit = async () => {
        const { newMovie } = this.state

        try {
            newMovie.schedules = this.formatScheduleTimes(newMovie.schedules)
            newMovie.ticketPrice = parseFloat(newMovie.ticketPrice).toFixed(2)
            newMovie.duration = parseInt(newMovie.duration)

            console.log(newMovie)

            const result = await createMovie(newMovie)
            
            if (!result.hasError){
                console.log('Pelicula creada con exito')
                console.log(result)
            }else{
                console.log('Hubo un error')
                console.log(result)
            }
        } catch (error) {
            console.log('Hubo un error con el server    ')
                console.log(error)
        }
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
            scheduleOptions
        } = this.state

        return (
            <>
                <div className="movies-form-container">
                    <p>Crear pelicula</p>
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
                        Crear pelicula
                    </button>
                </div>
            </>
        )
    }



}
