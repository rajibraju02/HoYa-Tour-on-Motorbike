import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { TOURIST_SPOTS } from '@/data/mockData';

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const spot = TOURIST_SPOTS.find(s => s.id === id) ?? TOURIST_SPOTS[0];

  const catColor = getCategoryColor(spot.category);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: catColor + '15' }]}>
          <Ionicons name={getCategoryIcon(spot.category)} size={64} color={catColor + '99'} />
          {spot.viral && (
            <View style={styles.viralBadge}>
              <Ionicons name="flame" size={12} color={Colors.primary} />
              <Text style={styles.viralText}>TRENDING</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.topRow}>
            <View style={styles.catChip}>
              <Ionicons name={getCategoryIcon(spot.category)} size={12} color={catColor} />
              <Text style={[styles.catText, { color: catColor }]}>{spot.category}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color={Colors.warning} />
              <Text style={styles.ratingText}>{spot.rating}</Text>
            </View>
          </View>
          <Text style={styles.spotName}>{spot.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.locationText}>{spot.district} District</Text>
          </View>
          <Text style={styles.description}>{spot.description}</Text>

          {/* Quick info */}
          <View style={styles.infoGrid}>
            <InfoBox icon="bicycle-outline" label="Best access" value="Motorbike" color={Colors.primary} />
            <InfoBox icon="calendar-outline" label="Best season" value="Oct – Feb" color={Colors.accent} />
            <InfoBox icon="camera-outline" label="Photo spot" value="Yes" color={Colors.tourist} />
            <InfoBox icon="wifi-outline" label="Connectivity" value="Weak" color={Colors.warning} />
          </View>

          {/* Actions */}
          <TouchableOpacity style={styles.routeBtn}>
            <Ionicons name="navigate" size={18} color="#fff" />
            <Text style={styles.routeBtnText}>Plan Route Here</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn}>
            <Ionicons name="bookmark-outline" size={18} color={Colors.primary} />
            <Text style={styles.saveBtnText}>Save to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoBox({ icon, label, value, color }: any) {
  return (
    <View style={infoStyles.box}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={infoStyles.value}>{value}</Text>
      <Text style={infoStyles.label}>{label}</Text>
    </View>
  );
}

function getCategoryIcon(cat: string): any {
  const map: Record<string, string> = {
    Waterfall: 'water', Viewpoint: 'eye', Beach: 'sunny', Forest: 'leaf', River: 'boat',
  };
  return map[cat] ?? 'location';
}

function getCategoryColor(cat: string) {
  const map: Record<string, string> = {
    Waterfall: Colors.accent, Viewpoint: Colors.primary, Beach: Colors.warning,
    Forest: Colors.success, River: Colors.hotel,
  };
  return map[cat] ?? Colors.tourist;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  hero: { height: 180, alignItems: 'center', justifyContent: 'center' },
  viralBadge: { position: 'absolute', top: 14, right: 14, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.card, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  viralText: { color: Colors.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  body: { padding: 16, gap: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.card, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: Colors.cardBorder },
  catText: { fontSize: 12, fontWeight: '600' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.warning + '22', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  ratingText: { color: Colors.warning, fontSize: 14, fontWeight: '700' },
  spotName: { color: Colors.text, fontSize: 24, fontWeight: '800' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { color: Colors.textMuted, fontSize: 13 },
  description: { color: Colors.textSecondary, fontSize: 15, lineHeight: 24 },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  routeBtn: { flexDirection: 'row', backgroundColor: Colors.primary, borderRadius: 14, padding: 15, alignItems: 'center', justifyContent: 'center', gap: 10 },
  routeBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  saveBtn: { flexDirection: 'row', backgroundColor: Colors.primary + '15', borderRadius: 14, padding: 15, alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: Colors.primary + '44' },
  saveBtnText: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});

const infoStyles = StyleSheet.create({
  box: { width: '47%', backgroundColor: Colors.card, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Colors.cardBorder },
  value: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  label: { color: Colors.textMuted, fontSize: 11 },
});
