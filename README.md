# CatTinder

This exercise aims to create a React Native application that integrates with an external API. The project is inspired by the popular dating app Tinder, but in this case, it's designed for cats 🐈.

## Assumptions

- Only the design and expected behavior for the "Swipe Right" effect were provided.
- It was assumed that 10 cats would be requested from the API, as the number of cats to request was not specified.
- A `dog_friendly` field was assumed to populate the rating.
- The top screen toggle was not implemented due to time constraints and the lack of a specified action for it.
- A simple behavior was assumed for handling loading and error states during the cat list request.

## Improvements

- Handle image loading errors to improve user experience.
- Implement the top screen toggle with defined actions.
- Develop the chat and profile pages to enhance user interaction.
- Integrate with an authentication provider for secure user access.
- Implement an authentication flow to manage user sign-in and sign-out.
- Write unit tests to ensure code quality and reliability.
- Optimize API requests for better performance and responsiveness.
- Enhance error handling and user feedback throughout the app.

## Run

NOTE: There are a video demo on the root folder.

To run the project, you will need an API key for the server. Place this key in a `.env` file with the name `API_TOKEN`.

Next, install the dependencies by running `yarn` in the root directory of the project.

Once the dependencies are installed, simply run `yarn start` and follow the instructions provided in the terminal.

## Tools && Libs

### EXPO

Expo was chosen for this exercise due to its streamlined development process and built-in tools that accelerate React Native app development. We used the tabs template with TypeScript, which provided a solid foundation for building a structured and type-safe application. This setup allowed us to quickly set up the project, and ensure type safety throughout the codebase.

```bash
npx create-expo-app --template
```

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

### Axios

I used Axios as s HTTP client for making API requests. Axios provides a simple and efficient way to handle network communications.
To enhance our API interactions, I implemented Axios interceptors. These interceptors allowed us to inject authentication tokens into outgoing requests automatically. Additionally, I utilized interceptors to manage error responses globally.

```javascript
//example
api.interceptors.request.use(
  (config) => {
    config.headers["x-api-key"] = ` ${API_TOKEN}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### React Query

React Query is a data-fetching for React applications. It simplifies the process of fetching, caching, synchronizing, and updating remote data in the application. With built-in support for query caching, background updates, and stale data management,It also provides tools for handling complex use cases such as pagination, infinite scrolling, and optimistic updates.

```javascript
const fetchCatBreed = async (): Promise<CatBreed[]> => {
  await delay(2000); // just to simulate the efect of loading
  const response = await api.get("/breeds?limit=10&page=");
  return response.data;
};

const { data, error, isLoading } = useQuery({
  queryKey: ["catBreeds"],
  queryFn: fetchCatBreed,
});
```

### Swipe Feature Implementation

Given the time constraints of this exercise, I have decided not to implement the swipe functionality from scratch. After conducting some research, I found that the rn-swiper-list library is a reliable and well-maintained solution that fits the requirements of this project. This library provides a robust and easy-to-integrate swipeable list feature, which will save development time while ensuring a smooth and responsive user experience.

You can find more details about the library here: [rn-swiper-list](https://github.com/Skipperlla/rn-swiper-list).

```javascript
   <Swiper
      ref={ref}
      data={data!}
      cardStyle={{ width: "100%" }}
      renderCard={renderCard}
      onSwipeRight={(cardIndex) => {
         console.log(cardIndex);
         onLike(data[cardIndex].image.id);
      }}
      onSwipedAll={() => {
        console.log("end");
        onEnd();
       }}
      onSwipeTop={(cardIndex) => {
        onLike(data[cardIndex].image.id);
      }}
    />
```
