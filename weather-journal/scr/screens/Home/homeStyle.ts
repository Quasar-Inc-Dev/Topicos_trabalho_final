import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// ─── Gradient Presets ──────────────────────────────────────────────────────────
export const GRADIENTS = {
  day:    ['#1a6fc4', '#3a9bd5'],
  sunny:  ['#f7971e', '#e85d04'],
  rain:   ['#4b6cb7', '#182848'],
  cloudy: ['#5f6f8a', '#3d4f68'],
  night:  ['#0f2027', '#2c5364'],
  storm:  ['#232526', '#414345'],
} as const;

// ─── Styles ────────────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({
  // ── Container ──────────────────────────────────────────────────────────────
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

  // ── Blur Header (on scroll) ────────────────────────────────────────────────
  blurHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 100,
  },
  blurHeaderInner: {
    flex: 1,
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
    fontWeight: '400',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },

  // ── List ──────────────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },

  // ── Card ──────────────────────────────────────────────────────────────────
  cardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    // Android elevation
    elevation: 8,
  },
  card: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    overflow: 'hidden',
    minHeight: 110,
  },
  cardLeft: {
    flex: 1,
    gap: 2,
  },
  cardCityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationIcon: {
    marginBottom: 1,
  },
  cardCity: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  cardTime: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '400',
    marginTop: 2,
  },
  cardCondition: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
    marginTop: 6,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  cardTemp: {
    fontSize: 52,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: -2,
    lineHeight: 56,
  },
  cardHighLow: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '400',
  },
  cardIconDecor: {
    position: 'absolute',
    right: -10,
    top: -10,
    opacity: 1,
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingTop: 12,
  },
  footerText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '400',
  },
});
