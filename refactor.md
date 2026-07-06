# 📐 Panduan Refactor Struktur Project Next.js

Dokumen ini berisi rencana refactor untuk merapikan project Next.js kamu, mencakup:

1. Struktur folder & penamaan
2. Reusable Axios instance (pakai `.env`)
3. Pengelompokan komponen berdasarkan "komponen induk" (fitur/halaman)

---

## 1. Struktur Folder yang Disarankan

Gunakan pendekatan **feature-based / colocated by page**, bukan flat folder. Contoh (pakai App Router, tapi konsepnya sama kalau masih Pages Router):

```
src/
├── app/                        # routing (App Router)
│   ├── (home)/
│   │   └── page.jsx
│   ├── about/
│   │   └── page.jsx
│   └── layout.jsx
│
├── components/
│   ├── common/                 # dipakai di banyak halaman (Button, Navbar, Footer, Modal)
│   │   ├── Button.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── home/                   # komponen KHUSUS halaman Home
│   │   ├── HeroSection.jsx
│   │   ├── FeatureList.jsx
│   │   └── Testimonial.jsx
│   │
│   └── about/                  # komponen KHUSUS halaman About
│       ├── TeamSection.jsx
│       └── CompanyHistory.jsx
│
├── services/                   # semua pemanggilan API
│   ├── api.js                  # axios instance utama
│   ├── homeService.js
│   └── aboutService.js
│
├── hooks/                      # custom hooks (misal useFetch, useAuth)
│   └── useHome.js
│
├── lib/ atau utils/            # helper murni (formatDate, formatCurrency, dll)
│   └── formatDate.js
│
├── constants/                  # konstanta statis (routes, enum, dll)
│   └── routes.js
│
└── styles/
    └── globals.css
```

### Aturan penamaan
| Jenis | Konvensi | Contoh |
|---|---|---|
| Folder | `kebab-case` atau `lowercase` polos | `components`, `home`, `about` |
| Komponen React (file & fungsi) | `PascalCase` | `HeroSection.jsx` |
| Hook | `camelCase`, awalan `use` | `useHome.js` |
| Service/util | `camelCase` | `homeService.js`, `formatDate.js` |
| Halaman (App Router) | selalu `page.jsx`, folder yang menentukan nama | `app/about/page.jsx` |

> Intinya: **1 folder komponen = 1 "pemilik" (induk)**. Kalau komponen dipakai oleh lebih dari satu halaman, baru naik level ke `components/common`.

---

## 2. Reusable Axios Instance (pakai `.env`)

### a. Setup environment variable

`.env.local`
```
NEXT_PUBLIC_API_BASE_URL=https://api.contohdomain.com/api
```

> Prefix `NEXT_PUBLIC_` wajib kalau variable ini perlu diakses di sisi client (browser). Kalau fetch hanya dilakukan di server (Server Component/API route), tidak perlu prefix ini — cukup `API_BASE_URL` biasa, lebih aman karena tidak ter-expose ke browser.

### b. Buat instance axios reusable

`src/services/api.js`
```js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request (misal nanti perlu sisipkan token)
api.interceptors.request.use(
  (config) => {
    // const token = getTokenFromSomewhere();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response (handle error global)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
```

### c. Buat service per fitur (bukan langsung di komponen halaman)

`src/services/homeService.js`
```js
import api from "./api";

export const getHomeBanners = () => api.get("/banners");
export const getHomeFeatures = () => api.get("/features");
```

`src/services/aboutService.js`
```js
import api from "./api";

export const getTeamMembers = () => api.get("/team-members");
```

### d. Pemanggilan di halaman/komponen

Sebelumnya (yang mau diperbaiki):
```js
// ❌ hardcoded url, fetch di dalam fungsi halaman sebelum return
export default function Home() {
  useEffect(() => {
    fetch("https://api.contohdomain.com/api/banners").then(...)
  }, []);
  return <div>...</div>;
}
```

Sesudah refactor:
```jsx
// ✅ src/app/(home)/page.jsx
"use client";
import { useEffect, useState } from "react";
import { getHomeBanners } from "@/services/homeService";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getHomeBanners()
      .then((res) => setBanners(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <HeroSection banners={banners} />;
}
```

Kalau memakai App Router dan mau fetch di Server Component (lebih disarankan untuk data awal), bisa langsung `async function` tanpa `useEffect`:
```jsx
// src/app/(home)/page.jsx (Server Component)
import { getHomeBanners } from "@/services/homeService";
import HeroSection from "@/components/home/HeroSection";

export default async function HomePage() {
  const { data: banners } = await getHomeBanners();
  return <HeroSection banners={banners} />;
}
```

---

## 3. Pengelompokan Komponen Berdasarkan Komponen Induk

Prinsip: **setiap halaman punya folder sendiri di `components/`, isinya hanya komponen yang benar-benar khusus dipakai halaman itu.**

Contoh migrasi:

| Sebelum | Sesudah |
|---|---|
| `components/Hero.jsx` | `components/home/HeroSection.jsx` |
| `components/Testimonial.jsx` | `components/home/Testimonial.jsx` |
| `components/Team.jsx` | `components/about/TeamSection.jsx` |
| `components/Navbar.jsx` (dipakai semua halaman) | `components/common/Navbar.jsx` |
| `components/Button.jsx` (dipakai semua halaman) | `components/common/Button.jsx` |

Cara menentukan komponen masuk `common` atau folder fitur:
- Dipakai di **≥ 2 halaman berbeda** → `components/common`
- Dipakai **hanya di 1 halaman** → masuk folder halaman tersebut (`components/<nama-halaman>`)

Kalau project makin besar dan 1 folder fitur mulai punya banyak sub-bagian, boleh nested lagi, misal:
```
components/
└── home/
    ├── hero/
    │   ├── HeroSection.jsx
    │   └── HeroBackground.jsx
    └── testimonial/
        └── Testimonial.jsx
```

---

## 4. Checklist Eksekusi Refactor

- [ ] Buat file `.env.local`, pindahkan semua base URL API ke sana
- [ ] Buat `src/services/api.js` (axios instance)
- [ ] Pecah setiap endpoint fetch jadi file service per fitur (`homeService.js`, `aboutService.js`, dst)
- [ ] Ganti semua `fetch(...)` hardcoded di komponen halaman dengan pemanggilan service
- [ ] Buat folder `components/common` untuk komponen yang dipakai lintas halaman
- [ ] Pindahkan komponen khusus halaman ke `components/<nama-halaman>`
- [ ] Rapikan penamaan folder & file sesuai tabel konvensi di atas
- [ ] Update semua import path yang berubah (bisa pakai fitur "Find & Replace" di editor)
- [ ] Testing ulang tiap halaman setelah pindah folder, pastikan tidak ada broken import

---

## 5. Rekomendasi Tambahan (opsional, kalau mau makin solid)

- Tambahkan `jsconfig.json` / `tsconfig.json` dengan path alias `@/*` supaya import tidak `../../../` panjang:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```
- Kalau mau lebih strict, pertimbangkan migrasi bertahap ke TypeScript agar shape data API lebih jelas.
- Pertimbangkan React Query / SWR untuk caching & state fetching, supaya tidak menulis `useEffect` + `useState` manual di banyak halaman.
