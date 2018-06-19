import React from 'react';
import {myConnect} from 'utils/common';
import actions from 'actions';
import {Button,Table} from 'antd';
class Tables extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      data:[]
    }
  }
  componentDidMount(){
    console.log(this.props);
    this.props.actions.getPosts().then(res => {
      this.setState({
        loading:false
      })
    });
  }
  render(){
    const {loading} = this.state;
    const {data} = this.props;
    console.log(data);
    const columns = [
      {
        title:'id',
        dataIndex:'id',
        key:'id'
      },
      {
        title:'title',
        dataIndex:'title',
        key:'title'
      },
      {
        title:'body',
        dataIndex:'body',
        key:'body'
      }
    ]

    return(
        <div>
          <Table dataSource={data.posts} columns={columns} loading={loading} />
        </div>
    )
  }
}
// const mapStateToProps = (state) => ({ posts:state.posts});
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getPosts:bindActionCreators(actions.getPosts,dispatch),
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(Tables);
export default myConnect(state => state.demo,actions)(Tables);