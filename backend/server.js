const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Data
const products = [
  {
    id: '1',
    title: 'Emerald Banarasi Silk Saree',
    artisan: 'Priya Das',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200',
    price: '$450',
    story: 'Priya has been hand-weaving pure silk for over 20 years. This Emerald piece uses real gold zari threads.',
    details: 'Pure Katan Silk with Gold Zari. Dry clean only.',
    video: 'https://cdn.pixabay.com/video/2019/04/18/22818-331006509_large.mp4', 
    category: 'Saree'
  },
  {
    id: '2',
    title: 'Heritage Woolen Overcoat',
    artisan: 'Ram Kumhar',
    location: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200',
    price: '$285',
    story: 'Hand-felted wool from the valleys of Kashmir, designed for timeless elegance and extreme warmth.',
    details: '100% Pashmina Wool blend. Hand-finished seams.',
    video: 'https://cdn.pixabay.com/video/2021/08/11/84687-587425178_large.mp4',
    category: 'Coat'
  },
  {
    id: '3',
    title: 'Amber Cotton Jamdani',
    artisan: 'Arif Khan',
    location: 'Phulia, West Bengal',
    image: 'https://images.unsplash.com/photo-1583391733956-6c70868b95c0?w=1200',
    price: '$120',
    story: 'Arif crafts each saree with air-thin muslin cotton. It takes 40 days of manual labor on a handloom to finish.',
    details: '100% Hand-spun Muslin. Natural organic dyes.',
    video: 'https://cdn.pixabay.com/video/2020/05/26/40199-425890912_large.mp4',
    category: 'Saree'
  },
  {
    id: '4',
    title: 'Midnight Velvet Sherwani-Coat',
    artisan: 'Samir Ali',
    location: 'Lucknow',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1200',
    price: '$650',
    story: 'A fusion of traditional Sherwani and modern overcoat, featuring Zardosi embroidery by the masters of Lucknow.',
    details: 'Italian Velvet with Gold thread work.',
    video: 'https://cdn.pixabay.com/video/2019/04/18/22818-331006509_large.mp4',
    category: 'Coat'
  }
];

const onboardingResponses = [];

// Routes
// 0. Store Onboarding Data
app.post('/onboarding-feedback', (req, res) => {
  const feedback = req.body;
  console.log('Received Onboarding Feedback:', feedback);
  onboardingResponses.push({
    ...feedback,
    timestamp: new Date()
  });
  res.status(201).json({ message: 'Feedback stored successfully', count: onboardingResponses.length });
});

// 1. Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// 2. Get specific product
app.get('/product/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 3. Mock translation
app.post('/translate', (req, res) => {
  const { text } = req.body;
  const mockTranslations = {
    "hello": "নমস্কার (Namaskar)",
    "how much is this?": "এটার দাম কত? (Etar daam koto?)",
    "beautiful work": "সুন্দর কাজ (Shundor kaaj)"
  };

  const lowerText = text ? text.toLowerCase().trim() : '';
  const translated = mockTranslations[lowerText] || `Bengali translation of: "${text}"`;

  setTimeout(() => {
    res.json({ original: text, translated });
  }, 800);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
