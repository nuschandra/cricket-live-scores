import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {Navbar,NavbarBrand} from 'reactstrap';
import React from 'react';
import Summary from "./Summary.jsx"

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.matchId=props.match.params.id;
    this.state={batsmanScore:[],bowlerScore:[],matchDetail:[],teamScore:[]};
  }

  componentDidMount(){
    var component=this;
    var batsmanScores=[];
    var bowlerScores=[];
    var matchDetails=[];
    var teamScores=[];
    var url='https://cricket-api-info.herokuapp.com/currentScores?id='+this.matchId;
    fetch(url)
    .then(function(response){;
      return response.json()
    }).then(function(json){
      var data=json;
      batsmanScores.push({batsmanName:data[0].batsmen[0].batsmanName,batsmanRuns:data[0].batsmen[0].batsmanScore,batsmanBoundaries:data[0].batsmen[0].batsmanBoundaries,strikeRate:data[0].batsmen[0].batsmanStrikeRate})
      batsmanScores.push({batsmanName:data[0].batsmen[1].batsmanName,batsmanRuns:data[0].batsmen[1].batsmanScore,batsmanBoundaries:data[0].batsmen[1].batsmanBoundaries,strikeRate:data[0].batsmen[1].batsmanStrikeRate})
      component.setState({
        batsmanScore:batsmanScores
      })

      bowlerScores.push({bowlerName:data[0].bowlers[0].bowlerName,bowlerOvers:data[0].bowlers[0].bowlerOvers,bowlerMaidens:data[0].
      bowlers[0].bowlerMaidens,bowlerRuns:data[0].bowlers[0].bowlerRuns,bowlerWickets:data[0].bowlers[0].bowlerWickets,
      bowlerEco:data[0].bowlers[0].bowlerEconomy})
      bowlerScores.push({bowlerName:data[0].bowlers[1].bowlerName,bowlerOvers:data[0].bowlers[1].bowlerOvers,bowlerMaidens:data[0].
      bowlers[1].bowlerMaidens,bowlerRuns:data[0].bowlers[1].bowlerRuns,bowlerWickets:data[0].bowlers[1].bowlerWickets,
      bowlerEco:data[0].bowlers[1].bowlerEconomy})
      component.setState({
        bowlerScore:bowlerScores
      })

      matchDetails.push({match:data[0].match})
      matchDetails.push({match:data[0].matchStatus})
      component.setState({
        matchDetail:matchDetails
      })

      teamScores.push({team:data[0].teamScores.teamOne})
      if(data[0].teamScores.teamTwo!="None"){
        teamScores.push({team:data[0].teamScores.teamTwo})
      }

      component.setState({
        teamScore:teamScores
      })
    })
  }

  render() {
    var scores=null
    if(this.state.batsmanScore.length!=0){
      if(this.state.batsmanScore[0].batsmanBoundaries!="None"){
        scores=
        <div>
        <BootstrapTable data={this.state.matchDetail} bordered={ false }>
          <TableHeaderColumn width='10%' dataField="match" isKey={true}>Match Details</TableHeaderColumn>
        </BootstrapTable>
        <BootstrapTable data={this.state.teamScore} bordered={ false }>
          <TableHeaderColumn width='10%' dataField="team" isKey={true}>Team Scores</TableHeaderColumn>
        </BootstrapTable>
      
        <BootstrapTable data={this.state.batsmanScore} bordered={ false }>
          <TableHeaderColumn width='15%' dataField="batsmanName" isKey={true}>Batsman</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='batsmanRuns'>Score</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='batsmanBoundaries'>Boundaries</TableHeaderColumn>
          <TableHeaderColumn dataField='strikeRate'>Strike Rate</TableHeaderColumn>
        </BootstrapTable>

        <BootstrapTable data={this.state.bowlerScore} bordered={ false }>
          <TableHeaderColumn width='15%' dataField="bowlerName" isKey={true}>Bowler</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='bowlerOvers'>Overs</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='bowlerMaidens'>Maidens</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='bowlerRuns'>Runs</TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField='bowlerWickets'>Wickets</TableHeaderColumn>
          <TableHeaderColumn dataField='bowlerEco'>Economy Rate</TableHeaderColumn>
        </BootstrapTable>
        </div>
      }
      else{
        scores=<Summary teamScore={this.state.teamScore} batsmanScore={this.state.batsmanScore} bowlerScore={this.state.bowlerScore} matchDetail={this.state.matchDetail}/>
      }
    }
    return (
      <div>
      <Navbar>
        <NavbarBrand>Live Cricket Scores</NavbarBrand>
      </Navbar>
      {scores}
      </div>
    );
  }
}