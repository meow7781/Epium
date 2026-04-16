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
    title: 'Woven Jamdani Scarf',
    artisan: 'Priya Das',
    location: 'Phulia, West Bengal',
    image: 'https://images.unsplash.com/photo-1584988771970-d26b01b69106?q=80&w=2942&auto=format&fit=crop',
    price: '$45',
    story: 'Priya has been hand-weaving pure cotton threads for over 20 years. Every Jamdani scarf takes weeks to complete and supports her entire community.',
    details: '100% Pure Muslin Cotton. Hand-spun and naturally dyed.',
    video: 'https://cdn.pixabay.com/video/2019/04/18/22818-331006509_large.mp4', 
  },
  {
    id: '2',
    title: 'Terracotta Clay Pot',
    artisan: 'Ram Kumhar',
    location: 'Bishnupur, West Bengal',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2940&auto=format&fit=crop',
    price: '$85',
    story: 'Created with clay from the banks of the local river, Ram sculpts these pots by hand, echoing a 300-year-old family tradition.',
    details: 'Fired at high temperatures for durability. Natural earth color.',
    video: 'https://cdn.pixabay.com/video/2021/08/11/84687-587425178_large.mp4',
  },
  {
    id: '3',
    title: 'Hand-carved Wooden Flute',
    artisan: 'Arif Khan',
    location: 'Varanasi, Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1549420556-9a5d13ba4e6b?q=80&w=2940&auto=format&fit=crop',
    price: '$120',
    story: 'Arif crafts each flute ensuring perfect tonal quality. He believes that the bamboo speaks before the musician even plays the first note.',
    details: 'Seasoned bamboo, hand-tuned, natural vanish finish.',
    video: 'https://cdn.pixabay.com/video/2020/05/26/40199-425890912_large.mp4'
  }
];

// Routes
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
  // Mock translation logic: append the translated concept
  // In a real app we'd use Google Translate API or similar
  const mockTranslations = {
    "hello": "নমস্কার (Namaskar)",
    "how much is this?": "এটার দাম কত? (Etar daam koto?)",
    "beautiful work": "সুন্দর কাজ (Shundor kaaj)"
  };

  const lowerText = text ? text.toLowerCase().trim() : '';
  const translated = mockTranslations[lowerText] || `Bengali translation of: "${text}"`;

  // Added slight delay to simulate real network request for UI presentation
  setTimeout(() => {
    res.json({ original: text, translated });
  }, 800);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
