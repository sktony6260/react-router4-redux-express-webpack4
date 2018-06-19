import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import reducers from '../reducers';
const middleware = [thunkMiddleware,promiseMiddleware];
const initStore = (initState => {
  const store = createStore(
    reducers,
    initState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  module.hot && module.hot.accept('../reducers/index.js', () => {
    const nextReducer = require('../reducers/index.js');
    store.replaceReducer(nextReducer)
  });
  return store;
})();
export default initStore;