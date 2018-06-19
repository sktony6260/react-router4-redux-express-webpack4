import React from 'react'
import { Layout, Menu,Icon } from 'antd'
import createHistory from 'history/createHashHistory'
import Ceiling from 'components/Ceiling';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom'
import routes from 'routes';
import './style';
// const history = createHistory()
// const location = history.location
// if (location.pathname == '/') {
//   history.push('/dashbord');
// }
// const unlisten = history.listen((location, action) => {
//   // location is an object like window.location
//   console.log(action, location.pathname, location.state)
// });
let currKey = []; 
const { Header, Content, Sider } = Layout
const { Item,SubMenu } = Menu
const onClick = (e) => {
  history.push(e.item.props.path);
  currKey = e.key;
}

class MyLayout extends React.Component{
  state = {
    openKeys:'',
    selectedKeys:'',
    collapsed:false
  }
  componentWillMount(){
    console.log(this.props);
    const {location,route,history} = this.props;
    if (location.pathname == '/') {
      history.push('/dashbord/analysis');
    }
    this.setState({
      openKeys:[route.routes[0].path],
      selectedKeys:[location.pathname]
    });
  }
  onTitleClick(e){
    console.log(e);
  }
  toggle(){
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render(){
    const {openKeys,selectedKeys} = this.state;
    return(
      <Layout>    
        <Sider 
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}>
          <div className="j-layout-logo">
            <Icon type="ant-design" />
            <span>Jason Tools</span>
          </div>
          <Menu 
            mode="inline"
            theme="dark"
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={selectedKeys}
          >
            {/*<SubMenu onTitleClick={this.onTitleClick} key="/dashbord/analysis" title={<span><Icon type="dashboard" /><span>dashbord</span></span>}>
              <Menu.Item key="5"><Link to="/dashbord/analysis">analysis</Link></Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>*/}
            {
              (routes[0].routes||[]).map(route => {
                return (
                  route.routes?
                  <SubMenu key={route.path} title={<span>{route.iconType?<Icon type={route.iconType} />:null}<span>{route.name}</span></span>}>
                    {
                      (route.routes||[]).map(subRoute => {
                        return(
                          <Menu.Item key={subRoute.path}><Link to={subRoute.path}>{subRoute.name}</Link></Menu.Item>
                        )
                      })
                    }
                  </SubMenu>:
                  <Menu.Item key={route.path}><Link to={route.path}>{route.iconType?<Icon type={route.iconType} />:null}{route.name}</Link></Menu.Item>
                )
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Ceiling />
          </Header>
          <Content style={{margin: '24px 24px 0px'}}>
            {renderRoutes(this.props.route.routes)}
          </Content>
        </Layout>
    </Layout> 
    )
  }
}
export default MyLayout