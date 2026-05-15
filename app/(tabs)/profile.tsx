import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const STATS = [
  { label: 'Total Rides', value: '14', icon: 'bicycle' },
  { label: 'KMs Covered', value: '3,240', icon: 'map' },
  { label: 'Districts', value: '8', icon: 'location' },
  { label: 'Reviews', value: '22', icon: 'star' },
];

const MENU_ITEMS = [
  { label: 'My Saved Routes', icon: 'bookmark', color: Colors.primary },
  { label: 'Offline Maps', icon: 'cloud-download', color: Colors.accent },
  { label: 'My Reviews', icon: 'chatbubble', color: Colors.warning },
  { label: 'Document Checklist', icon: 'document-text', color: Colors.checkpoint },
  { label: 'Biker Community', icon: 'people', color: Colors.tourist },
  { label: 'Submit a Route', icon: 'add-circle', color: Colors.success },
  { label: 'Settings', icon: 'settings', color: Colors.textMuted },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={Colors.primary} />
          </View>
          <Text style={styles.name}>Rider Name</Text>
          <Text style={styles.username}>@rider · Dhaka, BD</Text>
          <View style={styles.bikeTag}>
            <Ionicons name="bicycle" size={14} color={Colors.primary} />
            <Text style={styles.bikeTagText}>Honda CB Hornet 160R</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Ionicons name={s.icon as any} size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Offline status */}
        <View style={styles.offlineCard}>
          <View style={styles.offlineLeft}>
            <Ionicons name="cloud-download" size={20} color={Colors.accent} />
            <View>
              <Text style={styles.offlineTitle}>Offline Maps</Text>
              <Text style={styles.offlineSub}>2 routes downloaded · 180 MB</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.manageBtn}>
            <Text style={styles.manageBtnText}>Manage</Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <View key={item.label}>
              <TouchableOpacity style={styles.menuRow}>
                <View style={[styles.menuIcon, { backgroundColor: item.color + '22' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
              {idx < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
            </View>
          ))}
        </View>

        {/* App info */}
        <Text style={styles.versionText}>HoYa — Moto NAV v1.0.0</Text>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 16 },
  profileHeader: { alignItems: 'center', paddingTop: 24, paddingBottom: 20, gap: 6 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.primary },
  name: { color: Colors.text, fontSize: 20, fontWeight: '800', marginTop: 8 },
  username: { color: Colors.textMuted, fontSize: 13 },
  bikeTag: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primary + '22', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginTop: 4 },
  bikeTagText: { color: Colors.primary, fontSize: 12, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: Colors.card, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: Colors.cardBorder },
  statValue: { color: Colors.text, fontSize: 18, fontWeight: '800' },
  statLabel: { color: Colors.textMuted, fontSize: 10, textAlign: 'center' },
  offlineCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.card, borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: Colors.accent + '44' },
  offlineLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  offlineTitle: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  offlineSub: { color: Colors.textMuted, fontSize: 12 },
  manageBtn: { backgroundColor: Colors.accent + '22', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8 },
  manageBtnText: { color: Colors.accent, fontSize: 13, fontWeight: '600' },
  menuCard: { backgroundColor: Colors.card, borderRadius: 16, overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: Colors.cardBorder },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  menuIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, color: Colors.text, fontSize: 14, fontWeight: '500' },
  menuDivider: { height: 1, backgroundColor: Colors.cardBorder, marginLeft: 66 },
  versionText: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 8 },
});
