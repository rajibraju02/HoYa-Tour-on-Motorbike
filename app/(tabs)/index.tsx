import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ROUTES, TOURIST_SPOTS } from '@/data/mockData';

const QUICK_ACTIONS = [
  { label: 'Plan Route',  icon: 'navigate',      color: Colors.primary,    route: '/routes'    },
  { label: 'Hotels',      icon: 'bed',            color: Colors.hotel,      route: '/routes'    },
  { label: 'Checkpoints', icon: 'shield',         color: Colors.checkpoint, route: '/routes'    },
  { label: 'Cost Calc',   icon: 'calculator',     color: Colors.success,    route: '/calculator'},
];

export default function HomeScreen() {
  const router = useRouter();
  const featuredRoutes = ROUTES.slice(0, 2);
  const viralSpots = TOURIST_SPOTS.filter(s => s.viral).slice(0, 3);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning, Rider</Text>
            <Text style={styles.tagline}>HoYa — Moto NAV</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/routes')}
          activeOpacity={0.8}
        >
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Where do you want to ride?</Text>
          <Ionicons name="options-outline" size={18} color={Colors.primary} />
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map((a) => (
            <TouchableOpacity
              key={a.label}
              style={[styles.quickCard, { borderColor: a.color + '33' }]}
              onPress={() => router.push(a.route as any)}
            >
              <View style={[styles.quickIcon, { backgroundColor: a.color + '22' }]}>
                <Ionicons name={a.icon as any} size={22} color={a.color} />
              </View>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Routes */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Routes</Text>
          <TouchableOpacity onPress={() => router.push('/routes')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
          {featuredRoutes.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={styles.routeCard}
              onPress={() => router.push({ pathname: '/route-detail', params: { id: route.id } })}
            >
              <View style={[styles.routeImagePlaceholder, { backgroundColor: getRouteBg(route.type) }]}>
                <Ionicons name="bicycle" size={36} color="#ffffff55" />
                <View style={[styles.badge, { backgroundColor: getDifficultyColor(route.difficulty) }]}>
                  <Text style={styles.badgeText}>{route.difficulty}</Text>
                </View>
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{route.name}</Text>
                <Text style={styles.routeMeta}>{route.from} → {route.to}</Text>
                <View style={styles.routeStats}>
                  <Stat icon="map-outline" value={route.distance} />
                  <Stat icon="time-outline" value={route.duration} />
                  <Stat icon="star" value={route.rating.toString()} color={Colors.warning} />
                </View>
                <View style={styles.routePills}>
                  <Pill icon="shield-outline" value={`${route.checkpoints} posts`} color={Colors.checkpoint} />
                  <Pill icon="bed-outline" value={`${route.hotels} hotels`} color={Colors.hotel} />
                  <Pill icon="car-outline" value={`${route.fuelStops} fuel`} color={Colors.fuel} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Viral Spots */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Right Now</Text>
          <TouchableOpacity onPress={() => router.push('/explore')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {viralSpots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={styles.spotRow}
            onPress={() => router.push({ pathname: '/spot-detail', params: { id: spot.id } })}
          >
            <View style={styles.spotIcon}>
              <Ionicons name={getCategoryIcon(spot.category)} size={20} color={Colors.tourist} />
            </View>
            <View style={styles.spotText}>
              <Text style={styles.spotName}>{spot.name}</Text>
              <Text style={styles.spotDistrict}>{spot.district} · {spot.category}</Text>
            </View>
            <View style={styles.spotRating}>
              <Ionicons name="star" size={12} color={Colors.warning} />
              <Text style={styles.spotRatingText}>{spot.rating}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ icon, value, color }: { icon: any; value: string; color?: string }) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={12} color={color ?? Colors.textMuted} />
      <Text style={[styles.statText, color ? { color } : {}]}>{value}</Text>
    </View>
  );
}

function Pill({ icon, value, color }: { icon: any; value: string; color: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: color + '22' }]}>
      <Ionicons name={icon} size={10} color={color} />
      <Text style={[styles.pillText, { color }]}>{value}</Text>
    </View>
  );
}

function getRouteBg(type: string) {
  const map: Record<string, string> = { Adventure: '#1a1a3e', Scenic: '#0a2a1a', Fastest: '#2a1a0a' };
  return map[type] ?? Colors.surface;
}

function getDifficultyColor(d: string) {
  return d === 'Easy' ? Colors.success : d === 'Moderate' ? Colors.warning : Colors.danger;
}

function getCategoryIcon(cat: string): any {
  const map: Record<string, string> = {
    Waterfall: 'water', Viewpoint: 'eye', Beach: 'sunny', Forest: 'leaf', River: 'boat',
  };
  return map[cat] ?? 'location';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, paddingBottom: 12 },
  greeting: { color: Colors.textMuted, fontSize: 13 },
  tagline: { color: Colors.text, fontSize: 22, fontWeight: '800', letterSpacing: 0.5 },
  notifBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20, gap: 10, borderWidth: 1, borderColor: Colors.cardBorder },
  searchPlaceholder: { flex: 1, color: Colors.textMuted, fontSize: 14 },
  sectionTitle: { color: Colors.text, fontSize: 17, fontWeight: '700', marginBottom: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  seeAll: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  quickCard: { width: '47%', backgroundColor: Colors.card, borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, gap: 8 },
  quickIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { color: Colors.text, fontSize: 13, fontWeight: '600' },
  hScroll: { marginBottom: 24 },
  routeCard: { width: 260, backgroundColor: Colors.card, borderRadius: 16, marginRight: 14, overflow: 'hidden', borderWidth: 1, borderColor: Colors.cardBorder },
  routeImagePlaceholder: { height: 120, alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  routeInfo: { padding: 12, gap: 6 },
  routeName: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  routeMeta: { color: Colors.textMuted, fontSize: 12 },
  routeStats: { flexDirection: 'row', gap: 12 },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { color: Colors.textMuted, fontSize: 11 },
  routePills: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  pillText: { fontSize: 10, fontWeight: '600' },
  spotRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12, padding: 12, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  spotIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: Colors.tourist + '22', alignItems: 'center', justifyContent: 'center' },
  spotText: { flex: 1 },
  spotName: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  spotDistrict: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  spotRating: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  spotRatingText: { color: Colors.warning, fontSize: 12, fontWeight: '600' },
});
