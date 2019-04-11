import  { reducer as headerReducer} from '../common/header/store';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as homeReducer } from '../home/store';
import { combineReducers } from 'redux-immutable';


const reducer = combineReducers({
    header: headerReducer,
    login: loginReducer,
    home: homeReducer,
});

export default reducer;
