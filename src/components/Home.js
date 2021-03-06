import React, { Component } from 'react';
//import logo from '../../resources/man-singing.svg';
import HomeAdmin from './HomeAdmin';
import HomeSinger from './HomeSinger';
import * as SongUtils from '../utils/songUtils';



class Home extends Component {
  constructor(){
    super();
    this.state = { sessionId: null, userIsAdmin: null }
  }

  componentDidMount() {
    SongUtils.getSession().then((response) => this.setState({sessionId: response}));
  }



  render() {
    return (this.state.sessionId ? 
      (this.state.sessionId !== -1 ? 
          (this.props.userIsAdmin ? 
            <HomeAdmin sessionId={this.state.sessionId} />  : <HomeSinger sessionId={this.state.sessionId}/>
          )
          : <span>Please wait for KJ to start a session</span>) 
      : (<span>Loading session... </span>
      
    ));
  }
}

Home.propTypes = {
  userIsAdmin: React.PropTypes.bool.isRequired
}
export default Home;