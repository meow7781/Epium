import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable, Platform, TextInput, ScrollView } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInRight, FadeOutRight } from 'react-native-reanimated';
import { useAppStore } from '../../store/appStore';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MOCK_BG_IMAGES = [
  'file:///Users/gauravpaul/.gemini/antigravity/brain/7149ce39-3449-423c-a56b-586dc064afdf/high_fashion_heritage_model_1776573314928.png',
  'file:///Users/gauravpaul/.gemini/antigravity/brain/7149ce39-3449-423c-a56b-586dc064afdf/artistic_male_form_fashion_1776573332078.png',
  'file:///Users/gauravpaul/.gemini/antigravity/brain/7149ce39-3449-423c-a56b-586dc064afdf/artisan_product_weaving_1776573378650.png',
];

export default function OnboardingScreen() {
  const router = useRouter();
  const setPreferences = useAppStore((state) => state.setPreferences);
  const setUser = useAppStore((state) => state.setUser);
  const [step, setStep] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Form State
  const [age, setAge] = useState('');
  const [birthday, setBirthday] = useState('');
  const [lovesAnime, setLovesAnime] = useState<boolean | null>(null);
  const [vibe, setVibe] = useState('');
  const [style, setStyle] = useState<string[]>([]);
  const [inspiration, setInspiration] = useState('');
  const [feedback, setFeedback] = useState('');

  React.useEffect(() => {
    if (step === 0) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % MOCK_BG_IMAGES.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const nextStep = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const data = { age, birthday, lovesAnime, vibe, style, inspiration, feedback, type: 'onboarding' };
      setPreferences(data);
      
      // Send to backend
      try {
        await fetch('http://localhost:3000/onboarding-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log('Failed to save onboarding data:', err);
      }
      
      router.replace('/auth');
    }
  };

  const toggleStyle = (s: string) => {
    setStyle(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSkip = () => {
    setUser({
      id: 'guest',
      name: 'Guest Explorer',
      email: '',
      role: 'user',
      isGuest: true
    });
    router.replace('/(tabs)');
  };

  const renderStep0 = () => (
    <Animated.View entering={FadeIn} style={StyleSheet.absoluteFillObject}>
      <View style={StyleSheet.absoluteFillObject}>
        {MOCK_BG_IMAGES.map((img, index) => (
          <Animated.Image
            key={index}
            source={{ uri: img }}
            style={[
              StyleSheet.absoluteFillObject,
              { opacity: activeIndex === index ? 1 : 0 }
            ]}
            resizeMode="cover"
          />
        ))}
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(13,11,10,0.6)', '#0D0B0A']}
        style={styles.gradient}
      />
      <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.contentCard}>
        <View style={styles.indicatorContainer}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[styles.indicator, step === i ? styles.indicatorActive : styles.indicatorInactive]} />
          ))}
        </View>
        <Text style={styles.title}>Heritage{'\n'}Evolved</Text>
        <Text style={styles.subtitle}>A curated journey into the world of{'\n'}premium artisan craftsmanship.</Text>
        <Pressable style={styles.button} onPress={nextStep}>
          <Text style={styles.buttonText}>Begin the Journey</Text>
        </Pressable>
        <Pressable style={{ marginTop: 20 }} onPress={handleSkip}>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600' }}>Skip to Guest View</Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );

  const renderStep1 = () => (
    <Animated.View entering={SlideInRight} style={styles.surveyContainer}>
      <Text style={styles.surveyTag}>01 / 05</Text>
      <Text style={styles.surveyTitle}>The Foundation</Text>
      <Text style={styles.surveySubtitle}>Tell us about your heritage.</Text>
      
      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="e.g. 24" 
          placeholderTextColor="#999" 
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>Birthday</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="DD / MM / YYYY" 
          placeholderTextColor="#999" 
          value={birthday}
          onChangeText={setBirthday}
        />
      </View>

      <Pressable style={styles.nextBtn} onPress={nextStep}>
        <Text style={styles.nextBtnText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View entering={SlideInRight} style={styles.surveyContainer}>
      <Text style={styles.surveyTag}>02 / 05</Text>
      <Text style={styles.surveyTitle}>Lifestyle Vibe</Text>
      <Text style={styles.surveySubtitle}>What moves your soul?</Text>
      
      <Text style={styles.inputLabel}>Do you love Anime/Craft?</Text>
      <View style={styles.choiceRow}>
        <Pressable 
          style={[styles.choiceBtn, lovesAnime === true && styles.choiceActive]}
          onPress={() => setLovesAnime(true)}
        >
          <Text style={[styles.choiceText, lovesAnime === true && styles.choiceTextActive]}>Yes</Text>
        </Pressable>
        <Pressable 
          style={[styles.choiceBtn, lovesAnime === false && styles.choiceActive]}
          onPress={() => setLovesAnime(false)}
        >
          <Text style={[styles.choiceText, lovesAnime === false && styles.choiceTextActive]}>No</Text>
        </Pressable>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>What do you eat/see most?</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="e.g. Ramen, High Fashion" 
          placeholderTextColor="#999" 
          value={vibe}
          onChangeText={setVibe}
        />
      </View>

      <Pressable style={styles.nextBtn} onPress={nextStep}>
        <Text style={styles.nextBtnText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </Animated.View>
  );

  const renderStep3 = () => (
    <Animated.View entering={SlideInRight} style={styles.surveyContainer}>
      <Text style={styles.surveyTag}>03 / 05</Text>
      <Text style={styles.surveyTitle}>Style DNA</Text>
      <Text style={styles.surveySubtitle}>Pick your aesthetic keywords.</Text>
      
      <View style={styles.chipGrid}>
        {['Minimalist', 'Luxury', 'Artisan', 'Modern', 'Vintage', 'Heritage', 'Bold', 'Silent Luxury'].map((s) => (
          <Pressable 
            key={s}
            style={[styles.chip, style.includes(s) && styles.chipActive]}
            onPress={() => toggleStyle(s)}
          >
            <Text style={[styles.chipText, style.includes(s) && styles.chipTextActive]}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.nextBtn} onPress={nextStep}>
        <Text style={styles.nextBtnText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </Animated.View>
  );

  const renderStep4 = () => (
    <Animated.View entering={SlideInRight} style={styles.surveyContainer}>
      <Text style={styles.surveyTag}>04 / 05</Text>
      <Text style={styles.surveyTitle}>Inspiration</Text>
      <Text style={styles.surveySubtitle}>What defines your style choice?</Text>
      
      <View style={styles.inputBox}>
        <TextInput 
          style={[styles.textInput, { height: 120, textAlignVertical: 'top', paddingTop: 15 }]} 
          placeholder="Story, Texture, Brand, Heritage..." 
          placeholderTextColor="#999" 
          multiline
          value={inspiration}
          onChangeText={setInspiration}
        />
      </View>

      <Pressable style={styles.nextBtn} onPress={nextStep}>
        <Text style={styles.nextBtnText}>Continue</Text>
        <Ionicons name="arrow-forward" size={18} color="#FFF" />
      </Pressable>
    </Animated.View>
  );

  const renderStep5 = () => (
    <Animated.View entering={SlideInRight} style={styles.surveyContainer}>
      <Text style={styles.surveyTag}>05 / 05</Text>
      <Text style={styles.surveyTitle}>Final Thoughts</Text>
      <Text style={styles.surveySubtitle}>How can we make EpiUm better for you?</Text>
      
      <View style={styles.inputBox}>
        <TextInput 
          style={[styles.textInput, { height: 120, textAlignVertical: 'top', paddingTop: 15 }]} 
          placeholder="Share your feedback..." 
          placeholderTextColor="#999" 
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
      </View>

      <Pressable style={[styles.nextBtn, { backgroundColor: '#FFF' }]} onPress={nextStep}>
        <Text style={[styles.nextBtnText, { color: '#000' }]}>Complete Profile</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {step === 0 ? renderStep0() : (
        <View style={styles.surveyWrapper}>
          <Pressable style={styles.backBtn} onPress={() => setStep(step - 1)}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </Pressable>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B0A',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.8,
  },
  contentCard: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingTop: 30,
    paddingHorizontal: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 70 : 50,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  indicator: {
    height: 4,
    borderRadius: 2,
    marginHorizontal: 4,
  },
  indicatorActive: {
    width: 32,
    backgroundColor: '#FFF',
  },
  indicatorInactive: {
    width: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  surveyWrapper: {
    flex: 1,
    backgroundColor: '#0D0B0A',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  surveyContainer: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: 40,
  },
  backBtn: {
    width: 44,
    height: 44,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#1A1614',
  },
  surveyTag: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
    letterSpacing: 2,
    marginBottom: 10,
  },
  surveyTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  surveySubtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 40,
  },
  inputBox: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DDD',
    marginBottom: 10,
  },
  textInput: {
    height: 60,
    backgroundColor: '#1A1614',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#333',
  },
  nextBtn: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 60 : 40,
    left: SPACING.xl,
    right: SPACING.xl,
    height: 64,
    backgroundColor: COLORS.accent,
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  choiceBtn: {
    flex: 1,
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1614',
  },
  choiceActive: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(232, 101, 26, 0.1)',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  choiceTextActive: {
    color: COLORS.accent,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#1A1614',
  },
  chipActive: {
    backgroundColor: '#E8651A',
    borderColor: '#E8651A',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  chipTextActive: {
    color: '#FFF',
  },
  button: {
    width: '100%',
    height: 64,
    backgroundColor: '#FFF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
