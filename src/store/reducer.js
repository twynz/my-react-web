import  { reducer as headerReducer} from '../common/header/store';
import { reducer as loginReducer } from '../common/login/store';
import { reducer as homeReducer } from '../home/store';
import { reducer as detailReducer } from '../detail/store'
import { combineReducers } from 'redux-immutable';


const reducer = combineReducers({
    header: headerReducer,
    login: loginReducer,
    home: homeReducer,
    detail: detailReducer
});

export default reducer;
