import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Moment from 'react-moment'

import {date} from '../static/Event'

export default function Book () {
	const { eventId } = useParams()
	const [ event, setEvent] = useState(null)
	let reference = eventId
	let [ dates, setDates ] = useState( null )
	
	const [ fName, setFName ] = useState( "" )
	const [ lName, setLName ] = useState( "" )
	const [ nameErr, setNameErr ] = useState( "" )
	
	const [ phone, setPhone ] = useState( "" )
	const [ email, setEmail ] = useState( "" )
	const [ contactErr, setContactErr ] = useState( "" )
	
	const [ slots, setSlots ] = useState( 1 )
	const [ slotsErr, setSlotsErr ] = useState( '' )
	
	const [ amount, setAmount ] = useState( 0 )
	const [ discount, setDiscount ] = useState( 0 )
	const [ desc, setDesc ] = useState( '' )
	
	const getTotal = (slots) => {
		let subTotal = ( slots * event.price )
		let totalDiscount = 0
		if(discount){totalDiscount = ( ( discount * subTotal ) / 100 )}
		setAmount( subTotal - totalDiscount )
	}

	useEffect( () => {
		fetch( "/api/events/" + eventId )
			.then( res => res.json() )
			.then( json => {
				
				setDates( date(
					{ date: json.startDate, time: json.startTime },
					{ date: json.endDate, time: json.endTime }, true
				) )
				
				setEvent( json )
				setDiscount( json.discount )
				setAmount( json.price )
				setDesc( `Booking ${ json.title } on ${ new Date() }` )
				
			} )
		
	}, [ eventId ] )
	
	const book = ( evt ) => {
		let proceed = true

		if ( fName === "" || lName === "" ) {
			proceed = false
			setNameErr("Both Names are Required!")
		}else{setNameErr('')}
		if ( email === '' || phone === '' ) {
			proceed = false
			setContactErr("Both Phone and Email Are Required!")
		} else { setContactErr( '' ) }
		
		if ( slots === 0 ) {
			proceed = false
			setSlotsErr("Slots are required, at least One!")
		}else{setSlotsErr("")}
		
		if ( proceed ) {
			let body = {
				event: eventId,
				firstName: fName,
				lastName: lName,
				phone: phone,
				email: email,

				slots: slots,
				amount: amount,
				discount: discount,
				description: desc,

				reference: reference

			}
			fetch( "/api/books", {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === 201 ) {
					
				} else {
					return res.json()
				}
			}).then(json => {
				alert(`Something Went wrong with your data | ${json.message}`)
			} )
			
		}else{alert("Some Field have Errors!")}
		evt.preventDefault()
		
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-3"></div>
				<div className="col-md-6">
					{event?<div className="card shadow">
						<form onSubmit={book}>
							<h5 className="card-header">Book Event: {event.title} </h5>
							<div className="card-body">
								<fieldset>
									<legend>Event Specifications</legend>
									<div className="row p-1">
										<div className="col-4 text-right"><b>Location:</b></div>
										<div className="col-8">{event.location}</div>
										<div className="col-4 text-right"><b>Start</b></div>
										<div className="col-8">
											<Moment
												format="hh:mma on MMM Do, YYYY"
												date={dates.starts.full} />
										</div>
										<div className="col-4 text-right"><b>End</b></div>
										<div className="col-8">
											<Moment
												format="hh:mma on MMM Do, YYYY"
												date={dates.ends.full} />
										</div>
										<div className="col-12 text-center">
											<p>
												<b>{event.openSlots}</b> Slot(s) remaining | Tickets at @ <b>
													{`${ event.price } ${ event.currency }`} <br />
													  {event.discount ? <span className="badge badge-success text-white">
														{`${event.discount} % Discount`}
													</span> : '' }  </b>
												{((dates.starts.days >= 0 || dates.starts.hours > 0)? <i>
													| Starts in {
														dates.starts.days >= 0 ? dates.starts.days + ' day(s)' :
															dates.starts.hours + ' hour(s)'} 
												</i>:<i> | Started {
														dates.starts.hours <= -24  ? (-dates.starts.days) + ' day(s) Ago' :
																( -dates.starts.hours ) + ' hour(s) Ago'}
														{(dates.ends.days >= 0 || dates.ends.hours > 0) && <b> | Ends in  {
																dates.ends.hours >= 24  ? (dates.ends.days) + ' day(s)' :
																( dates.ends.hours ) + ' hour(s)'}
													</b>}
												</i>)}
											</p>
										</div>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-md-6">
												<label htmlFor="slots">Number of Slots</label>
												<input id="slots" className="form-control" type="number"
													value={slots} onChange={evt => {
														setSlots( evt.target.value )
														getTotal(evt.target.value)
													}} min="1" max={event.openSlots}
													name="slots" placeholder="Number of Tickets"
												/>
												{slotsErr&&<small className="text-danger"> {slotsErr}</small>}												
											</div>
											<div className="col-md-6">
												<label htmlFor="amount">Total Amount</label>
												<input id="amount" className="form-control" type="number"
													value={amount} name="amount" readOnly={true}
												/>
											</div>
										</div>
									</div>
								</fieldset>
								<hr/>
								<fieldset>
									<legend>Personal Details</legend>
									<div className="form-group">
										<div className="row">
											<div className="col-md-6">
												<label htmlFor="fName">First Name</label>
												<input id="fName" className="form-control" type="text"
													value={fName} onChange={evt => setFName( evt.target.value )}
													name="fName" placeholder="Enter Your First Name"
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="lName">Last Name</label>
												<input id="lName" className="form-control" type="text"
													value={lName} onChange={evt => setLName( evt.target.value )}
													name="lName" placeholder="Enter Your Last Name"
												/>
											</div>
											{nameErr && <small className="text-danger col-12 text-center">
												{nameErr}</small>}
										</div>
										<div className="row">
											<div className="col-md-6">
												<label htmlFor="phone">Phone Number</label>
												<input id="phone" className="form-control" type="tel"
													value={phone} onChange={evt => setPhone( evt.target.value )}
													name="phone" placeholder="+XXX XXXX..."
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="email">Email Address</label>
												<input id="email" className="form-control" type="email"
													value={email} onChange={evt => setEmail( evt.target.value )}
													name="email" placeholder="email@example.com"
												/>
											</div>
											{contactErr&&<small className="text-danger col-12 text-center"> {contactErr}</small>}
												
										</div>
									</div>
								</fieldset>
							</div>
							<div className="card-footer text-right">
								<Link to="/events" className="btn btn-danger">Cancel</Link>
								<button type="submit" className="btn btn-primary">Place Order</button>
							</div>
						</form>
					</div>: <i>The Event Does  not Exist!</i>}
				</div>
				<div className="col-md-3"></div>
			</div>
		</div>
	)
}
