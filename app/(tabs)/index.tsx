import { StyleSheet, Text, View } from "react-native";
import api from "@/api/axios.config";
import { CatBreed } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { AnimatedIconButton, CatCard } from "@/components";
import { Cross, Heart } from "@/assets/icons";
import { COLORS } from "@/constants/Colors";

export default function Home() {
  const fetchCatBreed = async (): Promise<CatBreed[]> => {
    const response = await api.get("/breeds?limit=10&page=0");
    return response.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["catBreeds"],
    queryFn: fetchCatBreed,
  });

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Loading</Text>;
  }

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
    <View style={styles.container}>
      {renderCard(data[0])}
      <View style={styles.actionButtonsContainer}>
        <AnimatedIconButton
          iconComponent={<Cross size={32} color={COLORS.red} />}
          onPress={() => {}}
        />
        <AnimatedIconButton
          iconComponent={<Heart size={32} color={COLORS.green} />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonsContainer: {
    flex: 0.3,
    paddingVertical: 30,
    flexDirection: "row",
    gap: 50,
  },
});
