import React, { useEffect,useState } from "react";
import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
  const [article, setArcticle]= useState([]);
  const [loading, setLoading]= useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
 
  const  updateNews = async ()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50)
    let parsedData = await data.json();
    props.setProgress(75)
    setLoading(false)
    setArcticle(parsedData.articles);
    setTotalResults(parsedData.totalResults)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `News Monkey-${capitalizeFirstLetter(
      props.category
    )}`;
    updateNews()
    // enlint-disable-next-line
  }, [])
  
  const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArcticle(article.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
  };
    return (
      <>
        <h1 className="text-center mb-3" style={{marginTop:'65px'}}>
          NewsMonkey-Top Headlines-
          {capitalizeFirstLetter(props.category)}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4 mb-2" style={{marginTop:'10px'}} key={element.url}>
                  <NewItem
                    title={element.title ? element.title : ""}
                    newsUrl={element.url}
                    description={element.description ? element.description : ""}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://images.livemint.com/img/2022/02/20/600x338/Realme_9_Pro_Plus_1645342609281_1645342609472.jpeg"
                    }
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        </div>
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
