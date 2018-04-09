import _ from 'lodash';
import React, {Component} from 'react';

import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//youtube api key

const API_KEY = 'AIzaSyCB3k_BtlYGBNtf9typ4032L2YeIeQZfxA';


//cerate a new component this component should produce some html

class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      videos: [] ,
      selectedVideo: null

    };
    this.videoSearch('surfboard');

  }

videoSearch(term){
  YTSearch({key:API_KEY, term:  term}, (videos) =>{
    this.setState({
       videos: videos,
     selectedVideo: videos[0]
   });

    //this.setState({videos: videos });

  });

}


  render(){
    const videoSearch = _.debounce((term)=> { this.videoSearch(term)},300);
  return (
  <div>
      <SearchBar onSearchTermChange={term => this.videoSearch(term)}   />
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList
      onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
       videos={this.state.videos} />
  </div>
    );
  }
}

// take this component generated html and put it on the page

ReactDOM.render(<App/>, document.querySelector('.container'));
