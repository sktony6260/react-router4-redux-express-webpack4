import React from 'react'
import Layout from 'layout/default';
import asyncComponentLoader from 'components/AsyncComponentLoader';
const routes = [
  {
    path:'/',
    // exact:false
    component:Layout,
    routes:[
      {
        path:'/dashbord',
        component:asyncComponentLoader(() => import('../containers/DashBord')),
        iconType:'dashboard',
        name:'dashboard',
        routes:[
          {
            path:'/dashbord/analysis',
            component:asyncComponentLoader(() => import('../containers/DashBord/Analysis')),
            name:'analysis'
          }
        ]
      },
      {
        path:'/reqtest',
        exact:true,
        component:asyncComponentLoader(() => import('../containers/ReqTest/Posts')),
        iconType:'sync',
        name:'request'
      }
    ]
  }
];
export default routes