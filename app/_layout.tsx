import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={Colors.background} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontWeight: '700', color: Colors.text },
          contentStyle: { backgroundColor: Colors.background },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="route-detail"
          options={{ title: 'Route Details', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="checkpoint-detail"
          options={{ title: 'Checkpoint Info', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="hotel-detail"
          options={{ title: 'Accommodation', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="spot-detail"
          options={{ title: 'Attraction', headerBackTitle: 'Back' }}
        />
      </Stack>
    </>
  );
}
