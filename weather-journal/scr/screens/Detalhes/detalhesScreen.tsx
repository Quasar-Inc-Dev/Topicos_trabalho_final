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
// Importação ajustada para herdar o tipo real da DayForecast da Tela 1
import { DayForecast } from '../Home/homeScreen';
import { GRADIENTS } from "../Home/homeStyle"
import { RootStackParamList } from '../../types/navigation';
import { styles } from './detalhesStyle';

const { width } = Dimensions.get('window');

// ─── Metric Tile (Mantido o componente do Integrante C) ───────────────────────────
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
  // Capturando o parâmetro "location" enviado pela Tela 1 (que agora é um DayForecast real)
  const location = route.params.location as DayForecast;

  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const gradientColors = GRADIENTS[location.gradient];

  // Montando a programação do dia em períodos usando os dados da API
  const periodForecast = [
    { period: 'Manhã (08h)', temp: location.periods.manha, icon: 'sunny' as const },
    { period: 'Tarde (14h)', temp: location.periods.tarde, icon: 'partly-sunny' as const },
    { period: 'Noite (20h)', temp: location.periods.noite, icon: 'moon' as const },
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

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

        {/* Background gradient baseado no clima atual */}
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
              <Text style={styles.backLabel}>Voltar</Text>
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
          {/* ── Hero (Dados Dinâmicos da API) ── */}
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
              <Ionicons name="location" size={16} color="rgba(255,255,255,0.85)" />
              <Text style={styles.heroCity}>Indaiatuba ({location.date})</Text>
            </View>
            <Text style={styles.heroTemp}>{location.temp}°</Text>
            <Text style={styles.heroCondition}>{location.condition}</Text>
            <Text style={styles.heroHighLow}>
              Máx. {location.high}°  Mín. {location.low}°
            </Text>
          </Animated.View>

          {/* ── Programação do Dia em Períodos (Requisito Concluído!) ── */}
          <View style={styles.section}>
            <BlurView intensity={25} tint="dark" style={styles.glassCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.5)" />
                <Text style={styles.sectionLabel}>PREVISÃO POR PERÍODO</Text>
              </View>
              <View style={styles.divider} />
              <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.hourlyScroll}
                  contentContainerStyle={styles.hourlyContent}
              >
                {periodForecast.map((p, i) => (
                    <View key={i} style={[styles.hourItem, i === 0 && styles.hourItemFirst, { width: width * 0.26 }]}>
                      <Text style={styles.hourLabel}>{p.period}</Text>
                      <Ionicons name={p.icon} size={22} color="#fff" style={styles.hourIcon} />
                      <Text style={styles.hourTemp}>{p.temp}°</Text>
                    </View>
                ))}
              </ScrollView>
            </BlurView>
          </View>

          {/* ── Bloco de Métricas Detalhadas (Requisito Concluído!) ── */}
          <View style={[styles.section, styles.tilesGrid]}>
            <MetricTile
                icon="rainy-outline"
                label="Chuva acumulada"
                value={`${location.rainSum} mm`}
                detail={location.rainSum > 0 ? "Previsão de precipitação para o dia" : "Sem chuva prevista para hoje"}
            />
            <MetricTile
                icon="leaf-outline"
                label="Vento Máximo"
                value={`${location.windSpeed} km/h`}
                detail="Velocidade máxima das rajadas"
            />
            <MetricTile
                icon="thermometer-outline"
                label="Média Térmica"
                value={`${Math.round((location.high + location.low) / 2)}°`}
                detail="Calculada com base nos extremos"
            />
            <MetricTile
                icon="calendar-outline"
                label="Data de Análise"
                value={location.date}
                detail="Período correspondente à previsão"
            />
          </View>

          <View style={styles.bottomSpacer} />
        </Animated.ScrollView>
      </Animated.View>
  );
}