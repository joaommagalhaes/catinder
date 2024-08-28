import { COLORS } from "@/constants/Colors";
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

interface CatCardProps {
  imageUri: string;
  name: string;
  origin: string;
  rating: number;
}

const { width, height } = Dimensions.get("screen");

const CatCard: React.FC<CatCardProps> = ({
  imageUri,
  name,
  origin,
  rating,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.origin}>{origin}</Text>
        </View>
        <Text style={styles.rating}>{rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 30,
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: height - 400,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: width - 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 700,
    paddingVertical: 4,
    color: COLORS.darkGray,
  },
  origin: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    color: COLORS.gray,
  },
  rating: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
});

export default CatCard;
