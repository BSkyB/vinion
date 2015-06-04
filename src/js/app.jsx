import React from 'react';
import _ from 'lodash';

var ViHeader = React.createClass({
    render() {
        return (
            <header>
                <h1>VINION</h1>
            </header>

        );
    }
});


class ResultBox extends React.Component {


    render() {

        var divStyle = {
            'box-shadow': '0px 2px 2px 0px rgba(0,0,0,0.30);',
            'border-radius': '3px',
            'display': 'inline-block',
            'margin': '8px',
            'height': '150px',
            'padding': '5px',
        };

        return <div style={divStyle}>
            {this.props.hit._id}
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



        fetch('https://hosain.fwd.wf/api/search?q=the')
            .then(function(response) {
                return response.json()
            }).then(function(json) {
                this.setState({hits: json.hits.hits})
            }.bind(this)).catch(function(ex) {
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
