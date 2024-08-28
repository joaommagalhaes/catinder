# CatTinder

Academic exercice using Expo React Native

## Tools

### Expo

```
npx create-expo-app --template

```

## Dependencies

### React Native Svg

Is a React Native library that provides SVG (Scalable Vector Graphics) support to React Native applications. It extends the SVG capabilities to React Native, allowing developers to include SVGs directly within their mobile applications. This is particularly useful for rendering complex shapes and icons that need to scale across different device sizes without losing quality.

`yarn add react-native-svg`

#### Example of usage

```javascript
import { SVGIcon } from "@/types/types";
import React from "react";
import Svg, { Path } from "react-native-svg";

export default function Cross({ color = "#000", size = 20 }: SVGIcon) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Path
        d="M24 8L8 24"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8 8L24 24"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
```
