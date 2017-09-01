import React from 'react';
import $ from 'jquery';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Header,columns,accessor} from "react-table"

const borderStyle={
  "border":"10 px solid black"
}
class App extends React.Component {
  constructor(props) {
    super(props);

      this.state = {score: []};
    }

    componentDidMount() {
      this.UserList();
    }

    UserList(){
      return $.getJSON('https://cricket-api-info.herokuapp.com/currentScores?id=1109604')
          .then((data) => {
            this.setState({ score: data });
            console.log(data)
        });
    }

    render() {
      return(

        <div>
          {this.state.score.map((item,i)=> <Heading key={i} score={item}/>)}
          <ReactTable data={this.state.score} columns={[
              Header:"Batsmen",
              accessor:match
            ]}
            className="-striped -highlight"
            />
        </div>
      );
    }
}

class TableRow extends React.Component {
   render() {
      return (
        <tr>
        <td>Batsman</td>
        <td>Batsman</td>
        </tr>
        
        
        
      );
   }
}

class Heading extends React.Component {
   render() {
      return (
        <div>
        <h2>{this.props.score.match}</h2>
        <h3>{this.props.score.teamScores.teamOne}</h3>
        <h3>{this.props.score.teamScores.teamTwo}</h3>
        <span>{this.props.score.matchStatus}</span>
        <br/>
        <br/>
        <b>Batsmen</b><br/>
        <span>{this.props.score.batsmen[0].batsmanName}</span>
        <span>{" " + this.props.score.batsmen[0].batsmanScore + "*"}</span>
        <br/>
        <span>{this.props.score.batsmen[1].batsmanName}</span>
        <span>{" " + this.props.score.batsmen[1].batsmanScore + "*"}</span>
        <br/><br/>

        <b>Bowlers</b><br/>
        <span>{this.props.score.bowlers[0].bowlerName}</span>
        <span>{" " + this.props.score.bowlers[0].bowlerWickets + "/" + this.props.score.bowlers[0].bowlerRuns}</span>
        <br/>
        <span>{this.props.score.bowlers[1].bowlerName}</span>
        <span>{" " + this.props.score.bowlers[1].bowlerWickets + "/" + this.props.score.bowlers[1].bowlerRuns}</span>
        <br/><br/>
        </div>
        
      );
   }
}

export default App;
