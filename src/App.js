import React, { Component } from 'react';
import './App.css';
const URL = "https://api.themoviedb.org/3";
const API = "&api_key=54b03f74fd4372efaffa5cc89e1b3c12";

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <NowShowing />
        </main>
      </div>
    );
  }
}

class NowShowing extends Component {
  constructor() {
    super();

    this.state = { movies: [] };
  }
  componentDidMount() {
    let movies = [];
    let request = '/discover/movie?primary_release_date.lte=2018-12-19&primary_release_date.gte=2018-12-16';
    const urlRequest = `${URL}${request}${API}`;
    // console.log('urlRequest-->', urlRequest);
    fetch(urlRequest)
      .then(response => {
        return response.json();
      })
      .then(json => {
        // console.log('json-->', json.results);
        json.results.map((obj, i) => {
          movies.push(<Movie key={obj.id} data={obj} />);
        });

        this.setState({ movies: movies });
      });
  }

  render() {
    return (
      <section className="now-showing">
        <h1>Movies showing this week</h1>
        <div className="grid">
          {this.state.movies}
        </div>
      </section>
    );
  }
}

class Movie extends Component {
  render() {
    const imageSettings = [
      'https://image.tmdb.org/t/p',
      'w200', // or original
      this.props.data.poster_path,];

    const imgURL = imageSettings.join('/');

    return (
      <div className="movie">
        {/* <figure>
        <img src={imgURL} alt={this.props.data.original_title}/>
        <figcaption>{this.props.data.original_title}</figcaption>
      </figure> */}
        {this.props.data.original_title}
      </div>
    );
  }
}

export default App;
