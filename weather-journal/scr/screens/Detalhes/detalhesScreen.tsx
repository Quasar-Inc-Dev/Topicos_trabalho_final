import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Location } from '../Home/homeScreen';
import { GRADIENTS } from "../Home/homeStyle"
import { RootStackParamList } from '../../types/navigation';
import { styles } from './detalhesStyle';

const { width } = Dimensions.get('window');

// ─── Mock Hourly Forecast ─────────────────────────────────────────────────────
const hourlyForecast = [
  { hour: 'Agora', temp: 28, icon: 'partly-sunny' as const },
  { hour: '15h',   temp: 30, icon: 'sunny' as const },
  { hour: '16h',   temp: 29, icon: 'sunny' as const },
  { hour: '17h',   temp: 27, icon: 'partly-sunny' as const },
  { hour: '18h',   temp: 25, icon: 'cloudy' as const },
  { hour: '19h',   temp: 23, icon: 'cloudy' as const },
  { hour: '20h',   temp: 21, icon: 'cloud' as const },
  { hour: '21h',   temp: 20, icon: 'moon' as const },
];

// ─── Mock Daily Forecast ──────────────────────────────────────────────────────
const dailyForecast = [
  { day: 'Hoje', icon: 'partly-sunny' as const, low: 19, high: 31, chance: 10 },
  { day: 'Seg',  icon: 'rainy' as const,         low: 17, high: 25, chance: 80 },
  { day: 'Ter',  icon: 'sunny' as const,          low: 18, high: 32, chance: 5  },
  { day: 'Qua',  icon: 'cloudy' as const,          low: 20, high: 28, chance: 30 },
  { day: 'Qui',  icon: 'partly-sunny' as const, low: 19, high: 30, chance: 15 },
  { day: 'Sex',  icon: 'thunderstorm' as const,   low: 16, high: 23, chance: 90 },
  { day: 'Sáb',  icon: 'sunny' as const,          low: 20, high: 33, chance: 0  },
];

// ─── Metric Tile ──────────────────────────────────────────────────────────────
interface MetricTileProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  detail?: string;
}

const MetricTile: React.FC<MetricTileProps> = ({ icon, label, value, detail }) => (
  <View style={styles.metricTile}>
    <View style={styles.metricHeader}>
      <Ionicons name={icon} size={14} color="rgba(255,255,255,0.55)" />
      <Text style={styles.metricLabel}>{label.toUpperCase()}</Text>
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    {detail ? <Text style={styles.metricDetail}>{detail}</Text> : null}
  </View>
);

// ─── Detalhes Screen ──────────────────────────────────────────────────────────
type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ navigation, route }: Props) {
  const { location } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const gradientColors = GRADIENTS[location.gradient];

  // Entry animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Header blur on scroll
  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Hero shrink on scroll
  const heroScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.75],
    extrapolate: 'clamp',
  });

  const heroTranslate = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" />

      {/* Background gradient */}
      <LinearGradient
        colors={gradientColors as any}
        style={styles.backgroundGradient}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      {/* Floating nav bar */}
      <SafeAreaView style={styles.navBarSafe}>
        <Animated.View style={[styles.navBarBlur, { opacity: headerBgOpacity }]}>
          <BlurView intensity={60} tint="dark" style={styles.navBarBlurInner} />
        </Animated.View>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.backLabel}>Clima</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal-circle" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Scrollable content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Hero ── */}
        <Animated.View
          style={[
            styles.hero,
            {
              transform: [
                { scale: heroScale },
                { translateY: heroTranslate },
              ],
            },
          ]}
        >
          <View style={styles.heroLocationRow}>
            {location.isCurrentLocation && (
              <Ionicons name="location" size={16} color="rgba(255,255,255,0.85)" />
            )}
            <Text style={styles.heroCity}>{location.city}</Text>
          </View>
          <Text style={styles.heroTemp}>{location.temp}°</Text>
          <Text style={styles.heroCondition}>{location.condition}</Text>
          <Text style={styles.heroHighLow}>
            Máx. {location.high}°  Mín. {location.low}°
          </Text>
        </Animated.View>

        {/* ── Hourly Forecast ── */}
        <View style={styles.section}>
          <BlurView intensity={25} tint="dark" style={styles.glassCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.5)" />
              <Text style={styles.sectionLabel}>PREVISÃO POR HORA</Text>
            </View>
            <View style={styles.divider} />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hourlyScroll}
              contentContainerStyle={styles.hourlyContent}
            >
              {hourlyForecast.map((h, i) => (
                <View key={i} style={[styles.hourItem, i === 0 && styles.hourItemFirst]}>
                  <Text style={styles.hourLabel}>{h.hour}</Text>
                  <Ionicons name={h.icon} size={22} color="#fff" style={styles.hourIcon} />
                  <Text style={styles.hourTemp}>{h.temp}°</Text>
                </View>
              ))}
            </ScrollView>
          </BlurView>
        </View>

        {/* ── Daily Forecast ── */}
        <View style={styles.section}>
          <BlurView intensity={25} tint="dark" style={styles.glassCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.5)" />
              <Text style={styles.sectionLabel}>PREVISÃO PARA 7 DIAS</Text>
            </View>
            <View style={styles.divider} />
            {dailyForecast.map((d, i) => (
              <View key={i}>
                <View style={styles.dailyRow}>
                  <Text style={styles.dailyDay}>{d.day}</Text>
                  <View style={styles.dailyCenter}>
                    <Ionicons name={d.icon} size={20} color="#fff" />
                    {d.chance > 0 && (
                      <Text style={styles.dailyChance}>{d.chance}%</Text>
                    )}
                  </View>
                  <View style={styles.dailyTempBar}>
                    <Text style={styles.dailyLow}>{d.low}°</Text>
                    <View style={styles.tempBarTrack}>
                      <LinearGradient
                        colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.tempBarFill}
                      />
                    </View>
                    <Text style={styles.dailyHigh}>{d.high}°</Text>
                  </View>
                </View>
                {i < dailyForecast.length - 1 && <View style={styles.dailyDivider} />}
              </View>
            ))}
          </BlurView>
        </View>

        {/* ── Metric Tiles ── */}
        <View style={[styles.section, styles.tilesGrid]}>
          <MetricTile icon="water-outline"      label="Umidade"     value="72%"      detail="O ponto de orvalho é 22°" />
          <MetricTile icon="speedometer-outline" label="Pressão"     value="1013 hPa" detail="Estável" />
          <MetricTile icon="eye-outline"         label="Visibilidade" value="10 km"   detail="Perfeitamente claro" />
          <MetricTile icon="thermometer-outline" label="Sensação"    value={`${location.feelsLike}°`} detail="Semelhante ao real" />
          <MetricTile icon="sunny-outline"       label="Índice UV"   value="8"        detail="Muito alto" />
          <MetricTile icon="leaf-outline"        label="Vento"       value="14 km/h"  detail="SO · Rajadas 22 km/h" />
        </View>

        {/* ── Sunrise / Sunset ── */}
        <View style={styles.section}>
          <BlurView intensity={25} tint="dark" style={styles.glassCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="sunny-outline" size={13} color="rgba(255,255,255,0.5)" />
              <Text style={styles.sectionLabel}>NASCER E PÔR DO SOL</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.sunRow}>
              <View style={styles.sunItem}>
                <Ionicons name="arrow-up-outline" size={22} color="#FFD580" />
                <Text style={styles.sunLabel}>Nascer</Text>
                <Text style={styles.sunTime}>06:14</Text>
              </View>
              <View style={styles.sunArcContainer}>
                <View style={styles.sunArcTrack}>
                  <View style={[styles.sunArcFill, { width: '62%' }]}>
                    <View style={styles.sunDot} />
                  </View>
                </View>
              </View>
              <View style={styles.sunItem}>
                <Ionicons name="arrow-down-outline" size={22} color="#FF9A3C" />
                <Text style={styles.sunLabel}>Pôr</Text>
                <Text style={styles.sunTime}>18:42</Text>
              </View>
            </View>
            <Text style={styles.sunSubtext}>Duração do dia: 12h 28min</Text>
          </BlurView>
        </View>

        <View style={styles.bottomSpacer} />
      </Animated.ScrollView>
    </Animated.View>
  );
}
