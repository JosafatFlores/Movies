import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/peli" render={() => <p>hola peliculas</p>} />
            <Route exact path="/" render={() => <p>hola mundo</p>} />
            <Route render={() => <p>Pagina no encontrada</p>} />
        </Switch>
    )
}

export default Routes