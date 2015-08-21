
# HackerNews Chrome Extension

![Screen](https://raw.githubusercontent.com/riston/hackernews-extension/master/doc/front-screen.png)

## Install

`npm install`

## Run & build

`npm start`

## TODO (Includes general tasks)

  - Release the extension in store after the comment's view is implemented.

  - Comment view should have the story as the top item and display only the first level comments.

  - Also the story and comment view should have the link to HN official page.

  - Create extension icon set, generate from SVG the different sizes of PNG-s.

  - Data model, how to get the news and updates
    - By adding comment to news how to get update event

## TODO (done)

  - Additional view for the comments, also the logic how to
    switch between multiple views. [x]

  - If there are new stories update the icon with small dot
    like the Gmail extension. [x]
    (Note: Called badge, not sure the current notification update cycle is implemented correctly, needs testing)

  - Local cache for stories, currently gets loaded each time
    as the extension is opened [x]
    (Note: The stories are loaded in background and stored in ```chrome.storage```)

  - Background update the stories. [x]

  - Created the SVG version of logo [x]

  - Firebase research, how it works, event triggering [x]

  - Create a git repository also push code [x]

## License

MIT
