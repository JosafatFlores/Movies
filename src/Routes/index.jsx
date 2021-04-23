import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../Components/Homepage/index'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={ Homepage } />
            <Route exact path="/peliculas" render={() => <p>hola mundo</p>} />
            <Route render={() => <p>Pagina no encontrada</p>} />
        </Switch>
    )
}

export default Routes