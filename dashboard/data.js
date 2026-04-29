// 모바일 제품 스펙 검색 대시보드 — 소스: 제조사 정보_검색용.pdf
// 카테고리 키 정의
const CATEGORIES = [
  { key: "smartphone", label: "스마트폰" },
  { key: "foldable",   label: "폴더블" },
  { key: "tablet",     label: "태블릿" },
  { key: "wearable",   label: "웨어러블" },
  { key: "xr",         label: "XR / 글래스" },
  { key: "gaming",     label: "게이밍" }
];

// 제조사 메타 (PDF 순위 기준)
const MANUFACTURERS = [
  { rank: 1,  key: "apple",     name: "Apple",       note: "가장 정제된 스펙 제공, 비교 기준점(Benchmark)" },
  { rank: 2,  key: "samsung",   name: "Samsung",     note: "폴더블 및 웨어러블 라인업이 가장 다양함" },
  { rank: 3,  key: "xiaomi",    name: "Xiaomi",      note: "가성비 스펙 비교 및 IoT 연동성 데이터 풍부" },
  { rank: 4,  key: "google",    name: "Google",      note: "AI 기능(Gemini) 중심의 소프트웨어 스펙 강조" },
  { rank: 5,  key: "huawei",    name: "Huawei",      note: "독자적인 카메라 센서 및 통신 기술 스펙 보유" },
  { rank: 6,  key: "oppo_vivo", name: "OPPO / Vivo", note: "초고속 충전(W) 및 슬림한 폼팩터 데이터 특화" },
  { rank: 7,  key: "meta",      name: "Meta",        note: "XR / 스마트 글래스 분야의 표준 스펙 제공" },
  { rank: 8,  key: "motorola",  name: "Motorola",    note: "북미 시장 중심의 폴더블 사양 비교에 필수" },
  { rank: 9,  key: "sony",      name: "Sony",        note: "고성능 카메라(Alpha 기술) 및 게이밍 특화 사양" },
  { rank: 10, key: "asus",      name: "Asus",        note: "게이밍 특화 스펙(주사율, 냉각 시스템) 데이터" }
];

// 제품 라인업 — 제조사별 점진 추가
const PRODUCTS = [
  // === 1. Apple ===
  { mfr: "apple", category: "smartphone", model: "iPhone 16 Pro Max",   year: 2024, highlight: "A18 Pro · 6.9\" LTPO · 티타늄" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16",            year: 2024, highlight: "A18 · 6.1\" · Action Button" },
  { mfr: "apple", category: "smartphone", model: "iPhone SE (4th)",      year: 2025, highlight: "A18 · USB-C · Face ID 보급형" },
  { mfr: "apple", category: "tablet",     model: "iPad Pro M4",          year: 2024, highlight: "M4 · Tandem OLED · Apple Pencil Pro" },
  { mfr: "apple", category: "tablet",     model: "iPad Air M3",          year: 2025, highlight: "M3 · 11\"/13\" · Center Stage" },
  { mfr: "apple", category: "wearable",   model: "Apple Watch Ultra 2",  year: 2023, highlight: "S9 · 49mm · 다이빙 / 산악" },
  { mfr: "apple", category: "wearable",   model: "Apple Watch Series 10",year: 2024, highlight: "S10 · Wide-Angle OLED" },
  { mfr: "apple", category: "xr",         model: "Vision Pro",           year: 2024, highlight: "M2 + R1 · 4K micro-OLED · visionOS" },

  // === 2. Samsung ===
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Ultra",   year: 2025, highlight: "SD8 Elite · 200MP · S Pen" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25+",        year: 2025, highlight: "SD8 Elite · 6.7\" QHD+ · 4900mAh" },
  { mfr: "samsung", category: "foldable",   model: "Galaxy Z Fold6",     year: 2024, highlight: "7.6\" 내부 · IPX8 · DeX" },
  { mfr: "samsung", category: "foldable",   model: "Galaxy Z Flip6",     year: 2024, highlight: "FlexWindow · 50MP · 클램쉘" },
  { mfr: "samsung", category: "tablet",     model: "Galaxy Tab S10 Ultra", year: 2024, highlight: "14.6\" AMOLED · S Pen 포함" },
  { mfr: "samsung", category: "wearable",   model: "Galaxy Watch7",      year: 2024, highlight: "Exynos W1000 · BioActive" },
  { mfr: "samsung", category: "wearable",   model: "Galaxy Ring",        year: 2024, highlight: "수면/심박 · 7일 배터리" },

  // === 3. Xiaomi ===
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Ultra",    year: 2025, highlight: "SD8 Elite · Leica 1\" 센서" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15",          year: 2025, highlight: "6.36\" LTPO · 90W 충전" },
  { mfr: "xiaomi", category: "smartphone", model: "Redmi Note 14 Pro+", year: 2024, highlight: "가성비 · 200MP · AMOLED 120Hz" },
  { mfr: "xiaomi", category: "wearable",   model: "Mi Band 9 Pro",      year: 2024, highlight: "AMOLED · GNSS 5계 · 2주 배터리" },
  { mfr: "xiaomi", category: "wearable",   model: "Mi Band 9",          year: 2024, highlight: "1.62\" AMOLED · IoT 허브" },

  // === 4. Google ===
  { mfr: "google", category: "smartphone", model: "Pixel 9 Pro XL",     year: 2024, highlight: "Tensor G4 · Gemini Nano · 6.8\"" },
  { mfr: "google", category: "smartphone", model: "Pixel 9 Pro Fold",   year: 2024, highlight: "내부 8\" · 외부 6.3\" · 폴더블" },
  { mfr: "google", category: "smartphone", model: "Pixel 9a",           year: 2025, highlight: "보급형 · Tensor G4 · 5100mAh" },
  { mfr: "google", category: "tablet",     model: "Pixel Tablet",       year: 2023, highlight: "11\" · 충전 도크 · Hub Mode" },
  { mfr: "google", category: "wearable",   model: "Pixel Watch 3",      year: 2024, highlight: "41/45mm · Loss of Pulse 알림" },

  // === 5. Huawei ===
  { mfr: "huawei", category: "smartphone", model: "Mate 70 Pro+",       year: 2024, highlight: "Kirin 9020 · XMAGE 카메라" },
  { mfr: "huawei", category: "foldable",   model: "Mate X6",            year: 2024, highlight: "북향 폴드 · IPX8 · Kirin" },
  { mfr: "huawei", category: "smartphone", model: "P70 Pro",            year: 2024, highlight: "초망원 · XMAGE · 위성 통신" },
  { mfr: "huawei", category: "wearable",   model: "Watch Ultimate",     year: 2023, highlight: "다이빙 100m · 액체 금속 베젤" },

  // === 6. OPPO / Vivo ===
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X8 Pro",  year: 2024, highlight: "Dimensity 9400 · Hasselblad" },
  { mfr: "oppo_vivo", category: "foldable",   model: "OPPO Find N5",     year: 2025, highlight: "세계 최슬림 폴더블 · IPX9" },
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X200 Pro",    year: 2024, highlight: "ZEISS APO · 6000mAh" },
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X Fold3 Pro", year: 2024, highlight: "236g 폴더블 · SD8 Gen3" },
  { mfr: "oppo_vivo", category: "tablet",     model: "OPPO Pad 3 Pro",   year: 2024, highlight: "13.2\" 3.4K · 92Wh" },

  // === 7. Meta ===
  { mfr: "meta", category: "xr", model: "Quest 3",          year: 2023, highlight: "SD XR2 Gen2 · Pancake · MR" },
  { mfr: "meta", category: "xr", model: "Quest 3S",         year: 2024, highlight: "보급형 MR · 동일 SoC" },
  { mfr: "meta", category: "xr", model: "Ray-Ban Meta Glass", year: 2023, highlight: "12MP · 카메라/오디오 글래스" },

  // === 8. Motorola ===
  { mfr: "motorola", category: "foldable",   model: "Razr 50 Ultra",    year: 2024, highlight: "4\" 외부 · SD8s Gen3" },
  { mfr: "motorola", category: "foldable",   model: "Razr 50",          year: 2024, highlight: "Dimensity 7300X · 보급형 폴더블" },
  { mfr: "motorola", category: "smartphone", model: "Edge 50 Ultra",    year: 2024, highlight: "비건 가죽 · 125W 충전" },
  { mfr: "motorola", category: "smartphone", model: "Edge 50",          year: 2024, highlight: "IP68 · 6.67\" pOLED" },

  // === 9. Sony ===
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VI",      year: 2024, highlight: "Alpha 옵티컬 줌 · 4K 120Hz" },
  { mfr: "sony", category: "smartphone", model: "Xperia 5 V",       year: 2023, highlight: "21:9 · 컴팩트 플래그십" },
  { mfr: "sony", category: "gaming",     model: "PlayStation Portal", year: 2023, highlight: "8\" 1080p · PS5 리모트 플레이" },

  // === 10. Asus ===
  { mfr: "asus", category: "gaming",     model: "ROG Phone 9 Pro",  year: 2024, highlight: "SD8 Elite · AeroActive 쿨러" },
  { mfr: "asus", category: "gaming",     model: "ROG Phone 8",      year: 2024, highlight: "165Hz AMOLED · 65W" },
  { mfr: "asus", category: "smartphone", model: "Zenfone 11 Ultra", year: 2024, highlight: "6.78\" · SD8 Gen3 · AI 카메라" }
];
