import React, { useRef, useEffect, useReducer } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles, GRADIENTS } from './homeStyle';
import { RootStackParamList } from '../../types/navigation';

import { weatherReducer, initialState } from '../../weatherReducer';

export interface DayForecast {
  id: string;
  city: string;
  date: string;
  temp: number;
  condition: string;
  conditionIcon: keyof typeof Ionicons.glyphMap;
  high: number;
  low: number;
  gradient: keyof typeof GRADIENTS;
  isCurrentLocation?: boolean;
  time: string;
  windSpeed: number;
  rainSum: number;
  periods: { manha: number; tarde: number; noite: number };
}

const getWeatherCondition = (code: number) => {
  if (code === 0) return { text: 'Céu Limpo', icon: 'sunny' as const, grad: 'sunny' as const };
  if (code <= 3) return { text: 'Parcialmente Nublado', icon: 'partly-sunny' as const, grad: 'day' as const };
  if (code <= 48) return { text: 'Nevoeiro', icon: 'cloud' as const, grad: 'cloudy' as const };
  if (code <= 67) return { text: 'Chuvoso', icon: 'rainy' as const, grad: 'rain' as const };
  if (code <= 82) return { text: 'Pancadas de Chuva', icon: 'water' as const, grad: 'storm' as const };
  return { text: 'Tempestade', icon: 'thunderstorm' as const, grad: 'storm' as const };
};


interface WeatherCardProps {
  item: DayForecast;
  onPress: (item: DayForecast) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ item, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
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
            <View style={styles.cardLeft}>
              <View style={styles.cardCityRow}>
                {item.isCurrentLocation && (
                    <Ionicons name="location" size={14} color="rgba(255,255,255,0.9)" style={styles.locationIcon} />
                )}
                <Text style={styles.cardCity} numberOfLines={1}>
                  {item.date}
                </Text>
              </View>
              <Text style={styles.cardTime}>{item.time}</Text>
              <Text style={styles.cardCondition} numberOfLines={1}>
                {item.condition}
              </Text>
            </View>

            <View style={styles.cardRight}>
              <Text style={styles.cardTemp}>{item.temp}°</Text>
              <Text style={styles.cardHighLow}>
                M:{item.high}° m:{item.low}°
              </Text>
            </View>

            <View style={styles.cardIconDecor} pointerEvents="none">
              <Ionicons name={item.conditionIcon} size={100} color="rgba(255,255,255,0.08)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const LATITUDE = '-23.0903';
  const LONGITUDE = '-47.2182';

  useEffect(() => {
    const fetchWeatherData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max&hourly=temperature_2m&timezone=auto`
        );

        if (!response.ok) throw new Error('Falha ao obter dados do servidor');

        const data = await response.json();

        const formattedDays: DayForecast[] = data.daily.time.map((dateStr: string, index: number) => {
          const conditionInfo = getWeatherCondition(data.daily.weather_code[index]);

          const [year, month, day] = dateStr.split('-');
          const formattedDate = `${day}/${month}`;

          const dayStartIndex = index * 24;

          return {
            id: String(index),
            city: 'Indaiatuba',
            date: index === 0 ? 'Hoje' : formattedDate,
            temp: index === 0 ? Math.round(data.current.temperature_2m) : Math.round(data.daily.temperature_2m_max[index]),
            condition: conditionInfo.text,
            conditionIcon: conditionInfo.icon,
            high: Math.round(data.daily.temperature_2m_max[index]),
            low: Math.round(data.daily.temperature_2m_min[index]),
            gradient: conditionInfo.grad,
            isCurrentLocation: index === 0,
            time: index === 0 ? 'Agora' : 'Previsão',
            windSpeed: data.daily.wind_speed_10m_max[index],
            rainSum: data.daily.rain_sum[index],
            periods: {
              manha: Math.round(data.hourly.temperature_2m[dayStartIndex + 8]),
              tarde: Math.round(data.hourly.temperature_2m[dayStartIndex + 14]),
              noite: Math.round(data.hourly.temperature_2m[dayStartIndex + 20]),
            }
          };
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: formattedDays });
      } catch (error: any) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message || 'Erro inesperado' });
      }
    };

    fetchWeatherData();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const handleCardPress = (item: DayForecast) => {
    navigation.navigate('Detalhes', { location: item as any });
  };

  if (state.loading) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10 }}>Carregando previsão do tempo...</Text>
        </View>
    );
  }

  if (state.error) {
    return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
          <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
          <Text style={{ color: '#ff6b6b', marginTop: 10, textAlign: 'center' }}>{state.error}</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Background gradient */}
        <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.backgroundGradient} />

        {/* Scrolling blur header */}
        <Animated.View style={[styles.blurHeader, { opacity: headerOpacity }]}>
          <BlurView intensity={60} tint="dark" style={styles.blurHeaderInner} />
        </Animated.View>

        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Indaiatuba</Text>
              <Text style={styles.headerSubtitle}>Próximos {state.weatherData?.length} dias</Text>
            </View>
          </View>

          <Animated.FlatList
              data={state.weatherData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
              renderItem={({ item }) => (
                  <WeatherCard item={item} onPress={handleCardPress} />
              )}
              ListFooterComponent={
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Dados atualizados em tempo real via Open-Meteo</Text>
                </View>
              }
          />
        </SafeAreaView>
      </View>
  );
}