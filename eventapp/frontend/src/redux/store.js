import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { occasionReducer } from './reducers/occasionReducer';
import { alertsReducer } from './reducers/alertsReducer';
import { bookingsReducer } from './reducers/bookingsReducer';



const composeEnhancers = composeWithDevTools({

});

const rootReducer = combineReducers({
  occasionReducer,
  alertsReducer,
  bookingsReducer,
})
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)

  )
);

export default store