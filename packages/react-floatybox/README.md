# react-floatybox 🎈🎁🎉

A React component for positioning floating components such as tooltips, dropdowns, selects etc. Avoids screen edges!

* **[See some examples - coming soon](#)**

## Features
- Handles all your bubble positioning
- Avoids screen edges
- Bubble size and position can be determined automatically, specified widths and heights not required
- Built in support for positining of tails (those little pointy things at the bottom of tooltips)
- Built in behaviour to open and close via hover or click, and to close via click-outside or ESC key
- Can use its own state or can be controlled
- Uses React portals via the [react-useportal](https://github.com/alex-cory/react-useportal) hook

## Installation

```
yarn add react-floatybox
```

## Usage

### Basic

```js
import React from 'react';
import {useCallback} from 'react';
import FloatyBox from 'react-floatybox';

const Basic = (props) => {

    let tooltip = useCallback(() => {
        return <div>I am a tooltip</div>;
    }, []);

    return <FloatyBox open="hover" bubble={tooltip}>hover over me!</FloatyBox>;
};
```

### With a tail

```js
import React from 'react';
import {useCallback} from 'react';
import FloatyBox from 'react-floatybox';
import Point from 'react-floatybox/Point';

const WithTail = (props) => {

    let tooltip = useCallback(({tailProps}) => {
        return <div>I am a tooltip <Point {...tailProps} color="#000" /></div>;
    }, []);

    return <FloatyBox open="hover" bubble={tooltip} tailSize={20}>hover over me!</FloatyBox>
};
```

### Alignment

```js
import React from 'react';
import {useCallback} from 'react';
import FloatyBox from 'react-floatybox';

const Basic = (props) => {

    let tooltip = useCallback(() => {
        return <div>I am a thing</div>;
    }, []);

    return <FloatyBox open="click" side="top" align="left" bubble={tooltip}>click me!</FloatyBox>;
};
```

[See more examples - coming soon](#)

## Props

### bubble
`({close, isOpen, tailProps}) => React.Node`

A function for FloatyBox to call to render the floaty box.
It's recommended you wrap this in a `useCallback` hook to improve rendering performance.
The function is passed an object with a few properties:

|               |                                               |                                                                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| **close**     | `() => void`                                  | A function that can be called from inside the bubble to close itself.               |
| **isOpen**    | `boolean`                                     | A boolean indicating if the bubble is open.                                         |
| **tailProps** | `{side: string, size: number, style: Object}` | An object that can be spread onto a tail component such as `react-floatybox/Point`. |


### children
`React.Node`

The React element that the bubble is tethered to, called the "anchor".
It can handle click and hover events to control the open state of the bubble.

### open
`"click"|"hover"|"always" (optional)`

If provided, this sets the kind of interaction that will open and close the bubble.

### side
`"top"|"bottom"|"left"|"right", default = "top"`

Chooses the preferred side of the anchor that the bubble should appear on.

### align
`string (optional), default = "center"`

Sets the bubble's preferred perpendicular alignment.
- When `side` is `"top"` or `"bottom"`, valid values are `"center"`, `"left"` or `"right"`.
- When `side` is `"left"` or `"right"`, valid values are `"center"`, `"up"` or `"down"`.

### flip
`boolean, default = false`

Set to true to allow FloatyBox to flip the bubble to the opposite side of the anchor if there is not enough space to fit it on the preferred side.

### gap
`number (optional), default = 10`

The gap between the bubble and the anchor, in pixels.

### edge
`number (optional), default = 10`

How close the bubble is allowed to be posiitioned near a screen edge, in pixels.

### zIndex
`number (optional), default = 100`

The `zIndex` of the bubble element.

### closeOnOutsideClick
`boolean (optional), default = true`

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you click outside of it.

### closeOnEsc
`boolean (optional), default = true`

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you press the escape key.

### tailSize
`number (optional)`

If a tail is used on your bubble, `tailSize` must be set so FloatyBox can adjust its positioning.

### wrap
`React.Component (optional), default = "span"`

The component that the FloatyBox anchor gets wrapped in.

### forceUpdate

`Array<any> (optional) default = []`

The forceUpdate prop allows you to force the bubble position to update. Pass it an array of values, and when any of these values change then the bubble position will be recalculated.

### isOpen
`boolean (optional)`

If provided, FloatyBox won't keep its own state and will just be open when this boolean is `true`.

### onChange
`(isOpen: boolean) => void (optional)`

If provided along with `isOpen`, this will be called when FloatyBox wants to change state.

## Todo

- Support for animations by adding an option to always render bubble
- Option to auto close bubble when anchor moves off screen
- Ease into new positions, rather than snapping directly
- Allow `closeOnOutsideClick` and `closeOnEsc` to work when controlling state externally
- Allow multiple floatyboxes to share a tooltip
- Work out if its possible to not createReact portals until required when using react-useportal
