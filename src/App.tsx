import './App.css'
import { useEffect, useState } from 'react';
import { Paintings } from './Artists';

function App() {
  let [image, updateImage] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let [title, setTitle] = useState("Click GENERATE to begin")

  const URL: string = import.meta.env.VITE_DALLE_GENERATION_URL
  const AuthToken: string = "Bearer " + import.meta.env.VITE_DALLE_AUTH_TOKEN

  let artist1: String;
  let artist2: String;
  let painting: String;

  useEffect(() => {
    return () => {
      // console.log("URL: " + URL)
      // console.log("AUTH TOKEN: " + AuthToken)
    }
  }, [0])


  const randomizePrompt = (e: any) => {
    e.preventDefault()
    let artistIndex1 = Math.floor(Math.random() * Paintings.length)
    let artistIndex2 = Math.floor(Math.random() * Paintings.length)
    let paintingIndex = Math.floor(Math.random() * Paintings[0].paintings.length)

    artist1 = Paintings[artistIndex1].artist
    artist2 = Paintings[artistIndex2].artist
    painting = Paintings[artistIndex1].paintings[paintingIndex]

    let newPrompt = `A ${artist2}-inspired version of ${painting} by ${artist1}. The artwork maintains the iconic composition and key elements of the original but is reimagined in the signature style of ${artist2}. The brushstrokes, colors, and textures reflect the artist's unique artistic approach, bringing a fresh and expressive interpretation to the classic masterpiece.`

    console.log(newPrompt)
    setTitle(`${painting} by ${artist1} in the style of ${artist2}`)
    makeRequest(newPrompt)
  }

  const makeRequest = (p: string) => {
    setIsLoading(true)
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        "prompt": p,
        "n": 1,
        "size": "1024x1024"
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': AuthToken
      },
    })
      .then(res => res.json())
      .then(image => {
        updateImage(image.data[0].url)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setTitle("Something went wrong, please try again.")
        setIsLoading(false)
      })
  }
  return (
    <main>
      <h1 className='header'>artmix.</h1>
      <p className='title'>{title}</p>
      {isLoading && <div className="lds-ripple-container"><div className="lds-ripple"><div></div><div></div></div></div>}
      {!isLoading && <img src={image} width={512} height={512} />}

      <form>
        <button type="submit"
          onClick={randomizePrompt}
          className="submit-button"
          disabled={isLoading}>Generate</button>
      </form>
      <footer>
        <p>made with love using react, vite and dall-e2</p>
      </footer>
    </main >
  )
}

export default App
