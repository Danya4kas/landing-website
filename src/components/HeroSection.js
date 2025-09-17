import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { typography, spacing } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const HeroSection = () => {
  const { theme } = useTheme();
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Slide in and scale animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        >
          <Animated.View
            style={[
              styles.content,
              {
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            {/* Logo/Brand */}
            <View style={styles.brandContainer}>
              <Ionicons name="home" size={60} color="#FFFFFF" />
              <Text style={styles.brandName}>NestHouse</Text>
            </View>

            {/* Main Headline */}
            <Text style={styles.headline}>
              Embark on Your{'\n'}
              <Text style={styles.highlightText}>Home Quest</Text>{'\n'}
              Today!
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>
              Transform home buying into an immersive, personalized journey with VR tours, AI recommendations, and gamified experiences.
            </Text>

            {/* CTA Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.primaryButton}>
                <LinearGradient
                  colors={[theme.colors.primary, theme.colors.primaryDark]}
                  style={styles.gradientButton}
                >
                  <Ionicons name="rocket" size={20} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>Start Your Quest</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.secondaryButton}>
                <Ionicons name="play-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.secondaryButtonText}>Watch Demo</Text>
              </TouchableOpacity>
            </View>

            {/* Features Preview */}
            <View style={styles.featuresPreview}>
              <View style={styles.featureItem}>
                <Ionicons name="cube-outline" size={24} color="#FFFFFF" />
                <Text style={styles.featureText}>VR Tours</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="brain-outline" size={24} color="#FFFFFF" />
                <Text style={styles.featureText}>AI Matching</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="trophy-outline" size={24} color="#FFFFFF" />
                <Text style={styles.featureText}>Quest Mode</Text>
              </View>
            </View>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    width: width,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
  headline: {
    ...typography.h1,
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 44,
  },
  highlightText: {
    color: '#4ECDC4', // Turquoise highlight
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    ...typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xl,
    opacity: 0.9,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 25,
    gap: spacing.sm,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  featuresPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: spacing.lg,
  },
  featureItem: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HeroSection;