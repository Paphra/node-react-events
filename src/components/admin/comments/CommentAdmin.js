import React from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'

import Comments from './Comments'
import CommentForm from './CommentForm'

export default function Commentadmin() {
  
  const match = useRouteMatch()

  return (
    <>
      <div className="card shadow">
        <Switch>
          <Route path={`${ match.path }/create`} >
            <CommentForm />
          </Route>
          <Route path={`${ match.path }/:commentId`}>
            <CommentForm />
          </Route>
          <Route path={`${ match.path }`}>
            <Comments />
          </Route>
        </Switch>
      </div>
    </>
  );
}
