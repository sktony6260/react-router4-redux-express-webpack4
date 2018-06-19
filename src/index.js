import React from "react";
import ReactDOM from "react-dom";
import { HashRouter,BrowserRouter,Route,withRouter,Link } from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import { Provider } from "react-redux";
import moment from 'moment-timezone';
import 'moment/locale/zh-cn';
import routes from 'routes';
import store from 'store';
import lodash from 'lodash';
import 'layout/css/common';

moment.locale('zh-cn')
window.moment = moment;
window._ = lodash;
// moment.tz.setDefault("US/Pacific") // 时区默认设置为太平洋时间

if (module.hot) {
  module.hot.accept()
}
ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      {renderRoutes(routes)}
    </HashRouter>
  </Provider>,
  document.getElementById("root")
)