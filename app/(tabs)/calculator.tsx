import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, TextInput,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function CalculatorScreen() {
  const [distance, setDistance] = useState('280');
  const [mileage, setMileage] = useState('35');
  const [fuelPrice, setFuelPrice] = useState('125');
  const [nights, setNights] = useState('2');
  const [hotelCost, setHotelCost] = useState('1200');
  const [meals, setMeals] = useState('3');
  const [mealCost, setMealCost] = useState('200');
  const [guideNeeded, setGuideNeeded] = useState(false);
  const [guideCost, setGuideCost] = useState('1500');

  const distNum = parseFloat(distance) || 0;
  const mileageNum = parseFloat(mileage) || 1;
  const fuelNum = parseFloat(fuelPrice) || 0;
  const nightsNum = parseFloat(nights) || 0;
  const hotelNum = parseFloat(hotelCost) || 0;
  const mealsNum = parseFloat(meals) || 0;
  const mealNum = parseFloat(mealCost) || 0;
  const guideNum = guideNeeded ? (parseFloat(guideCost) || 0) : 0;

  const totalFuel = (distNum / mileageNum) * fuelNum;
  const totalHotel = nightsNum * hotelNum;
  const totalMeals = mealsNum * mealNum * (nightsNum + 1);
  const totalGuide = guideNum;
  const misc = (totalFuel + totalHotel + totalMeals) * 0.1;
  const grandTotal = totalFuel + totalHotel + totalMeals + totalGuide + misc;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Trip Cost Calculator</Text>

        <Section title="Fuel" icon="flame" color={Colors.fuel}>
          <Row label="Distance (km)" value={distance} onChange={setDistance} unit="km" />
          <Row label="Bike mileage" value={mileage} onChange={setMileage} unit="km/L" />
          <Row label="Fuel price" value={fuelPrice} onChange={setFuelPrice} unit="৳/L" />
          <CostLine label="Estimated fuel cost" amount={totalFuel} />
        </Section>

        <Section title="Accommodation" icon="bed" color={Colors.hotel}>
          <Row label="Nights" value={nights} onChange={setNights} unit="nights" />
          <Row label="Hotel cost per night" value={hotelCost} onChange={setHotelCost} unit="৳" />
          <CostLine label="Accommodation total" amount={totalHotel} />
        </Section>

        <Section title="Food" icon="restaurant" color={Colors.food}>
          <Row label="Meals per day" value={meals} onChange={setMeals} unit="meals" />
          <Row label="Cost per meal" value={mealCost} onChange={setMealCost} unit="৳" />
          <CostLine label={`Food total (${nightsNum + 1} days)`} amount={totalMeals} />
        </Section>

        <Section title="Guide" icon="person" color={Colors.checkpoint}>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setGuideNeeded(!guideNeeded)}
          >
            <Text style={styles.toggleLabel}>Guide required?</Text>
            <View style={[styles.toggle, guideNeeded && styles.toggleOn]}>
              <View style={[styles.toggleThumb, guideNeeded && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>
          {guideNeeded && (
            <Row label="Guide cost (total)" value={guideCost} onChange={setGuideCost} unit="৳" />
          )}
          {guideNeeded && <CostLine label="Guide total" amount={totalGuide} />}
        </Section>

        {/* Breakdown */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cost Breakdown</Text>
          <BreakdownRow label="Fuel" amount={totalFuel} color={Colors.fuel} />
          <BreakdownRow label="Accommodation" amount={totalHotel} color={Colors.hotel} />
          <BreakdownRow label="Food" amount={totalMeals} color={Colors.food} />
          {guideNeeded && <BreakdownRow label="Guide" amount={totalGuide} color={Colors.checkpoint} />}
          <BreakdownRow label="Misc (10%)" amount={misc} color={Colors.textMuted} />
          <View style={styles.totalDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalAmount}>৳ {Math.round(grandTotal).toLocaleString()}</Text>
          </View>
          <Text style={styles.perPersonNote}>
            Per person (solo ride) · Adjust for group by dividing shared costs
          </Text>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, icon, color, children }: any) {
  return (
    <View style={sectionStyles.wrapper}>
      <View style={sectionStyles.header}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={[sectionStyles.title, { color }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Row({ label, value, onChange, unit }: any) {
  return (
    <View style={rowStyles.wrapper}>
      <Text style={rowStyles.label}>{label}</Text>
      <View style={rowStyles.inputWrap}>
        <TextInput
          style={rowStyles.input}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric"
          placeholderTextColor={Colors.textMuted}
        />
        <Text style={rowStyles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

function CostLine({ label, amount }: { label: string; amount: number }) {
  return (
    <View style={costStyles.row}>
      <Text style={costStyles.label}>{label}</Text>
      <Text style={costStyles.amount}>৳ {Math.round(amount).toLocaleString()}</Text>
    </View>
  );
}

function BreakdownRow({ label, amount, color }: { label: string; amount: number; color: string }) {
  return (
    <View style={breakStyles.row}>
      <View style={[breakStyles.dot, { backgroundColor: color }]} />
      <Text style={breakStyles.label}>{label}</Text>
      <Text style={breakStyles.amount}>৳ {Math.round(amount).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, paddingHorizontal: 16 },
  pageTitle: { color: Colors.text, fontSize: 22, fontWeight: '800', marginTop: 16, marginBottom: 16 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  toggleLabel: { color: Colors.text, fontSize: 14 },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: Colors.cardBorder, justifyContent: 'center', paddingHorizontal: 3 },
  toggleOn: { backgroundColor: Colors.primary },
  toggleThumb: { width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.textMuted },
  toggleThumbOn: { backgroundColor: '#fff', alignSelf: 'flex-end' },
  summaryCard: { backgroundColor: Colors.card, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.cardBorder, gap: 10 },
  summaryTitle: { color: Colors.text, fontSize: 16, fontWeight: '700', marginBottom: 4 },
  totalDivider: { height: 1, backgroundColor: Colors.cardBorder },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  totalAmount: { color: Colors.primary, fontSize: 22, fontWeight: '800' },
  perPersonNote: { color: Colors.textMuted, fontSize: 11, textAlign: 'center' },
});

const sectionStyles = StyleSheet.create({
  wrapper: { backgroundColor: Colors.card, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.cardBorder, gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  title: { fontSize: 15, fontWeight: '700' },
});

const rowStyles = StyleSheet.create({
  wrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: Colors.textSecondary, fontSize: 13, flex: 1 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.surface, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  input: { color: Colors.text, fontSize: 14, fontWeight: '600', minWidth: 50, textAlign: 'right' },
  unit: { color: Colors.textMuted, fontSize: 12 },
});

const costStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: Colors.cardBorder, paddingTop: 8 },
  label: { color: Colors.textMuted, fontSize: 12 },
  amount: { color: Colors.text, fontSize: 13, fontWeight: '700' },
});

const breakStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  label: { flex: 1, color: Colors.textSecondary, fontSize: 13 },
  amount: { color: Colors.text, fontSize: 13, fontWeight: '600' },
});
