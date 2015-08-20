
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

    var bckInstance = chrome.extension.getBackgroundPage();
    return bckInstance.loadComments(itemID);
}