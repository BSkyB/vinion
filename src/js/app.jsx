import React from 'react';
import _ from 'lodash';

var App = React.createClass({
   render: function() {
       return (
           <div>
               <h1>
               Vinion
               </h1>
           </div>
       );
   }
});

var appElement = document.getElementById('app');
React.render(<App/>,appElement)
