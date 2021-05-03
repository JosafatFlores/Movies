import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../Components/Homepage/index'
import { MoviesList, MovieDetail, MovieForm }  from '../Components/Movies'


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Homepage } />
            <Route exact path="/peliculas" component={ MoviesList } />
            <Route exact path="/peliculas/crear" component={MovieForm}/>
            <Route exact path="/peliculas/:movieId" component={ MovieDetail } />
            <Route render={() => <p>Pagina no encontrada</p>} />
        </Switch>
    )
}

export default Routes