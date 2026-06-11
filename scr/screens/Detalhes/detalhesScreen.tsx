import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
  SafeAreaView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DayForecast } from '../Home/homeScreen';
import { GRADIENTS } from '../Home/homeStyle';
import { RootStackParamList } from '../../types/navigation';
import { styles } from './detalhesStyle';

interface MetricTileProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  detail?: string;
  color?: string;
}

const MetricTile: React.FC<MetricTileProps> = React.memo(
  ({ icon, label, value, detail, color = '#64B5F6' }) => (
    <View style={styles.metricTile}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIconBg, { backgroundColor: color + '30' }]}>
          <Ionicons name={icon} size={14} color={color} />
        </View>
        <Text style={styles.metricLabel} numberOfLines={1}>
          {label.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      {detail ? (
        <Text style={styles.metricDetail} numberOfLines={1}>
          {detail}
        </Text>
      ) : null}
    </View>
  )
);

MetricTile.displayName = 'MetricTile';

interface ChartProps {
  data: number[];
  label: string;
}

const TemperatureChart: React.FC<ChartProps> = React.memo(({ data, label }) => {
  const maxTemp = Math.max(...data);
  const minTemp = Math.min(...data);
  const range = maxTemp - minTemp || 1;

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartLabel}>{label}</Text>
      <View style={styles.chartWrapper}>
        <View style={styles.chartYAxis}>
          <Text style={styles.chartYValue}>{Math.round(maxTemp)}°</Text>
          <Text style={styles.chartYValue}>{Math.round((maxTemp + minTemp) / 2)}°</Text>
          <Text style={styles.chartYValue}>{Math.round(minTemp)}°</Text>
        </View>
        <View style={styles.chart}>
          <View style={styles.chartLine} />
          <View style={styles.chartBars}>
            {data.map((temp, index) => {
              const heightPercent = ((temp - minTemp) / range) * 75 + 15;
              return (
                <View key={index} style={styles.chartBarWrapper}>
                  <Text style={styles.chartBarValue}>{Math.round(temp)}°</Text>
                  <LinearGradient
                    colors={['#64B5F6', '#1E88E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={[styles.chartBar, { height: `${heightPercent}%` }]}
                  />
                  <Text style={styles.chartBarLabel}>
                    {index === 0 ? 'Manhã' : index === 1 ? 'Tarde' : 'Noite'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
});

TemperatureChart.displayName = 'TemperatureChart';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ navigation, route }: Props) {
  const [safeLocation, setSafeLocation] = useState<DayForecast | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (route.params?.location) {
      const deatachedData = JSON.parse(JSON.stringify(route.params.location));
      setSafeLocation(deatachedData);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }
  }, [route.params?.location, fadeAnim]);

  if (!safeLocation) {
    return <View style={{ flex: 1, backgroundColor: '#0f2027' }} />;
  }

  const gradientColors =
    GRADIENTS[safeLocation.gradient] || ['#0f2027', '#203a43', '#2c5364'];

  const todasAsHoras = [
    { hour: '00h', temp: safeLocation.periods.noite - 2, icon: 'moon' as const },
    { hour: '02h', temp: safeLocation.periods.noite - 3, icon: 'moon' as const },
    { hour: '04h', temp: safeLocation.periods.noite - 3, icon: 'cloudy-night' as const },
    { hour: '06h', temp: safeLocation.periods.manha - 2, icon: 'partly-sunny' as const },
    { hour: '08h', temp: safeLocation.periods.manha, icon: 'sunny' as const },
    { hour: '10h', temp: safeLocation.periods.manha + 3, icon: 'sunny' as const },
    { hour: '12h', temp: safeLocation.periods.tarde + 1, icon: 'sunny' as const },
    { hour: '14h', temp: safeLocation.periods.tarde, icon: 'sunny' as const },
    { hour: '16h', temp: safeLocation.periods.tarde - 1, icon: 'sunny' as const },
    { hour: '18h', temp: safeLocation.periods.noite + 2, icon: 'partly-sunny' as const },
    { hour: '20h', temp: safeLocation.periods.noite, icon: 'moon' as const },
    { hour: '22h', temp: safeLocation.periods.noite - 1, icon: 'moon' as const },
  ];

  const getUVColor = (uv: number) => {
    if (uv <= 2) return '#4CAF50';
    if (uv <= 5) return '#FFC107';
    if (uv <= 7) return '#FF9800';
    if (uv <= 10) return '#F44336';
    return '#9C27B0';
  };

  const getUVText = (uv: number) => {
    if (uv <= 2) return 'Baixo';
    if (uv <= 5) return 'Moderado';
    if (uv <= 7) return 'Alto';
    if (uv <= 10) return 'Muito Alto';
    return 'Extremo';
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={gradientColors as any}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.navBarSafe} />

      <SafeAreaView style={styles.navBarContainer}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.backLabel}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.navHeaderTitle}>Indaiatuba</Text>
          <View style={{ width: 80 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.hero}>
          <View style={styles.heroLocationRow}>
            <Ionicons name="location" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.heroCity}>Indaiatuba</Text>
          </View>
          <Text style={styles.heroDate}>{safeLocation.date}</Text>
          <Text style={styles.heroTemp}>{safeLocation.temp}°</Text>
          <Text style={styles.heroCondition}>{safeLocation.condition}</Text>
          <Text style={styles.heroHighLow}>
            Máx. {safeLocation.high}°  •  Mín. {safeLocation.low}°
          </Text>

          <View style={styles.heroFeelsLike}>
            <Text style={styles.heroFeelsLikeLabel}>SENSAÇÃO TÉRMICA</Text>
            <Text style={styles.heroFeelsLikeValue}>{safeLocation.feelsLike}°</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.glassCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBg}>
                <Ionicons name="time-outline" size={16} color="#64B5F6" />
              </View>
              <Text style={styles.sectionLabel}>PREVISÃO HORÁRIA DO DIA</Text>
            </View>
            <View style={styles.divider} />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.hourlyScrollContainer}
            >
              {todasAsHoras.map((p, i) => (
                <View key={i} style={styles.hourCardItem}>
                  <Text style={styles.hourCardLabel}>{p.hour}</Text>
                  <Ionicons name={p.icon} size={20} color="#FFD700" style={styles.hourCardIcon} />
                  <Text style={styles.hourCardTemp}>{p.temp}°</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitleLarge}>Detalhes Climáticos</Text>
          <View style={styles.tilesGrid}>
            <MetricTile
              icon="rainy-outline"
              label="Precipitação"
              value={`${safeLocation.rainSum} mm`}
              detail={safeLocation.rainSum > 0 ? 'Chuva acumulada' : 'Sem chuva'}
              color="#4FC3F7"
            />
            <MetricTile
              icon="leaf-outline"
              label="Vento Máximo"
              value={`${safeLocation.windSpeed} km/h`}
              detail="Rajadas de vento"
              color="#81C784"
            />
            <MetricTile
              icon="thermometer-outline"
              label="Sensação"
              value={`${safeLocation.feelsLike}°`}
              detail="Temp. aparente"
              color="#FFB74D"
            />
            <MetricTile
              icon="water-outline"
              label="Umidade"
              value={`${safeLocation.humidity}%`}
              detail="Umidade do ar"
              color="#64B5F6"
            />

            <View style={[styles.metricTile, { backgroundColor: `${getUVColor(safeLocation.uvIndex)}15` }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIconBg, { backgroundColor: `${getUVColor(safeLocation.uvIndex)}30` }]}>
                  <Ionicons name="sunny-outline" size={16} color={getUVColor(safeLocation.uvIndex)} />
                </View>
                <Text style={styles.metricLabel}>ÍNDICE UV</Text>
              </View>
              <Text style={styles.metricValue}>{safeLocation.uvIndex}</Text>
              <Text
                style={[
                  styles.metricDetail,
                  { color: getUVColor(safeLocation.uvIndex), fontWeight: '600' },
                ]}
              >
                {getUVText(safeLocation.uvIndex)}
              </Text>
            </View>

            <MetricTile
              icon="calendar-outline"
              label="Data"
              value={safeLocation.date}
              detail="Dia consultado"
              color="#BA68C8"
            />
          </View>
        </View>

        <View style={styles.section}>
          <TemperatureChart
            data={[safeLocation.periods.manha, safeLocation.periods.tarde, safeLocation.periods.noite]}
            label="Variação de Temperatura no Dia"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.glassCard}>
            <View style={styles.infoCardContent}>
              <View style={styles.infoItem}>
                <Ionicons name="information-circle-outline" size={20} color="#64B5F6" />
                <Text style={styles.infoText}>
                  Mantenha-se hidratado durante o dia. Use protetor solar se o índice UV
                  estiver acima de moderado.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Animated.View>
  );
}