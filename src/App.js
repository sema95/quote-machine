import './App.scss';
import React, { useEffect, useState } from 'react';
import COLORS_ARRAY from "./colorsArray.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons' 
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

let quotesDbUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const App = () => {
  const [quote, setQuote] = useState("Life isn’t about getting and having, it’s about giving and being.");
  const [author, setAuthor] = useState("Kevin Kruse");
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34'); 
 
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quotesDbUrl)
  }, [quotesDbUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length)
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    setAccentColor(COLORS_ARRAY[randomInteger])
  } 

    return (
      <div className="App" >
        <header className="App-header" style={{backgroundColor: accentColor}}>
          <div id="quote-box" style={{color: accentColor}}>
            <h2 id="text">
            <span id="quote-icon"><FontAwesomeIcon icon={faQuoteLeft} /></span>
            {quote}"
            </h2>
            <p id="author">- {author}</p>
            <div className="buttons">
              <a id="tweet-quote" style={{backgroundColor: accentColor}} href={encodeURI(`http://twitter.com/intent/tweet?text=$ {quote} -${author}`)} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <button id="new-quote" style={{backgroundColor: accentColor}} onClick={() => getRandomQuote()}>Change Quote</button>
            </div>
          </div>
        </header>
      </div>
    );
  }
export default App;
