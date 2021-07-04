import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { Layout, Menu, Dropdown, Card, Typography, Image, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Timeline } from 'react-twitter-widgets';
import { useMediaQuery } from 'react-responsive';
//import LiteYouTubeEmbed from 'react-lite-youtube-embed';
//import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import Navbar from '../Navbar/Navbar';
import LiveGameCard from '../LiveGameCard/LiveGameCard';
import NewsCard from '../NewsCard/NewsCard';
import StandingsCard from '../StandingsCard/StandingsCard';

export default function Home() {
  const { Header, Content, Footer } = Layout;
  const { Title } = Typography;
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)' });
  const [ currSeason, setCurrSeason ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ liveYesterdayGames, setLiveYesterdayGames ] = useState([]);
  const [ liveTodayGames, setLiveTodayGames ] = useState([]);
  const [ liveTomorrowGames, setLiveTomorrowGames ] = useState([]);
  const [ news, setNews ] = useState(null);
  const [ allTeams, setAllTeams ] = useState([]);
  const [ standings, setStandings ] = useState([]);
  const [ twitterAccts, setTwitterAccts ] = useState([]);
  const [ youtubeAccts, setYoutubeAccts ] = useState([]);
  const [ currTwitter, setCurrTwitter ] = useState(null);
  const [ currYouTube, setCurrYouTube ] = useState(null);
  
  const apiEnd = {
    currentSeason: '/basic/currseason',
    liveYesterday: '/games/live/yesterday',
    liveToday: '/games/live/today',
    liveTomorrow: '/games/live/tomorrow',
    news: '/media/news',
    teams: '/teams/info',
    standings: '/teams/standings',
    socialMedia: '/media/social',
  }

  const nodeApiUrl = '';
  useEffect(() => {
    async function fetchApi(){
      const request0 = nodeApiUrl + apiEnd.currentSeason;
      const request1 = nodeApiUrl + apiEnd.liveYesterday;
      const request2 = nodeApiUrl + apiEnd.liveToday;
      const request3 = nodeApiUrl + apiEnd.liveTomorrow;
      const request4 = nodeApiUrl + apiEnd.news;
      const request5 = nodeApiUrl + apiEnd.teams;
      const request6 = nodeApiUrl + apiEnd.standings;
      const request7 = nodeApiUrl + apiEnd.socialMedia;

      const response = await axios.get(request0);
      //
      const [res1, res2, res3, res4, res5, res6, res7] = await Promise.all([
        axios.get(request1),
        axios.get(request2),
        axios.get(request3),
        axios.get(request4),
        axios.get(request5),
        axios.get(request6 + '/2021REG'),//+'/'+response.data.Season),
        axios.get(request7)
      ]);
      const obj = {
        response0: response.data,
        response1: res1.data,
        response2: res2.data,
        response3: res3.data,
        response4: res4.data,
        response5: res5.data,
        response6: res6.data,
        response7: res7.data,
      }
      return obj;
    }

    fetchApi()
    .then(data => {
      setCurrSeason(data.response0.Season);
      setLiveYesterdayGames(data.response1);
      setLiveTodayGames(data.response2);
      setLiveTomorrowGames(data.response3);
      setNews(data.response4);
      setAllTeams(data.response5);
      setStandings(data.response6);
      setTwitterAccts(data.response7.twitter);
      setYoutubeAccts(data.response7.youtube);
      setCurrTwitter(data.response7.twitter[0]);
      setCurrYouTube(data.response7.youtube[0]);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, []);

  var colWidth1 = {
      width: '39%',
  }

  var colWidth2 = {
      width: '59%',
  }

  var ytHeight = '560';

  if(isSmallScreen){
      colWidth1 = {
        width: '100%',
      }
      colWidth2 = {
        width: '100%',
      }
      ytHeight = '320px';
  }



  var youtubeMenu = (
        <Menu>
          {youtubeAccts.map(acct => {
            return (
                  <Menu.Item onClick={() => setCurrYouTube(acct)}>
                    {acct.name}
                  </Menu.Item>
            )
          })}
        </Menu>
      );

  var twitterMenu = (
        <Menu>
          {twitterAccts.map(acct => {
            return (
                  <Menu.Item onClick={() => setCurrTwitter(acct)}>
                    @{acct}
                  </Menu.Item>
            )
          })}
        </Menu>
      );

  function getLink(id){
    return "https://www.youtube.com/embed?listType=user_uploads&list=" + id + "&autoplay=1&mute=1";
  }


  function getDate(num){
    const timeElapsed = Date.now();
    const currTime = new Date(timeElapsed + num);
    var str = currTime.toString().split("(")[1];
    str = currTime.toDateString() + " (" + str;
    return str;
  }

  if(loading){
    return (
      <div className="home">
        <Layout className="layout" style={{minHeight: '100vh'}}>
          <Navbar selectedKey={'1'} />
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
    <div className="home">
      <Layout className="layout" style={{minHeight: '100vh'}}>
        <Navbar selectedKey={'1'} />
        <Content>
            <div className="home-wrapper">
                  <LiveGameCard teams={allTeams} gamesYesterday={liveYesterdayGames} gamesToday={liveTodayGames} gamesTomorrow={liveTomorrowGames}
                    dateYesterday={getDate(-86400000)} dateToday={getDate(0)} dateTomorrow={getDate(86400000)} />
                  <br/>
                  <div className="news-wrapper" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                        <div style={colWidth2}>
                              <NewsCard data={news} teams={allTeams} />
                              <br/>
                        </div>
                        <div style={colWidth1}>
                              <Card title="Tweets" style={{borderRadius: '7px', height: '600px'}} extra={<Dropdown overlay={twitterMenu} placement="bottomRight">
                                        <a onClick={e => e.preventDefault()}>
                                          @{currTwitter} <DownOutlined />
                                        </a>
                              </Dropdown>}>
                                    <div style={{height: '500px'}}>
                                    <Timeline
                                      dataSource={{
                                        sourceType: 'profile',
                                        screenName: currTwitter,
                                      }}
                                      options={{                                    
                                          height: '500px',
                                          chrome: 'noheader nofooter',
                                      }}
                                    />
                                    </div>                  
                              </Card>
                              <br/>
                        </div>
                  </div>
                  <div>
                        <Card title="YouTube Highlights" style={{borderRadius: '7px'}} extra={<Dropdown placement="bottomRight" overlay={youtubeMenu}>
                                  <a onClick={e => e.preventDefault()}>
                                    {loading ? "" : currYouTube.name} <DownOutlined />
                                  </a>
                              </Dropdown>}>
                              
                            <iframe width="100%" height={ytHeight} frameBorder="0"
                              src={loading ? "" : getLink(currYouTube.id)}>
                            </iframe>
                        </Card>
                  </div>
                  <StandingsCard standings={standings} teams={allTeams} />
                  <br/>
                  
            </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>- Powered by SportsData.io -</Footer>
      </Layout>
    </div>
  );
}