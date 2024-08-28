import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Tabs } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Paw from "@/assets/icons/Paw";
import Message from "@/assets/icons/Message";
import User from "@/assets/icons/User";
import { COLORS } from "@/constants/Colors";

// Define the type of props for the BottomBar component based on BottomTabBarProps
type BottomBarProps = BottomTabBarProps;

// Functional component BottomBar to render the custom bottom navigation bar
const BottomBar: React.FC<BottomBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        // Check if the current tab is focused
        const isFocused = state.index === index;

        // Function called when a tab is pressed
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          // Navigate to the selected tab if it is not already focused and the event is not prevented
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Function to select the correct icon for each tab
        const Icon = () => {
          const iconColor = isFocused ? COLORS.pink : COLORS.darkGray;
          if (route.name === "index") {
            return <Paw color={iconColor} size={20} />;
          } else if (route.name === "chat") {
            return <Message color={iconColor} size={20} />;
          } else if (route.name === "profile") {
            return <User color={iconColor} size={20} />;
          }
        };

        // Create an animated value for scaling the icon on press
        const scaleValue = new Animated.Value(1);

        // Handle the press-in event to start the scale animation
        const handlePressIn = () => {
          Animated.timing(scaleValue, {
            toValue: 0.9, // Scale down to 90%
            duration: 100,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start();
        };

        // Handle the press-out event to reset the scale animation and trigger onPress
        const handlePressOut = () => {
          Animated.timing(scaleValue, {
            toValue: 1, // Scale back to 100%
            duration: 100,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }).start(() => {
            onPress(); // Trigger the navigation action
          });
        };

        return (
          <TouchableOpacity
            key={index}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            {Icon()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// The TabLayout component configures the tabs and includes the BottomBar as the custom tab bar
const TabLayout: React.FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}
      tabBar={(props) => <BottomBar {...props} />} // Use BottomBar as the tab bar
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 50,
    marginHorizontal: 100,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 36,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5, // Add shadow for Android
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // Add shadow for iOS
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});
