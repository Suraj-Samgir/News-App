import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: "general/"
    }

    static propTypes = {
        country: this.propTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults: 0
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=0e2c9dcde77843ad967d579ff5ec7e17&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parseData = await data.json();

        this.setState({articles:parseData.articles, totalResults:parseData.totalResults});
    }

    handleNextClick = async () => {
        if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))
            {

            }
            else
            {
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=0e2c9dcde77843ad967d579ff5ec7e17&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
                
                let data = await fetch(url);
                let parseData = await data.json();
                
                this.setState({articles:parseData.articles});

                this.setState({
                    page:this.state.page+1,
                });
            }
        
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=0e2c9dcde77843ad967d579ff5ec7e17&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({articles:parseData.articles});

        this.setState({
            page:this.state.page-1,
        });
    }

  render() {

    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsMonkey - Top Headlines</h2>

        <div className="row">
        {this.state.articles.map((element) => {
            console.log(element);
            return <div className="col-md-4 my-3" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl = {!element.urlToImage?"https://i.ytimg.com/vi/eFQKhOjzMLA/hqdefault.jpg":element.urlToImage} newsUrl={element.url}/>
        </div>;
        })}
        </div>
        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
            <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
