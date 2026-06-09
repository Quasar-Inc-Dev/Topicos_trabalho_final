import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // ── Container ──────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#0f2027',
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFill,
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 40,
  },

  // ── Navigation Bar ─────────────────────────────────────────────────────────
  navBarSafe: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  navBarBlur: {
    ...StyleSheet.absoluteFill,
  },
  navBarBlurInner: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 50, // below SafeAreaView inset — adjust per device
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  backLabel: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '400',
  },
  moreButton: {
    padding: 4,
  },

  // ── Hero Section ───────────────────────────────────────────────────────────
  hero: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  heroCity: {
    fontSize: 34,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  heroTemp: {
    fontSize: 96,
    fontWeight: '100',
    color: '#ffffff',
    letterSpacing: -5,
    lineHeight: 104,
    marginVertical: 4,
  },
  heroCondition: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '400',
    marginBottom: 6,
  },
  heroHighLow: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '400',
  },

  // ── Glass Cards ────────────────────────────────────────────────────────────
  section: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  glassCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  sectionLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginHorizontal: 0,
  },

  // ── Hourly Forecast ────────────────────────────────────────────────────────
  hourlyScroll: {
    flexGrow: 0,
  },
  hourlyContent: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 0,
  },
  hourItem: {
    alignItems: 'center',
    width: 60,
    gap: 6,
  },
  hourItemFirst: {},
  hourLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  hourIcon: {
    marginVertical: 2,
  },
  hourTemp: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '500',
  },

  // ── Daily Forecast ─────────────────────────────────────────────────────────
  dailyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dailyDay: {
    width: 42,
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '400',
  },
  dailyCenter: {
    width: 52,
    alignItems: 'center',
    gap: 2,
  },
  dailyChance: {
    fontSize: 11,
    color: '#64D2FF',
    fontWeight: '500',
  },
  dailyTempBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'flex-end',
  },
  dailyLow: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
    width: 30,
    textAlign: 'right',
  },
  tempBarTrack: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  tempBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  dailyHigh: {
    fontSize: 17,
    color: '#ffffff',
    fontWeight: '400',
    width: 30,
  },
  dailyDivider: {
    height: 0.5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 16,
  },

  // ── Metric Tiles ───────────────────────────────────────────────────────────
  tilesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricTile: {
    width: (width - 32 - 10) / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
    padding: 16,
    gap: 4,
    overflow: 'hidden',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '300',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  metricDetail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400',
    marginTop: 4,
    lineHeight: 18,
  },

  // ── Sunrise / Sunset ───────────────────────────────────────────────────────
  sunRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 0,
  },
  sunItem: {
    alignItems: 'center',
    gap: 4,
    width: 70,
  },
  sunLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '400',
  },
  sunTime: {
    fontSize: 20,
    fontWeight: '300',
    color: '#ffffff',
  },
  sunArcContainer: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  sunArcTrack: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sunArcFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: 'rgba(255, 213, 128, 0.7)',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sunDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFD580',
    marginRight: -5,
    shadowColor: '#FFD580',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  sunSubtext: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(255,255,255,0.55)',
    paddingBottom: 16,
    fontWeight: '400',
  },

  // ── Spacing ────────────────────────────────────────────────────────────────
  bottomSpacer: {
    height: 40,
  },
});
