import './App.css'
import { useState } from 'react';

function App() {
  let [image, updateImage] = useState("")
  let [prompt, updatePrompt] = useState("")
  const URL = "https://api.openai.com/v1/images/generations";
  const AuthToken = "Bearer " + "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"

  const makeRequest = (e: any) => {
    e.preventDefault()
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        "prompt": prompt,
        "n": 1,
        "size": "768x768"
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization': AuthToken
      },
    })
      .then(res => res.json())
      .then(image => {
        updateImage(image.data[0].url)
      })
  }
  return (
    <div>
      <img src={image} alt="Not Found" width={1024} height={1024} />

      <form>
        <input type="text" value={prompt} onChange={(e) => updatePrompt(e.target.value)}></input>
        <button type="submit" onClick={makeRequest}>Generate</button>
      </form>
    </div>
  )
}

export default App
