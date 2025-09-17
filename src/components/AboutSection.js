import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { typography, spacing, borderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

const AboutSection = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: 'cube-outline',
      title: 'VR Home Tours',
      description: 'Immersive 360° virtual reality tours that let you explore every corner of your potential new home.',
      color: '#FF6B6B',
    },
    {
      icon: 'brain-outline',
      title: 'AI-Powered Matching',
      description: 'Smart recommendations based on your lifestyle, preferences, and budget for the perfect home match.',
      color: '#4ECDC4',
    },
    {
      icon: 'trophy-outline',
      title: 'Quest Mode',
      description: 'Gamified home hunting with points, achievements, and exclusive rewards for completing challenges.',
      color: '#45B7D1',
    },
    {
      icon: 'leaf-outline',
      title: 'Eco-Friendly Focus',
      description: 'Discover sustainable homes with carbon footprint calculators and green living insights.',
      color: '#96CEB4',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Section Header */}
        <View style={styles.header}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About NestHouse
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            Revolutionary platform that transforms home buying into an immersive, personalized journey
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { backgroundColor: theme.colors.surface }]}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[feature.color, `${feature.color}80`]}
                style={styles.iconContainer}
              >
                <Ionicons name={feature.icon} size={32} color="#FFFFFF" />
              </LinearGradient>
              
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                {feature.title}
              </Text>
              
              <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>
                {feature.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>10K+</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Happy Questers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>5K+</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Homes Listed</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>98%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Success Rate</Text>
          </View>
        </View>

        {/* Mission Statement */}
        <View style={styles.missionContainer}>
          <Text style={[styles.missionTitle, { color: theme.colors.text }]}>
            Our Mission
          </Text>
          <Text style={[styles.missionText, { color: theme.colors.textSecondary }]}>
            To make home buying an adventure, not a chore. We believe finding your perfect nest should be as exciting as the life you'll build inside it.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xxl,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  sectionSubtitle: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 300,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  featureCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureTitle: {
    ...typography.h4,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  featureDescription: {
    ...typography.caption,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.h2,
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  missionContainer: {
    alignItems: 'center',
  },
  missionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  missionText: {
    ...typography.body,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
});

export default AboutSection;