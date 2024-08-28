import React from "react";
import { View, StyleSheet } from "react-native";
import { Cross, Heart } from "@/assets/icons";
import { COLORS } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { useRef } from "react";
import { CatBreed } from "@/types/types";
import CatCard from "../CatCard/CatCard";
import AnimatedIconButton from "../AnimatedIconButton/AnimatedIconButton";

type SwiperComponentProps = {
  data: CatBreed[];
  onLike: (imageId: string) => void;
  onEnd: () => void;
};

const SwiperComponent = (props: SwiperComponentProps) => {
  const { data, onEnd, onLike } = props;
  const ref = useRef<SwiperCardRefType>();

  const renderCard = (data: CatBreed) => {
    return (
      <CatCard
        imageUri={data.image.url}
        name={data.name}
        origin={data.origin}
        rating={data.dog_friendly}
      />
    );
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
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
        </View>

        <View style={styles.actionButtonsContainer}>
          <AnimatedIconButton
            iconComponent={<Cross size={32} color={COLORS.red} />}
            onPress={() => {
              ref.current?.swipeLeft();
            }}
          />
          <AnimatedIconButton
            iconComponent={<Heart size={32} color={COLORS.green} />}
            onPress={() => {
              ref.current?.swipeRight();
            }}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  actionButtonsContainer: {
    flex: 0.2,
    paddingVertical: 30,
    flexDirection: "row",
    gap: 50,
  },
});

export default SwiperComponent;
