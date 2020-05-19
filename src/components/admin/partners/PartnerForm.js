import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import FileBase64 from 'react-file-base64'

import ConfirmDelete from '../../static/ConfirmDelete'

export default function Partnerform () {
	const { partnerId } = useParams()
	const [ partner, setPartner ] = useState( null )

	const [ name, setName ] = useState( '' )
	const [ nameErr, setNameErr ] = useState( '' )
	
	const [ email, setEmail ] = useState( '' )
	const [ emailErr, setEmailErr ] = useState( '' )
	
	const [ phone, setPhone ] = useState( '' )
	const [ phoneErr, setPhoneErr ] = useState( '' )

	const [ address, setAddress ] = useState( '' )
	
	const [ description, setDescription ] = useState( '' )
	
	const [ image, setImage ] = useState( '' )
	const [ imageErr, setImageErr ] = useState( '' )
	
	const [ status, setStatus ] = useState( '' )
	const [ statusErr, setStatusErr ] = useState( '' )

	useEffect( () => {
		if ( partnerId ) {
			fetch('/api/partners/'+partnerId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						setPartner( json )	
						setName(json.name)
						setEmail(json.email)
						setPhone(json.phone)
						setAddress(json.address)
						setDescription(json.description)
						setImage(json.image)
						setStatus(json.status)
					}
				} )
		}
	}, [partnerId])
	
	const set = ( evt, fun, funErr ) => {
		let value = evt.target.value
		if ( value === '' ) {
			funErr( 'This Field is Required' )
		} else {
			funErr('')
		}
		fun( value )
	}

	const nameChange = ( evt ) => {
		set( evt, setName, setNameErr )
	}
	const emailChange = ( evt ) => {
		set(evt, setEmail, setEmailErr)
	}
	const phoneChange = ( evt ) => {
		set(evt, setPhone, setPhoneErr)
	}
	const imageChange = ( dataUrl ) => {
		if ( dataUrl === "" ) {
			setImageErr( "Image is Rquired" )
		} else {
			setImage( dataUrl.base64 )
			setImageErr('')
		}
	}

	const statusChange = ( evt ) => {
		set(evt, setStatus, setStatusErr)
	}
	
	const save = (evt) => {
		let proceed = true
		if ( name.trim()==='' ) {
			setNameErr( 'Name is required' )
			proceed = false
		} else {
			setNameErr( '' )
		}
		if ( email.trim()==='' ) {
			setEmailErr( 'Email is required' )
			proceed = false
		} else {
			setEmailErr( '' )
		}
		if ( phone.trim()==='' ) {
			setPhoneErr( 'Phone is required' )
			proceed = false
		} else {
			setPhoneErr( '' )
		}
		if ( image.trim()==='' ) {
			setImageErr( 'Image is required' )
			proceed = false
		} else {
			setImageErr( '' )
		}
		
		if ( status.trim()==='' ) {
			setStatusErr( 'Status is required' )
			proceed = false
		} else {
			setStatusErr( '' )
		}

		if ( proceed ) {
			let body = {
				name: name,
				email: email,
				phone: phone,
				address: address,
				description: description,
				image: image,
				status: status,
			}
			let path = partnerId ? '/' + partnerId : ''
			let code = partnerId ? 200 : 201
			fetch( '/api/partners' + path, {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === code ) {
					window.location = "/admin/partners" 
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
		fetch( "/api/partners/" + partnerId, {
			method: 'delete'
		} ).then( res => {
			if ( res.status === 200 ) {
				window.location = "/admin/partners"
			}
		})
	}
	return (
		<>
			<div className="card-header">
				<div className="row">
					<div className="col-9">
						<h4>{partner ? "Edit" : "Create"} A Partner</h4>
					</div>
					<div className="col-3 text-right">
						<Link to="/admin/partners" className="btn btn-primary" >
							Back
						</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={save} >
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="name">Partner's Name</label>
								{nameErr && <small className="text-danger"> {nameErr} </small>}
								<input id="name" className="form-control"
									type="text" value={name} onChange={nameChange}
									placeholder="Enter the Full Name"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="phone">Phone Number</label>
								{phoneErr && <small className="text-danger"> {phoneErr} </small>}
								<input id="phone" className="form-control"
									type="tel" value={phone} onChange={phoneChange}
									placeholder="Enter Phone Number"
								/>
							</div>		
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email Address</label>
						{emailErr && <small className="text-danger"> {emailErr} </small>}
						<input id="email" className="form-control"
							type="email" value={email} onChange={emailChange}
							placeholder="email@example.com"
						/>
					</div>		
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="address">Address/Location</label>
								<input id="email" className="form-control"
									type="text" value={address} onChange={evt => setAddress( evt.target.value )}
									placeholder="Enter Partner's Location"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="status">Status</label>
								{statusErr && <small className="text-danger"> {statusErr} </small>}
								<select id="status" className="form-control"
									value={status} onChange={statusChange}>
									<option value="">-- Status --</option>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea id="description" className="form-control"
							value={description} onChange={evt => setDescription( evt.target.value )}
							rows="5" placeholder="Enter a Description"/>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-md-6">
								<label htmlFor="image">Logo/Image</label>
								{imageErr && <small className="text-danger"> {imageErr} </small>}
								<div className="form-control">
									<FileBase64
										multiple={false}
										onDone={imageChange}
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
									{partner && <><button type="button" data-toggle="modal" data-target="#delete"
										className="btn btn-danger">Delete</button>
										<ConfirmDelete
											modalId="delete" item="Partner"
											callback={handleDelete} details={`Partner's Name: ${partner.name}`} />
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
