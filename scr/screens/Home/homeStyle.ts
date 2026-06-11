import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const GRADIENTS = {
  day: ['#1a6fc4', '#3a9bd5', '#64B5F6'],
  sunny: ['#FFB347', '#E8860F', '#FFD700'],
  rain: ['#4b6cb7', '#182848', '#1e3c72'],
  cloudy: ['#717171', '#5F6368', '#3d4f68'],
  night: ['#0f2027', '#2c5364', '#203a43'],
  storm: ['#1a1a2e', '#16213e', '#0f3460'],
} as const;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFill,
  },
  safeArea: {
    flex: 1,
  },
  blurHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 100,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  blurHeaderInner: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    zIndex: 20,
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 14,
  },

  // ── Card ────────────────────────────────────────────────────────────────
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
      web: {
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  card: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minHeight: 140,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  glassLayer: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
  },
  glassLayerInner: {
    flex: 1,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },

  // Left section
  cardLeft: {
    flex: 1,
    gap: 8,
    justifyContent: 'space-between',
  },
  cardCityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationIcon: {
    marginBottom: 2,
  },
  cardCity: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  cardTime: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
  },
  cardCondition: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginTop: 2,
  },
  tempBarContainer: {
    marginTop: 6,
  },
  tempBarTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  tempBarFill: {
    height: '100%',
    borderRadius: 2,
  },

  // Right section
  cardRight: {
    alignItems: 'flex-end',
    gap: 6,
    marginLeft: 16,
    justifyContent: 'center',
  },
  cardTemp: {
    fontSize: 56,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: -2,
    lineHeight: 60,
  },
  cardHighLow: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',
  },
  cardMetricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  cardMetricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardMetricText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  cardIconDecor: {
    position: 'absolute',
    right: -20,
    top: -20,
  },

  // ── Footer ──────────────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingTop: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
});