<div align="center">

# 🛍️ MiniShop

### Production-Grade Cross-Platform E-Commerce Mobile Application

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

*Add demo video link here* · *Add APK download link here* · *Add GitHub repository link here*

---

![MiniShop Banner](https://via.placeholder.com/900x300/1a1a2e/ffffff?text=MiniShop+%E2%80%94+E-Commerce+Mobile+App)

</div>

---

## 📖 Overview

**MiniShop** is a production-grade cross-platform e-commerce mobile application built with **React Native + Expo** on the frontend and a cloud-hosted **Spring Boot** backend. It provides a seamless shopping experience with product browsing, wishlist and cart management, smart search, checkout flow, and order history — all backed by a scalable REST API and a managed PostgreSQL database.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗂️ Product Listing | Optimized FlatList rendering with lazy loading |
| 🔍 Smart Search | Debounced search for efficient API usage |
| 🎛️ Filters & Sorting | Client-side derived filtering with memoized selectors |
| 🖼️ Product Details | Image carousel, descriptions, and reviews |
| ❤️ Wishlist | Persistent wishlist with Redux Persist |
| 🛒 Cart Management | Persistent cart with add, remove, and quantity controls |
| 🧾 Checkout Flow | Streamlined checkout experience |
| 📦 Order History | Track past orders within the session |
| ⚠️ Graceful UI States | Loading, error, and empty state handling throughout |
| ☁️ Cloud API | Custom Spring Boot REST API hosted on Render |

---

## 🧰 Tech Stack

### Frontend
- **React Native** — Cross-platform mobile framework
- **Expo** — Managed workflow & EAS Build
- **TypeScript** — Type-safe development
- **Redux Toolkit** — Centralized state management
- **Redux Persist** — Offline-friendly persistent state
- **React Navigation** — Screen routing and navigation
- **Axios** — HTTP client with centralized API layer

### Backend
- **Spring Boot** — REST API framework
- **Spring Data JPA + Hibernate** — ORM and database abstraction
- **PostgreSQL** — Relational database (hosted on Render)

### DevOps
- **Docker** — Multi-stage containerized builds
- **Render** — Cloud hosting for backend and database
- **Expo EAS Build** — APK/IPA generation pipeline
- **GitHub** — Version control

---

## 🏗️ Architecture

```
React Native App
      │
      ▼
Redux Toolkit (State Management)
      │
      ▼
Axios API Layer
      │
      ▼
Spring Boot REST API  ──── PostgreSQL Database
      │
      ▼
Render Cloud Hosting
```

### Frontend Structure

```
src/
 ├── components/        # Reusable UI components
 ├── navigation/        # React Navigation configuration
 ├── screens/           # Application screens
 ├── services/          # Axios API client & service functions
 ├── store/
 │   ├── api/           # RTK Query / API definitions
 │   └── slices/        # Redux slices (products, cart, wishlist, filters, orders)
 ├── hooks/             # Custom React hooks
 ├── theme/             # Colors, typography, spacing
 ├── types/             # TypeScript interfaces & types
 └── utils/             # Helper functions
```

### Backend Structure

```
src/main/java/
 ├── controller/        # REST controllers
 ├── service/           # Business logic layer
 ├── repository/        # Spring Data JPA repositories
 ├── entity/            # JPA entities
 ├── config/            # Application configuration
 └── seeder/            # Automated database seeding on startup
```

---

## 🗂️ State Management

MiniShop uses **Redux Toolkit** for centralized, predictable state with **Redux Persist** for offline resilience.

| Slice | Purpose | Persisted |
|---|---|---|
| `productsSlice` | Product catalogue and fetch state | ✗ |
| `cartSlice` | Cart items and quantities | ✅ |
| `wishlistSlice` | Saved/favourited products | ✅ |
| `filtersSlice` | Active filters and sort order | ✗ |
| `orderHistorySlice` | Completed order records | ✗ |

---

## ⚡ Performance Optimizations

- `React.memo` — Prevents unnecessary re-renders of pure components
- `useCallback` & `useMemo` — Stable references and memoized derived data
- Optimized `FlatList` — `keyExtractor`, `getItemLayout`, `windowSize` tuning
- Memoized selectors — Derived filtered/sorted product lists computed once
- Lazy rendering — Off-screen content deferred until needed
- Debounced search — Reduces API calls during user input

---

## 🌐 API Reference

**Base URL:**
```
https://minishop-backend-ezc8.onrender.com
```

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/products` | Fetch all products |
| `GET` | `/products/{id}` | Fetch single product |
| `GET` | `/products/search?q=` | Search products |

> **Initial dataset** sourced from [DummyJSON API](https://dummyjson.com/) and seeded into the PostgreSQL database on startup.

---

## 📱 Screenshots

> _Add application screenshots here._

---

## 🚀 Getting Started

### Prerequisites

- Node.js `≥ 18`
- Expo CLI (`npm install -g expo-cli`)
- Java `≥ 17` (for backend)
- Docker (optional, for containerized backend)
- PostgreSQL instance (local or cloud)

---

### Frontend Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd minishop

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

> Scan the QR code with **Expo Go** on your device, or press `a` for Android emulator / `i` for iOS simulator.

---

### Backend Setup

**1. Configure the database**

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/minishop
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

**2. Run the backend**

```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`. The database seeder runs automatically on first startup.

---

### Docker Setup

```bash
# Build the Docker image
docker build -t minishop-backend .

# Run the container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/minishop \
  -e SPRING_DATASOURCE_USERNAME=your_username \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  minishop-backend
```

---

## 📦 APK Build

The Android APK is built using **Expo EAS Build**:

```bash
# Install EAS CLI
npm install -g eas-cli

# Authenticate
eas login

# Build preview APK
eas build -p android --profile preview
```

> [⬇️ Download APK](_Add APK download link here_)

---

## 🔐 Security & Privacy

- All backend credentials managed via **environment variables** — no hardcoded secrets
- Backend and database deployed in **isolated cloud environments**
- **Secure cloud-hosted PostgreSQL** with managed access controls
- No sensitive data stored on-device beyond cart and wishlist state

---

## ⚠️ Known Limitations

- No payment gateway integration
- No user authentication or authorization
- Limited product categories
- No push notifications
- Basic checkout implementation (no real order submission)
- Filtering and pagination handled client-side

---

## 🔭 Future Improvements

- [ ] AI-powered shopping assistant
- [ ] User authentication & authorization (JWT / OAuth)
- [ ] Payment gateway integration (Stripe / Razorpay)
- [ ] Product recommendations engine
- [ ] Dark mode support
- [ ] Voice search
- [ ] Push notifications
- [ ] Backend-side filtering & pagination
- [ ] Admin dashboard
- [ ] CI/CD pipeline (GitHub Actions)

---

## 📁 Deliverables

- [x] Android APK Build (Expo EAS)
- [x] Public GitHub Repository
- [x] Cloud-Hosted Spring Boot Backend (Render)
- [x] Dockerized Backend Infrastructure
- [x] README Documentation
- [ ] Demo Screenshots
- [ ] Demo Video

---

## 👤 Author

**Saswat Suman Roy**

> *Add GitHub profile link here* · *Add LinkedIn profile link here*

---

<div align="center">

Made with ❤️ using React Native & Spring Boot

</div>
