
// All the Chrome extension specific method call should be located here


/**
 * Has access to background page instance.
 *
 * @method hacBackgroundPage
 * @return {Boolean}
 */
export function hasBackgroundPage ()
{
    return chrome
        && chrome.extension
        && chrome.extension.getBackgroundPage;
}

/**
 * Has access to Chrome local storage.
 *
 * @method hasStorage
 * @return {Boolean}
 */
export function hasStorage ()
{
    return chrome
        && chrome.storage
        && chrome.storage.local;
}

/**
 * Call the background script's load comment function.
 *
 * @method loadComments
 * @param  {string} itemID
 * @return {Promise}
 */
export function loadCommentsExt (itemID)
{
    // Check for the chrome context
    if (!hasBackgroundPage())
    {
        return Promise.reject(new Error("Not in the Chrome context, could not load comments"));
    }

    return chrome.extension.getBackgroundPage()
        .loadComments(itemID);
}

/**
 * Load item using the background script.
 *
 * @method loadItemByIDExt
 * @param  {String} itemID
 * @return {Promise}
 */
export function loadItemByIDExt (itemID)
{
    // Check for the chrome context
    if (!hasBackgroundPage)
    {
        return Promise.reject(new Error("Not in the Chrome context, could not load item"));
    }

    return chrome.extension.getBackgroundPage()
        .getItemByID(itemID);
}

/**
 * Return current chrome local storage.
 *
 * @method getState
 * @return {Promise} state object
 */
export function getState ()
{
    if (!hasStorage())
    {
        return Promise.reject(new Error("No Chrome local storage support"));
    }

    // Get the whole application state
    return new Promise((resolve, reject) =>
    {
        chrome.storage.local.get(null, state =>
        {
            if (chrome.runtime.lastError)
            {
                return reject(new Error("Could not read the storage"));
            }

            return resolve(state);
        });
    });
}

/**
 * Save the current application state
 *
 * @method setState
 * @param {Promise} newState
 */
export function setState (newState)
{
    if (!hasStorage())
    {
        return Promise.reject(new Error("No Chrome local storage support"));
    }

    // Get the whole application state
    return new Promise((resolve, reject) =>
    {
        chrome.storage.local.set(newState, () =>
        {
            if (chrome.runtime.lastError)
            {
                return reject(new Error("Could not save the storage"));
            }

            return resolve(newState);
        });
    });
}

/**
 * Update the chrome local storage state via function.
 *
 * @method updateState
 * @param  {Function} applyFn function with the state parameter and return changed state.
 * @return {Promise}
 */
export function updateState (applyFn)
{
    if (typeof applyFn !== "function")
    {
        return Promise.reject(new Error("The update parameter should be function"));
    }

    return getState()
        .then(applyFn)   // Apply the update function and return the updated state
        .then(setState); // Save the new state
}
