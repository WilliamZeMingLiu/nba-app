import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Dropdown, Card, Typography, Image, Table, Row, Col, Radio, Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Navbar from '../Navbar/Navbar';
import LiveGameCard from '../LiveGameCard/LiveGameCard';
import NewsCard from '../NewsCard/NewsCard';
import StandingsCard from '../StandingsCard/StandingsCard';

export default function Teams() {
  const { Header, Content, Footer } = Layout;
  const { Title, Text } = Typography;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const [ currSeason, setCurrSeason ] = useState(null);
  const [ teamStats, setTeamStats ] = useState([]);
  const [ allTeams, setAllTeams ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const apiEnd = {
    currentSeason: '/basic/currseason',
    teams: '/teams/info',
    teamStats: '/teams/stats',
  }

  const nodeApiUrl = '';
  useEffect(() => {
    async function fetchApi(){
      const request0 = nodeApiUrl + apiEnd.currSeason;
      const request1 = nodeApiUrl + apiEnd.teams;
      const request2 = nodeApiUrl + apiEnd.teamStats;

      const response = await axios.get(request0);
      const [res1, res2] = await Promise.all([
        axios.get(request0)
        axios.get(request1),
        axios.get(request2+'/'+response.data.Season),
      ]);
      
      const obj = {
        response0: response.data,
        response1: res1.data,
        response2: res2.data,
      }
      return obj;
    }

    fetchApi()
    .then(data => {
      setCurrSeason(data.response0.Season);
      setAllTeams(data.response1);
      setTeamStats(data.response2);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, []);

const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    fixed: 'left',
    width: '150px',
  },
  {
    title: 'W',
    dataIndex: 'Wins',
    sorter: {
      compare: (a, b) => b.Wins - a.Wins,
      multiple: 1,
    },
    width: '45px',
  },
  {
    title: 'L',
    dataIndex: 'Losses',
    sorter: {
      compare: (a, b) => b.Losses - a.Losses,
      multiple: 1,
    },
    width: '45px',
  },
  {
    title: 'PTS',
    dataIndex: 'Points',
    sorter: {
      compare: (a, b) => b.Points - a.Points,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'AST',
    dataIndex: 'Assists',
    sorter: {
      compare: (a, b) => b.Assists - a.Assists,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'ORB',
    dataIndex: 'OffensiveRebounds',
    sorter: {
      compare: (a, b) => b.OffensiveRebounds - a.OffensiveRebounds,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'DRB',
    dataIndex: 'DefensiveRebounds',
    sorter: {
      compare: (a, b) => b.DefensiveRebounds - a.DefensiveRebounds,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'TRB',
    dataIndex: 'Rebounds',
    sorter: {
      compare: (a, b) => b.Rebounds - a.Rebounds,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'STL',
    dataIndex: 'Steals',
    sorter: {
      compare: (a, b) => b.Steals - a.Steals,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'BLK',
    dataIndex: 'BlockedShots',
    sorter: {
      compare: (a, b) => b.BlockedShots - a.BlockedShots,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'FGM',
    dataIndex: 'FieldGoalsMade',
    sorter: {
      compare: (a, b) => b.FieldGoalsMade - a.FieldGoalsMade,
      multiple: 1,
    },
   width: '90px',
  },
  {
    title: 'FGA',
    dataIndex: 'FieldGoalsAttempted',
    sorter: {
      compare: (a, b) => b.FieldGoalsAttempted - a.FieldGoalsAttempted,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'FG%',
    dataIndex: 'FieldGoalsPercentage',
    sorter: {
      compare: (a, b) => b.FieldGoalsPercentage - a.FieldGoalsPercentage,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '2PM',
    dataIndex: 'TwoPointersMade',
    sorter: {
      compare: (a, b) => b.TwoPointersMade - a.TwoPointersMade,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '2PA',
    dataIndex: 'TwoPointersAttempted',
    sorter: {
      compare: (a, b) => b.TwoPointersAttempted - a.TwoPointersAttempted,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '2P%',
    dataIndex: 'TwoPointersPercentage',
    sorter: {
      compare: (a, b) => b.TwoPointersPercentage - a.TwoPointersPercentage,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '3PM',
    dataIndex: 'ThreePointersMade',
    sorter: {
      compare: (a, b) => b.ThreePointersMade - a.ThreePointersMade,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '3PA',
    dataIndex: 'ThreePointersAttempted',
    sorter: {
      compare: (a, b) => b.ThreePointersAttempted - a.ThreePointersAttempted,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: '3P%',
    dataIndex: 'ThreePointersPercentage',
    sorter: {
      compare: (a, b) => b.ThreePointersPercentage - a.ThreePointersPercentage,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'FTM',
    dataIndex: 'FreeThrowsMade',
    sorter: {
      compare: (a, b) => b.FreeThrowsMade - a.FreeThrowsMade,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'FTA',
    dataIndex: 'FreeThrowsAttempted',
    sorter: {
      compare: (a, b) => b.FreeThrowsAttempted - a.FreeThrowsAttempted,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'FT%',
    dataIndex: 'FreeThrowsPercentage',
    sorter: {
      compare: (a, b) => b.FreeThrowsPercentage - a.FreeThrowsPercentage,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'TOV',
    dataIndex: 'Turnovers',
    sorter: {
      compare: (a, b) => b.Turnovers - a.Turnovers,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'PF',
    dataIndex: 'PersonalFouls',
    sorter: {
      compare: (a, b) => b.PersonalFouls - a.PersonalFouls,
      multiple: 1,
    },
    width: '90px',
  },
  
];



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
		allTeams.map(team => {
		  if(team.TeamID === id){
		    url = team.WikipediaLogoUrl;
		  } 
		});
		return (
		  <img style={{height: '60px', width: '60px', marginRight: '15px'}} src={url} alt=" " />
		);
	}

	function displayHeader() {
		return (
		  <Card.Grid style={gridStyle} hoverable={false}>
		    <Row align="middle">
		      <Col span={5}><Text type="secondary">Rank</Text></Col>
		      <Col span={9}><Text type="secondary">Team</Text></Col>
		      <Col span={8}><Text type="secondary">Points</Text></Col>
		    </Row>
		  </Card.Grid>
		)
	}
	function displayList(team, counter) {
		return (
		  <Card.Grid style={gridStyle}>
		    <Row align="middle">
		      <Col span={5}><Text>{counter}.</Text></Col>
		      <Col span={6}>{getTeamLogo(team.TeamID)} <br/> {team.Name} </Col>
		      <Col span={8}><Text>{team.Points}</Text></Col>
		    </Row>
		  </Card.Grid>
		)
	}
  if(loading){
    return (
      <div className="home">
        <Layout className="layout" style={{minHeight: '100vh'}}>
          <Navbar selectedKey={'3'} />
          <Content>
              <div className="home-wrapper">
                  <div style={{textAlign: 'center', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <Spin style={{textAlign: 'center'}} tip="Loading..." size="large"></Spin> 
                  </div>
              </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>- Powered by SportsData.io -</Footer>
        </Layout>
      </div>
    )
  }
  return (
    <div className="teams">
      <Layout className="layout" style={{minHeight: '100vh'}}>
        <Navbar selectedKey={'3'} />
        <Content>
            <div style={{margin: '0 auto', maxWidth: '1200px', padding: '0 30px'}}>
                  <Card title={loading ? "" : currSeason + " Season Stats"} style={{borderRadius: '7px', marginTop: '62px'}}> 

                  	<Radio.Group
                  		options={[
                  			{label: 'Team', value: 'Team', checked: true},
                  			{label: 'Opponent', value: 'Opponent'},
                  			{label: 'Differential', value: 'Differential'},
                  		]}
                  		optionType="button"
                  		style={{marginBottom: '10px'}}
                  	/>

			        <Table dataSource={teamStats}
                  	  columns={columns} 
                  	  scroll={{ x: 1000 }} 
                  	  sticky 
                  	  size="small" 
                  	  pagination={
                  		{
                  		 defaultPageSize: 30,
                  		 hideOnSinglePage: true,
                  		}
                  	  } 
                    />
                  </Card>
            </div>
            <div>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>- Powered by SportsData.io -</Footer>
      </Layout>
    </div>
  );
}