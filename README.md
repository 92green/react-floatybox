# react-floatybox 🎈🎁🎉

A React component for positioning floating components such as tooltips, dropdowns, selects etc. Avoids screen edges!

* **[See some examples](https://92green.github.io/react-floatybox/)**

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Development](#development)

## Features
- Handles all your bubble positioning
- Avoids screen edges
- Bubble size and position can be determined automatically, specified widths and heights not required
- Built in support for positioning of tails (those little pointy things at the bottom of tooltips)
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

[See more examples](https://92green.github.io/react-floatybox/)

## Props

### children

```flow
children: React.Node
```

The React element that the bubble is tethered to, called the "anchor".
It can handle click and hover events to control the open state of the bubble.

### bubble

```flow
bubble: ({close, isOpen, tailProps}) => React.Node
```

A function for FloatyBox to call to render the floaty box.
It's recommended you wrap this in a `useCallback` hook to improve rendering performance.
The function is passed an object with a few properties:

|               |                                               |                                                                                     |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- |
| **close**     | `() => void`                                  | A function that can be called from inside the bubble to close itself.               |
| **isOpen**    | `boolean`                                     | A boolean indicating if the bubble is open.                                         |
| **tailProps** | `{side: string, size: number, style: Object}` | An object that can be spread onto a tail component such as `react-floatybox/Point`. |

### open

```flow
open?: "click"|"hover"|"always" // optional
```

If provided, this sets the kind of interaction that will open and close the bubble.

### side

```flow
side: "top"|"bottom"|"left"|"right" = "top"
```

Chooses the preferred side of the anchor that the bubble should appear on.

### align

```flow
align: string = "center"
```

Sets the bubble's preferred alignment in relation to its tail.

- When `side` is `"top"` or `"bottom"`, valid values are `"center"`, `"left"` or `"right"`.
- When `side` is `"left"` or `"right"`, valid values are `"center"`, `"up"` or `"down"`.

### alignInner

```flow
alignInner: string = "center"
```

Sets the tail's preferred alignment in relation to the anchor.

When building things with small anchors and large bubbles, such as tooltips, this prop is usually best on its default "center" setting. But if your anchor is larger than your bubble then this alignment becomes more useful.

- When `side` is `"top"` or `"bottom"`, valid values are `"center"`, `"left"` or `"right"`.
- When `side` is `"left"` or `"right"`, valid values are `"center"`, `"up"` or `"down"`.

### flip

```flow
flip: boolean = false
```

Set to true to allow FloatyBox to flip the bubble to the opposite side of the anchor if there is not enough space to fit it on the preferred side.

### slide

```flow
slide: boolean = false
```

Set to true to allow FloatyBox to slide the bubble across the side of the anchor if there is not enough space to fit it at the preferred alignment.

### trap

```flow
trap: boolean = false
```

Trap will prevent the bubble from ever leaving the screen.

### gap

```flow
gap: number = 10
```

The gap between the bubble and the anchor, in pixels.

### edge

```flow
edge: number = 10
```

How close the bubble is allowed to be posiitioned near a screen edge, in pixels.

### zIndex

```flow
zIndex: number = 100
```

The `zIndex` of the bubble element.

### closeOnOutsideClick

```flow
closeOnOutsideClick: boolean = true
```

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you click outside of it.

### closeOnEsc

```flow
closeOnEsc: boolean = true
```

A [react-useportal](https://github.com/alex-cory/react-useportal) option that lets the bubble close when you press the escape key.

### tailSize

```flow
tailSize?: number // optional
```

If a tail is used on your bubble, `tailSize` must be set so FloatyBox can adjust its positioning.

### wrap

```flow
wrap: React.Component = "span"
```

The component that the FloatyBox anchor gets wrapped in.

### forceUpdate

```flow
forceUpdate: Array<any> = []
```

The forceUpdate prop allows you to force the bubble position to update. Pass it an array of values, and when any of these values change then the bubble position will be recalculated.

### isOpen

```flow
isOpen?: boolean // optional
```

If provided, FloatyBox won't keep its own state and will just be open when this boolean is `true`.

### onChange

```flow
onChange?: (isOpen: boolean) => void (optional)` // optional
```

If provided along with `isOpen`, this will be called when FloatyBox wants to change state.

## Development

React-floatybox is written and maintained by [Damien Clarke](https://damienclarke.me/), with feedback from others at [92green](https://github.com/92green).
All online library discussion happens over on [Github](https://github.com/92green/react-floatybox).

I hope this library helps solve some React positioning problems for you. 🎉
