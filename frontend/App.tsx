import { ApolloProvider } from '@apollo/client/react';
import { PaperProvider } from 'react-native-paper';
import { apolloClient } from './src/services/api';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ApolloProvider>
  );
}
