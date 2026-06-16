# 👗 VastraGen

> Design the Future of Fashion with AI

VastraGen is an AI-powered fashion design platform that transforms text prompts into stunning clothing concepts and helps users discover similar affordable products. The platform combines generative AI, fashion inspiration, and community-driven creativity to make fashion design accessible to everyone.

---

## ✨ Features

### 🎨 AI Fashion Design Generation
Generate unique fashion concepts from simple text prompts.

**Example Prompt:**
> "Royal blue bridal lehenga with intricate gold embroidery and modern silhouette"

The AI creates visually rich design concepts based on user descriptions.

---

### 🔍 Similar Product Recommendations
After generating a design, VastraGen recommends visually similar products available in the market, helping users find affordable alternatives and inspiration.

---

### 👥 Fashion Community
Connect with designers, creators, and fashion enthusiasts.

- Share AI-generated designs
- Explore trending creations
- Follow creators
- Get inspiration from the community

---

### 📈 Trending Fashion Discovery
Stay updated with:

- Trending styles
- Popular ethnic wear designs
- Seasonal collections
- Community favorites

---

### 🖼 Dynamic Design Showcase
Beautiful hero slider featuring:

- AI-generated fashion concepts
- Trending collections
- Featured designer work
- Community highlights

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- React Icons

### Backend
- Node.js
- Express.js

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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── hooks/
│   │
│   └── public/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── data/
│       └── designs.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (v18+)
- npm

---

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/vastragen.git
```

Navigate to the project folder:

```bash
cd vastragen
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

---

## ▶ Running the Project

### Start Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

### Start Frontend

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

## 📡 API Endpoints

### Get All Designs

```http
GET /api/designs
```

Response:

```json
[
  {
    "id": 1,
    "title": "Bridal Collection 2026",
    "imageUrl": "/images/lehenga1.jpg"
  }
]
```

---

## 🎯 Future Roadmap

### Phase 1
- AI design generation
- Community feed
- Design showcase

### Phase 2
- User authentication
- Saved collections
- Design history

### Phase 3
- Marketplace integration
- Similar product recommendations
- Fashion creator profiles

### Phase 4
- Real-time AI generation
- Mobile application
- Personalized recommendations
- Virtual try-on experience

---

## 🌟 Vision

VastraGen aims to bridge the gap between creativity and accessibility by enabling anyone to transform fashion ideas into visual concepts instantly through AI.

Our mission is to empower aspiring designers, fashion enthusiasts, and creators with intelligent tools that make fashion innovation faster, easier, and more accessible.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 💡 Built With Passion for Fashion & AI

**VastraGen — Where Creativity Meets Intelligence.**
