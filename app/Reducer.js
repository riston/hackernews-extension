
import Immutable from "immutable";
import * as Action from "./Action";

// Initial state
const defaultState = Immutable.fromJS({
    count:        1,
    activeView:   "default",
    activeItemID: "10072188",
    visitedItems: {},
    comments:     {},
    items:        {}
});

// The application level switch has grown too large, needs to be
// split by the functionality
export function App (state = defaultState, action)
{
    switch (action.type)
    {
    case Action.VISIT_ITEM:
        return state.mergeIn(["visitedItems", action.itemID], true);

    case Action.ADD_ITEM:
        return state.mergeIn(["items", action.item.id], action.item);

    case Action.LOAD_ITEMS:
        return state.mergeIn(["items"], action.items);

    case Action.LOAD_COMMENTS:
        return state.mergeIn(["comments"], action.comments);

    case Action.CLEAR_COMMENTS:
        return state.set("comments", Immutable.Map({}));

    case Action.SET_VIEW:
        return state.set("activeView", action.view || "default");

    case Action.SET_ACTIVE_ITEM:
        return state.set("activeItemID", action.itemID);

    case Action.INC_COUNT:
        return state.updateIn(["count"], x => x + 1);

    default:
        return state;
    }
};
