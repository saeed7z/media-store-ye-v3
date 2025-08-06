const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..')));

// Sample reviews data for now
const sampleReviews = [
  {
    id: '1',
    userName: 'أحمد محمد',
    rating: 5,
    comment: 'خدمة ممتازة وسريعة، حصلت على المتابعين في وقت قياسي',
    serviceId: 'ig_followers_basic',
    createdAt: new Date('2025-01-01'),
    isVerified: true
  },
  {
    id: '2', 
    userName: 'فاطمة علي',
    rating: 5,
    comment: 'أنصح بشدة بهذه الخدمة، المتابعين حقيقيين والتفاعل ممتاز',
    serviceId: 'ig_followers_premium',
    createdAt: new Date('2025-01-02'),
    isVerified: true
  },
  {
    id: '3',
    userName: 'محمد الحسني',
    rating: 4,
    comment: 'خدمة جيدة وسعر مناسب، التسليم كان سريع',
    serviceId: 'tt_followers_arab',
    createdAt: new Date('2025-01-03'),
    isVerified: true
  },
  {
    id: '4',
    userName: 'سارة أحمد',
    rating: 5,
    comment: 'رائع جداً! اللايكات وصلت بسرعة والجودة عالية',
    serviceId: 'ig_likes_instant',
    createdAt: new Date('2025-01-04'),
    isVerified: true
  },
  {
    id: '5',
    userName: 'عبدالله يوسف',
    rating: 5,
    comment: 'أفضل موقع للتسويق الإلكتروني، خدمة عملاء ممتازة وأسعار منافسة',
    serviceId: 'yt_subscribers_arab',
    createdAt: new Date('2025-01-05'),
    isVerified: true
  }
];

// API Routes
app.get('/api/reviews/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recentReviews = sampleReviews
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
  res.json(recentReviews);
});

app.get('/api/reviews/service/:serviceId', (req, res) => {
  const { serviceId } = req.params;
  const serviceReviews = sampleReviews.filter(review => review.serviceId === serviceId);
  res.json(serviceReviews);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});