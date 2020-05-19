import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import ConfirmDelete from '../../static/ConfirmDelete'

export default function Categoryform () {
	const { categoryId } = useParams()
	const [ category, setCategory ] = useState( null )

	const [ name, setName ] = useState( '' )
	const [ nameErr, setNameErr ] = useState( '' )
	
	const [ description, setDescription ] = useState( '' )
	const [ descriptionErr, setDescriptionErr ] = useState( '' )
	
	
	useEffect( () => {
		if ( categoryId ) {
			fetch('/api/categories/'+categoryId)
				.then( res => res.json() )
				.then( json => {
					if ( json ) {
						setCategory( json )	
						setName(json.name)
						setDescription(json.description)
					}
				} )
		}
	}, [categoryId])
	
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

	const descriptionChange = ( evt ) => {
		set(evt, setDescription, setDescriptionErr)
	}

	const save = (evt) => {
		let proceed = true
		if ( name.trim()==='' ) {
			setNameErr( 'Name is required' )
			proceed = false
		} else {
			setNameErr( '' )
		}
		if ( description.trim()==='' ) {
			setDescriptionErr( 'Description is required' )
			proceed = false
		} else {
			setDescriptionErr( '' )
		}

		if ( proceed ) {
			let body = {
				name: name,
				description: description,
			}
			let path = categoryId ? '/' + categoryId : ''
			let code = categoryId ? 200 : 201
			fetch( '/api/categories' + path, {
				method: 'post',
				body: JSON.stringify( body ),
				headers: {
					"Content-Type": "application/json"
				}
			} ).then( res => {
				if ( res.status === code ) {
					window.location = "/admin/categories" 
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
		fetch( "/api/categories/" + categoryId, {
			method: 'delete'
		} ).then( res => {
			if ( res.status === 200 ) {
				window.location = "/admin/categories"
			}
		})
	}

	return (
		<>
			<div className="card-header">
				<div className="row">
					<div className="col-9">
						<h4>{category ? "Edit" : "Create"} A Category</h4>
					</div>
					<div className="col-3 text-right">
						<Link to="/admin/categories" className="btn btn-primary" >
							Back
						</Link>
					</div>
				</div>
			</div>
			<div className="card-body">
				<form onSubmit={save} >
					<div className="form-group">
						<label htmlFor="name">Category Name</label>
						{nameErr && <small className="text-danger"> {nameErr} </small>}
						<input id="name" className="form-control"
							value={name} onChange={nameChange} type="text"
							placeholder="Enter Category Name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="description">Description</label>
						{descriptionErr && <small className="text-danger"> {descriptionErr} </small>}
						<textarea id="description" className="form-control"
							value={description} onChange={descriptionChange} rows="4"
							placeholder="Enter a ADescription for the category"
						/>
					</div>
					
					<div className="text-center">
						{category && <><button type="button" data-toggle="modal" data-target="#deleteCategory"
							className="btn btn-danger">Delete</button>
							<ConfirmDelete
								modalId="deleteCategory" item="Category"
								callback={handleDelete} details={`Category Name: ${category.name}`} />
							</>
						}
						<button type="submit" className="btn btn-success">Save</button>
					</div>
				</form>
			</div>
		</>
	)
}
