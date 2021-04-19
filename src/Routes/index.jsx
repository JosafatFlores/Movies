import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Routes = () => {
    <Switch>
        <Route path="/" render = { () => <p>hola mundo</p>}/>
        <Route path="/peli" render = { () => <p>hola peliculas</p>}/>
    </Switch>
}

export default Routes