import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div className="App">
        <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" element={<Home />}/>
        </Routes>
      </div>
      </BrowserRouter>
    )
  }
}

export default App
