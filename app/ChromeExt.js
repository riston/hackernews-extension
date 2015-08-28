
// All the Chrome extension specific method call should be located here

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
    if (!chrome || !chrome.extension || !chrome.extension.getBackgroundPage)
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
    if (!chrome || !chrome.extension || !chrome.extension.getBackgroundPage)
    {
        return Promise.reject(new Error("Not in the Chrome context, could not load item"));
    }

    return chrome.extension.getBackgroundPage()
        .getItemByID(itemID);
}
