import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News'
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  let pageSize=15
  const [progress,setProgress] = useState(10)
  let apiKey= process.env.REACT_APP_NEWS_API

    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(5)}
      />
        <NavBar />
        <Routes>
          <Route exact path='/'  element={<News setProgress={setProgress} apikey = {apiKey} key='general' pageSize={pageSize} country='in' category = 'general'/>} />
          <Route exact path='/business'  element={<News setProgress={setProgress} apikey = {apiKey} key='business' pageSize={pageSize} country='in' category = 'business'/>} />
          <Route exact path='/entertainment'  element={<News setProgress={setProgress} apikey = {apiKey} key='entertainment' pageSize={pageSize} country='in' category = 'entertainment'/>} />
          <Route exact path='/general'  element={<News setProgress={setProgress} apikey = {apiKey} key='general' pageSize={pageSize} country='in' category = 'general'/>} />
          <Route exact path='/health'  element={<News setProgress={setProgress} apikey = {apiKey} key='health' pageSize={pageSize} country='in' category = 'health'/>} />
          <Route exact path='/science'  element={<News setProgress={setProgress} apikey = {apiKey} key='science' pageSize={pageSize} country='in' category = 'science'/>} />
          <Route exact path='/sports'  element={<News setProgress={setProgress} apikey = {apiKey} key='sports' pageSize={pageSize} country='in' category = 'sports'/>} />
          <Route exact path='/technology'  element={<News setProgress={setProgress} apikey = {apiKey} key='technology' pageSize={pageSize} country='in' category = 'technology'/>} />
        
        </Routes>
        </Router>
      </div>
    )
  }

  export default App




