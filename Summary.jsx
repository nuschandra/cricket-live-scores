import React from 'react';

function Summary(props) {
  var teamOneScores=[]
  var firstInningScores=[]
  var secondInningScores=[]
  var matchDetails=[]
  var teamOneScore;
  var teamTwoScore;

  if(props.teamScore.length!=0){
    console.log(props.teamScore.length)
    console.log(props.teamScore)
    teamOneScore=props.teamScore[0].team
    teamTwoScore=props.teamScore[1].team
  }
  if(props.batsmanScore.length!=0){
    firstInningScores.push({name:props.batsmanScore[0].batsmanName,performance:props.batsmanScore[0].batsmanRuns})
    secondInningScores.push({name:props.batsmanScore[1].batsmanName,performance:props.batsmanScore[1].batsmanRuns})

  }
  if(props.bowlerScore.length!=0){
    firstInningScores.push({name:props.bowlerScore[0].bowlerName,performance:props.bowlerScore[0].bowlerWickets+"/"+props.bowlerScore[0].bowlerRuns+" (" + props.bowlerScore[0].bowlerOvers+")"})
    secondInningScores.push({name:props.bowlerScore[1].bowlerName,performance:props.bowlerScore[1].bowlerWickets+"/"+props.bowlerScore[1].bowlerRuns+" (" + props.bowlerScore[1].bowlerOvers+")"})
  }

  if(props.matchDetail.length!=0){
    matchDetails.push({match:props.matchDetail[0].match})
    matchDetails.push({match:props.matchDetail[1].match})
  }

  return(
    <div>
    <BootstrapTable data={matchDetails} bordered={ false }>
      <TableHeaderColumn width='19%' dataField="match" isKey={true}>Match Status</TableHeaderColumn>
    </BootstrapTable>
    <BootstrapTable data={firstInningScores} bordered={ false }>
      <TableHeaderColumn width='19%' dataField="name" isKey={true}>{teamOneScore}</TableHeaderColumn>
      <TableHeaderColumn dataField="performance"></TableHeaderColumn>
    </BootstrapTable>

    <BootstrapTable data={secondInningScores} bordered={ false }>
      <TableHeaderColumn width='19%' dataField="name" isKey={true}>{teamTwoScore}</TableHeaderColumn>
      <TableHeaderColumn dataField="performance"></TableHeaderColumn>
    </BootstrapTable>
      
    </div>
  )
  
}
export default Summary;