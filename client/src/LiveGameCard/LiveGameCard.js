import React, { useState, useEffect } from 'react';
import './LiveGameCard.css';
import { Card, Progress, Typography, Tabs } from 'antd';
import { useMediaQuery } from 'react-responsive'
import { blue } from '@ant-design/colors';

export default function LiveGameCard(props) {
  //States
  const[dateYesterday, setDateYesterday] = useState("");
  const[gamesYesterday, setGamesYesterday] = useState([]);
  const[dateToday, setDateToday] = useState("");
  const[gamesToday, setGamesToday] = useState([]);
  const[dateTomorrow, setDateTomorrow] = useState("");
  const[gamesTomorrow, setGamesTomorrow] = useState([]);

  useEffect(() => {
    setDateYesterday(props.dateYesterday);
    setGamesYesterday(props.gamesYesterday);
    setDateToday(props.dateToday);
    setGamesToday(props.gamesToday);
    setDateTomorrow(props.dateTomorrow);
    setGamesTomorrow(props.gamesTomorrow);
  });

  //Imported Objects
  const { Text } = Typography;
  const { TabPane } = Tabs;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  
  //CSS
  var gridStyle;
  if(isSmallScreen) {
    gridStyle = {
      width: '100%',
    };
  }
  else {
    gridStyle = {
      width: '50%',
    };
  }

  const cardStyle = {
    borderRadius: '7px',
    width: '100%',
  }

  const tabStyle = {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  }

  //Functions
  function teamLogo(param) {
  	var url = null;
  	if(props.teams !== null){
  		props.teams.forEach(team => {
  			if(team.TeamID === param){
  				url = team.WikipediaLogoUrl;
  			}
  		});
  	}
  	return url;
  };


  function prettifyDate(param){
  	var temp = null;
  	if(parseInt(param.substring(param.length-8, param.length-6)) === 24){
  		temp = parseInt(param.substring(param.length-8, param.length-3)) - 12;
  		return temp + param.substring(param.length-6, param.length-3) + " AM";
  	}
  	else if(parseInt(param.substring(param.length-8, param.length-6)) > 12){
  		temp = parseInt(param.substring(param.length-8, param.length-3)) - 12;
  		return temp + param.substring(param.length-6, param.length-3) + " PM";
  	}
  	else if(parseInt(param.substring(param.length-8, param.length-6)) === 12){
  		return param.substring(param.length-8, param.length-3) + " PM";
  	}
  	return temp + param.substring(param.length-8, param.length-3) + " AM";
  }

  function displayStatus(obj) {
  	if(obj.Status === "Final" || obj.Status.includes("OT")){
  		return (
  			<div className="status-wrapper">
  				<Text style={{fontSize: '16px'}}>{obj.Status}</Text>
  			</div>
  		)
  	}
  	else if(obj.Status == "Scheduled"){
  		return (
  			<div className="status-wrapper">
	  			<Text style={{fontSize: '16px'}} type="secondary">{obj.Status}</Text>
	  			<Text style={{fontSize: '16px'}} type="secondary">{prettifyDate(obj.DateTime)}</Text>
  			</div>
  		)
  	}
  	else if(obj.Status == "InProgress") {
  		if(obj.Quarter == "Half"){
  			return (
	  			<div className="status-wrapper">
		  			<Text style={{fontSize: '16px', color: blue.primary }} >Halftime</Text>
            <Progress percent={100} status="active" showInfo={false} />
	  			</div>
	  		)
  		}
  		return (
  			<div className="status-wrapper">
	  			<Text style={{fontSize: '16px', color: blue.primary }}>Q{obj.Quarter} - {obj.TimeRemainingMinutes}:{obj.TimeRemainingSeconds}</Text>
          <Progress percent={100} status="active" showInfo={false} />
  			</div>
  		)
  		
  	}
    else {
      return (
        <div className="status-wrapper">
          <Text style={{fontSize: '16px'}} type="danger">{obj.Status}</Text>
        </div>
      )
    }
  }

  function displayScore(obj, home) {
    if(home){
      if(obj.IsClosed) {
        if(obj.AwayTeamScore < obj.HomeTeamScore){
          return (
            <Text className="score" style={{fontSize: '16px'}} underline strong>{obj.HomeTeamScore}</Text>
          )
        }
        else {
          return (
            <Text className="score" style={{fontSize: '16px'}}>{obj.HomeTeamScore}</Text>
          )
        }   
      }
      return (
        <Text className="score" style={{fontSize: '16px'}} type="secondary">{obj.HomeTeamScore}</Text>
      )
    }
    //For away team
    if(obj.IsClosed) {
      if(obj.AwayTeamScore > obj.HomeTeamScore){
        return (
          <Text className="score" style={{fontSize: '16px'}} underline strong>{obj.AwayTeamScore}</Text>
        )
      }
      else {
        return (
          <Text className="score" style={{fontSize: '16px'}}>{obj.AwayTeamScore}</Text>
        )
      }      
    }
    return (
      <Text className="score" style={{fontSize: '16px'}} type="secondary">{obj.AwayTeamScore}</Text>
    )
  }

  function displayNull(obj) {
    if(obj.length === 0){
      return (
        <div>
          <Text style={{fontSize: '16px'}} type="secondary">No Games Scheduled</Text>
        </div>
      )
    }
  }

  return (
    <div style={tabStyle} >
      <Tabs defaultActiveKey="2" centered style={{width: '100%'}}>
        <TabPane tab="Yesterday" key="1">
          <Card title={dateYesterday} style={cardStyle}>
            {displayNull(gamesYesterday)}
            {gamesYesterday.map(game => {
              return (
                <Card.Grid style={gridStyle}>
                  <div className="score-wrapper">
                    <div className="col-1">
                      <div className="team-wrapper">
                        <img src={teamLogo(game.HomeTeamID)} alt="home team" />
                        <Text style={{fontSize: '16px'}}>{game.HomeTeam}</Text>
                        {displayScore(game, true)}
                      </div>
                      <div className="team-wrapper">
                        <img src={teamLogo(game.AwayTeamID)} alt="away team" />
                        <Text style={{fontSize: '16px'}}>{game.AwayTeam}</Text>
                        {displayScore(game, false)}
                      </div>
                    </div>
                    {displayStatus(game)}
                  </div>
                </Card.Grid>
              )
            })}
          </Card>
        </TabPane>
        <TabPane tab="Today" key="2">
          <Card title={dateToday} style={cardStyle}>
            {displayNull(gamesToday)}
            {gamesToday.map(game => {
              return (
                <Card.Grid style={gridStyle}>
                  <div className="score-wrapper">
                    <div className="col-1">
                      <div className="team-wrapper">
                        <img src={teamLogo(game.HomeTeamID)} alt="home team" />
                        <Text style={{fontSize: '16px'}}>{game.HomeTeam}</Text>
                        {displayScore(game, true)}
                      </div>
                      <div className="team-wrapper">
                        <img src={teamLogo(game.AwayTeamID)} alt="away team" />
                        <Text style={{fontSize: '16px'}}>{game.AwayTeam}</Text>
                        {displayScore(game, false)}
                      </div>
                    </div>
                    {displayStatus(game)}
                  </div>
                </Card.Grid>
              )
            })}
          </Card>
        </TabPane>
        <TabPane tab="Tomorrow" key="3">
          <Card title={dateTomorrow} style={cardStyle}>
            {displayNull(gamesTomorrow)}
            {gamesTomorrow.map(game => {
              return (
                <Card.Grid style={gridStyle}>
                  <div className="score-wrapper">
                    <div className="col-1">
                      <div className="team-wrapper">
                        <img src={teamLogo(game.HomeTeamID)} alt="home team" />
                        <Text style={{fontSize: '16px'}}>{game.HomeTeam}</Text>
                        {displayScore(game, true)}
                      </div>
                      <div className="team-wrapper">
                        <img src={teamLogo(game.AwayTeamID)} alt="away team" />
                        <Text style={{fontSize: '16px'}}>{game.AwayTeam}</Text>
                        {displayScore(game, false)}
                      </div>
                    </div>
                    {displayStatus(game)}
                  </div>
                </Card.Grid>
              )
            })}
          </Card>
        </TabPane>
      </Tabs>
    </div>
    	
  );
}