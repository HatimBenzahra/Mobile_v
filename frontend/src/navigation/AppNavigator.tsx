import React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { RootStackParamList, TabParamList, User } from '../types';
import { colors } from '../constants/theme';

import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ImmeublesScreen from '../screens/buildings/BuildingsScreen';
import HistoriqueScreen from '../screens/history/HistoryScreen';
import ProfilScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

interface BarreNavigationProps {
  utilisateur: User;
}

function BarreNavigation({ utilisateur }: BarreNavigationProps) {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          activeColor={colors.brand}
          inactiveColor={colors.textSecondary}
          style={{ backgroundColor: colors.bgPrimary }}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }
            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            return typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          }}
        />
      )}
    >
      <Tab.Screen
        name="TableauDeBord"
        options={{
          tabBarLabel: 'Tableau de bord',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      >
        {() => <DashboardScreen user={utilisateur} />}
      </Tab.Screen>

      <Tab.Screen
        name="Immeubles"
        component={ImmeublesScreen}
        options={{
          tabBarLabel: 'Immeubles',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="office-building" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Historique"
        component={HistoriqueScreen}
        options={{
          tabBarLabel: 'Historique',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }}
      >
        {() => <ProfilScreen utilisateur={utilisateur} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main">
          {({ route }) => <BarreNavigation utilisateur={route.params.utilisateur} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
