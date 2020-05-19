import React, { useState, useEffect } from 'react';
import truncate from 'truncate-html'

import CategoryFilter from './static/CategoryFlter'
import Event from './static/Event';

function Home () {
  const [ events, setEvents ] = useState([])
  
  useEffect( () => {
    fetch( '/api/events' )
      .then( res => res.json() )
      .then(json=>setEvents(json))
  }, [] )
  
  return (
    <>
      {events && <div id="events-slider" class="carousel slide"
        data-ride="carousel">
        <ol class="carousel-indicators">
          {events.map( (event, index) =>{
            if(index <=4){
              return <li key={index} data-target="#events-slider"
                data-slide-to={index} class={index===0&&'active'}></li>
            } else {
              return null
            }
          })}
        </ol>
        <div class="carousel-inner">
          {events.map( ( event, index ) => {
            if ( index <= 4 ) {
              return (
                <div key={index} class={`carousel-item ${ index === 0&&'active' }`}>
                  <img class="d-block w-100" src={event.image} alt={event.title} />
                  <div class="carousel-caption">
                    <h5>{event.title}</h5>
                    <div dangerouslySetInnerHTML={{
                      __html: truncate( event.description, 15, {
                        byWords: true, excludes: [ 'img' ]
                      } )
                    }}
                    ></div> 
                  </div>
                </div>
              )
            } else {
              return null
            }
          } )}
          <a class="carousel-control-prev" href="#events-slider"
            role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#events-slider"
            role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>}
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h4 className="text-center"><i>More Upcoming Events</i></h4>
            <Event
              events={events}
              from={0}
            />
          </div>
          <CategoryFilter type="upcoming" />
        </div>
        
        <hr/>
        <div className="row">
          <div className="col-12 text-center">
            <h4><i>Our Partners</i></h4>
          </div>
          <div className="col-3">

          </div>
          <div className="col-3">

          </div>
          <div className="col-3">

          </div>
          <div className="col-3">

          </div>
        </div>
      </div>
    </>
  );
}

export default Home
