import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
  static defaultProps = {
    category :"general",
    pageSize: 8,
  }
  static propTypes = {
    category: PropTypes.string,
    pageSize:PropTypes.number,
  }
  constructor(){
    super();
    console.log("Hello I am contructor from News Component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount(){
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=11a592412d124a999753c12ee1ffb3de&page=1&&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles , totalarticles: parsedData.totalResults})
  }

  handlePreviousPage = async  () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=11a592412d124a999753c12ee1ffb3de&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    })
  }
  handleNextPage = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalarticles/this.props.pageSize)){

    }
    else{
      console.log("Next");
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=11a592412d124a999753c12ee1ffb3de&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      })
    }
  }
  render() {
    return (
      <>
        <div className="container ">
        <h2 className='text-center'>Hunt News - Top Headlines</h2>
        {this.state.loading && <Spinner />}
          <div className="row">
          {!this.state.loading && this.state.articles.map( (element) => { 
            return <div className="col md-4" key = {element.url} > 
                  <Newsitem title= {element.title} description = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url}/> 
            </div> } )
          }
          </div>
          <div className=" container my-3 d-flex justify-content-around">
            <button disabled= {this.state.page <= 1}type="button" className="btn btn-dark" onClick={this.handlePreviousPage}> &larr; Previous </button>
            <button disabled= {this.state.page + 1 > Math.ceil(this.state.totalarticles/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextPage}> Next &rarr; </button>
          </div>
        </div>
      </>
    )
  }
}


