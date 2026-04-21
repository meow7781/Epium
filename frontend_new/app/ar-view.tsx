import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Pressable, Dimensions, Alert, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOW, SPACING } from '../constants/theme';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ARViewScreen() {
  const router = useRouter();
  const { productTitle, productImage, productPrice, productSource } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [arEnabled, setArEnabled] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Camera Permission Required', 'Please enable camera access for AR view.');
        router.back();
      }
    }
  };

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <>
          {/* Camera View */}
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFillObject}
            facing="back"
          >
            {/* AR Product Overlay */}
            {arEnabled && (
              <Animated.View entering={FadeIn} style={styles.arOverlay}>
                {/* Grid Guide */}
                <View style={styles.gridGuide}>
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                  <View style={styles.gridLine} />
                </View>

                {/* Center Product Display */}
                <View style={styles.arProductContainer}>
                  {productImage ? (
                    <Image
                      source={{ uri: productImage as string }}
                      style={styles.arProductImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <View style={styles.placeholderProduct}>
                      <Ionicons name="cube" size={60} color={COLORS.primary} />
                    </View>
                  )}
                  
                  {/* Product Info Card */}
                  <View style={styles.productInfoCard}>
                    <View style={styles.productSource}>
                      <Text style={styles.sourceText}>
                        {productSource ? String(productSource).toUpperCase() : 'ARTISAN'}
                      </Text>
                    </View>
                    <Text style={styles.productTitleAR} numberOfLines={2}>
                      {productTitle || 'Product'}
                    </Text>
                    {productPrice && (
                      <Text style={styles.productPriceAR}>₹{productPrice}</Text>
                    )}
                  </View>
                </View>

                {/* Corner indicators */}
                <View style={[styles.cornerIndicator, styles.topLeft]} />
                <View style={[styles.cornerIndicator, styles.topRight]} />
                <View style={[styles.cornerIndicator, styles.bottomLeft]} />
                <View style={[styles.cornerIndicator, styles.bottomRight]} />
              </Animated.View>
            )}

            {/* Scanning indicator */}
            <View style={styles.scanningIndicator}>
              <Animated.View
                style={[
                  styles.scanningLine,
                  {
                    backgroundColor: '#E8651A',
                  },
                ]}
              />
              <Text style={styles.scanningText}>Point camera at surface to place AR</Text>
            </View>
          </CameraView>

          {/* Top Controls */}
          <View style={styles.topBar}>
            <Pressable 
              style={[styles.controlBtn, styles.backBtn]}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </Pressable>
            <Text style={styles.topBarText}>AR Camera View</Text>
            <Pressable 
              style={[styles.controlBtn, styles.toggleBtn]}
              onPress={() => setArEnabled(!arEnabled)}
            >
              <Ionicons 
                name={arEnabled ? "eye" : "eye-off"} 
                size={24} 
                color="#FFF" 
              />
            </Pressable>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomBar}>
            <Pressable 
              style={[styles.actionBtn, styles.flashBtn]}
              onPress={() => {
                // Flash control would go here
                Alert.alert('Flash toggled');
              }}
            >
              <Ionicons name="flash" size={20} color="#FFF" />
              <Text style={styles.actionBtnText}>Flash</Text>
            </Pressable>

            <Pressable 
              style={[styles.actionBtn, styles.captureBtn]}
              onPress={() => Alert.alert('✓ Screenshot captured')}
            >
              <Ionicons name="camera" size={24} color="#FFF" />
            </Pressable>

            <Pressable 
              style={[styles.actionBtn, styles.shareBtn]}
              onPress={() => Alert.alert('Sharing AR view...')}
            >
              <Ionicons name="share-social" size={20} color="#FFF" />
              <Text style={styles.actionBtnText}>Share</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <View style={styles.permissionContainer}>
          <Ionicons name="camera" size={80} color={COLORS.primary} />
          <Text style={styles.permissionTitle}>Camera Permission</Text>
          <Text style={styles.permissionText}>We need camera access to show AR view</Text>
          <Pressable 
            style={styles.permissionBtn}
            onPress={requestCameraPermission}
          >
            <Text style={styles.permissionBtnText}>Grant Permission</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  arOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridGuide: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 2,
    borderColor: 'rgba(232, 101, 26, 0.5)',
    borderRadius: 20,
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(232, 101, 26, 0.3)',
    left: 0,
  },
  arProductContainer: {
    width: width * 0.6,
    height: width * 0.6,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(232, 101, 26, 0.4)',
    overflow: 'hidden',
  },
  arProductImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  placeholderProduct: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 101, 26, 0.1)',
  },
  productInfoCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(232, 101, 26, 0.3)',
  },
  productSource: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(232, 101, 26, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 4,
  },
  sourceText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  productTitleAR: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  productPriceAR: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  cornerIndicator: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: COLORS.primary,
  },
  topLeft: {
    top: 100,
    left: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 100,
    right: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 200,
    left: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 200,
    right: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  scanningIndicator: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanningLine: {
    width: width * 0.8,
    height: 2,
    borderRadius: 1,
    marginBottom: 8,
  },
  scanningText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
  },
  topBarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(232, 101, 26, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.md,
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  toggleBtn: {
    backgroundColor: 'rgba(232, 101, 26, 0.9)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: SPACING.xl,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(232, 101, 26, 0.2)',
    zIndex: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(232, 101, 26, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(232, 101, 26, 0.5)',
  },
  flashBtn: {
    backgroundColor: 'rgba(255, 200, 0, 0.2)',
    borderColor: 'rgba(255, 200, 0, 0.5)',
  },
  captureBtn: {
    flex: 1.2,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  shareBtn: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    borderColor: 'rgba(76, 175, 80, 0.5)',
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0B0A',
    paddingHorizontal: 30,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 20,
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 30,
  },
  permissionBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
    ...SHADOW.md,
  },
  permissionBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
