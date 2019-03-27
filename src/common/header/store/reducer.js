import {fromJS} from "immutable";

const deafult = fromJS({
    focused: false
});

export default (state = deafult, action) => {
    console.log(this);
    return state;
}