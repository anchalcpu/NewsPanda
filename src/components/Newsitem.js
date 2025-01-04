import React, { Component } from 'react'
import defaultImg from '../static/default.jpg'


export default class Newsitem extends Component {
  render()
  {  let {title,description,imageUrl,newsUrl,author,publishedAt,source}=this.props ;

    return (
      <>
      <div className="card shadow my-3">
      <span className="position-absolute top-0 translate-middle badge  bg-warning badge-hover" 
      style={{left: '80%',zIndex:'1'}}>
    {source}
  </span>
  <img src={!imageUrl?defaultImg:imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}
    

    </h5>
    <p className="card-text">
       {description}</p>
       <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
  </div>
</div>  
      </>
    )
  }
}
