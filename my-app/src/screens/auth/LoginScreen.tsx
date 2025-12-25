import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplis tous les champs !');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erreur', 'Email invalide !');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit faire au moins 6 caractères !');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Appel API réel
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Succès', `Bienvenue ${email} !`);
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Erreur', 'Quelque chose a mal tourné');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* LOGO */}
      <View style={styles.logoSection}>
        <Text style={styles.logo}>🏢</Text>
        <Text style={styles.appName}>ProspectApp</Text>
        <Text style={styles.subtitle}>Gérez vos prospections</Text>
      </View>

      {/* FORMULAIRE */}
      <View style={styles.formSection}>
        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="commercial@exemple.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading}
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
            </Pressable>
          </View>
        </View>

        {/* FORGOT PASSWORD */}
        <Pressable>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </Pressable>

        {/* LOGIN BUTTON */}
        <Pressable
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  logoSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#bdc3c7',
  },
  formSection: {
    flex: 0.6,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ecf0f1',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  eyeIcon: {
    fontSize: 18,
  },
  forgotPassword: {
    color: '#3498db',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#95a5a6',
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
