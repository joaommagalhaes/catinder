import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import api from "@/api/axios.config";
import { CatBreed } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const fetchCatBreed = async (): Promise<CatBreed[]> => {
    const response = await api.get("/breeds?limit=10&page=0");
    return response.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["catBreeds"],
    queryFn: fetchCatBreed,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
