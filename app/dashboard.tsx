import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  green: '#1B7F3B',
  greenDark: '#14632D',
  greenSoft: '#E7F5EC',
  blue: '#1E6FE0',
  blueSoft: '#EAF2FF',
  bg: '#F4F6F5',
  card: '#FFFFFF',
  border: '#DADFDC',
  text: '#16211A',
  muted: '#6B766F',
  red: '#B3261E',
  redSoft: '#FDECEC',
  amber: '#8A6A00',
  amberSoft: '#FFF7E0',
};

type Listing = {
  id: string;
  badge: string;
  distance: string;
  tag: string;
  meta: string;
  title: string;
  price: string;
  unit: string;
  seller: string;
  rating: string;
  // Replace with require('../assets/xyz.jpg') or { uri: 'https://...' }
  image?: ImageSourcePropType;
  tint: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  inquire: boolean;
};

const LISTINGS: Listing[] = [
  {
    id: '1',
    badge: 'Ready to Ship',
    distance: '2.4 km',
    tag: 'Darag Native',
    meta: '5 Mos',
    title: 'Darag Native Free-range Hens',
    price: '₱420',
    unit: '/ head',
    seller: 'Matina Aviary',
    rating: '4.9',
    tint: '#CFE3C8',
    icon: 'chicken',
    inquire: false,
  },
  {
    id: '2',
    badge: 'Point of Lay',
    distance: '4.8 km',
    tag: 'Australorp',
    meta: '18 Wks',
    title: 'Black Australorp Pullets',
    price: '₱580',
    unit: '/ head',
    seller: 'Buhangin Bi...',
    rating: '5.0',
    tint: '#D9D2C4',
    icon: 'chicken',
    inquire: true,
  },
  {
    id: '3',
    badge: 'Fertility 92%',
    distance: '6.1 km',
    tag: 'Basilan Native',
    meta: 'Tray of 30',
    title: 'Fresh Hatching Eggs',
    price: '₱750',
    unit: '/ tray',
    seller: 'Davao Incub...',
    rating: '4.8',
    tint: '#EBD9B8',
    icon: 'egg',
    inquire: true,
  },
  {
    id: '4',
    badge: 'Min 50 heads',
    distance: '8.0 km',
    tag: 'Broiler DOC',
    meta: 'Vaccinated',
    title: 'Day-Old Chicks (Cobb/Ross)',
    price: '₱42',
    unit: '/ chick',
    seller: 'Calinan Hat...',
    rating: '4.9',
    tint: '#F1E3B0',
    icon: 'egg-easter',
    inquire: true,
  },
];

const QUICK_ACTIONS: {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  bg: string;
  fg: string;
  solid?: boolean;
}[] = [
  { label: 'Post Birds for Sale', icon: 'store-plus', bg: COLORS.green, fg: '#fff', solid: true },
  { label: 'BAI Pass & VHC Guide', icon: 'file-document-outline', bg: COLORS.blueSoft, fg: COLORS.blue },
  { label: 'Safe Meetup Hubs', icon: 'map-marker-outline', bg: COLORS.blueSoft, fg: COLORS.blue },
  { label: 'Price Ticker: ₱240/kg', icon: 'trending-up', bg: COLORS.blueSoft, fg: COLORS.green },
];

const FARMS = [
  {
    id: 'f1',
    name: 'Bukidnon Highland Aviaries',
    sub: 'Manolo Fortich • 850+ Broodstocks',
    tint: '#B9D3A5',
  },
  {
    id: 'f2',
    name: 'Davao Gamefowl & Native Hub',
    sub: 'Brgy. Buhangin • Level 2 BAI Registered',
    tint: '#C9B99A',
  },
];

const TABS: {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  dot?: boolean;
}[] = [
  { key: 'market', label: 'Market', icon: 'storefront-outline', iconActive: 'storefront' },
  { key: 'alerts', label: 'Alerts', icon: 'shield-checkmark-outline', iconActive: 'shield-checkmark' },
  { key: 'inquiries', label: 'Inquiries', icon: 'chatbox-ellipses-outline', iconActive: 'chatbox-ellipses', dot: true },
  { key: 'bookings', label: 'Bookings', icon: 'calendar-outline', iconActive: 'calendar' },
  { key: 'profile', label: 'Profile', icon: 'person-circle-outline', iconActive: 'person-circle' },
];

function ListingCard({ item }: { item: Listing }) {
  return (
    <View style={styles.listing}>
      <View style={[styles.listingImage, { backgroundColor: item.tint }]}>
        {item.image ? (
          <Image source={item.image} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : (
          <MaterialCommunityIcons name={item.icon} size={48} color="rgba(0,0,0,0.25)" />
        )}
        <View style={styles.badgeLeft}>
          <Text style={styles.badgeLeftText}>{item.badge}</Text>
        </View>
        <View style={styles.badgeRight}>
          <Text style={styles.badgeRightText}>{item.distance}</Text>
        </View>
      </View>

      <View style={styles.listingBody}>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
          <Text style={styles.tagMeta}>{item.meta}</Text>
        </View>
        <Text style={styles.listingTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>
          {item.price} <Text style={styles.priceUnit}>{item.unit}</Text>
        </Text>
        <View style={styles.sellerRow}>
          <Text style={styles.seller} numberOfLines={1}>
            {item.seller}
          </Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
        {item.inquire && (
          <Pressable
            style={({ pressed }) => [styles.inquireBtn, pressed && { backgroundColor: COLORS.greenDark }]}>
            <Ionicons name="chatbox-outline" size={14} color="#fff" />
            <Text style={styles.inquireText}>Inquire</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState('market');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={26} color={COLORS.text} />
        <View style={styles.headerCenter}>
          <Text style={styles.headerBrand}>
            Agri<Text style={{ color: COLORS.green }}>Manok</Text>
          </Text>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={12} color={COLORS.green} />
            <Text style={styles.locationText}>Buhangin, Davao City</Text>
            <Ionicons name="chevron-down" size={12} color={COLORS.muted} />
          </View>
        </View>
        <Ionicons name="search" size={22} color={COLORS.text} style={{ marginRight: 14 }} />
        <View>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.bellDot} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Welcome hero */}
        <View style={styles.hero}>
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <View style={styles.certPill}>
                <Text style={styles.certText}>BAI Certified Grower #DX-4402</Text>
              </View>
              <Text style={styles.heroTitle}>Maayong Buntag, Pare Carlo!</Text>
              <Text style={styles.heroFarm}>Farm: GreenPastures Backyard Aviary</Text>
            </View>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color="#fff" />
            </View>
          </View>

          <View style={styles.walletCard}>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet-outline" size={20} color={COLORS.green} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.walletLabel}>AgriManok Escrow • GCash Linked</Text>
              <Text style={styles.walletAmount}>
                ₱14,250 <Text style={styles.walletAvail}>Available</Text>
              </Text>
            </View>
            <Pressable style={styles.cashIn}>
              <Text style={styles.cashInText}>Cash In</Text>
              <Ionicons name="add" size={16} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Biosecurity header */}
        <View style={styles.sectionRow}>
          <Ionicons name="shield-checkmark" size={18} color={COLORS.green} />
          <Text style={styles.sectionTitleSm}>Mindanao Biosecurity & Weather</Text>
          <Text style={styles.liveAdvisory}>Live Advisory</Text>
        </View>

        <View style={styles.advisoryGreen}>
          <View style={styles.advisoryIconGreen}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.green} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.advisoryTitleGreen}>
              Davao & Region XI: AI-Free Green Zone Status Active
            </Text>
            <Text style={styles.advisoryBodyGreen}>
              Safe inter-provincial trade corridors to Bukidnon & Cotabato open under BAI Memo
              2024-C.
            </Text>
          </View>
        </View>

        <View style={styles.advisoryRed}>
          <View style={styles.advisoryIconRed}>
            <MaterialCommunityIcons name="thermometer-high" size={20} color={COLORS.red} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.advisoryTitleRed}>
              Heat Stress Advisory for Broilers: 33°C in Lowland Coops
            </Text>
            <Text style={styles.advisoryBodyRed}>
              Peak thermal index between 11 AM - 3 PM. Ensure multi-vitamin electrolytes in
              drinking water.
            </Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.quickRow}>
          {QUICK_ACTIONS.map((a) => (
            <Pressable key={a.label} style={styles.quickItem}>
              <View style={[styles.quickCircle, { backgroundColor: a.bg }]}>
                <MaterialCommunityIcons name={a.icon} size={26} color={a.fg} />
              </View>
              <Text style={styles.quickLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.ticker}>
          <MaterialCommunityIcons name="chart-bar" size={14} color={COLORS.amber} />
          <Text style={styles.tickerText}>Farmgate Native Manok (Mindanao Avg): ₱24...</Text>
          <Text style={styles.tickerChange}>+2.4%</Text>
        </View>

        {/* Market categories */}
        <View style={styles.headRow}>
          <Text style={styles.sectionTitle}>Market Categories</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}>
          <View style={styles.category}>
            <View style={[styles.categoryIcon, { backgroundColor: COLORS.greenSoft }]}>
              <MaterialCommunityIcons name="chicken" size={22} color={COLORS.green} />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Native Chickens</Text>
              <Text style={styles.categorySub}>Darag • Basilan • Jolo</Text>
            </View>
          </View>
          <View style={styles.category}>
            <View style={[styles.categoryIcon, { backgroundColor: COLORS.amberSoft }]}>
              <MaterialCommunityIcons name="egg" size={22} color={COLORS.amber} />
            </View>
            <View>
              <Text style={styles.categoryTitle}>Point of Lay</Text>
              <Text style={styles.categorySub}>Ready Egg Layers</Text>
            </View>
          </View>
        </ScrollView>

        {/* Live market spotlight */}
        <View style={[styles.headRow, { alignItems: 'flex-start', marginTop: 24 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Live Market Spotlight</Text>
            <Text style={styles.sectionSub}>
              Verified healthy stock ready for immediate pickup
            </Text>
          </View>
          <View style={styles.nearby}>
            <Text style={styles.nearbyText}>Nearby (Davao Area)</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {LISTINGS.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </View>

        {/* Top verified farms */}
        <View style={styles.farmsWrap}>
          <View style={styles.farmsHead}>
            <Text style={styles.farmsTitle}>Top Verified Poultry Farms</Text>
            <View style={styles.farmsRegion}>
              <Text style={styles.farmsRegionText}>Davao & Bukidnon</Text>
            </View>
          </View>
          <Text style={styles.farmsSub}>
            Connect directly with certified quarantine-compliant breeder farms in southern
            Mindanao.
          </Text>

          {FARMS.map((f) => (
            <Pressable key={f.id} style={styles.farmRow}>
              <View style={[styles.farmAvatar, { backgroundColor: f.tint }]}>
                <MaterialCommunityIcons name="barn" size={22} color="rgba(0,0,0,0.35)" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.farmNameRow}>
                  <Text style={styles.farmName} numberOfLines={1}>
                    {f.name}
                  </Text>
                  <Ionicons name="checkmark-circle" size={15} color={COLORS.green} />
                </View>
                <Text style={styles.farmMeta}>{f.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.muted} />
            </Pressable>
          ))}

          <Pressable style={styles.exploreAll}>
            <Text style={styles.exploreText}>Explore All 42 Mindanao Breeders</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.green} />
          </Pressable>
        </View>

        <Text style={styles.backed}>Backed by DA-BAI Livestock Biosecurity Standards</Text>
      </ScrollView>

      {/* Floating call button */}
      <Pressable style={styles.fab}>
        <Ionicons name="call" size={24} color="#fff" />
      </Pressable>

      {/* Bottom tab bar (visual only — no other routes) */}
      <SafeAreaView edges={['bottom']} style={styles.tabBarSafe}>
        <View style={styles.tabBar}>
          {TABS.map((t) => {
            const active = t.key === activeTab;
            return (
              <Pressable
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                style={[styles.tabItem, active && styles.tabItemActive]}>
                <View>
                  <Ionicons
                    name={active ? t.iconActive : t.icon}
                    size={22}
                    color={active ? '#fff' : COLORS.muted}
                  />
                  {t.dot && <View style={styles.tabDot} />}
                </View>
                <Text style={[styles.tabLabel, active && { color: '#fff' }]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingBottom: 110 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 12,
  },
  headerCenter: { flex: 1 },
  headerBrand: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 1 },
  locationText: { fontSize: 11, color: COLORS.text, fontWeight: '500' },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#E5322D',
    borderWidth: 1.5,
    borderColor: '#fff',
  },

  hero: {
    backgroundColor: COLORS.green,
    margin: 16,
    borderRadius: 18,
    padding: 14,
  },
  heroTop: { flexDirection: 'row', gap: 10 },
  certPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  certText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 8 },
  heroFarm: { color: '#fff', fontSize: 12, marginTop: 4, opacity: 0.95 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.greenDark,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginTop: 14,
  },
  walletIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.greenSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletLabel: { fontSize: 11, color: COLORS.text, fontWeight: '500' },
  walletAmount: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  walletAvail: { fontSize: 11, fontWeight: '500', color: COLORS.muted },
  cashIn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexWrap: 'wrap',
    width: 68,
    justifyContent: 'center',
  },
  cashInText: { color: '#fff', fontWeight: '800', fontSize: 14 },

  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitleSm: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  liveAdvisory: { fontSize: 10, fontWeight: '700', color: COLORS.green, marginLeft: 'auto' },

  advisoryGreen: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#E9F8EF',
    borderWidth: 1,
    borderColor: '#BFE3CB',
    marginBottom: 12,
  },
  advisoryIconGreen: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFE3CB',
  },
  advisoryTitleGreen: { fontSize: 13, fontWeight: '800', color: COLORS.greenDark },
  advisoryBodyGreen: { fontSize: 11, color: COLORS.green, marginTop: 3, lineHeight: 15 },

  advisoryRed: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.redSoft,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red,
  },
  advisoryIconRed: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advisoryTitleRed: { fontSize: 13, fontWeight: '800', color: COLORS.red },
  advisoryBodyRed: { fontSize: 11, color: '#8C2A25', marginTop: 3, lineHeight: 15 },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  quickItem: { width: 78, alignItems: 'center' },
  quickCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 6,
  },

  ticker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 16,
    marginTop: 14,
  },
  tickerText: { flex: 1, fontSize: 11, fontWeight: '700', color: COLORS.text },
  tickerChange: { fontSize: 11, fontWeight: '800', color: COLORS.green },

  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  sectionSub: { fontSize: 12, color: COLORS.muted, marginTop: 3, lineHeight: 16 },
  viewAll: { fontSize: 12, fontWeight: '700', color: COLORS.green },

  category: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 10,
    minWidth: 170,
  },
  categoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  categorySub: { fontSize: 10, color: COLORS.muted, marginTop: 1 },

  nearby: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    maxWidth: 110,
  },
  nearbyText: { fontSize: 10, fontWeight: '700', color: COLORS.green, textAlign: 'center' },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 16,
  },
  listing: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  listingImage: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.green,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeLeftText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  badgeRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeRightText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  listingBody: { padding: 10 },
  tagRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tag: {
    backgroundColor: COLORS.greenSoft,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  tagText: { fontSize: 9, fontWeight: '700', color: COLORS.greenDark },
  tagMeta: { fontSize: 10, color: COLORS.muted },
  listingTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginTop: 6 },
  price: { fontSize: 18, fontWeight: '800', color: COLORS.text, marginTop: 4 },
  priceUnit: { fontSize: 11, fontWeight: '500', color: COLORS.muted },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 8,
  },
  seller: { flex: 1, fontSize: 10, color: COLORS.muted },
  rating: { fontSize: 10, fontWeight: '700', color: COLORS.text },
  inquireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.green,
    borderRadius: 8,
    height: 34,
  },
  inquireText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  farmsWrap: {
    backgroundColor: COLORS.blueSoft,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D3E2F8',
    marginHorizontal: 16,
    marginTop: 22,
    padding: 14,
  },
  farmsHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  farmsTitle: { flex: 1, fontSize: 16, fontWeight: '800', color: COLORS.text },
  farmsRegion: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  farmsRegionText: { fontSize: 10, fontWeight: '700', color: COLORS.blue },
  farmsSub: { fontSize: 12, color: COLORS.muted, marginTop: 6, marginBottom: 12, lineHeight: 17 },
  farmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    marginBottom: 8,
  },
  farmAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  farmNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  farmName: { fontSize: 13.5, fontWeight: '800', color: COLORS.text, flexShrink: 1 },
  farmMeta: { fontSize: 11, color: COLORS.muted, marginTop: 2 },
  exploreAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 6,
    paddingVertical: 6,
  },
  exploreText: { fontSize: 13, fontWeight: '800', color: COLORS.green },

  backed: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 26,
  },

  fab: {
    position: 'absolute',
    right: 16,
    bottom: 96,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  tabBarSafe: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 2,
    minWidth: 62,
  },
  tabItemActive: { backgroundColor: COLORS.green },
  tabLabel: { fontSize: 10, fontWeight: '700', color: COLORS.muted },
  tabDot: {
    position: 'absolute',
    top: -1,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F28C28',
  },
});
