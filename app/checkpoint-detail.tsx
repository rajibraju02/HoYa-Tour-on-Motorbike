import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { CHECKPOINTS } from '@/data/mockData';

export default function CheckpointDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cp = CHECKPOINTS.find(c => c.id === id) ?? CHECKPOINTS[0];

  const typeColor = cp.type === 'Army' ? Colors.danger : cp.type === 'BGB' ? Colors.checkpoint : Colors.warning;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header card */}
        <View style={[styles.headerCard, { borderColor: typeColor + '55' }]}>
          <View style={[styles.headerIcon, { backgroundColor: typeColor + '22' }]}>
            <Ionicons name="shield" size={36} color={typeColor} />
          </View>
          <View style={[styles.typeBadge, { backgroundColor: typeColor }]}>
            <Text style={styles.typeBadgeText}>{cp.type} Checkpoint</Text>
          </View>
          <Text style={styles.cpName}>{cp.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.locationText}>{cp.location} · {cp.district}</Text>
          </View>
        </View>

        {/* Guide requirement */}
        <View style={[styles.alertCard, { borderColor: cp.guideRequired ? Colors.warning + '55' : Colors.success + '55', backgroundColor: (cp.guideRequired ? Colors.warning : Colors.success) + '0d' }]}>
          <Ionicons
            name={cp.guideRequired ? 'warning' : 'checkmark-circle'}
            size={20}
            color={cp.guideRequired ? Colors.warning : Colors.success}
          />
          <View style={styles.alertBody}>
            <Text style={[styles.alertTitle, { color: cp.guideRequired ? Colors.warning : Colors.success }]}>
              {cp.guideRequired ? 'Local Guide Required' : 'No Guide Required'}
            </Text>
            <Text style={styles.alertSub}>
              {cp.guideRequired
                ? 'You must be accompanied by a registered local guide to pass this checkpoint.'
                : 'You can pass this checkpoint independently with proper documents.'}
            </Text>
          </View>
        </View>

        {/* Documents required */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={18} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Required Documents</Text>
          </View>
          {cp.documents.map((doc, i) => (
            <View key={i} style={styles.docRow}>
              <View style={styles.docNumber}>
                <Text style={styles.docNumberText}>{i + 1}</Text>
              </View>
              <Text style={styles.docText}>{doc}</Text>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            </View>
          ))}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={18} color={Colors.accent} />
            <Text style={[styles.sectionTitle, { color: Colors.accent }]}>Important Notes</Text>
          </View>
          <View style={styles.notesCard}>
            <Text style={styles.notesText}>{cp.notes}</Text>
          </View>
        </View>

        {/* Checklist action */}
        <TouchableOpacity style={styles.checklistBtn}>
          <Ionicons name="checkbox-outline" size={18} color={Colors.primary} />
          <Text style={styles.checklistBtnText}>Open Document Checklist</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 16 },
  headerCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 16, marginBottom: 14, borderWidth: 1, gap: 10 },
  headerIcon: { width: 72, height: 72, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  typeBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  typeBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  cpName: { color: Colors.text, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationText: { color: Colors.textMuted, fontSize: 13 },
  alertCard: { flexDirection: 'row', borderRadius: 14, padding: 14, gap: 12, borderWidth: 1, marginBottom: 16, alignItems: 'flex-start' },
  alertBody: { flex: 1, gap: 4 },
  alertTitle: { fontSize: 14, fontWeight: '700' },
  alertSub: { color: Colors.textSecondary, fontSize: 13, lineHeight: 18 },
  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  docRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: 12, padding: 14, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: Colors.cardBorder },
  docNumber: { width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.primary + '22', alignItems: 'center', justifyContent: 'center' },
  docNumberText: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
  docText: { flex: 1, color: Colors.text, fontSize: 14 },
  notesCard: { backgroundColor: Colors.accent + '11', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.accent + '33' },
  notesText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 22 },
  checklistBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: Colors.primary + '22', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.primary + '44' },
  checklistBtnText: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
