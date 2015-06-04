import React from 'react';
import _ from 'lodash';
import queryString from 'query-string'

var ViHeader = React.createClass({
    render() {
        return (
            <header>
                <h1>VINION</h1>
            </header>

        );
    }
});


class VideoThumb extends React.Component {
    render() {
        var divStyle = {};
        return <div>
            <video ref="myvideo" width="295" style={divStyle}>
                <source src={this.props.url} type="video/mp4"></source>
                Your browser does not support HTML5 video.
            </video>
        </div>
    }

    componentDidMount() {
        var myvideo = this.refs.myvideo.getDOMNode();
        var rect = myvideo.getBoundingClientRect();
        var distanceFromLeft = rect.left;

        myvideo.addEventListener("mousemove", function (event) {
            var videoWidth = rect.right - rect.left;
            var roughPercentage = (event.clientX - distanceFromLeft) / videoWidth;
            var duration = myvideo.duration;
            var roughTimeToJumpTo = duration * roughPercentage;
            myvideo.currentTime = roughTimeToJumpTo;
        });
    }
}

class ResultBox extends React.Component {


    render() {

        var divStyle = {
            backgroundColor: 'white',
            boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.30)',
            borderRadius: '3px',
            display: 'inline-block',
            margin: '8px',
            height: '335px',
            width: '335px',
            padding: '20px',
            boxSizing: 'border-box',
            position: 'relative'
        };

        var tagStyle = {
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '5px 14px',
            borderRadius: '15px',
            marginLeft: '10px',
            color: 'white'
        };

        var tagParentStyle = {
            bottom: '20px',
            right: '10px',
            position: 'absolute'
        };

        var dateStyle = {
            marginBottom: '10px',
            color: '#ccc'
        };

        var descriptionStyle = {
            marginTop: '0',
            fontSize: '18px'
        };

        return <div style={divStyle}>
            <VideoThumb url={this.props.hit._source.url}/>

            <p style={dateStyle}>
                20/03/2014
            </p>

            <p style={descriptionStyle}>
                George Osborne reveals new budget
            </p>

            <div style={tagParentStyle}>
                <span style={tagStyle}>Politics</span>
                <span style={tagStyle}>Hair</span>
                <span style={tagStyle}>Eyebrows</span>
            </div>

        </div>
    }

}


class ResultsPanel extends React.Component {

    render() {
        var resultsElements = _.map(this.props.hits, function (hit) {
            return <ResultBox key={hit._id} hit={hit}/>
        });
        return <div>
            {resultsElements}
        </div>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hits: []};
    }

    componentDidMount() {

        var query = queryString.parse(location.search);
        var searchTerm = query.search;


        fetch('http://192.168.12.117:4000/api/search?q=' + searchTerm)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                this.setState({hits: json.hits.hits})
            }.bind(this)).catch(function (ex) {
                console.log('parsing failed', ex)
            })


    }

    render() {
        return (
            <div>
                <ViHeader/>
                <ResultsPanel hits={this.state.hits}/>
            </div>
        );
    }
}


var appElement = document.getElementById('app');
React.render(<App/>, appElement)
