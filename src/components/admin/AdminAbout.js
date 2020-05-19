import React, { useState, useEffect } from 'react'

import Froala from '../static/Froala'
import Success from '../static/Success'

export default function AdminAbout(){
	const [ success, setSuccess ] = useState( false )
	
	const [ name, setName ] = useState( '' )
	const [ phone, setPhone ] = useState( '' )
	const [ email, setEmail ] = useState( '' )
	const [ facebook, setFacebook ] = useState( '' )
	const [ twitter, setTwitter ] = useState( '' )
	const [ whatsapp, setWhatsapp ] = useState( '' )
	const [ website, setWebsite ] = useState('')

	const [ longitude, setLongitude ] = useState( '' )
	const [ latitude, setLatitude ] = useState( '' )
	const [ address, setAddress ] = useState( '' )
	
	const [ description, setDescription ] = useState( '' )
	
	useEffect( () => {
		fetch( '/api/about' )
			.then( res => res.json() )
			.then( json => {

				setName( json.name )
				setEmail( json.email )
				setPhone( json.phone )
				setFacebook( json.facebook )
				setTwitter( json.twitter )
				setWhatsapp( json.whatsapp )
				setWebsite( json.website )
				setLatitude( json.latitude )
				setLongitude( json.longitude )
				setAddress( json.address )
				setDescription( json.description )

			})
	}, [])

	const save = ( evt ) => {
		let body = {
			name: name,
			phone: phone,
			email: email,
			facebook: facebook,
			twitter: twitter,
			whatsapp: whatsapp,
			website: website,
			address: address,
			latitude: latitude,
			logitude: longitude,
			description: description
		}
		fetch( '/api/about', {
			method: 'post',
			body: JSON.stringify( body ),
			headers: {
				'Content-Type': 'application/json'
			}
		} ).then( res => {
			if ( res.status === 200 ) {
				setSuccess( true )
			} else {
				return res.json()
			}
		} ).then( json => {
			if ( json ) {
				alert(`Something went wrong while submittn your Data | ${json.error}`)
			}
		})
		evt.preventDefault()
	}


	return (
		<div className="card shadow">
			<h4 className="card-header">Edit About</h4>
			<form onSubmit={save} >
				<div className="card-body">
					<fieldset>
						<legend>Busines Information</legend>
						<div className="row">
							<div className="col-12">
								<label htmlFor="name" >Busines Name</label>
								<input id="name" className="form-control" type="text"
									value={name} onChange={evt => setName( evt.target.value )}
									placeholder="Enter The Business Name"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="phone" >Busines Phone Number</label>
								<input id="phone" className="form-control" type="tel"
									value={phone} onChange={evt => setPhone( evt.target.value )}
									placeholder="Enter The Phone Number"
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="email" >Email Address</label>
								<input id="email" className="form-control" type="email"
									value={email} onChange={evt => setEmail( evt.target.value )}
									placeholder="email@example.com"
								/>
							</div>
						</div>
					</fieldset>
					<hr/>
					<fieldset>
						<legend>Social Media Platforms</legend>
						<div className="form-group">
							<div className="row">
								<div className="col-md-3">
									<label htmlFor="facebook">Facebook</label>
									<input id="facebook" className="form-control" type="text"
										value={facebook} onChange={evt => setFacebook( evt.target.value )}
										placeholder="@facebook Username"
									/>
								</div>
								<div className="col-md-3">
									<label htmlFor="twitter">Twitter</label>
									<input id="twitter" className="form-control" type="text"
										value={twitter} onChange={evt => setTwitter( evt.target.value )}
										placeholder="@twitter Username"
									/>
								</div>
								<div className="col-md-3">
									<label htmlFor="whatsapp">WhatsApp</label>
									<input id="whatsapp" className="form-control" type="tel"
										value={whatsapp} onChange={evt => setWhatsapp( evt.target.value )}
										placeholder="WhatsApp Number"
									/>
								</div>
								<div className="col-md-3">
									<label htmlFor="website">Website</label>
									<input id="website" className="form-control" type="text"
										value={website} onChange={evt => setWebsite( evt.target.value )}
										placeholder="Website url: https://....."
									/>
								</div>
							</div>
						</div>
					</fieldset>
					<hr />
					<fieldset>
						<legend>Description</legend>
						<div className="form-group">
							<Froala
								model={description}
								config={{
									placeholderText: "Describe This Business to give a user a clear picture about what you do",
									height: "500px"
								}}
								onModelChange={model=>setDescription(model)}
							/>
						</div>
					</fieldset>
					<hr />
					<fieldset>
						<legend>Location</legend>
						<div className="form-group">
							<div className="row">
								<div className="col-12">
									<label htmlFor="address">Address</label>
									<input id="address" className="form-control" type="text"
										value={address} onChange={evt => setAddress( evt.target.value )}
										placeholder="Location Address: Street, Block/Plot, Town, Country"
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="logitude">Longitude</label>
									<input id="longitude" className="form-control" type="text"
										value={longitude} onChange={evt => setLongitude( evt.target.value )}
										placeholder="Location Longitude"
									/>
								</div>
								<div className="col-md-6">
									<label htmlFor="latitude">Latitude</label>
									<input id="latitude" className="form-control" type="text"
										value={latitude} onChange={evt => setLatitude( evt.target.value )}
										placeholder="Location Latitude"
									/>
								</div>
							</div>
						</div>
					</fieldset>
				</div>
				<div className="card-footer text-center">
					<button type="submit" data-toggle="modal" data-target="#success"
						className="btn btn-primary"> Save About Information</button>
				</div>
			</form>
			{success && <Success
				show={success}
				action="Saved Updates"
				modalId="success"
				details="The Changes Have been successfully saved to the database"
			/>}
		</div>
	)
}
