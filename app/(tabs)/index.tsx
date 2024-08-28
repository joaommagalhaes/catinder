import { StyleSheet, Text, View } from "react-native";
import api from "@/api/axios.config";
import { CatBreed, CateVote } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatedIconButton, CatCard, SwiperComponent } from "@/components";
import { Cross, Heart, Paw } from "@/assets/icons";
import { COLORS } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [swipEnd, setSwipEnd] = useState(false);

  const fetchCatBreed = async (): Promise<CatBreed[]> => {
    const response = await api.get("/breeds?limit=10&page=0");
    return response.data;
  };

  const postVote = async (imageId: string): Promise<CateVote> => {
    console.log("Posting vote for:", imageId);
    const response = await api.post("/votes", {
      image_id: imageId,
      value: "1",
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["catBreeds"],
    queryFn: fetchCatBreed,
  });

  const mutation = useMutation({ mutationFn: postVote });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Loading</Text>;
  }

  if (data && !swipEnd) {
    return (
      <View style={styles.swiperContainer}>
        <SwiperComponent
          data={data}
          onLike={(imageId: string) => mutation.mutate(imageId)}
          onEnd={() => setSwipEnd(true)}
        />
      </View>
    );
  }

  if (swipEnd) {
    return (
      <View style={styles.container}>
        <Paw color={COLORS.pink} size={100} />
        <Text style={styles.noMoreTitle}>No more Cats To Show!</Text>
        <Text style={styles.noMoreSubtitle}>Go for a walk!</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoreTitle}>No Cats To Show!</Text>
        <Text style={styles.noMoreSubtitle}>Go for a walk!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiperContainer: {
    flex: 0.9,
    marginTop: 100,
  },
  noMoreTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "bold",
    color: COLORS.darkGray,
    paddingVertical: 16,
  },
  noMoreSubtitle: {
    fontSize: 18,
    lineHeight: 24,
    color: COLORS.darkGray,
  },
});
