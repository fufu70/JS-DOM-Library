# JS-DOM-Library
A simplified dom library that contains adding events to a dom object, and adding / removing classes.

## Setting up

To get the repository to work simply run:

```shell
>$ npm install
>$ npm test
```

## addEvents

To add a list of events on an element:

```js 
import {addEvents} from 'route/to/dom.js';

addEvents('body', ['click', 'touchdown'], () => {
    console.info("Body clicked");
});
```

## addClass

To add a class to an element:

```js 
import {addClass} from 'route/to/dom.js';

addClass('body', 'new-class');
```

## removeClass

To remove a class from an element:

```js 
import {removeClass} from 'route/to/dom.js';

removeClass('body', 'new-class');
```