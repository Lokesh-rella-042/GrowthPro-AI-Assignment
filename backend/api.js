const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const headlines = [
    "Boost Your Visibility Today!",
    "Rank Higher in Local Searches!",
    "Attract More Customers with Smart SEO!",
    "Dominate Your Market with These Keywords!",
    "Outrank Competitors Now!"
];

app.post('/business-data', (req, res) => {
    const { name, location } = req.body;
    const randomRating = (Math.random() * 2 + 3).toFixed(1);
    const reviews = Math.floor(Math.random() * 1000) + 50;

    res.json({
        name,
        location,
        rating: randomRating,
        reviews,
        headline: headlines[Math.floor(Math.random() * headlines.length)],
    });
});

app.get('/regenerate-headline', (req, res) => {
    const headline = headlines[Math.floor(Math.random() * headlines.length)];
    res.json({ headline });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
