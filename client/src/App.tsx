import { jsx } from '@emotion/react'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <EmotionTest />
      <ServerData />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

function EmotionTest() {
  return (
    <div css={{backgroundColor: 'red'}}>Hello, Emotion!</div>
  )
}

function ServerData() {
  const [serverCount, setServerCount] = useState('Loading...')
  useEffect (() => {
    fetch('http://localhost:3000/count')
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp)
        setServerCount(`Server count is: ${resp.count}`)
      })
      .catch((err) => {
        console.log(err)
      }
    )
  }, [])

  return (<div>{serverCount}</div>)
}

export default App
