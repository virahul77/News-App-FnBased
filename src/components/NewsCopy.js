import React, { Component } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country : 'in',
    pageSize : 5,
    category : 'general'
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }
  constructor() {
    super();
    this.state = {
      article: [],
      loding: false,
      page : 1
    };
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loding:false})
    // console.log(parsedData);
    this.setState({article : parsedData.articles})
  }

  //componentDidMount run after render
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loding:true})
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({loding:false})
    // console.log(parsedData);
    this.setState({article : parsedData.articles}) 
  }
  prevClickFn = async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loding:true})
    // let data = await fetch(url);
    // let parsedData = await data.json(); 
    // this.setState({loding:false})
    // this.setState({
    //   page : this.state.page>1?this.state.page-1:1
    // })
    // this.setState({article : parsedData.articles})
    // this.setState({loding : false})
    // console.log(url);
    // console.log(parsedData.articles.length)
    this.setState({page : this.state.page>1?this.state.page-1:1})
    this.updateNews()

  } 
  nextClickFn = async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9d62dd5394b74c54a2e30a4c396507ae&page=${this.state.page}&pageSize=${this.props.pageSize}`
    // this.setState({loding:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({loding:false})
    // this.setState({
    //   page : parsedData.articles.length===0?this.state.page:this.state.page +1
    // })
    // this.setState({article : parsedData.articles.length===0?this.state.article:parsedData.articles})
    // this.setState({loding : parsedData.articles.length===0?true:false})
    // console.log(url);
    // console.log(parsedData.articles.length)
    this.setState({page :this.state.page +1})
    this.updateNews()
  }
  render() {
    // console.log('render fn');
    return (
      <div className="container my-3">
        <h1 className="text-center mb-3">NewsMonkey - Top Headlines</h1>
        {this.state.loding && <Spinner/>}
        <div className="row">
          {!this.state.loding && this.state.article.map((element) => {
            // console.log(element);
            return (
              <div className="col-md-4 mb-2" key={element.url}>
                <NewItem
                  title= {element.title?element.title:''}
                  // key={element.url}
                  newsUrl = {element.url}
                  description= {element.description?element.description:''}
                  author = {element.author}
                  date = {element.publishedAt}
                  source = {element.source.name}
                  imageUrl= {element.urlToImage?element.urlToImage:'https://images.livemint.com/img/2022/02/20/600x338/Realme_9_Pro_Plus_1645342609281_1645342609472.jpeg'}
                />
              </div>
            );
          })} 
        </div>
        <div className="container d-flex justify-content-between">
          <button className="btn btn-dark" disabled={this.state.page<=1} onClick={this.prevClickFn} > &#8592; Previous</button>
          <button className="btn btn-dark" disabled={this.state.loding} onClick={this.nextClickFn} >Next &#8594;</button>
        </div>
      </div>
    );
  }
}

export default News;
