import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles, GRADIENTS } from './homeStyle';
import { RootStackParamList } from '../../types/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Location {
  id: string;
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: string;
  conditionIcon: keyof typeof Ionicons.glyphMap;
  high: number;
  low: number;
  gradient: keyof typeof GRADIENTS;
  isCurrentLocation?: boolean;
  time: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const locations: Location[] = [
  {
    id: '1',
    city: 'Indaiatuba',
    country: 'Brasil',
    temp: 28,
    feelsLike: 30,
    condition: 'Parcialmente nublado',
    conditionIcon: 'partly-sunny',
    high: 31,
    low: 19,
    gradient: 'day',
    isCurrentLocation: true,
    time: '14:35',
  },
  {
    id: '2',
    city: 'São Paulo',
    country: 'Brasil',
    temp: 24,
    feelsLike: 26,
    condition: 'Chuvoso',
    conditionIcon: 'rainy',
    high: 26,
    low: 18,
    gradient: 'rain',
    time: '14:35',
  },
  {
    id: '3',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    temp: 33,
    feelsLike: 37,
    condition: 'Ensolarado',
    conditionIcon: 'sunny',
    high: 35,
    low: 25,
    gradient: 'sunny',
    time: '14:35',
  },
  {
    id: '4',
    city: 'Lisboa',
    country: 'Portugal',
    temp: 18,
    feelsLike: 16,
    condition: 'Nublado',
    conditionIcon: 'cloud',
    high: 21,
    low: 13,
    gradient: 'cloudy',
    time: '19:35',
  },
  {
    id: '5',
    city: 'Tóquio',
    country: 'Japão',
    temp: 9,
    feelsLike: 6,
    condition: 'Noite limpa',
    conditionIcon: 'moon',
    high: 12,
    low: 5,
    gradient: 'night',
    time: '03:35',
  },
  {
    id: '6',
    city: 'Nova York',
    country: 'EUA',
    temp: 15,
    feelsLike: 12,
    condition: 'Tempestade',
    conditionIcon: 'thunderstorm',
    high: 17,
    low: 10,
    gradient: 'storm',
    time: '22:35',
  },
];

// ─── Weather Card Component ───────────────────────────────────────────────────
interface WeatherCardProps {
  item: Location;
  onPress: (item: Location) => void;
  index: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ item, onPress, index }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const gradientColors = GRADIENTS[item.gradient];

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress(item)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={gradientColors as any}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Left side */}
          <View style={styles.cardLeft}>
            <View style={styles.cardCityRow}>
              {item.isCurrentLocation && (
                <Ionicons
                  name="location"
                  size={14}
                  color="rgba(255,255,255,0.9)"
                  style={styles.locationIcon}
                />
              )}
              <Text style={styles.cardCity} numberOfLines={1}>
                {item.city}
              </Text>
            </View>
            <Text style={styles.cardTime}>{item.time}</Text>
            <Text style={styles.cardCondition} numberOfLines={1}>
              {item.condition}
            </Text>
          </View>

          {/* Right side */}
          <View style={styles.cardRight}>
            <Text style={styles.cardTemp}>{item.temp}°</Text>
            <Text style={styles.cardHighLow}>
              M:{item.high}° m:{item.low}°
            </Text>
          </View>

          {/* Decorative icon */}
          <View style={styles.cardIconDecor} pointerEvents="none">
            <Ionicons
              name={item.conditionIcon}
              size={100}
              color="rgba(255,255,255,0.08)"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Home Screen ──────────────────────────────────────────────────────────────
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleCardPress = (item: Location) => {
    navigation.navigate('Detalhes', { location: item });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.backgroundGradient}
      />

      {/* Scrolling blur header */}
      <Animated.View style={[styles.blurHeader, { opacity: headerOpacity }]}>
        <BlurView intensity={60} tint="dark" style={styles.blurHeaderInner} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Clima</Text>
            <Text style={styles.headerSubtitle}>{locations.length} locais</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* List */}
        <Animated.FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <WeatherCard item={item} onPress={handleCardPress} index={index} />
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerText}>Atualizado agora há pouco</Text>
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={22}
                color="rgba(255,255,255,0.4)"
              />
            </View>
          }
        />
      </SafeAreaView>
    </View>
  );
}
