import  { reducer as headerReducer} from '../common/header/store';
import { reducer as loginReducer } from '../common/login/store'
import { combineReducers } from 'redux-immutable';


const reducer = combineReducers({
    header: headerReducer,
    login: loginReducer
});

export default reducer;
