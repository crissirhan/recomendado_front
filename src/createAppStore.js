import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default function createAppStore (): Object {

  const createStoreWithMiddleware = applyMiddleware(thunk);

  return createStore(reducers,applyMiddleware(thunk));
}
