import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { ROUTES, DISTRICTS } from '@/data/mockData';

const FILTERS = ['All', 'Scenic', 'Adventure', 'Fastest'];
const DIFFICULTY = ['All', 'Easy', 'Moderate', 'Hard'];

export default function RoutesScreen() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDiff, setActiveDiff] = useState('All');

  const filtered = ROUTES.filter((r) => {
    const matchType = activeFilter === 'All' || r.type === activeFilter;
    const matchDiff = activeDiff === 'All' || r.difficulty === activeDiff;
    const matchFrom = !from || r.from.toLowerCase().includes(from.toLowerCase());
    const matchTo = !to || r.to.toLowerCase().includes(to.toLowerCase());
    return matchType && matchDiff && matchFrom && matchTo;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Plan Your Route</Text>

        {/* From / To inputs */}
        <View style={styles.planBox}>
          <View style={styles.inputRow}>
            <View style={[styles.dot, { backgroundColor: Colors.success }]} />
            <TextInput
              style={styles.input}
              placeholder="From (e.g. Dhaka)"
              placeholderTextColor={Colors.textMuted}
              value={from}
              onChangeText={setFrom}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.inputRow}>
            <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
            <TextInput
              style={styles.input}
              placeholder="To (e.g. Bandarban)"
              placeholderTextColor={Colors.textMuted}
              value={to}
              onChangeText={setTo}
            />
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="navigate" size={16} color="#fff" />
            <Text style={styles.searchBtnText}>Find Routes</Text>
          </TouchableOpacity>
        </View>

        {/* Route type filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.chip, activeFilter === f && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.chipText, activeFilter === f && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Difficulty filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.chipRow, { marginTop: -4 }]}>
          {DIFFICULTY.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.chip, activeDiff === d && styles.chipActive]}
              onPress={() => setActiveDiff(d)}
            >
              <Text style={[styles.chipText, activeDiff === d && styles.chipTextActive]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Route list */}
        <Text style={styles.resultCount}>{filtered.length} routes found</Text>
        {filtered.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={styles.card}
            onPress={() => router.push({ pathname: '/route-detail', params: { id: route.id } })}
          >
            <View style={[styles.cardHeader, { backgroundColor: getRouteBg(route.type) }]}>
              <Ionicons name="bicycle" size={32} color="#ffffff44" />
              <View style={styles.cardHeaderBadges}>
                <View style={[styles.typeBadge, { backgroundColor: Colors.primary }]}>
                  <Text style={styles.typeBadgeText}>{route.type}</Text>
                </View>
                <View style={[styles.diffBadge, { backgroundColor: getDiffColor(route.difficulty) }]}>
                  <Text style={styles.diffBadgeText}>{route.difficulty}</Text>
                </View>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{route.name}</Text>
              <Text style={styles.cardRoute}>{route.from} → {route.to}</Text>
              <View style={styles.cardStats}>
                <StatChip icon="map-outline" label={route.distance} />
                <StatChip icon="time-outline" label={route.duration} />
                <StatChip icon="star" label={route.rating.toString()} color={Colors.warning} />
              </View>
              <View style={styles.cardDistricts}>
                <Ionicons name="location-outline" size={12} color={Colors.textMuted} />
                <Text style={styles.cardDistrictText}>{route.districts.join(' · ')}</Text>
              </View>
              <View style={styles.cardPills}>
                <InfoPill icon="shield-outline" label={`${route.checkpoints} checkpoints`} color={Colors.checkpoint} />
                <InfoPill icon="bed-outline" label={`${route.hotels} hotels`} color={Colors.hotel} />
                <InfoPill icon="flame-outline" label={`${route.fuelStops} fuel`} color={Colors.fuel} />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Browse by district */}
        <Text style={[styles.pageTitle, { marginTop: 8, marginBottom: 12 }]}>Browse by District</Text>
        <View style={styles.districtGrid}>
          {DISTRICTS.slice(0, 10).map((d) => (
            <TouchableOpacity key={d} style={styles.districtChip}>
              <Ionicons name="location" size={12} color={Colors.primary} />
              <Text style={styles.districtText}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatChip({ icon, label, color }: { icon: any; label: string; color?: string }) {
  return (
    <View style={styles.statChip}>
      <Ionicons name={icon} size={11} color={color ?? Colors.textMuted} />
      <Text style={[styles.statLabel, color ? { color } : {}]}>{label}</Text>
    </View>
  );
}

function InfoPill({ icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <View style={[styles.infoPill, { backgroundColor: color + '1a' }]}>
      <Ionicons name={icon} size={10} color={color} />
      <Text style={[styles.infoPillText, { color }]}>{label}</Text>
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
  container: { flex: 1, paddingHorizontal: 16 },
  pageTitle: { color: Colors.text, fontSize: 22, fontWeight: '800', marginTop: 16, marginBottom: 16 },
  planBox: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: Colors.cardBorder, gap: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  input: { flex: 1, color: Colors.text, fontSize: 15, paddingVertical: 4 },
  divider: { height: 1, backgroundColor: Colors.cardBorder, marginLeft: 22 },
  searchBtn: { flexDirection: 'row', backgroundColor: Colors.primary, borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 },
  searchBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  chipRow: { marginBottom: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.card, marginRight: 8, borderWidth: 1, borderColor: Colors.cardBorder },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  resultCount: { color: Colors.textMuted, fontSize: 13, marginBottom: 12 },
  card: { backgroundColor: Colors.card, borderRadius: 16, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: Colors.cardBorder },
  cardHeader: { height: 100, alignItems: 'center', justifyContent: 'center' },
  cardHeaderBadges: { position: 'absolute', top: 10, right: 10, gap: 6 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  typeBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  diffBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  cardBody: { padding: 14, gap: 8 },
  cardTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  cardRoute: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  cardStats: { flexDirection: 'row', gap: 14 },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statLabel: { color: Colors.textMuted, fontSize: 12 },
  cardDistricts: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  cardDistrictText: { color: Colors.textMuted, fontSize: 11, flex: 1 },
  cardPills: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  infoPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  infoPillText: { fontSize: 11, fontWeight: '600' },
  districtGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  districtChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.cardBorder },
  districtText: { color: Colors.textSecondary, fontSize: 13 },
});
