import './App.css';
import React, { useState, useEffect } from "react";
import ArticleCard from './components/articleCard/articleCard.js';
import ArticlePopUp from './components/articlePopUp/articlePopUp.js';
import Filters from './components/filters/filters.js';

function App() {

  const [articles, getArticles] = useState([])
  const [selectedArticleData, setSelectedArticleData] = useState(undefined)
  const [articleIsOpen, setArticleIsOpen] = useState(false)

  //Filter Options
  const [sortBy, getSortBy] = useState("time")
  const [articleSource, getArticleSource] = useState([])

  // Gets Articles From API
  const getData = () => {
    fetch(`http://localhost:3000/getArticles?sort=${sortBy}`)
      .then((res) => res.json())
      .then((res) => {
        getArticles(res)
      })
  }

  useEffect(() => {
    getData()
  }, [sortBy])

  return (
    <div className="App">



      <div class="topnav">
        <a class="active" href="#">Žinios vienoje vietoje</a>
        <a href="#">Pagrindis</a>
      </div>

      <div className='mainContent'>

        <div className='ArticleCardLeft'>
          <ArticleCard
            articles={articles}
            setSelectedArticleData={setSelectedArticleData}
            setOpen={setArticleIsOpen}
          />
        </div>

        <div className="FiltersRight">
          <Filters
            getSortBy={getSortBy}
            getArticleSource={getArticleSource}
          />
        </div>

        <ArticlePopUp
          className="ArticlePopUp"
          selectedArticleData={selectedArticleData}
          setOpen={setArticleIsOpen}
          open={articleIsOpen}
          sortBy={sortBy}
        />


      </div>




    </div >




  );
}

export default App;
