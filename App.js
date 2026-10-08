import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import AboutScreen from './src/pages/AboutScreen';
import DetailScreen from './src/pages/DetailScreen';
import EpisodeScreen from './src/pages/EpisodeScreen';
import HomeScreen from './src/pages/HomeScreen';
import ProfileScreen from './src/pages/ProfileScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    border: colors.border,
    card: colors.surface,
    primary: colors.portal,
    text: colors.text,
  },
};

function CharacterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="CharacterList"
        options={{ title: 'Rick and Morty Explorer' }}
      />
      <Stack.Screen
        component={DetailScreen}
        name="CharacterDetail"
        options={({ route }) => ({ title: route.params.character.name })}
      />
    </Stack.Navigator>
  );
}

function AboutStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        component={AboutScreen}
        name="AboutProject"
        options={{ title: 'About' }}
      />
      <Stack.Screen
        component={ProfileScreen}
        name="Profile"
        options={{ title: 'Developer' }}
      />
    </Stack.Navigator>
  );
}

const tabIcons = {
  Characters: ['people-outline', 'people'],
  Episodes: ['film-outline', 'film'],
  About: ['information-circle-outline', 'information-circle'],
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          tabBarActiveTintColor: colors.portal,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
          tabBarIcon: ({ color, focused, size }) => {
            const iconName = tabIcons[route.name][focused ? 1 : 0];
            return <Ionicons color={color} name={iconName} size={size} />;
          },
        })}
      >
        <Tab.Screen
          component={CharacterStack}
          name="Characters"
          options={{ headerShown: false }}
        />
        <Tab.Screen component={EpisodeScreen} name="Episodes" />
        <Tab.Screen
          component={AboutStack}
          name="About"
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
