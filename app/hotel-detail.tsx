import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { HOTELS } from '@/data/mockData';

export default function HotelDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const hotel = HOTELS.find(h => h.id === id) ?? HOTELS[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Ionicons name="bed" size={52} color={Colors.hotel + '66'} />
          {hotel.bikerFriendly && (
            <View style={styles.bikerBadge}>
              <Ionicons name="bicycle" size={12} color={Colors.primary} />
              <Text style={styles.bikerBadgeText}>Biker Friendly</Text>
            </View>
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.nameRow}>
            <Text style={styles.hotelName}>{hotel.name}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color={Colors.warning} />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.locationText}>{hotel.location} · {hotel.district}</Text>
          </View>
          <Text style={styles.priceRange}>{hotel.priceRange}</Text>

          {/* Parking */}
          <View style={[styles.infoCard, { borderColor: hotel.hasParking ? Colors.success + '55' : Colors.danger + '55' }]}>
            <Ionicons
              name={hotel.hasParking ? 'checkmark-circle' : 'close-circle'}
              size={22}
              color={hotel.hasParking ? Colors.success : Colors.danger}
            />
            <View>
              <Text style={[styles.infoTitle, { color: hotel.hasParking ? Colors.success : Colors.danger }]}>
                {hotel.hasParking ? 'Parking Available' : 'No Parking'}
              </Text>
              {hotel.hasParking && (
                <Text style={styles.infoSub}>{hotel.parkingType}</Text>
              )}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenityGrid}>
              {hotel.amenities.map((a) => (
                <View key={a} style={styles.amenityChip}>
                  <Ionicons name={getAmenityIcon(a)} size={14} color={Colors.hotel} />
                  <Text style={styles.amenityText}>{a}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Book / Contact */}
          <TouchableOpacity style={styles.bookBtn}>
            <Ionicons name="bed" size={18} color="#fff" />
            <Text style={styles.bookBtnText}>Book via HoYa · Earn Points</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call-outline" size={18} color={Colors.hotel} />
            <Text style={styles.callBtnText}>Contact Hotel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getAmenityIcon(a: string): any {
  const m: Record<string, string> = {
    WiFi: 'wifi', AC: 'snow', Restaurant: 'restaurant', Pool: 'water',
    Generator: 'flash', Rooftop: 'sunny', 'Hot water': 'thermometer', 'Valley view': 'eye',
  };
  return m[a] ?? 'checkmark';
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  hero: { height: 160, backgroundColor: Colors.hotel + '11', alignItems: 'center', justifyContent: 'center' },
  bikerBadge: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.primary + '22', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  bikerBadgeText: { color: Colors.primary, fontSize: 12, fontWeight: '600' },
  body: { padding: 16, gap: 12 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  hotelName: { color: Colors.text, fontSize: 20, fontWeight: '800', flex: 1 },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.warning + '22', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  ratingText: { color: Colors.warning, fontSize: 14, fontWeight: '700' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { color: Colors.textMuted, fontSize: 13 },
  priceRange: { color: Colors.success, fontSize: 15, fontWeight: '700' },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: Colors.card, borderRadius: 12, padding: 14, borderWidth: 1 },
  infoTitle: { fontSize: 14, fontWeight: '700' },
  infoSub: { color: Colors.textMuted, fontSize: 12, marginTop: 2 },
  section: { gap: 10 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  amenityGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  amenityChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.hotel + '15', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  amenityText: { color: Colors.hotel, fontSize: 13, fontWeight: '500' },
  bookBtn: { flexDirection: 'row', backgroundColor: Colors.primary, borderRadius: 14, padding: 15, alignItems: 'center', justifyContent: 'center', gap: 10 },
  bookBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  callBtn: { flexDirection: 'row', backgroundColor: Colors.hotel + '15', borderRadius: 14, padding: 15, alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: Colors.hotel + '44' },
  callBtnText: { color: Colors.hotel, fontSize: 15, fontWeight: '700' },
});
