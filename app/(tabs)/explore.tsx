import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { TOURIST_SPOTS, HOTELS } from '@/data/mockData';

const CATEGORIES = ['All', 'Waterfall', 'Viewpoint', 'Beach', 'Forest', 'River'];

export default function ExploreScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Explore</Text>

        {/* Viral Banner */}
        <View style={styles.viralBanner}>
          <Ionicons name="flame" size={18} color={Colors.primary} />
          <Text style={styles.viralText}>Trending among bikers this week</Text>
        </View>

        {/* Viral spots */}
        {TOURIST_SPOTS.filter(s => s.viral).map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={styles.bigCard}
            onPress={() => router.push({ pathname: '/spot-detail', params: { id: spot.id } })}
          >
            <View style={[styles.bigCardImage, { backgroundColor: getCategoryColor(spot.category) + '22' }]}>
              <Ionicons name={getCategoryIcon(spot.category)} size={48} color={getCategoryColor(spot.category) + 'aa'} />
              {spot.viral && (
                <View style={styles.viralBadge}>
                  <Ionicons name="flame" size={10} color={Colors.primary} />
                  <Text style={styles.viralBadgeText}>VIRAL</Text>
                </View>
              )}
            </View>
            <View style={styles.bigCardBody}>
              <View style={styles.bigCardTop}>
                <View>
                  <Text style={styles.bigCardName}>{spot.name}</Text>
                  <Text style={styles.bigCardMeta}>{spot.district} · {spot.category}</Text>
                </View>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color={Colors.warning} />
                  <Text style={styles.ratingText}>{spot.rating}</Text>
                </View>
              </View>
              <Text style={styles.bigCardDesc} numberOfLines={2}>{spot.description}</Text>
              <View style={styles.bigCardFooter}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="navigate-outline" size={14} color={Colors.primary} />
                  <Text style={styles.actionBtnText}>Get Route</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtnSecondary}>
                  <Ionicons name="bookmark-outline" size={14} color={Colors.textMuted} />
                  <Text style={styles.actionBtnSecondaryText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Nearby Hotels */}
        <Text style={styles.sectionTitle}>Biker-Friendly Hotels</Text>
        {HOTELS.map((hotel) => (
          <TouchableOpacity
            key={hotel.id}
            style={styles.hotelCard}
            onPress={() => router.push({ pathname: '/hotel-detail', params: { id: hotel.id } })}
          >
            <View style={styles.hotelIcon}>
              <Ionicons name="bed" size={22} color={Colors.hotel} />
            </View>
            <View style={styles.hotelBody}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <Text style={styles.hotelLocation}>{hotel.location}</Text>
              <View style={styles.hotelTags}>
                {hotel.hasParking && (
                  <Tag icon="car-outline" label="Parking" color={Colors.success} />
                )}
                {hotel.bikerFriendly && (
                  <Tag icon="bicycle-outline" label="Biker OK" color={Colors.primary} />
                )}
                <Tag icon="cash-outline" label={hotel.priceRange} color={Colors.textMuted} />
              </View>
            </View>
            <View style={styles.hotelRating}>
              <Ionicons name="star" size={12} color={Colors.warning} />
              <Text style={styles.hotelRatingText}>{hotel.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Tag({ icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <View style={styles.tag}>
      <Ionicons name={icon} size={10} color={color} />
      <Text style={[styles.tagText, { color }]}>{label}</Text>
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
  container: { flex: 1, paddingHorizontal: 16 },
  pageTitle: { color: Colors.text, fontSize: 22, fontWeight: '800', marginTop: 16, marginBottom: 12 },
  viralBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: Colors.primary + '15', borderRadius: 10, padding: 10, marginBottom: 14, borderWidth: 1, borderColor: Colors.primary + '33' },
  viralText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  bigCard: { backgroundColor: Colors.card, borderRadius: 16, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: Colors.cardBorder },
  bigCardImage: { height: 140, alignItems: 'center', justifyContent: 'center' },
  viralBadge: { position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.card + 'ee', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  viralBadgeText: { color: Colors.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  bigCardBody: { padding: 14, gap: 8 },
  bigCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  bigCardName: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  bigCardMeta: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.warning + '22', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: Colors.warning, fontSize: 13, fontWeight: '700' },
  bigCardDesc: { color: Colors.textSecondary, fontSize: 13, lineHeight: 18 },
  bigCardFooter: { flexDirection: 'row', gap: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primary + '22', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  actionBtnText: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
  actionBtnSecondary: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.card, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: Colors.cardBorder },
  actionBtnSecondaryText: { color: Colors.textMuted, fontSize: 13, fontWeight: '600' },
  sectionTitle: { color: Colors.text, fontSize: 17, fontWeight: '700', marginBottom: 12 },
  hotelCard: { flexDirection: 'row', backgroundColor: Colors.card, borderRadius: 12, padding: 12, marginBottom: 10, gap: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  hotelIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: Colors.hotel + '22', alignItems: 'center', justifyContent: 'center' },
  hotelBody: { flex: 1, gap: 4 },
  hotelName: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  hotelLocation: { color: Colors.textMuted, fontSize: 12 },
  hotelTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  tagText: { fontSize: 11 },
  hotelRating: { flexDirection: 'row', alignItems: 'center', gap: 3, alignSelf: 'flex-start' },
  hotelRatingText: { color: Colors.warning, fontSize: 12, fontWeight: '600' },
});
