import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigation } from 'react-native-paper';

import { RootStackParamList, User } from '../types';
import { colors } from '../constants/theme';

import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import ImmeublesScreen from '../screens/immeubles/immeubles_list';
import HistoriqueScreen from '../screens/history/HistoryScreen';
import ProfilScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface BarreNavigationProps {
  utilisateur: User;
}

function BarreNavigation({ utilisateur }: BarreNavigationProps) {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'accueil', title: 'Accueil', focusedIcon: 'view-dashboard', unfocusedIcon: 'view-dashboard-outline' },
    { key: 'immeubles', title: 'Immeubles', focusedIcon: 'office-building', unfocusedIcon: 'office-building-outline' },
    { key: 'historique', title: 'Historique', focusedIcon: 'history' },
    { key: 'profil', title: 'Profil', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    accueil: () => <DashboardScreen user={utilisateur} />,
    immeubles: ImmeublesScreen,
    historique: HistoriqueScreen,
    profil: () => <ProfilScreen utilisateur={utilisateur} />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={colors.brand}
      inactiveColor={colors.textSecondary}
      barStyle={{ backgroundColor: colors.bgPrimary }}
    />
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
