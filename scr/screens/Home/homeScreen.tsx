import React, { useRef, useEffect, useReducer } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  FlatList,
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
  humidity: number;
  uvIndex: number;
  feelsLike: number;
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
  scrollY: Animated.Value;
  index: number;
}

const WeatherCard: React.FC<WeatherCardProps> = React.memo(
  ({ item, onPress, scrollY, index }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const cardOffset = useRef(new Animated.Value(0)).current;

    const handlePressIn = () => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 0.95,
          useNativeDriver: Platform.OS !== 'web',
          speed: 50,
          bounciness: 4,
        }),
        Animated.timing(cardOffset, {
          toValue: -8,
          duration: 100,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: Platform.OS !== 'web',
          speed: 50,
          bounciness: 4,
        }),
        Animated.timing(cardOffset, {
          toValue: 0,
          duration: 100,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    };

    const parallaxTranslate = scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 10],
      extrapolate: 'clamp',
    });

    const gradientColors = GRADIENTS[item.gradient] || GRADIENTS.night;
    const tempRange = item.high - item.low || 1;
    const tempPercent = Math.min(Math.max(((item.temp - item.low) / tempRange) * 100, 10), 100);

    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            transform: [
              { scale },
              { translateY: cardOffset },
              {
                translateX:
                  Platform.OS !== 'web'
                    ? Animated.multiply(parallaxTranslate, 0.5)
                    : 0,
              },
            ],
          },
        ]}
      >
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
            <View style={styles.glassLayer}>
              <BlurView intensity={20} tint="light" style={styles.glassLayerInner} />
            </View>

            <View style={styles.cardContent}>
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
                <Text style={styles.cardTime}>
                  {item.date} • {item.time}
                </Text>
                <Text style={styles.cardCondition} numberOfLines={1}>
                  {item.condition}
                </Text>

                <View style={styles.tempBarContainer}>
                  <View style={styles.tempBarTrack}>
                    <LinearGradient
                      colors={['#64B5F6', '#FFB74D', '#EF5350']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.tempBarFill, { width: `${tempPercent}%` }]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.cardTemp}>{item.temp}°</Text>
                <Text style={styles.cardHighLow}>
                  {item.high}° / {item.low}°
                </Text>
                <View style={styles.cardMetricsRow}>
                  <View style={styles.cardMetricItem}>
                    <Ionicons name="leaf" size={10} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.cardMetricText}>{Math.round(item.windSpeed)} km/h</Text>
                  </View>
                  <View style={styles.cardMetricItem}>
                    <Ionicons name="water" size={10} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.cardMetricText}>{Math.round(item.rainSum)} mm</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardIconDecor} pointerEvents="none">
                <Ionicons
                  name={item.conditionIcon}
                  size={120}
                  color="rgba(255,255,255,0.06)"
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

WeatherCard.displayName = 'WeatherCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const LATITUDE = '-23.0903';
  const LONGITUDE = '-47.2182';

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,weather_code,relative_humidity_2m,apparent_temperature&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max,uv_index_max&hourly=temperature_2m&timezone=auto`
        );

        if (!response.ok) throw new Error('Falha ao obter dados do servidor');

        const data = await response.json();

        const formattedDays: DayForecast[] = data.daily.time.map(
          (dateStr: string, index: number) => {
            const conditionInfo = getWeatherCondition(data.daily.weather_code[index]);

            const [year, month, day] = dateStr.split('-');
            const formattedDate = `${day}/${month}`;

            const dayStartIndex = index * 24;

            return {
              id: String(index),
              city: 'Indaiatuba',
              date: index === 0 ? 'Hoje' : formattedDate,
              temp:
                index === 0
                  ? Math.round(data.current.temperature_2m)
                  : Math.round(data.daily.temperature_2m_max[index]),
              condition: conditionInfo.text,
              conditionIcon: conditionInfo.icon,
              high: Math.round(data.daily.temperature_2m_max[index]),
              low: Math.round(data.daily.temperature_2m_min[index]),
              gradient: conditionInfo.grad,
              isCurrentLocation: index === 0,
              time: index === 0 ? 'Agora' : 'Previsão',
              windSpeed: Math.round(data.daily.wind_speed_10m_max[index]),
              rainSum: (Math.round(data.daily.rain_sum[index] * 10) / 10) || 0,
              humidity: index === 0 ? data.current.relative_humidity_2m : 65,
              uvIndex: Math.round(data.daily.uv_index_max[index] * 10) / 10,
              feelsLike:
                index === 0
                  ? Math.round(data.current.apparent_temperature)
                  : Math.round(data.daily.temperature_2m_max[index] - 2),
              periods: {
                manha:
                  Math.round(data.hourly.temperature_2m[dayStartIndex + 8]) ||
                  Math.round(data.daily.temperature_2m_min[index]),
                tarde:
                  Math.round(data.hourly.temperature_2m[dayStartIndex + 14]) ||
                  Math.round(data.daily.temperature_2m_max[index]),
                noite:
                  Math.round(data.hourly.temperature_2m[dayStartIndex + 20]) ||
                  Math.round(data.daily.temperature_2m_min[index]),
              },
            };
          }
        );

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
        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#fff" />
          <Text
            style={{
              color: '#fff',
              marginTop: 16,
              fontSize: 16,
              fontWeight: '500',
            }}
          >
            Carregando previsão...
          </Text>
        </Animated.View>
      </View>
    );
  }

  if (state.error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center', padding: 20 },
        ]}
      >
        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
        <Text
          style={{
            color: '#ff6b6b',
            marginTop: 16,
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '500',
          }}
        >
          {state.error}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364']}
        style={styles.backgroundGradient}
      />

      <Animated.View style={[styles.blurHeader, { opacity: headerOpacity }]}>
        <BlurView intensity={80} tint="dark" style={styles.blurHeaderInner} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Indaiatuba</Text>
            <Text style={styles.headerSubtitle}>
              Próximos {state.weatherData?.length || 7} dias
            </Text>
          </View>
        </View>

        <Animated.FlatList
          data={state.weatherData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: Platform.OS !== 'web' }
          )}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => (
            <WeatherCard
              item={item}
              onPress={handleCardPress}
              scrollY={scrollY}
              index={index}
            />
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerText}>✨ Dados em tempo real via Open-Meteo</Text>
            </View>
          }
        />
      </SafeAreaView>
    </Animated.View>
  );
}