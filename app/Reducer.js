
import Immutable from "immutable";
import { ADD_ITEM, INC_COUNT } from "./Action"

// Initial state
const defaultState = Immutable.fromJS({
    count : 10,
    items: [ "First" ]
});

export function App (state = defaultState, action)
{
    switch (action.type)
    {
    case ADD_ITEM:
        return [...state, {
            title: "Test example"
        }];

    case INC_COUNT:
        return state.updateIn(["count"], x => x + 1);

    default:
        return state;
    }
};
