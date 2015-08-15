
/**
 * Action types
 */

export const ADD_ITEM = "ADD_ITEM";
export const LOAD_ITEMS = "LOAD_ITEMS";
export const INC_COUNT = "INC_COUNT";

export function incItem ()
{
    return { type: INC_COUNT };
};

/**
 * Add news item to list.
 *
 * @method addItem
 * @param {Object} item
 */
export function addItem (item)
{
    return { type: ADD_ITEM, item };
};

export function loadItems (items)
{
    return { type: LOAD_ITEMS, items };
};
