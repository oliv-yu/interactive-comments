# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

<img width="700" alt="Screen Shot 2022-04-02 at 6 18 49 PM" src="https://user-images.githubusercontent.com/14063502/161407219-0b669fad-008b-47e3-9e85-b19c2698f287.png">
<img width="650" alt="Screen Shot 2022-04-02 at 6 22 56 PM" src="https://user-images.githubusercontent.com/14063502/161407226-a3ce259f-655c-4e77-ab9f-e2bb72eac6d6.png">


### Links

(TBD)
- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- [React](https://reactjs.org/) - JS library

### What I learned

In order to have the replies continue off other replies, recursive action was used on the `CommentLine` component.

```js
const RecursiveComponent = ({ name, items }) => {
  const hasChildren = items && items.length

  return (
    <>
      {name}
      {hasChildren && items.map((item) => (
        <RecursiveComponent key={item.name} {...item} />
      ))}
    </>
  )
}
```

The modal was actually trickier to implement than I expected, and it relies on React in order to control visibility and onClick functions. In order to detect when the modal should close, the document was listening for clicking outside the modal and keypress on ESC. Also, there were errors on having an unmounted component so the `isOpen` is set to `false` upon closing the modal.

```js
useEffect(() => {
  const clickOutsideModal = (event) => {
    if (event.target.classList.contains('modal')) {
      _handleClose()
    }
  }

  const escapeModal = (event) => {
    if (event.key === 'Escape') {
      _handleClose()
    }
  }

  document.addEventListener('keydown', escapeModal, false)
  document.addEventListener('click', clickOutsideModal, false)

  return () => {
    setIsOpen(false)
  }
}, [])
```


### Useful resources

- [Creating a Custom Auto Resize TextArea Component For Your React Web Application](https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc) - A tutorial to get the textarea to resize to the height of the content
- [Recursive Components in React](https://dev.to/knowit-development/recursive-components-in-react-37ka) - A simple example of recursive React components
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Mozilla's article about localStorage, a read-only property of the window interface allows you to access a Storage object for the Document's origin
- [How to Format Time Since](https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site) - Simple solution to get the `timeSince` util function
