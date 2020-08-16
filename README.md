# react-verification-input

A verification code input

## DEMO

https://react-verification-input.netlify.app/

## Install

```bash
npm install --save @kyounghwan/verification-input
```

```bash
yarn add @kyounghwan/verification-input
```

## Usage

```jsx
import React from "react";
import { VerficationInput } from "@kyounghwan/verification-input";

export default function App() {
  return <VerficationInput length={6} onChange{value => console.log(value)} placeholder="0"/>;
}
```

## API

### Props

| Key         | Type       | Default | Required | Description                |
| ----------- | ---------- | ------- | -------- | -------------------------- |
| length      | `number`   | `4`     | false    | How many items are render  |
| onChange    | `function` |         | false    | Function to receive events |
| placeholder | `string`   | `·`     | false    | placeholder                |

## License

MIT © [kyounghwan](https://github.com/Kyounghwan01)
