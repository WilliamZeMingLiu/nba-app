import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Layout, Menu, Dropdown, Card, Typography, Table, Row, Col, Tabs, Button, AutoComplete, Input, Divider, Tooltip, message, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { blue } from '@ant-design/colors';

import Navbar from '../Navbar/Navbar';
import LiveGameCard from '../LiveGameCard/LiveGameCard';
import NewsCard from '../NewsCard/NewsCard';
import StandingsCard from '../StandingsCard/StandingsCard';

var CardGrid = styled.div`
	border: solid #f0f0f0 0.5px;
	transition: all 0.2s linear;
	width: 9.4%;
	text-align: center;
	border-radius: 7px;
	height: ${props => props.dynamic ? "40px" : "80px"};
	position: relative;
	margin: 2px 1px;
    &:hover {
      border: solid #1890ff 1px;
      cursor: pointer;
      transition: all 0.2s linear;
    }
`;

export default function Compare() {
  const { Header, Content, Footer } = Layout;
  const { Title, Text } = Typography;
  const { TabPane } = Tabs;
  const { Meta } = Card;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });

  var teamLogoStyle = {};

  if(isSmallScreen) {
  	teamLogoStyle = {
  		maxHeight: '25px', 
		maxWidth: '35px', 
		margin: '0', 
		position: 'absolute', 
		top: '50%', 
		left: '50%', 
		transform: 'translate(-50%, -50%)'
  	};

  }
  else {
  	teamLogoStyle = {
		maxHeight: '50px', 
		maxWidth: '60px', 
		margin: '0', 
		position: 'absolute', 
		top: '50%', 
		left: '50%', 
		transform: 'translate(-50%, -50%)'
	};
  }
  
  const [ currSeason, setCurrSeason ] = useState(null);
  const [ teamStats, setTeamStats ] = useState([]);
  const [ allTeams, setAllTeams ] = useState([]);
  const [ allPlayers, setAllPlayers ] = useState([]);
  const [ playerDetails, setPlayerDetails ] = useState([]);
  const [ player1, setPlayer1 ] = useState(null);
  const [ player2, setPlayer2 ] = useState(null);
  const [ teamSelect1, setTeamSelect1 ] = useState(null);
  const [ teamSelect2, setTeamSelect2 ] = useState(null);
  const [ loading, setLoading ] = useState(true);


  const apiEnd = {
    currentSeason: '/basic/currseason',
    teams: '/teams/info',
    teamStats: '/teams/stats',
    players: '/players/basic',
    playerStats: '/players/stats',
  }

  const nodeApiUrl = '';
  useEffect(() => {
  	async function fetchApi(){

  		const request0 = nodeApiUrl + apiEnd.currentSeason;
	    const request1 = nodeApiUrl + apiEnd.teams;
	    const request2 = nodeApiUrl + apiEnd.teamStats;
	    const request3 = nodeApiUrl + apiEnd.players;
	    const request4 = nodeApiUrl + apiEnd.playerStats;
	    const response = await axios.get(request0);

	    const [res1, res2, res3, res4] = await Promise.all([
	    	axios.get(request1),
	    	axios.get(request2+'/'+response.data.Season),
	    	axios.get(request3),
	    	axios.get(request4+'/'+response.data.Season),
	    ]);
	    
	    const obj = {
	    	response0: response.data,
	    	response1: res1.data,
	    	response2: res2.data,
	    	response3: res3.data,
	    	response4: res4.data,
	    }
	    return obj;
  	}

  	fetchApi()
  	.then(data => {
  		setCurrSeason(data.response0.Season);
  		setAllTeams(data.response1, () => {
	        console.log(allTeams);
	      });
  		setTeamStats(data.response2);
  		setPlayerDetails(data.response3);
  		setAllPlayers(data.response4);
  		setLoading(false);
  	}).catch(error => {
  		console.log(error);
  	})
  }, []);

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

	function getTeamStats(id) {
		var obj = null;
		teamStats.map(team => {
		  if(team.TeamID === id){
		    obj = team;
		  } 
		});
		return obj;
	}

	function getTeamDetails(id) {
		var obj = null;
		allTeams.map(team => {
		  if(team.TeamID === id){
		    obj = team;
		  } 
		});
		return obj;
	}

	function getPlayerInfo(id) {
		var playerObj = null;
		allPlayers.map(player => {
		  if(player.PlayerID === id){
		    playerObj = player;
		  } 
		});
		return playerObj;
	}

	function getPlayerDetails(id) {
		var detailsObj = null;
		playerDetails.map(player => {
		  if(player.PlayerID === id){
		    detailsObj = player;
		  } 
		});
		return detailsObj;
	}

	function generateFilterPosCol(data) {
	  	var dataArr = [];
	  	data.map(player => {
	  		var obj = {
	  			value: null,
	  			id: null,
	  		};
	  		obj.value = player.Name;
	  		obj.id = player.PlayerID;
	  		dataArr.push(obj);
	  	})
	  	return dataArr;
	}

	function addCommas(x) {
		x = x.toString();
	    var pattern = /(-?\d+)(\d{3})/;
	    while (pattern.test(x))
	        x = x.replace(pattern, "$1,$2");
	    return x;
	}

	function compareStats(stat, num, pergame, type) {
		var obj1 = null;
		var obj2 = null;

		if(type === 'player'){
			if(player1 != null && player2 != null){
				var obj1 = getPlayerInfo(player1);
				var obj2 = getPlayerInfo(player2);
			}
		}
		else {
			if(teamSelect1 != null && teamSelect2 != null){
				var obj1 = getTeamStats(teamSelect1);
				var obj2 = getTeamStats(teamSelect2);
			}
		}
		if(obj1 != null && obj2 != null){
			if(pergame){
				if(num == 1){
					if(obj1[stat]/obj1.Games > obj2[stat]/obj2.Games || obj2[stat] == NaN || obj2[stat] == 0 ){
						return blue.primary;
					}
					else {
						return "black";
					}
				}
				else {
					if(obj2[stat]/obj2.Games > obj1[stat]/obj1.Games  || obj1[stat] == NaN || obj1[stat] == 0 ){
						return blue.primary;
					}
					else {
						return "black";
					}
				}
			}
			else {
				if(num == 1){
					if(obj1[stat] > obj2[stat]  || obj2[stat] == NaN || obj2[stat] == 0 ){
						return blue.primary;
					}
					else {
						return "black";
					}
				}
				else {
					if(obj2[stat] > obj1[stat]  || obj1[stat] == NaN || obj1[stat] == 0 ){
						return blue.primary;
					}
					else {
						return "black";
					}
				}
			}
		}
		
		return "black";
	}

	function generatePlayerCard(playerNum) {
		var rowStyle = {};
		var playerCard = null;
		if(playerNum == 1){
			playerCard = player1;
			rowStyle = {display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'};
		} 
		else{
			playerCard = player2;
			rowStyle = {display: 'flex', flexWrap: 'nowrap', flexDirection: 'row-reverse', justifyContent: 'space-between'};
		} 
		if(playerCard != null){
			var playerObj = getPlayerInfo(playerCard);
			var detailsObj = getPlayerDetails(playerCard);
			if(playerObj != null && detailsObj != null){
				return (
					<div>
						<div style={{textAlign: 'center'}}>
							<Title level={3}>{playerObj.Name}</Title>
							
							<img src={detailsObj.PhotoUrl} style={{width: '80px'}}/>
							<br />
							<Text>#{detailsObj.Jersey} | {detailsObj.BirthCountry} </Text>

							<div style={{width: '60%', margin: '0 auto'}}>
								<div style={rowStyle}>
									<Text type="secondary">Team</Text>
									<Text>{playerObj.Team}</Text>
								</div>
								<div style={rowStyle}>
									<Text type="secondary">Position</Text>
									<Text>{detailsObj.PositionCategory}</Text>
								</div>
								<div style={rowStyle}>
									<Text type="secondary">Height</Text>
									<Text>{(detailsObj.Height/12).toFixed(0)}'{detailsObj.Height%12}"</Text>
								</div>
								<div style={rowStyle}>
									<Text type="secondary">Weight</Text>
									<Text>{detailsObj.Weight} lbs</Text>
								</div>
								<div style={rowStyle}>
									<Text type="secondary">Experience</Text>
									<Text>{detailsObj.Experience} years</Text>
								</div>
								<div style={rowStyle}>
									<Text type="secondary">Salary</Text>
									<Text>${addCommas(detailsObj.Salary)}</Text>
								</div>
							</div>
							<br />
						</div>

						<div style={{width: '100%', margin: '0 auto'}}>
							<Divider style={{margin: '2px 0'}} />
							<div style={rowStyle}>
								<Text type="secondary">Games</Text>
								<Text style={{color: compareStats("Games", playerNum, false, 'player')}}>{playerObj.Games}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Minutes</Text>
								<Text style={{color: compareStats("Minutes", playerNum, true, 'player')}}>{(playerObj.Minutes/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Points</Text>
								<Text style={{color: compareStats("Points", playerNum, true, 'player')}}>{(playerObj.Points/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Assists</Text>
								<Text style={{color: compareStats("Assists", playerNum, true, 'player')}}>{(playerObj.Assists/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Rebounds</Text>
								<Text style={{color: compareStats("Rebounds", playerNum, true, 'player')}}>{(playerObj.Rebounds/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Steals</Text>
								<Text style={{color: compareStats("Steals", playerNum, true, 'player')}}>{(playerObj.Steals/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Blocks</Text>
								<Text style={{color: compareStats("BlockedShots", playerNum, true, 'player')}}>{(playerObj.BlockedShots/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Turnovers</Text>
								<Text style={{color: compareStats("Turnovers", playerNum, true, 'player')}}>{(playerObj.Turnovers/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">Fouls</Text>
								<Text style={{color: compareStats("PersonalFouls", playerNum, true, 'player')}}>{(playerObj.PersonalFouls/playerObj.Games).toFixed(1)}</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">+/-</Text>
								<Text style={{color: compareStats("PlusMinus", playerNum, true, 'player')}}>{playerObj.PlusMinus}</Text>
							</div>
							<Divider style={{margin: '2px 0'}} />
							<div style={rowStyle}>
								<Text type="secondary">FG%</Text>
								<Text style={{color: compareStats("FieldGoalsPercentage", playerNum, true, 'player')}}>{playerObj.FieldGoalsPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">EFG%</Text>
								<Text style={{color: compareStats("EffectiveFieldGoalsPercentage", playerNum, true, 'player')}}>{playerObj.EffectiveFieldGoalsPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">TS%</Text>
								<Text style={{color: compareStats("FieldGoalsPercentage", playerNum, true, 'player')}}>{playerObj.FieldGoalsPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">2P%</Text>
								<Text style={{color: compareStats("TwoPointersPercentage", playerNum, true, 'player')}}>{playerObj.TwoPointersPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">3P%</Text>
								<Text style={{color: compareStats("ThreePointersPercentage", playerNum, true, 'player')}}>{playerObj.ThreePointersPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">FT%</Text>
								<Text style={{color: compareStats("FreeThrowsPercentage", playerNum, true, 'player')}}>{playerObj.FreeThrowsPercentage}%</Text>
							</div>
							<div style={rowStyle}>
								<Text type="secondary">USG%</Text>
								<Text style={{color: compareStats("UsageRatePercentage", playerNum, true, 'player')}}>{playerObj.UsageRatePercentage}%</Text>
							</div>
							
						</div>
					</div>
				)
			}
		}
	}

	function playerOnChange1(id) {
		if(getPlayerInfo(id) != null && getPlayerDetails(id) != null){
			setPlayer1(id);
			return;
		}
		message.info("Sorry, this player has no available stats.");
	}

	function playerOnChange2(id) {
		if(getPlayerInfo(id) != null && getPlayerDetails(id) != null){
			setPlayer2(id);
			return;
		}
		message.info("Sorry, this player has no available stats.");
	}

	function determineTeams(id) {
		if(teamSelect1 === null && teamSelect2 === null){
			setTeamSelect1(id);
			document.getElementById(id).style.border = "solid #1890ff 1px";
			document.getElementById(id).style.background = "#f0f0f0";
		}
		else if(teamSelect1 === null && teamSelect2 != null){
			if(teamSelect2 != id) {
				setTeamSelect1(id);
				document.getElementById(id).style.border = "solid #1890ff 1px";
				document.getElementById(id).style.background = "#f0f0f0";
			} 
			else {
				setTeamSelect2(null); 
				document.getElementById(id).style.border = "solid #f0f0f0 0.5px";
				document.getElementById(id).style.background = "#ffffff";
			} 
		}
		else if(teamSelect1 != null && teamSelect2 === null){
			if(teamSelect1 != id) {
				setTeamSelect2(id);
				document.getElementById(id).style.border = "solid #1890ff 1px";
				document.getElementById(id).style.background = "#f0f0f0";
			}  
			else {
				setTeamSelect1(null); 
				document.getElementById(id).style.border = "solid #f0f0f0 0.5px";
				document.getElementById(id).style.background = "#ffffff";
			} 
		}
		else {
			if(teamSelect1 == id){
				setTeamSelect1(null);
				document.getElementById(id).style.border = "solid #f0f0f0 0.5px";
				document.getElementById(id).style.background = "#ffffff";
				return; 
			} 
			if(teamSelect2 == id){
				setTeamSelect2(null);
				document.getElementById(id).style.border = "solid #f0f0f0 0.5px";
				document.getElementById(id).style.background = "#ffffff";
				return; 
			} 
			else {
				message.info("You can only compare 2 teams. Please deselect a team.");
			}
		}
	}

	function renderTeam(teamNumber){
		var rowStyle = null;
		var statObj = null;
		var detailsObj = null;
		var floatValue = "";
		if(teamNumber === 1){
			rowStyle = {display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'};
			if(teamSelect1 != null){
				statObj = getTeamStats(teamSelect1);
				detailsObj = getTeamDetails(teamSelect1);
				floatValue = "left";
			}
		} 
		else{
			rowStyle = {display: 'flex', flexWrap: 'nowrap', flexDirection: 'row-reverse', justifyContent: 'space-between'};
			if(teamSelect2 != null){
				statObj = getTeamStats(teamSelect2);
				detailsObj = getTeamDetails(teamSelect2);
				floatValue = "right";
			}
		} 
		if(statObj == null || detailsObj == null) return;
		return (
			<div style={{ width: '49%', float: floatValue }}>
				<br />
				<div style={{textAlign: 'center'}}>
					<Title level={3}>{statObj.Name} ({statObj.Team})</Title>
					<img src={detailsObj.WikipediaLogoUrl} style={{height: '100px'}}/>
					
					<div style={{height: '20px'}}></div>
					<div style={{width: '60%', margin: '0 auto'}}>
						<div style={rowStyle}>
							<Text type="secondary">Conference</Text>
							<Text>{detailsObj.Conference}</Text>
						</div>
						<div style={rowStyle}>
							<Text type="secondary">Division</Text>
							<Text>{detailsObj.Division}</Text>
						</div>
						<div style={rowStyle}>
							<Text type="secondary">Wins/Losses</Text>
							<Text>{statObj.Wins}-{statObj.Losses}</Text>
						</div>
					</div>
					<br />
				</div>
				<div style={{width: '100%', margin: '0 auto'}}>
					<Divider style={{margin: '2px 0'}} />
					<div style={rowStyle}>
						<Text type="secondary">Minutes</Text>
						<Text style={{color: compareStats("Minutes", teamNumber, true, 'team')}}>{(statObj.Minutes/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Points</Text>
						<Text style={{color: compareStats("Points", teamNumber, true, 'team')}}>{(statObj.Points/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Assists</Text>
						<Text style={{color: compareStats("Assists", teamNumber, true, 'team')}}>{(statObj.Assists/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Rebounds</Text>
						<Text style={{color: compareStats("Rebounds", teamNumber, true, 'team')}}>{(statObj.Rebounds/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Steals</Text>
						<Text style={{color: compareStats("Steals", teamNumber, true, 'team')}}>{(statObj.Steals/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Blocks</Text>
						<Text style={{color: compareStats("BlockedShots", teamNumber, true, 'team')}}>{(statObj.BlockedShots/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Turnovers</Text>
						<Text style={{color: compareStats("Turnovers", teamNumber, true, 'team')}}>{(statObj.Turnovers/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">Fouls</Text>
						<Text style={{color: compareStats("PersonalFouls", teamNumber, true, 'team')}}>{(statObj.PersonalFouls/statObj.Games).toFixed(1)}</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">+/-</Text>
						<Text style={{color: compareStats("PlusMinus", teamNumber, true, 'team')}}>{statObj.PlusMinus}</Text>
					</div>
					<Divider style={{margin: '2px 0'}} />
					<div style={rowStyle}>
						<Text type="secondary">FG%</Text>
						<Text style={{color: compareStats("FieldGoalsPercentage", teamNumber, true, 'team')}}>{statObj.FieldGoalsPercentage}%</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">EFG%</Text>
						<Text style={{color: compareStats("EffectiveFieldGoalsPercentage", teamNumber, true, 'team')}}>{statObj.EffectiveFieldGoalsPercentage}%</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">TS%</Text>
						<Text style={{color: compareStats("FieldGoalsPercentage", teamNumber, true, 'team')}}>{statObj.FieldGoalsPercentage}%</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">2P%</Text>
						<Text style={{color: compareStats("TwoPointersPercentage", teamNumber, true, 'team')}}>{statObj.TwoPointersPercentage}%</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">3P%</Text>
						<Text style={{color: compareStats("ThreePointersPercentage", teamNumber, true, 'team')}}>{statObj.ThreePointersPercentage}%</Text>
					</div>
					<div style={rowStyle}>
						<Text type="secondary">FT%</Text>
						<Text style={{color: compareStats("FreeThrowsPercentage", teamNumber, true, 'team')}}>{statObj.FreeThrowsPercentage}%</Text>
					</div>				
				</div>
			</div>
		)
	}

	
  if(loading){
    return (
      <div className="home">
        <Layout className="layout" style={{minHeight: '100vh'}}>
          <Navbar selectedKey={'4'} />
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
    <div className="compare">
      <Layout className="layout" style={{minHeight: '100vh'}}>
        <Navbar selectedKey={'4'} />
        <Content>
            <div style={{margin: '0 auto', maxWidth: '1200px', padding: '0 30px'}}>
            <Tabs defaultActiveKey="1" centered>
		      <TabPane tab="Players" key="1">
		      	<div style={{display: 'flex', justifyContent: 'space-between'}}>
			        <Card title="" style={{borderRadius: '7px', width: '550px'}}> 
				        <AutoComplete
			      			style={{
						      width: '100%',
						    }}
						    options={generateFilterPosCol(allPlayers)}
						    filterOption={(inputValue, option) =>
						      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						    }
						    notFoundContent="Search not found"
						    onSelect={(value, option) => {playerOnChange1(option.id)}}
			      		>
						<Input size="large" placeholder="Player 1" prefix={<UserOutlined />} allowClear />
						</AutoComplete>
						<div style={{marginBottom: '20px'}}></div>
				        {generatePlayerCard(1)}
	              	</Card>
	              	<Card title="" style={{borderRadius: '7px', width: '550px'}}> 
		              	<AutoComplete
			      			style={{
						      width: '100%',
						    }}
						    options={generateFilterPosCol(allPlayers)}
						    filterOption={(inputValue, option) =>
						      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						    }
						    notFoundContent="Search not found"
						    onSelect={(value, option) => {playerOnChange2(option.id)}}
			      		>
						<Input size="large" placeholder="Player 2" prefix={<UserOutlined />} allowClear />
						</AutoComplete>
						<div style={{marginBottom: '20px'}}></div>
				        {generatePlayerCard(2)}
	              	</Card>
              	</div>

		      </TabPane>
		      <TabPane tab="Teams" key="2">
		        <Card title="" style={{borderRadius: '7px'}}>
		        	<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
			        	{allTeams.map((team) => {
			        		return (
			        			<Tooltip placement="top" title={team.City + " " + team.Name}>
				        			<CardGrid dynamic={isSmallScreen} id={team.TeamID} onClick={() => {determineTeams(team.TeamID)}}>
						        		<img src={team.WikipediaLogoUrl} style={teamLogoStyle} />
				        			</CardGrid>
				        		</Tooltip>
			        		)
			        	})} 
		        	</div>
		        	<div>
		        		{renderTeam(1)}
		        		{renderTeam(2)}
		        	</div>
              	</Card>
		      </TabPane>
		    </Tabs>

            </div>
            <div>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>- Powered by SportsData.io -</Footer>
      </Layout>
    </div>
  );
}