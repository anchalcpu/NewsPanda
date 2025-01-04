import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from "./spinner"
import PropTypes from 'prop-types';
import Weather from './Weather';


export default class News extends Component {
    static defaultProps={
      country:"in",
      category:"general",
      pageSize:8
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string,
    }
    articles=[]
    constructor(){
        super();
        console.log("constructor");
        this.state={
        articles:this.articles,
        loading:false,
        page:1
        }
    }
    async componentDidMount(){
      this.props.setProgress(0);
      console.log("componentDidMount");
      this.setstate({loading:true});
    
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&pageSize=${this.props.pageSize}&apiKey=c90605e5d4e7448391f1598824211411&category=${this.props.category}`;
      let data= await fetch(url);
      this.props.setProgress(50);
      let parseddata=await data.json();
      this.setState({articles:parseddata.articles,
        totalResults:parseddata.totalResults,loading:false})
        this.props.setProgress(100);
    }
    handlenextClick=async()=>{
    this.setState({loading:true})
     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=c90605e5d4e7448391f1598824211411&page=${this.state.page+1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
     let data= await fetch(url);
     let parseddata=await data.json();
     this.setState({articles:parseddata.articles,
                 page:this.state.page+1,
                 loading:false
     })
      }

    handlepreClick=async()=>{
      this.setState({loading:true})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=c90605e5d4e7448391f1598824211411&page=${this.state.page-1}&pageSize=${this.props.pageSize}&category=${this.props.category}`;
      let data= await fetch(url);
      let parseddata=await data.json();
      this.setState({articles:parseddata.articles,
                  page:this.state.page-1,
                  loading:false
      })
 
    }
  render() {
    return (
      <div className="container py-5 px-5">
        <div className="row">

        <div className="d-flex justify-content-between">
            <h2 className="text-center display-6">NewsPanda -Top Headlines</h2>
            <Weather key="weather"/>
            </div>

            {this.state.loading && <Spinner key="spinner"/>}
            {this.state.articles.map((element)=>{
                return <div className="col-md-3  d-flex"  key={element.id}  >
                <Newsitem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} 
                imageUrl={element.urlToImage}
                newsUrl={element.url?element.url:""} author={element.author?element.author:"Unknown"}
                 publishedAt={element.publishedAt} source={element.source.name}/>
                </div>
            })}
            

        </div>
      <div className="d-flex justify-content-between">
    <button className="btn btn-secondary" disabled={this.state.page<=1} onClick={this.handlepreClick}>&larr; Previous</button>
    <button className="btn btn-secondary" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} onClick={this.handlenextClick}>Next &rarr;</button>
  </div>
        </div>
    )
  }
}
