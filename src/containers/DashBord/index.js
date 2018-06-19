import React from 'react';
import { renderRoutes } from 'react-router-config';

class DashBord extends React.Component{
  render(){
    return(
      <div>
        <h1>DashBord</h1>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}
export default DashBord;