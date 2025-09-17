import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { typography, spacing, borderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const FeaturedListings = () => {
  const { theme } = useTheme();
  const scrollViewRef = useRef(null);

  // Mock data for featured listings
  const listings = [
    {
      id: 1,
      title: 'Modern Eco Villa',
      location: 'Kyiv, Ukraine',
      price: '$450,000',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['4 Beds', '3 Baths', 'Solar Panels', 'Garden'],
      rating: 4.9,
      isEcoFriendly: true,
      questPoints: 150,
    },
    {
      id: 2,
      title: 'Urban Loft Apartment',
      location: 'Lviv, Ukraine',
      price: '$280,000',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['2 Beds', '2 Baths', 'City View', 'Gym'],
      rating: 4.7,
      isEcoFriendly: false,
      questPoints: 120,
    },
    {
      id: 3,
      title: 'Countryside Cottage',
      location: 'Carpathians, Ukraine',
      price: '$180,000',
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['3 Beds', '2 Baths', 'Fireplace', 'Lake View'],
      rating: 4.8,
      isEcoFriendly: true,
      questPoints: 100,
    },
    {
      id: 4,
      title: 'Smart City Home',
      location: 'Odesa, Ukraine',
      price: '$320,000',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      features: ['3 Beds', '2 Baths', 'Smart Home', 'Terrace'],
      rating: 4.6,
      isEcoFriendly: false,
      questPoints: 130,
    },
  ];

  const renderListingCard = (listing) => (
    <TouchableOpacity
      key={listing.id}
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: listing.image }} style={styles.cardImage} />
        
        {/* Overlay badges */}
        <View style={styles.badgeContainer}>
          {listing.isEcoFriendly && (
            <View style={styles.ecoBadge}>
              <Ionicons name="leaf" size={12} color="#FFFFFF" />
              <Text style={styles.badgeText}>Eco</Text>
            </View>
          )}
          <View style={[styles.questBadge, { backgroundColor: theme.colors.accent }]}>
            <Ionicons name="trophy" size={12} color="#FFFFFF" />
            <Text style={styles.badgeText}>{listing.questPoints}pts</Text>
          </View>
        </View>

        {/* VR Tour Button */}
        <TouchableOpacity style={styles.vrButton}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryDark]}
            style={styles.vrButtonGradient}
          >
            <Ionicons name="cube" size={16} color="#FFFFFF" />
            <Text style={styles.vrButtonText}>VR Tour</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            {listing.title}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.rating, { color: theme.colors.textSecondary }]}>
              {listing.rating}
            </Text>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.location, { color: theme.colors.textSecondary }]}>
            {listing.location}
          </Text>
        </View>

        <Text style={[styles.price, { color: theme.colors.primary }]}>
          {listing.price}
        </Text>

        <View style={styles.featuresContainer}>
          {listing.features.map((feature, index) => (
            <View key={index} style={[styles.featureTag, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.featureText, { color: theme.colors.textSecondary }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.actionButton, { borderColor: theme.colors.primary }]}>
          <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
            View Details
          </Text>
          <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Featured Listings
        </Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Discover your perfect nest with our curated selection
        </Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + spacing.md}
        decelerationRate="fast"
      >
        {listings.map(renderListingCard)}
      </ScrollView>

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>
          View All Listings
        </Text>
        <Ionicons name="arrow-forward" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    ...typography.body,
    textAlign: 'center',
    maxWidth: 280,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ecoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  questBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    gap: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  vrButton: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  vrButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  vrButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.h4,
    fontSize: 18,
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  location: {
    ...typography.caption,
  },
  price: {
    ...typography.h3,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  featureTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeaturedListings;