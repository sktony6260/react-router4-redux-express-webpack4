import React from 'react';
import qs from 'querystring';
import TableDemo from 'components/Demo/TableDemo';
class Posts extends React.Component{
  render(){
    return(
      <div>
        <h1>Async request test!</h1>
        <TableDemo />
      </div>
    )
  }
}
export default Posts;