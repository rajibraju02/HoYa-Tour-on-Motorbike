# HoYa — Moto NAV
### Product Requirements Document (PRD)

> A motorbike-touring companion app for Bangladesh, built for riders who want to explore off-the-beaten-path routes with confidence.

---

## 1. Overview

**App Name:** HoYa / Moto NAV  
**Platform:** Mobile (iOS & Android)  
**Target Users:** Motorbike tourers, adventure bikers, and hotel/rest-house owners across Bangladesh  
**Core Goal:** Become the go-to navigation and planning tool for motorbike tourists in Bangladesh — combining route intelligence, checkpoint data, accommodation discovery, and trip costing into a single offline-capable app.

---

## 2. Business Goals

| # | Goal |
|---|------|
| 1 | Build a rich, crowd-sourced database of tourist places, routes, and points of interest |
| 2 | Generate revenue through commission from Hotel / Motel / Rest-house bookings made via the app |
| 3 | Grow a verified biker community that contributes route data and reviews |

---

## 3. User Personas

| Persona | Description |
|---------|-------------|
| **Biker** | Solo or group rider planning a multi-district tour; needs route info, checkpoints, fuel, food, and lodging |
| **Hotel / Rest-house Owner** | Wants visibility to passing bikers; lists property, manages bookings, receives commission-based leads |
| **New / Cautious Rider** | Needs document checklists for Army/BGB checkposts and guide recommendations before entering restricted zones |

---

## 4. Core Features

### 4.1 Route Discovery
| # | Feature | Description |
|---|---------|-------------|
| 1 | **Exotic Bike Routes** | Curated routes specifically suited for motorbikes — hill tracks, coastal roads, forest trails |
| 7 | **Fastest / Scenic Route Toggle** | Let riders choose speed-optimised or scenery-optimised path for the same origin–destination |
| 11 | **District-wise Bike Route** | Browse routes by district so riders can plan legs of a longer trip |

### 4.2 Accommodation & Services
| # | Feature | Description |
|---|---------|-------------|
| 2 | **Hotel / Motel / Rest-house Locator** | Map-based search with ratings, price range, biker-friendly tags |
| 3 | **Parking Facility Info** | Whether a stop has secure bike parking (guarded, covered, etc.) |
| 12 | **Best Fuel on Route** | Petrol station locations along the route with quality / octane ratings |
| 10 | **Local Food Places** | Recommended dhabas and local restaurants near the route |

### 4.3 Checkpoint & Safety
| # | Feature | Description |
|---|---------|-------------|
| 4 | **Army / BGB Check-post Info** | List of Army and Border Guard Bangladesh checkpoints along the selected route |
| 5 | **Check-post Locations** | Precise map pins for every checkpoint |
| 6 | **Required Documents Checklist** | Per-checkpoint list of documents a rider must carry (NID, bike registration, insurance, etc.) |
| 8 | **Guide Info** | Indicates whether a local guide is mandatory, recommended, or optional for that route segment |

### 4.4 Tourism & POI
| # | Feature | Description |
|---|---------|-------------|
| 9 | **Tourist Attraction Checkpoints** | In-route markers for waterfalls, viewpoints, heritage sites, beaches, etc. |
| 2* | **Viral Place Suggestions** | Trending or social-media-popular spots near the current route (App View) |

### 4.5 Planning & Cost
| # | Feature | Description |
|---|---------|-------------|
| 13 | **Average Costing Calculator** | Estimate total trip cost: fuel (distance × mileage × price), accommodation per night, food, guide fees, toll |

---

## 5. App Views (Screens / UX Flow)

```
Home
 ├── From–To Navigation        ← main entry: enter origin + destination
 │    ├── Route options (Fastest / Scenic)
 │    ├── Checkpoints overlay (Army/BGB + Tourist)
 │    ├── Accommodation pins
 │    ├── Fuel stations
 │    └── Cost estimate
 ├── Viral Place Suggestions    ← discovery feed of trending biker spots
 ├── Navigation (Live)          ← turn-by-turn nav during the ride
 └── Offline Mode               ← pre-downloaded map tiles + route data
```

| View | Notes |
|------|-------|
| **From–To Navigation** | Core planning screen; origin/destination with filters |
| **Viral Place Suggestions** | Algorithm-driven or manually curated trending destinations |
| **Navigation Service** | Real-time turn-by-turn; works with GPS even without data |
| **Offline Support** | Download route bundles (tiles + POI + checkpoint data) before the trip |

---

## 6. Data Integration

| Source | Role |
|--------|------|
| **Bikers (Community)** | Submit new routes, rate checkpoints, add photos, flag outdated info |
| **Hotel Owners** | Self-onboard via a simple portal; manage availability, pricing, photos |
| **Google Maps Automation** | Base map tiles, geocoding, distance/duration matrix for route calculations |

---

## 7. Technical Considerations

### 7.1 Suggested Stack
- **Mobile:** React Native (cross-platform iOS + Android)
- **Maps:** Google Maps SDK + Mapbox for offline tile support
- **Backend:** Node.js / Express or Django REST Framework
- **Database:** PostgreSQL with PostGIS for geospatial queries
- **Auth:** Firebase Auth or JWT-based custom auth
- **Offline:** SQLite on-device cache + Mapbox offline packs

### 7.2 Key Technical Challenges
| Challenge | Approach |
|-----------|----------|
| Offline map support | Pre-packaged route bundles downloadable over Wi-Fi |
| Checkpost data freshness | Community-flagging + admin verification workflow |
| Hotel commission tracking | Deep-link booking flow with referral token |
| GPS accuracy in hilly/forested areas | Supplement Google Maps with OSM data for remote areas |

---

## 8. Monetisation Model

| Stream | Mechanism |
|--------|-----------|
| **Accommodation Commission** | % cut on bookings made through the app |
| **Featured Listings** | Hotels/rest-houses pay for highlighted placement on map |
| **Premium Routes** | Subscription or one-time unlock for curated expert-guided routes |
| **Fuel Partner Ads** | Sponsored fuel stations shown to riders on route |

---

## 9. MVP Scope (Phase 1)

Focus the first release on the highest-value, lowest-complexity features:

- [ ] From–To route planning with Fastest / Scenic toggle
- [ ] District-wise route browse
- [ ] Army/BGB checkpoint map with document checklist
- [ ] Hotel/Motel locator (map view, basic listing)
- [ ] Fuel station markers on route
- [ ] Basic trip cost calculator
- [ ] Offline map download for a selected route

---

## 10. Future Phases

| Phase | Features |
|-------|---------|
| **Phase 2** | Live navigation, community route submissions, viral place feed |
| **Phase 3** | Hotel booking + commission engine, guide marketplace |
| **Phase 4** | Social features (ride groups, trip sharing, leaderboards) |

---

## 11. Open Questions

1. Will the app be Bangladesh-only at launch, or also cover neighbouring countries (India's CHT border areas, Myanmar routes)?
2. What is the primary language — Bangla, English, or bilingual?
3. Who maintains the Army/BGB checkpoint data — admin team, government API, or community?
4. Is there an existing hotel partner pipeline, or does onboarding start from scratch?

---

*Last updated: May 2026*
