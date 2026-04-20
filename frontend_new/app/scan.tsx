import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import QRScanner from '@/components/QRScanner';

export default function ScanScreen() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<Array<{ id: string; data: string; timestamp: string }>>([]);

  const handleScan = (data: string) => {
    const newScan = {
      id: Date.now().toString(),
      data,
      timestamp: new Date().toLocaleTimeString(),
    };
    setScannedData([newScan, ...scannedData]);
  };

  const handleDeleteScan = (id: string) => {
    setScannedData(scannedData.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    Alert.alert('Clear All', 'Are you sure you want to clear all scanned data?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Clear',
        onPress: () => setScannedData([]),
        style: 'destructive',
      },
    ]);
  };

  if (isScanning) {
    return (
      <QRScanner
        onScan={handleScan}
        onClose={() => setIsScanning(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QR Code Scanner</Text>
        <Text style={styles.subtitle}>Scan QR codes with individual tracking</Text>
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => setIsScanning(true)}
      >
        <Text style={styles.scanButtonText}>📱 Start Scanning</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{scannedData.length}</Text>
          <Text style={styles.statLabel}>Total Scans</Text>
        </View>
      </View>

      {scannedData.length > 0 && (
        <>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Scan History</Text>
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.listContainer}>
            {scannedData.map((item) => (
              <View key={item.id} style={styles.scanItem}>
                <View style={styles.scanInfo}>
                  <Text style={styles.scanData} numberOfLines={2}>
                    {item.data}
                  </Text>
                  <Text style={styles.scanTime}>{item.timestamp}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteScan(item.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      )}

      {scannedData.length === 0 && !isScanning && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No scans yet</Text>
          <Text style={styles.emptyStateSubtext}>Start scanning to see results</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  clearButton: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    marginBottom: 12,
  },
  scanItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  scanInfo: {
    flex: 1,
    marginRight: 12,
  },
  scanData: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  scanTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#ccc',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
