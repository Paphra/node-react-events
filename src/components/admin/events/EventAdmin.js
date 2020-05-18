import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import Events from './Events'
import EventForm from './EventForm'

export default function EventAdmin() {
  
  const match = useRouteMatch()

  return (
    <>
      <div className="card shadow">
        <Switch>
          <Route path={`${ match.path }/create`} >
            <EventForm />
          </Route>
          <Route path={`${ match.path }/:eventId`}>
            <EventForm />
          </Route>
          <Route path={`${ match.path }`}>
            <Events />
          </Route>
        </Switch>
      </div>
    </>
  );
}
