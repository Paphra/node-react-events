import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FileBase64 from 'react-file-base64'

import ConfirmDelete from '../../static/ConfirmDelete'
import Froala from "../../static/Froala"

export default function Eventform () {
	const { eventId } = useParams()
	const [ event, setEvent ] = useState( null )
  const [ partners, setParteners ] = useState( [] )
  const [ categories, setCategories ] = useState([])
	
	const [ title, setTitle ] = useState( '' )
	const [ titleErr, setTitleErr ] = useState( '' )
	
	const [ openSlots, setOpenSlots ] = useState( 0 )
  const [ price, setPrice ] = useState( 0 )
  const [ discount, setDiscount ] = useState( 0 )
	const [ currency, setCurrency ] = useState( 'UGX' )
	const [ eventPartners, setEventPartners ] = useState( [] )
	
	const [ category, setCategory ] = useState( '' )
  const [ categoryErr, setCategoryErr ] = useState( '' )
  
	const [ location, setLocation ] = useState( '' )
	const [ locationErr, setLocationErr ] = useState( '' )
	
	const [ description, setDescription ] = useState( '' )
	const [ descriptionErr, setDescriptionErr ] = useState( '' )
		
	const [ image, setImage ] = useState( '' )
	const [ imageErr, setImageErr ] = useState( '' )
	
	const [ status, setStatus ] = useState( '' )
  const [ statusErr, setStatusErr ] = useState( '' )
  
  // dates
	const [ startDate, setStartDate ] = useState( '' )
  const [ startTime, setStartTime ] = useState( '' )
  const [ endDate, setEndDate ] = useState( '' )
  const [ endTime, setEndTime ] = useState( '' )
  // end of dates

  const eventPartnersChnage = ( evt ) => {
    let selected = evt.target.selectedOptions
    let pts = []
    for (let i = 0; i < selected.length; i++) {
      const option = selected[ i ];
      const value = option.value
      pts.push(value)
    }
    setEventPartners(pts)
  }

	useEffect( () => {
		if ( eventId ) {
			fetch('/api/events/'+eventId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						let pts = []
						if ( json.partners ) {
							json.partners.map( pt => {
								pts.push( pt._id )
								return null
							})
						}
						setEvent( json )	
						setTitle(json.title)
						setOpenSlots(json.openSlots)
						setPrice(json.price)
						setDiscount(json.discount)
						setCurrency(json.currency)
						setImage( json.image )
						setLocation(json.location)
						setCategory( json.category._id )
						setStartDate( json.startDate )
						setStartTime(json.startTime)
						setEndDate( json.endDate )
						setEndTime(json.endTime)
						setDescription(json.description)
						setEventPartners(pts)
						setStatus(json.status)
					}
				} )
		}
		fetch( '/api/partners' )
			.then( res => res.json() )
      .then( json => setParteners( json ) )
    fetch( '/api/categories' )
      .then( res => res.json() )
      .then( json => setCategories( json ) )
    
	}, [eventId])
	
	const save = (evt) => {
		let proceed = true
		if ( title.trim()==='' ) {
			setTitleErr( 'Title is required' )
			proceed = false
		} else {
			setTitleErr( '' )
		}		
		if ( location.trim()==='' ) {
			setLocationErr( 'Location is required' )
			proceed = false
		} else {
			setLocationErr( '' )
		}
		if ( category.trim()==='' ) {
			setCategoryErr( 'Category is required' )
			proceed = false
		} else {
			setCategoryErr( '' )
		}
		if ( image.trim()==='' ) {
			setImageErr( 'Image is required' )
			proceed = false
		} else {
			setImageErr( '' )
		}
		if ( description.trim()==='' ) {
			setDescriptionErr( 'Description is required' )
			proceed = false
		} else {
			setDescriptionErr( '' )
		}
		if ( status.trim()==='' ) {
			setStatusErr( 'Status is required' )
			proceed = false
		} else {
			setStatusErr( '' )
    }

    if ( proceed ) {
			let body = {
				title: title,
				openSlots: openSlots,
				location: location,
				description: description,
				currency: currency,
				price: price,
				discount: discount,
				category: category,
				partners: eventPartners,
				image: image,
				startDate: startDate,
				startTime: startTime,
				endDate: endDate,
				endTime: endTime,
				status: status,
			}
			let path = eventId ? '/' + eventId : ''
			let code = eventId ? 200 : 201
			fetch( '/api/events' + path, {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === code ) {
					window.location = "/admin/events" 
        } else {
          return res.json()
				}
      } ).then( json => {
					alert("There was a problem submiting your Data | " + json.error)
      })
		} else {
			alert("Your Data Has erors, Please Correct them.")
		}
		evt.preventDefault()
	}

	const handleDelete = ( evt ) => {
		fetch( "/api/events/" + eventId, {
			method: 'delete'
		} ).then( res => {
			if ( res.status === 200 ) {
				window.location = "/admin/events"
			}
		})
	}

	return (
		<>
			<div className="card-header">
				<div className="row">
					<div className="col-md-9">
						<h4>{event ? "Edit" : "Create"} A Event</h4>
					</div>
					<div className="col-md-3 text-right">
						<Link to="/admin/events" className="btn btn-primary btn-sm" >
							Back
						</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={save} >
					<div className="form-group">
            <div className="form-group">
              <label htmlFor="title">Event Title</label>
							{titleErr && <small className="text-danger"> {titleErr} </small>}
							<input id="title" className="form-control" type="text"
								value={title} onChange={evt => { setTitle( evt.target.value ) }}
								placeholder="Enter Event Title"
							/>
            </div>
            <div className="row">
							<div className="col-md-6">
								<label htmlFor="price">Ticket Price</label>
								<input id="price" className="form-control" type="number"
									value={price} onChange={evt => { setPrice( evt.target.value ) }}
									placeholder="Enter Ticket Price" min="0"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="openSlots">Open Slots</label>
								<input id="openSlots" className="form-control" type="number"
									value={openSlots} onChange={evt => { setOpenSlots( evt.target.value ) }}
									placeholder="Number of Slots Available" min="0"
								/>
							</div>
						</div>
					</div>
					
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="discount">Discount [%]</label>
								<input id="discount" className="form-control" type="number"
									value={discount} onChange={evt => { setDiscount( evt.target.value ) }}
									placeholder="Enter Percentage Discount"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="currency">Currency</label>
								<select id="currency" className="form-control"
									value={currency} onChange={evt=>{setCurrency(evt.target.value)}}>
									<option value="">-- Currency --</option>
                  <option value="UGX">UGX</option>
									<option value="USD">USD</option>
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="location">Event Location</label>
								{locationErr && <small className="text-danger"> {locationErr} </small>}
								<input id="location" className="form-control" type="text"
									value={location} onChange={evt => { setLocation( evt.target.value ) }}
									placeholder="Enter Event Location"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="category">Event Category</label>
								{categoryErr && <small className="text-danger"> {categoryErr} </small>}
								<select id="status" className="form-control"
									value={category} onChange={evt=>{setCategory(evt.target.value)}}>
									<option value="">-- Category --</option>
                  {categories && categories.map( ( cat, index ) => {
                    return <option key={index} value={cat._id} >{cat.name}</option>
                  })}
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
            <label htmlFor="description">Event Description</label>
            {descriptionErr && <small className="text-danger"> {descriptionErr} </small>}
            <Froala 
              model={description}
              config={{
                placeholderText: "Enter the Event Description",
                height: "400px"
              }}
              onModelChange={( model => setDescription( model ) )}
            />
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="status">Partners</label>
								<select id="status" className="form-control" multiple={true}
									value={eventPartners} onChange={eventPartnersChnage}>
									<option value={null}>-- Partner --</option>
									{partners && partners.map( ( partner, index ) => {
										return <option key={index} value={partner._id}>{partner.name}</option>
									})}
								</select>
							</div>
							<div className="col-md-6">
								<label htmlFor="status">Status</label>
								{statusErr && <small className="text-danger"> {statusErr} </small>}
								<select id="status" className="form-control"
									value={status} onChange={evt=>{setStatus(evt.target.value)}}>
									<option value="">-- Status --</option>
									<option value="Draft">Draft</option>
									<option value="Published">Published</option>
								</select>
							</div>
						</div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-3">
                <label htmlFor="startDate">Start Date</label>
                <input id="startDate" className="form-control"
                  value={startDate} onChange={evt=>setStartDate(evt.target.value)}
                  type="date" required={true}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="startTime">Start Time</label>
                <input id="startTime" className="form-control"
                  value={startTime} onChange={evt => setStartTime( evt.target.value )}
                  type="time" required={true}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="endDate">End Date</label>
                <input id="endDate" className="form-control"
                  value={endDate} onChange={evt => setEndDate( evt.target.value )}
                  type="date" required={true}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="endTime">End Time</label>
                <input id="endTime" className="form-control"
                  value={endTime} onChange={evt => setEndTime( evt.target.value )}
                  type="time" required={true}
                />
              </div>
            </div>
          </div>

					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="image">Logo/Image</label>
								{imageErr && <small className="text-danger"> {imageErr} </small>}
								<div className="form-control">
									<FileBase64
										multiple={false}
										onDone={data=>{setImage(data.base64)}}
										className="form-control"
									/>
                </div>
                <div className="text-center"
									id="image-preview">
									{image && <img className="img-rounded" src={image} width="90%" alt="Partner" />}		
								</div>
							</div>
              <div className="col-md-6">
                <hr/>
                <div className="text-center">
                  {event && <><button type="button" data-toggle="modal" data-target="#delete"
                    className="btn btn-danger">Delete</button>
                    <ConfirmDelete
                      modalId="delete" item="Event"
                      callback={handleDelete} details={`Eventname: ${event.name}`} />
                    </>
                  }
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
