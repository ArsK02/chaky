import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigation } from './src/navigation/AppNavigation';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppNavigation />
    </SafeAreaView>
  );
}
