import { Animated, StyleSheet, Text, View } from "react-native";
import api from "@/api/axios.config";
import { CatBreed, CateVote } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SwiperComponent } from "@/components";
import { Paw } from "@/assets/icons";
import { COLORS } from "@/constants/Colors";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [swipEnd, setSwipEnd] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchCatBreed = async (): Promise<CatBreed[]> => {
    await delay(4000); // just to simulate the efect of loading
    const response = await api.get("/breeds?limit=10&page=");
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

  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateScale = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        animateScale();
      });
    };

    animateScale();
  }, [scaleValue]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Paw color={COLORS.pink} size={100} />
        </Animated.View>
        <Text style={styles.noMoreTitle}>Loading your cats!</Text>
        <Text style={styles.noMoreSubtitle}>Please Wait</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Paw color={COLORS.darkGray} size={100} />
        </Animated.View>
        <Text style={styles.noMoreTitle}>Somenting Went Wrong 🙀!</Text>
        <Text style={styles.noMoreSubtitle}>Go for a walk 🐈!</Text>
      </View>
    );
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
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Paw color={COLORS.pink} size={100} />
        </Animated.View>
        <Text style={styles.noMoreTitle}>No more Cats To Show!</Text>
        <Text style={styles.noMoreSubtitle}>Go for a walk 🐈!</Text>
      </View>
    );
  } else {
    return null;
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
  toggleContainer: {
    paddingVertical: 30,
  },
});
