import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const paddingHorizontal = 16;
const gapBetweenTiles = 12;

const tileWidth = (width - paddingHorizontal * 2 - gapBetweenTiles) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFill,
    zIndex: -1,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 120 : Platform.OS === 'android' ? 100 : 95,
    paddingBottom: 40,
  },

  // ── Navigation Bar ──────────────────────────────────────────────────────────
  navBarSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 110 : Platform.OS === 'android' ? 95 : 85,
    backgroundColor: 'rgba(12, 24, 30, 0.45)',
    zIndex: 10,
  },
  navBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 11,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
    marginTop: Platform.OS === 'ios' ? 40 : Platform.OS === 'android' ? 30 : 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  backLabel: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 4,
  },
  navHeaderTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  // ── Hero Section ────────────────────────────────────────────────────────────
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  heroLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroCity: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 6,
  },
  heroDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
  },
  heroTemp: {
    fontSize: 82,
    fontWeight: '200',
    color: '#ffffff',
    letterSpacing: -2,
    lineHeight: 86,
    textAlign: 'center',
  },
  heroCondition: {
    fontSize: 22,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '600',
    marginBottom: 4,
  },
  heroHighLow: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },
  heroFeelsLike: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroFeelsLikeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  heroFeelsLikeValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
  },

  // ── Glass Cards ─────────────────────────────────────────────────────────────
  section: {
    marginHorizontal: paddingHorizontal,
    marginBottom: 16,
  },
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  sectionTitleLarge: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 14,
    paddingLeft: 4,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  // ── Hourly Scroll ───────────────────────────────────────────────────────────
  hourlyScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  hourCardItem: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 6,
  },
  hourCardLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  hourCardIcon: {
    marginVertical: 4,
  },
  hourCardTemp: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '700',
  },

  // ── Metrics Grid ────────────────────────────────────────────────────────────
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: gapBetweenTiles,
  },
  metricTile: {
    width: tileWidth,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    minHeight: 130,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIconBg: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '300',
    color: '#ffffff',
    marginVertical: 6,
    lineHeight: 28,
  },
  metricDetail: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
    lineHeight: 14,
  },

  // ── Chart ───────────────────────────────────────────────────────────────────
  chartContainer: {
    marginTop: 8,
  },
  chartLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  chartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    minHeight: 190,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    height: 110,
    paddingBottom: 20,
    marginRight: 10,
  },
  chartYValue: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  chart: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartLine: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 55,
  },
  chartBars: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  chartBarWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    height: '100%',
    gap: 6,
  },
  chartBarValue: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  chartBar: {
    width: 26,
    minHeight: 30,
    borderRadius: 8,
  },
  chartBarLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  // ── Info Card ───────────────────────────────────────────────────────────────
  infoCardContent: {
    padding: 18,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 19,
    fontWeight: '400',
  },

  // ── Spacing ─────────────────────────────────────────────────────────────────
  bottomSpacer: {
    height: 40,
  },
});