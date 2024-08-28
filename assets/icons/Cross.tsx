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
