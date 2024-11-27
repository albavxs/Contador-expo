import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          android: {
            position: 'absolute',
            backgroundColor: 'transparent',
            elevation: 0,
          },
          ios: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          },
          default: {},
        }),
      }}>
      {/* Esconde o botão da barra para "index" */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
      {/* Define a aba principal como "Explore" */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
