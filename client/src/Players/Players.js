import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Card, Select, Table, Button, Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
const position = ['PG', 'SG', 'SF', 'PF', 'C'];

const columns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    fixed: 'left',
    width: '150px',
  },
  {
    title: 'Team',
    dataIndex: 'Team',
    width: '90px',
    onFilter: (value, record) => record.Team.indexOf(value) === 0,
  },
  {
    title: 'Pos',
    dataIndex: 'Position',
    width: '90px',
    onFilter: (value, record) => record.Position != null ? record.Position.indexOf(value) === 0 : null,
  },
  {
    title: 'GP',
    dataIndex: 'Games',
    sorter: {
      compare: (a, b) => b.Games - a.Games,
      multiple: 1,
    },
    width: '90px',
  },
  {
    title: 'MP',
    dataIndex: 'Minutes',
    sorter: {
      compare: (a, b) => b.Minutes - a.Minutes,
      multiple: 1,
    },
    width: '90px',
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


export default function Players() {
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;
  const { Option } = Select;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const [ currSeason, setCurrSeason ] = useState(null);
  const [ allPlayers, setAllPlayers ] = useState([]);
  const [ allTeams, setAllTeams ] = useState([]);
  const [ loading, setLoading ] = useState(true);


  const apiEnd = {
    currentSeason: '/basic/currseason',
    teams: '/teams/info',
    playerStats: '/players/stats',
  }

  const nodeApiUrl = '';
  useEffect(() => {
    async function fetchApi(){
      const request0 = nodeApiUrl + apiEnd.currentSeason;
      const request1 = nodeApiUrl + apiEnd.teams;
      const request2 = nodeApiUrl + apiEnd.playerStats;

      const response = await axios.get(request0);
      const [res1, res2] = await Promise.all([
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
      setAllPlayers(data.response2);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, []);


  function generateFilterTeamCol(data) {
  	var dataArr = [];
  	data.map(team => {
  		var obj = {
  			text: null,
  			value: null,
  		};
  		obj.text = team.Key;
  		obj.value = team.Key;
  		dataArr.push(obj);
  	})
  	return dataArr;
  }

  function generateFilterPosCol(data) {
  	var dataArr = [];
  	data.map(team => {
  		var obj = {
  			text: null,
  			value: null,
  		};
  		obj.text = team;
  		obj.value = team;
  		dataArr.push(obj);
  	})
  	return dataArr;
  }

  columns[1].filters = generateFilterTeamCol(allTeams);
  //console.log(generateFilterTeamCol(allTeams));
  columns[2].filters = generateFilterPosCol(position);
  //console.log(generateFilterPosCol(position));

  if(loading){
    return (
      <div className="home">
        <Layout className="layout" style={{minHeight: '100vh'}}>
          <Navbar selectedKey={'2'} />
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
    <div style={{margin: '0 auto'}}>
      <Layout className="layout" style={{minHeight: '100vh'}}>
        <Navbar selectedKey={'2'} />
        <Content>
            <div style={{margin: '0 auto', maxWidth: '1200px', padding: '0 30px'}}>
                  <Card title={loading ? "" : currSeason + " Season Stats"} style={{borderRadius: '7px', marginTop: '62px'}}> 
	                  <Table dataSource={allPlayers}
	                  	columns={columns} 
	                  	scroll={{ x: 1000 }} 
	                  	sticky 
	                  	size="small" 
	                  	pagination={
	                  		{
	                  		 defaultPageSize: 50, 
	                  		 pageSizeOptions: ['10', '20', '50', '100', '250', '500']}
	                  		} 
	                  />
                  </Card>
            </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>- Powered by SportsData.io -</Footer>
      </Layout>
    </div>
  );
}