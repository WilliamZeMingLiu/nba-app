import React, { useState, useEffect } from 'react';
import { Tabs, Card, List, Typography, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';

import { blue, volcano } from '@ant-design/colors';

const { TabPane } = Tabs;

export default function StandingsCard(props) {
  //const[standings, setStandings] = useState(props.standings);
  //const[teams, setTeams] = useState(props.teams);
  var i=0;
  var j=0;
  var east = [];
  var west = [];

  
  if(props.standings != null){
    props.standings.map((team) => {
      if(team.Conference == "Western") {
        west[i++] = team;
      }
      else if(team.Conference == "Eastern") {
        east[j++] = team;
      }
    })
  }
  
  //const[east, setEast] = useState(eastTemp);
  //const[west, setWest] = useState(westTemp);

  //console.log(props.standings);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const { Text } = Typography;

  var standingsCardStyle = {
    display: 'flex',
    flexWrap: 'wrap',

  };

  var column = {
    width: '100%',
  }

  var gridStyle = {
    width: '100%',
    padding: '10px',
  }

  function getTeamLogo(id) {
    var url = "";
    props.teams.map(team => {
      if(team.TeamID === id){
        url = team.WikipediaLogoUrl;
      } 
    });
    return (
      <img style={{height: '30px', width: '30px', marginRight: '15px'}} src={url} alt=" " />
    );
  }

  function displayList(team) {
    if(isSmallScreen){
      return (
        <Card.Grid style={gridStyle}>
          <Row align="middle">
            <Col span={2}><Text>{team.ConferenceRank}.</Text></Col>
            <Col span={3}>{getTeamLogo(team.TeamID)}</Col>
            <Col span={7}><Text>{team.Name}</Text></Col>
            <Col span={2}><Text>{team.Wins}</Text></Col>
            <Col span={5}><Text>{team.Losses}</Text></Col>
            <Col span={3}><Text>{team.Percentage}</Text></Col>
            <Col span={2}><Text>{team.LastTenWins}-{team.LastTenLosses}</Text></Col>
          </Row>
        </Card.Grid>
      )
    }
    var strkColor = "success";
    if(team.StreakDescription.includes("L")){
      strkColor = "danger";
    }
    return (
      <Card.Grid style={gridStyle}>
        <Row align="middle">
          <Col span={1}></Col>
          <Col span={1}><Text>{team.ConferenceRank}.</Text></Col>
          <Col span={2}>{getTeamLogo(team.TeamID)}</Col>
          <Col span={8}><Text>{team.Name}</Text></Col>
          <Col span={1}><Text>{team.Wins}</Text></Col>
          <Col span={2}><Text>{team.Losses}</Text></Col>
          <Col span={2}><Text>{team.Percentage}</Text></Col>
          <Col span={2}><Text>{team.HomeWins}-{team.HomeLosses}</Text></Col>
          <Col span={2}><Text>{team.AwayWins}-{team.AwayLosses}</Text></Col>
          <Col span={2}><Text>{team.LastTenWins}-{team.LastTenLosses}</Text></Col>
          <Col span={1}><Text type={strkColor}>{team.StreakDescription}</Text></Col>
        </Row>
      </Card.Grid>
    )
  }

  function displayHeader() {
    if(isSmallScreen){
      return (
        <Card.Grid style={gridStyle} hoverable={false}>
          <Row align="middle">
            <Col span={2}><Text type="secondary">Rk</Text></Col>
            <Col span={10}><Text type="secondary">Team</Text></Col>
            <Col span={2}><Text type="secondary">W</Text></Col>
            <Col span={5}><Text type="secondary">L</Text></Col>
            <Col span={3}><Text type="secondary">Win %</Text></Col>
            <Col span={2}><Text type="secondary">L10</Text></Col>
          </Row>
        </Card.Grid>
      )
    }

    return (
      <Card.Grid style={gridStyle} hoverable={false}>
        <Row align="middle">
          <Col span={1}></Col>
          <Col span={1}><Text type="secondary">Rk</Text></Col>
          <Col span={10}><Text type="secondary">Team</Text></Col>
          <Col span={1}><Text type="secondary">W</Text></Col>
          <Col span={2}><Text type="secondary">L</Text></Col>
          <Col span={2}><Text type="secondary">Win %</Text></Col>
          <Col span={2}><Text type="secondary">Home</Text></Col>
          <Col span={2}><Text type="secondary">Away</Text></Col>
          <Col span={2}><Text type="secondary">L10</Text></Col>
          <Col span={1}><Text type="secondary">Strk</Text></Col>
        </Row>
      </Card.Grid>
    )
  }

  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Eastern" key="1">
        <Card title="Eastern Conference" style={{borderRadius: '7px'}}>
          {displayHeader()}
          {east.map((team) => {
            return displayList(team);
          })} 
        </Card>
      </TabPane>
      <TabPane tab="Western" key="2">
        <Card title="Western Conference" style={{borderRadius: '7px'}}>
          {displayHeader()}
          {west.map((team) => {
            return displayList(team);
          })} 
        </Card>
      </TabPane>
    </Tabs>
  )
}