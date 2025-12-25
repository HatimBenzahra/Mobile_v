import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
import { RootStackParamList, AuthStackParamList } from '../types';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';

// ========== STACKS ==========

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// ========== AUTH NAVIGATOR ==========

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// ========== ROOT NAVIGATOR ==========

export default function AppNavigator() {
  // TODO: Ajouter la logique d'authentification
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          // TODO: Ajouter Commercial/Manager stacks
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
