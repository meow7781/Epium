import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { X, Send, Languages } from 'lucide-react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { translateText } from '../services/api';
import { COLORS, SPACING } from '../theme/colors';

export default function ChatScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { artisan } = route.params;

  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', text: 'Namaskar! I am happy to tell you about my craft.', isArtisan: true, original: 'নমস্কার! আমি আপনাকে আমার কাজ সম্পর্কে বলতে পেরে আনন্দিত।' }
  ]);

  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { id: Date.now().toString(), text: message, isArtisan: false };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      // Mock API call to translate and simulate artisan response
      const response = await translateText(userMessage.text);
      
      const artisanResponse = {
        id: (Date.now() + 1).toString(),
        text: response.translated,
        isArtisan: true,
        original: 'Artisan replied to: ' + response.original
      };

      setMessages(prev => [...prev, artisanResponse]);
    } catch (error) {
      console.error(error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, connection lost.',
        isArtisan: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{artisan}</Text>
          <View style={styles.onlineContainer}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online • Auto-Translation Active</Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <X color={COLORS.text} size={24} />
        </Pressable>
      </View>

      {/* Chat Area */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContent}
      >
        <Animated.View entering={FadeIn.delay(300)} style={styles.disclaimer}>
            <Languages color={COLORS.textMuted} size={16} />
            <Text style={styles.disclaimerText}>Messages are seamlessly translated between English and Bengali.</Text>
        </Animated.View>

        {messages.map((msg, index) => (
          <Animated.View 
            key={msg.id}
            entering={FadeInUp.delay(index * 100)}
            style={[
              styles.messageWrapper,
              msg.isArtisan ? styles.messageWrapperLeft : styles.messageWrapperRight
            ]}
          >
            <View style={[
              styles.messageBubble,
              msg.isArtisan ? styles.messageBubbleArtisan : styles.messageBubbleUser
            ]}>
              <Text style={[
                styles.messageText,
                msg.isArtisan ? styles.messageTextArtisan : styles.messageTextUser
              ]}>
                {msg.text}
              </Text>
            </View>
            {msg.isArtisan && msg.original && (
               <Text style={styles.originalText}>{msg.original}</Text>
            )}
          </Animated.View>
        ))}

        {isTyping && (
          <View style={[styles.messageWrapper, styles.messageWrapperLeft]}>
            <View style={[styles.messageBubble, styles.messageBubbleArtisan]}>
               <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Type a message (e.g. 'hello')"
          placeholderTextColor={COLORS.textMuted}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={sendMessage}
        />
        <Pressable 
          style={[styles.sendBtn, !message.trim() && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send color={message.trim() ? COLORS.background : COLORS.textMuted} size={20} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ade80', // Green dot
    marginRight: 6,
  },
  onlineText: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  closeBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  chatContent: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 30,
    justifyContent: 'center',
    gap: 8,
  },
  disclaimerText: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
  messageWrapper: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  messageWrapperLeft: {
    alignSelf: 'flex-start',
  },
  messageWrapperRight: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageBubbleArtisan: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderBottomLeftRadius: 4,
  },
  messageBubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextArtisan: {
    color: '#FFF',
  },
  messageTextUser: {
    color: COLORS.background,
    fontWeight: '500',
  },
  originalText: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 6,
    marginLeft: 4,
    fontStyle: 'italic',
  },
  inputArea: {
    flexDirection: 'row',
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.background,
    color: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  }
});
