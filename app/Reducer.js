
import Immutable from "immutable";
import { ADD_ITEM, INC_COUNT } from "./Action"

// Initial state
const defaultState = Immutable.fromJS({
    count : 10,
    items: { }
});

export function App (state = defaultState, action)
{
    switch (action.type)
    {
    case ADD_ITEM:
        console.log(action);
        return state.mergeIn(["items", action.item.id], action.item);

    case INC_COUNT:
        return state.updateIn(["count"], x => x + 1);

    default:
        return state;
    }
};
