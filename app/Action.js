
/**
 * Action types
 */

export const ADD_ITEM        = "ADD_ITEM";
export const VISIT_ITEM      = "VISIT_ITEM";
export const LOAD_ITEMS      = "LOAD_ITEMS";
export const LOAD_COMMENTS   = "LOAD_COMMENTS";
export const CLEAR_COMMENTS  = "CLEAR_COMMENTS";
export const INC_COUNT       = "INC_COUNT";
export const SET_VIEW        = "SET_VIEW";
export const SET_ACTIVE_ITEM = "SET_ACTIVE_ITEM";

export function incItem ()
{
    return { type: INC_COUNT };
}

/**
 * Mark already opened story item as visited.
 *
 * @param  {string} itemID
 * @return {Object}
 */
export function visitItem (itemID)
{
    return { type: VISIT_ITEM, itemID };
}

/**
 * Add news item to list.
 *
 * @method addItem
 * @param {Object} item
 */
export function addItem (item)
{
    return { type: ADD_ITEM, item };
}

/**
 * Load multiple items into list
 *
 * @param  {Object} items
 * @return {Object}
 */
export function loadItems (items)
{
    return { type: LOAD_ITEMS, items };
}

/**
 * Load multiple comments.
 *
 * @param  {Object} comments
 * @return {Object}
 */
export function loadComments (comments)
{
    return { type: LOAD_COMMENTS, comments };
}

/**
 * Clear comments
 *
 * @return {Object}
 */
export function clearComments ()
{
    return { type: CLEAR_COMMENTS };
}

/**
 * Set the application current view
 *
 * @param  {string} view
 * @return {Object}
 */
export function setView (view)
{
    return { type: SET_VIEW, view };
}

/**
 * Set the currently avtive story item
 *
 * @param {string} itemID
 * @return {Object}
 */
export function setActiveItem (itemID)
{
    return { type: SET_ACTIVE_ITEM, itemID };
}
