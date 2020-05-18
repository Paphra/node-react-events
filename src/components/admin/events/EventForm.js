import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js'

import FroalaEditorComponent from 'react-froala-wysiwyg';

export default function EventForm(){
  
  const { eventId } = useParams()
  
  const [event, setEvent] = useState(null)
  const editorConfig = {
    placeholderText: "Enter Event Content"
  }
  // form
  const [title, setTitle] = useState('')
  const [titleErr, setTitleErr] = useState('')

  const [content, setContent] = useState('')
  const [contentErr, setContentErr] = useState('')
  
  const [date, setDate] = useState('')
  const [dateErr, setDateErr] = useState('')
  const [time, setTime] = useState('')
  const [timeErr, setTimeErr] = useState('')

  const [category, setCategory] = useState('')
  const [categoryErr, setCategoryErr] = useState('')

  const [status, setStatus] = useState('Draft')
  const [statusErr, setStatusErr] = useState('')

  useEffect(()=>{
    if(eventId){
      fetch('/api/events/' + eventId)
        .then(res=>res.json())
        .then(json=>{
          if(json){
            setTitle(json.title)
            setContent(json.content)
            setCategory(json.category)
            setStatus(json.status)
            let dt = json.createdOn
            let y = dt.substr(0, 4)
            let m = dt.substr(5, 2)
            let d = dt.substr(8, 2)
            let h = dt.substr(11, 2)
            let min = dt.substr(14, 2)
            setDate(y + '-' + m + '-' + d)
            setTime(h + ':'+ min)
            setEvent(json)
          }
        })
    }
  }, [ eventId ])

  let target = null;
  let value = null

  const set =(evt, fun, err)=>{
    target = evt.target
    value = target.value
    fun(value)
    if(value === ''){
      err('This Field is Required')
    }else{
      err('')
    }
  }
  const titleChange =(evt)=>{
    set(evt, setTitle, setTitleErr)
  }

  const contentChange =(model)=>{
    if(model===''){
      setContentErr("This field is required")
      setContent(model)
    }else{
      setContentErr('')
      setContent(model)
    }
  }

  const categoryChange =(evt)=>{
    set(evt, setCategory, setCategoryErr)
  }

  const statusChange =(evt)=>{
    set(evt, setStatus, setStatusErr)
  }

  const dateChange =(evt)=>{
    set(evt, setDate, setDateErr)
  }

  const timeChange =(evt)=>{
    set(evt, setTime, setTimeErr)
  }

  const submit =(evt)=>{
    let save = false
    if(title===''){
      setTitleErr("Title is Required")
    }else{
      save = true;
    };
    if(content===''){
      setContentErr("Content is Required")
    }else{
      save = (save)?true:false;
    }
    if(category===''){
      setCategoryErr("Category is Required")
    }else{
      save = (save)?true:false;
    }
    
    if(status===''){
      setStatusErr("Status is Required")
    }else{
      save = (save)?true:false;
    }
    
    if(save){
      let today = new Date()
      let year = parseInt(date.substr(0, 4)) || today.getFullYear()
      let month = parseInt(date.substr(5, 2)) - 1 || today.getMonth()
      let day = parseInt(date.substr(8, 2)) || today.getDate()
      let hours = parseInt(time.substr(0, 2) ) || today.getHours()
      let minutes = parseInt(time.substr(3, 2)) || today.getMinutes()
      let data = {
        title: title,
        content: content,
        category: category,
        status: status,
        createdOn: new Date(year, month, day, hours, minutes)
      }

      let path = '/api/events'
      if(event){
        path = '/api/events/' + event._id
      }
      fetch(path, {
        method: 'event',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=>res.json()).then(json=>{alert(json._id)})
      .catch(reason=>{alert(reason)})
    }else{
      alert("Some Errors with your Data")
    }

    evt.preventDefault();
  }

  return (
		<>
			<div className="card-header">
        <div className="row">
          <div className="col-9">
            <h4>{event?`Edit Event: ${event.title}`:"Create an Event"}</h4>
          </div>
          <div className="col-3 text-right">
            <Link to={'/admin/events'} 
              className="btn btn-primary btn-sm">
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <form className="form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="title">Title: 
              {titleErr && <small className="text-danger float-right"> * {titleErr}</small>}
            </label>
            <input  id="title" className="form-control"
              type="text" name="title" placeholder="Enter Event Title"
              value={title} onChange={titleChange} />
          </div>
          <div className="form-group">
	          <label htmlFor="summernote">Content: 
              {contentErr &&  <small className="text-danger float-right"> * {contentErr}</small>}
            </label>
            <FroalaEditorComponent 
              tag="textarea"
                          
              config={editorConfig}
              model={content}
              onModelChange={contentChange}
            />
          </div>
                    
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlfor="category">Event Category: 
                  {categoryErr &&  <small className="text-danger float-right"> * {categoryErr}</small>}
                </label>
                <input id="category" className="form-control"
                  placeholder="Enter Category"
                  type="text" value={category} onChange={categoryChange} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="status">Status: 
                  {statusErr &&  <small className="text-danger float-right"> * {statusErr}</small>}
                </label>
                <select id="status" className="form-control"
                  value={status} onChange={statusChange}>
                  <option value="">-- Status --</option>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlfor="date">Created On: Date
                  {dateErr &&  <small className="text-danger float-right"> * {dateErr}</small>}
                </label>
                <input id="date" className="form-control"
                  type="date" value={date} onChange={dateChange} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlfor="date">Created On: Time
                  {timeErr &&  <small className="text-danger float-right"> * {timeErr}</small>}
                </label>
                <input id="date" className="form-control"
                  type="time" value={time} onChange={timeChange} />
              </div>
            </div>
          </div>

          <div className="text-right">
            <button type="submit" className="btn btn-success btn-sm" >
              Save
            </button>
          </div>
        </form>
            
      </div>
		</>
	)
}
