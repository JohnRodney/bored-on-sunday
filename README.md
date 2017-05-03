# Bored On Sunday

A collection of jsx components for building jsx components.

Progress tracking lazily done at
https://trello.com/b/cBZvcDoF/aturnofevents

bugs and features go into backlog then make their way to staging

# Collections

## Users
None everyone uses the site anonymously

## Route Collection
Route colection is used for when a person navigates to a route. The app
then checks for the route they requested in the database. If the route exists
it will mount the <Home> component with all the saved components and styles for
the route. This will be so a user can work on a route and save their progress
then resume.

```
{
  name:
  components: [],
  styles: [],
}
```

## Component Collection (YET TO BE BUILT)
These are going to be saved components that people have built.  The collection
will contain and es6 string for rendering into CodeMirror and will have an es5
string that will `try` `eval()` `catch` at runtime to dynamically load into the
route.

```
{
  es6: String,
  es5: String
}
```

# ReactComponents

## terminal.jsx
Handles all terminal input this is achieved by passing the input to node exec
and catching errors returning them to the react component and setting it in an
error render state. Terminal appears to have ALL the permissions that you gave it when you
launched `meteor`.

## jsxeditor.jsx
Handles the code editing and saves the resulting input by the user into some.jsx
local to the running server. (this is not a permanent file and process should be
refactored to a database operation)

## home.jsx
Mounts ALL routes. This is for all purposes the main rendering thread of the
app. It uses the route process explained above to render the state of the page.

## component-container.jsx
Uses `react-rnd` and `component-menu.jsx` to wrap its prop `content` which is a
react component.  This makes ALL components in the app moveable, resizable, and
collapsable to a button.  Coming soon is fullscreen and destroy (aka remove from
dom)
