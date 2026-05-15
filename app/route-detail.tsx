import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ROUTES, CHECKPOINTS, HOTELS, FUEL_STATIONS } from '@/data/mockData';

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const route = ROUTES.find(r => r.id === id) ?? ROUTES[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: getRouteBg(route.type) }]}>
          <Ionicons name="bicycle" size={60} color="#ffffff22" />
          <View style={styles.heroOverlay}>
            <View style={[styles.typeBadge, { backgroundColor: Colors.primary }]}>
              <Text style={styles.typeBadgeText}>{route.type}</Text>
            </View>
            <View style={[styles.diffBadge, { backgroundColor: getDiffColor(route.difficulty) }]}>
              <Text style={styles.typeBadgeText}>{route.difficulty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{route.name}</Text>
          <Text style={styles.routeLine}>{route.from} → {route.to}</Text>

          {/* Key stats */}
          <View style={styles.statsRow}>
            <StatBox icon="map-outline" label="Distance" value={route.distance} />
            <StatBox icon="time-outline" label="Duration" value={route.duration} />
            <StatBox icon="star" label="Rating" value={route.rating.toString()} color={Colors.warning} />
          </View>

          {/* Districts */}
          <View style={styles.section}>
            <SectionHeader title="Districts Covered" icon="location-outline" />
            <View style={styles.districtRow}>
              {route.districts.map((d) => (
                <View key={d} style={styles.districtChip}>
                  <Text style={styles.districtText}>{d}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.section}>
            <SectionHeader title="Route Highlights" icon="eye-outline" />
            {route.highlights.map((h) => (
              <View key={h} style={styles.highlightRow}>
                <View style={styles.bullet} />
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>

          {/* Checkpoints */}
          <View style={styles.section}>
            <SectionHeader title={`Checkpoints (${CHECKPOINTS.length})`} icon="shield-outline" color={Colors.checkpoint} />
            {CHECKPOINTS.map((cp) => (
              <TouchableOpacity
                key={cp.id}
                style={styles.cpCard}
                onPress={() => router.push({ pathname: '/checkpoint-detail', params: { id: cp.id } })}
              >
                <View style={[styles.cpIcon, { backgroundColor: Colors.checkpoint + '22' }]}>
                  <Ionicons name="shield" size={18} color={Colors.checkpoint} />
                </View>
                <View style={styles.cpBody}>
                  <Text style={styles.cpName}>{cp.name}</Text>
                  <Text style={styles.cpMeta}>{cp.type} · {cp.location}</Text>
                  {cp.guideRequired && (
                    <View style={styles.guideTag}>
                      <Ionicons name="person" size={10} color={Colors.warning} />
                      <Text style={styles.guideTagText}>Guide required</Text>
                    </View>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Fuel Stops */}
          <View style={styles.section}>
            <SectionHeader title="Fuel Stops" icon="flame-outline" color={Colors.fuel} />
            {FUEL_STATIONS.map((f) => (
              <View key={f.id} style={styles.fuelCard}>
                <View style={[styles.cpIcon, { backgroundColor: Colors.fuel + '22' }]}>
                  <Ionicons name="flame" size={18} color={Colors.fuel} />
                </View>
                <View style={styles.cpBody}>
                  <Text style={styles.cpName}>{f.name}</Text>
                  <Text style={styles.cpMeta}>{f.location}</Text>
                  <Text style={styles.cpDist}>{f.distance}</Text>
                </View>
                {f.octane && (
                  <View style={styles.octaneBadge}>
                    <Text style={styles.octaneText}>Octane</Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Hotels */}
          <View style={styles.section}>
            <SectionHeader title={`Hotels Near Route (${HOTELS.length})`} icon="bed-outline" color={Colors.hotel} />
            {HOTELS.map((h) => (
              <TouchableOpacity
                key={h.id}
                style={styles.cpCard}
                onPress={() => router.push({ pathname: '/hotel-detail', params: { id: h.id } })}
              >
                <View style={[styles.cpIcon, { backgroundColor: Colors.hotel + '22' }]}>
                  <Ionicons name="bed" size={18} color={Colors.hotel} />
                </View>
                <View style={styles.cpBody}>
                  <Text style={styles.cpName}>{h.name}</Text>
                  <Text style={styles.cpMeta}>{h.location}</Text>
                  <Text style={styles.cpDist}>{h.priceRange}</Text>
                </View>
                <View style={styles.ratingPill}>
                  <Ionicons name="star" size={10} color={Colors.warning} />
                  <Text style={styles.ratingPillText}>{h.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Start navigation button */}
          <TouchableOpacity style={styles.navBtn}>
            <Ionicons name="navigate" size={20} color="#fff" />
            <Text style={styles.navBtnText}>Start Navigation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ icon, label, value, color }: any) {
  return (
    <View style={statStyles.box}>
      <Ionicons name={icon} size={18} color={color ?? Colors.primary} />
      <Text style={[statStyles.value, color ? { color } : {}]}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

function SectionHeader({ title, icon, color }: any) {
  return (
    <View style={secStyles.row}>
      <Ionicons name={icon} size={16} color={color ?? Colors.text} />
      <Text style={[secStyles.title, color ? { color } : {}]}>{title}</Text>
    </View>
  );
}

function getRouteBg(type: string) {
  return type === 'Adventure' ? '#0d1433' : type === 'Scenic' ? '#0a1f0f' : '#1a0d04';
}
function getDiffColor(d: string) {
  return d === 'Easy' ? Colors.success : d === 'Moderate' ? Colors.warning : Colors.danger;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  hero: { height: 180, alignItems: 'center', justifyContent: 'center' },
  heroOverlay: { position: 'absolute', top: 16, right: 16, gap: 6 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  body: { padding: 16, gap: 0 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '800', marginBottom: 4 },
  routeLine: { color: Colors.primary, fontSize: 15, fontWeight: '600', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  section: { marginBottom: 20 },
  districtRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  districtChip: { backgroundColor: Colors.card, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: Colors.cardBorder },
  districtText: { color: Colors.textSecondary, fontSize: 12 },
  highlightRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.primary },
  highlightText: { color: Colors.textSecondary, fontSize: 14 },
  cpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12, padding: 12, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  cpIcon: { width: 42, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  cpBody: { flex: 1, gap: 2 },
  cpName: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  cpMeta: { color: Colors.textMuted, fontSize: 12 },
  cpDist: { color: Colors.textSecondary, fontSize: 11 },
  guideTag: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  guideTagText: { color: Colors.warning, fontSize: 11 },
  fuelCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12, padding: 12, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  octaneBadge: { backgroundColor: Colors.fuel + '22', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  octaneText: { color: Colors.fuel, fontSize: 11, fontWeight: '600' },
  ratingPill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: Colors.warning + '22', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingPillText: { color: Colors.warning, fontSize: 12, fontWeight: '700' },
  navBtn: { flexDirection: 'row', backgroundColor: Colors.primary, borderRadius: 14, padding: 16, alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8 },
  navBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});

const statStyles = StyleSheet.create({
  box: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Colors.cardBorder },
  value: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  label: { color: Colors.textMuted, fontSize: 11 },
});

const secStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  title: { color: Colors.text, fontSize: 16, fontWeight: '700' },
});
