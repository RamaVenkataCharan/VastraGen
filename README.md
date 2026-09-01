# 👗 VastraGen

> Design the Future of Fashion with AI

VastraGen is an AI-powered fashion design platform that transforms text prompts into stunning clothing concepts and helps users discover similar affordable products. The platform combines generative AI with a vibrant fashion community to make design accessible to everyone.

![VastraGen Hero](https://via.placeholder.com/1200x600?text=VastraGen+AI+Fashion+Design+Platform)

---

## ✨ Features

### 🎨 AI Fashion Design Generation
Generate unique fashion concepts from simple text prompts.

**Example Prompt:**
> "Royal blue bridal lehenga with intricate gold embroidery and modern silhouette"

The AI creates visually rich design concepts based on user descriptions.

![AI Design Generation](https://via.placeholder.com/600x400?text=AI+Design+Generation+Studio)

---

### 🔍 Similar Product Recommendations
After generating a design, VastraGen recommends visually similar products available in the market, helping users find affordable alternatives and inspiration.

![Product Recommendations](https://via.placeholder.com/600x400?text=Similar+Product+Recommendations)

---

### 👥 Fashion Community
Connect with designers, creators, and fashion enthusiasts.

- Share AI-generated designs
- Explore trending creations
- Follow creators
- Get inspiration from the community

![Community Feed](https://via.placeholder.com/600x400?text=Fashion+Community+Hub)

---

### 📈 Trending Fashion Discovery
Stay updated with:

- Trending styles
- Popular ethnic wear designs
- Seasonal collections
- Community favorites

![Trending Designs](https://via.placeholder.com/600x400?text=Trending+Fashion+Discovery)

---

### 🖼 Dynamic Design Showcase
Beautiful hero slider featuring:

- AI-generated fashion concepts
- Trending collections
- Featured designer work
- Community highlights

![Design Showcase](https://via.placeholder.com/600x400?text=Dynamic+Design+Showcase)

---

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Vite** - Lightning-fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Minimalist web framework
- **CORS** - Cross-origin support

### AI & Image Generation
- Stable Diffusion / AI Image Models
- Custom Prompt Engineering

### Data Storage
- JSON-based local storage (MVP)
- MongoDB (future scalability)

---

## 📂 Project Structure

```bash
VastraGen/
│
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # React entry point
│   │   ├── index.css                # Global styles
│   │   └── components.css           # Component styles
│   │
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Express backend
│   ├── server.js                    # Main server file
│   ├── routes/                      # API routes
│   ├── controllers/                 # Business logic
│   ├── data/
│   │   └── designs.json             # Design database
│   └── package.json
│
├── shared/                          # Shared utilities
│   └── constants/
│
├── package.json                     # Monorepo root (npm workspaces)
├── README.md
└── progress.txt
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- **Node.js** (v18+)
- **npm** (v9+)

### Installation

Clone the repository:

```bash
git clone https://github.com/RamaVenkataCharan/VastraGen.git
cd VastraGen
```

Install all dependencies:

```bash
npm install-all
```

---

## ▶️ Running the Project

### Start Both Frontend & Backend (Concurrently)

```bash
npm run dev
```

This will start:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

### Start Individually

**Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

**Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:3000
```

### Build for Production

```bash
cd client
npm run build
npm run preview
```

---

## 📡 API Endpoints

### Get All Designs

```http
GET /api/designs
```

**Response:**
```json
[
  {
    "id": 1,
    "imageUrl": "/assets/design1.png",
    "title": "Zari Lehenga Royale",
    "designer": "Priya Sharma",
    "trending": "#ZariLehenga"
  },
  {
    "id": 2,
    "imageUrl": "/assets/design2.png",
    "title": "Peacock Saree Opus",
    "designer": "Arjun Mehta",
    "trending": "#SilkSaree"
  }
]
```

---

## 🎯 Future Roadmap

### Phase 1 ✅ (MVP)
- [x] AI design generation UI
- [x] Community feed
- [x] Design showcase & trending
- [x] Creator profiles

### Phase 2 (Q3 2026)
- [ ] User authentication (JWT)
- [ ] Saved collections & favorites
- [ ] Design history & versions
- [ ] Direct messaging between creators

### Phase 3 (Q4 2026)
- [ ] Marketplace integration
- [ ] Real similar product recommendations
- [ ] Creator monetization dashboard
- [ ] Design licensing system

### Phase 4 (2027)
- [ ] Real-time AI generation with Stable Diffusion API
- [ ] Mobile application (React Native)
- [ ] Personalized recommendations engine
- [ ] Virtual try-on experience (AR)

---

## 🌟 Vision

VastraGen aims to **bridge the gap between creativity and accessibility** by enabling anyone to transform fashion ideas into visual concepts instantly through AI.

Our mission is to **empower aspiring designers, fashion enthusiasts, and creators** with intelligent tools that make fashion innovation faster, easier, and more accessible.

---

## 💻 Key Features in Detail

### 1. **Hero Visual System**
- Dynamic 3D card effects with mouse tracking
- Auto-rotating design showcase every 5 seconds
- Smooth Framer Motion animations

### 2. **Explore & Filter**
- Masonry grid layout for designs
- Filter by design type (Lehenga, Saree, Anarkali, etc.)
- Tab-based sorting (Trending, Latest, Following, AI Picks)

### 3. **Community Interaction**
- Like and save designs
- Comment on posts
- Follow creators
- Share to community

### 4. **Design Generation**
- Style selection (Bridal, Festive, Casual, Royal, Minimalist, Contemporary)
- Text-to-image prompt input
- Suggested prompts for quick inspiration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

---

## 📝 Code Examples

### Fetching Designs from Backend

```javascript
useEffect(() => {
  fetch('http://localhost:5000/api/designs')
    .then(res => res.json())
    .then(data => setDesigns(data))
    .catch(err => console.error('Error:', err));
}, []);
```

### Creating an Interactive Design Card

```jsx
<div className="design-card">
  <img src={design.img} alt={design.title} />
  <button onClick={() => onLike(design.id)}>
    ❤️ {design.likes}K
  </button>
</div>
```

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team & Credits

**Created by:** Rama Venkata Charan

**Special Thanks To:**
- Fashion design community for inspiration
- AI/ML enthusiasts for guidance
- Open-source community for amazing tools

---

## 💡 Built With Passion for Fashion & AI

**VastraGen — Where Creativity Meets Intelligence.** ✨

### Connect With Us
- 📧 Email: contact@vastragen.dev
- 🐦 Twitter: [@VastraGen](https://twitter.com)
- 💬 Discord: [Join Community](https://discord.gg)

---

**Star ⭐ this repository if you love fashion and AI!**
