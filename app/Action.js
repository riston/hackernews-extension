
/**
 * Action types
 */

export const ADD_ITEM = "ADD_ITEM";
export const INC_COUNT = "INC_COUNT";

export function incItem ()
{
    return { type: INC_COUNT };
};

export function addItem (title)
{
    return { type: ADD_ITEM, title };
};
