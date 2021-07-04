import React, { useState, useEffect } from 'react';
//import './NewsCard.css';
import { Card, List, Avatar, Space, Typography, Collapse, Divider } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

export default function NewsCard(props) {
  const { Text } = Typography;
  const { Panel } = Collapse;

  const [news, setNews] = useState([]);
  const [teams, setTeams] = useState([]);

  function getTeamLogo(id) {
    var url = "";
    teams.map(team => {
      if(team.TeamID === id){
        url = team.WikipediaLogoUrl;
      } 
    });
    return url;
  }

  useEffect(() => {
  	if(props.data != null) {
      setNews(props.data);
      setTeams(props.teams);
    }
  });

  return (
    <div>
    	<Card title="Recent News" extra={<div><b>Source:</b> {"RotoBaller"}</div>} style={{height: '600px', borderRadius: '7px'}}>
        <List
          itemLayout="vertical"
          size="small"
          dataSource={news}
          style={{overflowY: 'scroll', height: '500px'}}
          footer={
            <div>
              
            </div>
          }
          renderItem={item => (
            <div>
              <Collapse ghost>
                <Panel header={<Text strong>{item.Title}</Text>} key="1">
                  <List.Item key={item.NewsID}>
                    <Text>{item.Content}</Text>
                    <div style={{textAlign: 'right'}}>
                      <a href={item.Url}>{item.OriginalSource}</a>
                      <br />
                      <Text type="secondary" style={{fontSize: '12px'}}>Updated {item.TimeAgo}</Text>
                    </div>
                  </List.Item>
                </Panel>
                <Divider></Divider>
              </Collapse>
              
            </div>
          )}
        />
	    </Card>
    </div>
  );
}