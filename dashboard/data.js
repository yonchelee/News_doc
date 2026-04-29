// 모바일 제품 비교 AI플랫폼 — 데이터
// 소스: 제조사 정보_검색용.pdf + 2024~2026 출시/발표 기준 갱신

const CATEGORIES = [
  { key: "smartphone", label: "스마트폰" },
  { key: "foldable",   label: "폴더블" },
  { key: "tablet",     label: "태블릿" },
  { key: "wearable",   label: "웨어러블" },
  { key: "xr",         label: "XR / 글래스" },
  { key: "gaming",     label: "게이밍" }
];

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

// status: "released" 출시, "announced" 발표/공개, "rumored" 유출/예정
const PRODUCTS = [
  // ========== 1. Apple ==========
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro Max",   year: 2025, status: "released",  highlight: "A19 Pro · 6.9\" LTPO · 새 카메라 plateau" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro",       year: 2025, status: "released",  highlight: "A19 Pro · 6.3\" 120Hz · 티타늄 → 알루미늄 회귀" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17",           year: 2025, status: "released",  highlight: "A19 · 6.3\" ProMotion 120Hz 기본 탑재" },
  { mfr: "apple", category: "smartphone", model: "iPhone Air",          year: 2025, status: "released",  highlight: "초슬림 · A19 · eSIM 전용 · iPhone Plus 대체" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16 Pro Max",   year: 2024, status: "released",  highlight: "A18 Pro · 6.9\" · Camera Control 버튼" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16",           year: 2024, status: "released",  highlight: "A18 · Action Button · Apple Intelligence" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16e",          year: 2025, status: "released",  highlight: "보급형 · A18 · 자체 5G 모뎀(C1)" },
  { mfr: "apple", category: "tablet",     model: "iPad Pro M5",         year: 2025, status: "released",  highlight: "M5 · Tandem OLED · 더 강력한 NPU" },
  { mfr: "apple", category: "tablet",     model: "iPad Air M3",         year: 2025, status: "released",  highlight: "M3 · 11/13\" · Center Stage 강화" },
  { mfr: "apple", category: "tablet",     model: "iPad mini A17 Pro",   year: 2024, status: "released",  highlight: "8.3\" · Apple Intelligence 지원" },
  { mfr: "apple", category: "wearable",   model: "Apple Watch Ultra 3", year: 2025, status: "released",  highlight: "위성 통신 · 5G · 더 큰 디스플레이" },
  { mfr: "apple", category: "wearable",   model: "Apple Watch Series 11", year: 2025, status: "released",  highlight: "S11 · 혈압 추세 · 5G eSIM" },
  { mfr: "apple", category: "wearable",   model: "Apple Watch SE 3",    year: 2025, status: "released",  highlight: "보급형 · 항상 켜짐 디스플레이 추가" },
  { mfr: "apple", category: "xr",         model: "Vision Pro M5",       year: 2025, status: "released",  highlight: "M5 칩 · visionOS 26 · Air-puff 헤드밴드" },
  { mfr: "apple", category: "xr",         model: "Vision Pro 2",        year: 2026, status: "rumored",   highlight: "더 가벼움 · 가격 인하 · 공급 확대 예정" },

  // ========== 2. Samsung ==========
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Ultra",   year: 2025, status: "released",  highlight: "SD8 Elite · 200MP · 7-step Galaxy AI" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25+",        year: 2025, status: "released",  highlight: "6.7\" QHD+ · 4900mAh · S Pen 미지원" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25",         year: 2025, status: "released",  highlight: "6.2\" · SD8 Elite · 컴팩트 플래그십" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Edge",    year: 2025, status: "released",  highlight: "초슬림 5.8mm · 티타늄 프레임" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S26 Ultra",   year: 2026, status: "rumored",   highlight: "SD8 Elite Gen2 · 사각 카메라 모듈 변경" },
  { mfr: "samsung", category: "foldable",   model: "Galaxy Z Fold7",     year: 2025, status: "released",  highlight: "8\" 내부 · 215g · 더 얇아진 힌지" },
  { mfr: "samsung", category: "foldable",   model: "Galaxy Z Flip7",     year: 2025, status: "released",  highlight: "4.1\" 외부 풀스크린 · Exynos 2500" },
  { mfr: "samsung", category: "foldable",   model: "Galaxy Z Fold6",     year: 2024, status: "released",  highlight: "7.6\" 내부 · IPX8 · DeX" },
  { mfr: "samsung", category: "tablet",     model: "Galaxy Tab S11 Ultra", year: 2025, status: "released",  highlight: "14.6\" AMOLED · Dimensity 9400+" },
  { mfr: "samsung", category: "tablet",     model: "Galaxy Tab S10 Ultra", year: 2024, status: "released",  highlight: "14.6\" · S Pen 포함" },
  { mfr: "samsung", category: "wearable",   model: "Galaxy Watch8",      year: 2025, status: "released",  highlight: "Exynos W1000 · Antioxidant 측정" },
  { mfr: "samsung", category: "wearable",   model: "Galaxy Watch Ultra (2025)", year: 2025, status: "released",  highlight: "47mm · 다이빙 · 듀얼 시스템" },
  { mfr: "samsung", category: "wearable",   model: "Galaxy Ring",        year: 2024, status: "released",  highlight: "수면/심박 · 7일 배터리 · 9사이즈" },

  // ========== 3. Xiaomi ==========
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Ultra",    year: 2025, status: "released",  highlight: "SD8 Elite · Leica 1\" 메인 센서" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Pro",      year: 2024, status: "released",  highlight: "6.73\" 2K · 6100mAh · 90W 충전" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15",          year: 2024, status: "released",  highlight: "6.36\" LTPO · 컴팩트 플래그십" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 16 Pro",      year: 2025, status: "released",  highlight: "SD8 Elite Gen2 · HyperOS 3" },
  { mfr: "xiaomi", category: "foldable",   model: "Xiaomi MIX Flip 2",  year: 2025, status: "released",  highlight: "4\" 외부 · Leica · 50MP 망원" },
  { mfr: "xiaomi", category: "foldable",   model: "Xiaomi MIX Fold 4",  year: 2024, status: "released",  highlight: "226g · 티타늄 힌지 · Leica" },
  { mfr: "xiaomi", category: "smartphone", model: "Redmi Note 14 Pro+", year: 2024, status: "released",  highlight: "200MP · AMOLED 120Hz · 가성비" },
  { mfr: "xiaomi", category: "wearable",   model: "Mi Band 10",         year: 2025, status: "released",  highlight: "1.72\" AMOLED · 21일 배터리" },
  { mfr: "xiaomi", category: "wearable",   model: "Mi Band 9 Pro",      year: 2024, status: "released",  highlight: "AMOLED · GNSS 5계 · 2주" },
  { mfr: "xiaomi", category: "tablet",     model: "Xiaomi Pad 7 Pro",   year: 2025, status: "released",  highlight: "11.2\" 3.2K · SD8s Gen3" },

  // ========== 4. Google ==========
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro XL",    year: 2025, status: "released",  highlight: "Tensor G5 · Gemini Nano v3 · 6.8\"" },
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro",       year: 2025, status: "released",  highlight: "6.3\" LTPO · 5x 망원 · Gemini" },
  { mfr: "google", category: "smartphone", model: "Pixel 10",           year: 2025, status: "released",  highlight: "Tensor G5 · 망원 추가 · 4910mAh" },
  { mfr: "google", category: "foldable",   model: "Pixel 10 Pro Fold",  year: 2025, status: "released",  highlight: "8\" 내부 · IPX8 · 더 얇음" },
  { mfr: "google", category: "smartphone", model: "Pixel 9 Pro XL",     year: 2024, status: "released",  highlight: "Tensor G4 · 6.8\" · Gemini" },
  { mfr: "google", category: "smartphone", model: "Pixel 9a",           year: 2025, status: "released",  highlight: "보급형 · Tensor G4 · 5100mAh" },
  { mfr: "google", category: "tablet",     model: "Pixel Tablet 2",     year: 2025, status: "rumored",   highlight: "Tensor 기반 · Hub 도크 개선" },
  { mfr: "google", category: "tablet",     model: "Pixel Tablet",       year: 2023, status: "released",  highlight: "11\" · 충전 도크 · Hub Mode" },
  { mfr: "google", category: "wearable",   model: "Pixel Watch 4",      year: 2025, status: "released",  highlight: "Snapdragon W5 Gen2 · 더 큰 배터리" },
  { mfr: "google", category: "wearable",   model: "Pixel Watch 3",      year: 2024, status: "released",  highlight: "41/45mm · Loss of Pulse 알림" },

  // ========== 5. Huawei ==========
  { mfr: "huawei", category: "smartphone", model: "Mate 80 Pro",        year: 2025, status: "released",  highlight: "Kirin 9030 · 가변 조리개 메인" },
  { mfr: "huawei", category: "smartphone", model: "Mate 70 Pro+",       year: 2024, status: "released",  highlight: "Kirin 9020 · XMAGE · 위성 통신" },
  { mfr: "huawei", category: "smartphone", model: "Pura 80 Ultra",      year: 2025, status: "released",  highlight: "1\" 메인 · 자기장 망원 전환" },
  { mfr: "huawei", category: "foldable",   model: "Mate XT 2",          year: 2025, status: "released",  highlight: "트리폴드 2세대 · 더 얇음" },
  { mfr: "huawei", category: "foldable",   model: "Mate XT (트리폴드)",  year: 2024, status: "released",  highlight: "세계 최초 트리폴드 · 10.2\"" },
  { mfr: "huawei", category: "foldable",   model: "Mate X6",            year: 2024, status: "released",  highlight: "북향 폴드 · IPX8" },
  { mfr: "huawei", category: "wearable",   model: "Watch Ultimate 2",   year: 2025, status: "released",  highlight: "다이빙 100m+ · ECG · 위성" },
  { mfr: "huawei", category: "wearable",   model: "Watch GT 5 Pro",     year: 2024, status: "released",  highlight: "티타늄 · 14일 배터리" },

  // ========== 6. OPPO / Vivo ==========
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X300 Pro",   year: 2025, status: "released",  highlight: "Dimensity 9500 · ZEISS APO · 200MP" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X9 Pro", year: 2025, status: "released",  highlight: "Dimensity 9500 · Hasselblad · 7000mAh" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X8 Pro", year: 2024, status: "released",  highlight: "Dimensity 9400 · Hasselblad" },
  { mfr: "oppo_vivo", category: "foldable",   model: "OPPO Find N5",    year: 2025, status: "released",  highlight: "8.93mm · 세계 최슬림 폴더블 · IPX9" },
  { mfr: "oppo_vivo", category: "foldable",   model: "Vivo X Fold5",    year: 2025, status: "released",  highlight: "236g · SD8 Elite · ZEISS" },
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X200 Pro",   year: 2024, status: "released",  highlight: "ZEISS APO · 6000mAh" },
  { mfr: "oppo_vivo", category: "tablet",     model: "OPPO Pad 4 Pro",  year: 2025, status: "released",  highlight: "13.2\" 3.4K · SD8 Gen3" },

  // ========== 7. Meta ==========
  { mfr: "meta", category: "xr", model: "Quest 3S",         year: 2024, status: "released",  highlight: "보급형 MR · SD XR2 Gen2" },
  { mfr: "meta", category: "xr", model: "Quest 3",          year: 2023, status: "released",  highlight: "MR 표준 · Pancake 렌즈" },
  { mfr: "meta", category: "xr", model: "Quest 4",          year: 2026, status: "rumored",   highlight: "유출 단계 · 더 가벼움 · MR 강화 예상" },
  { mfr: "meta", category: "xr", model: "Ray-Ban Meta (2세대)", year: 2025, status: "released",  highlight: "디스플레이 탑재 · Live AI" },
  { mfr: "meta", category: "xr", model: "Orion (개발자 프로토타입)", year: 2024, status: "announced", highlight: "AR 글래스 컨셉 · holographic" },

  // ========== 8. Motorola ==========
  { mfr: "motorola", category: "foldable",   model: "Razr 60 Ultra",    year: 2025, status: "released",  highlight: "4\" 외부 · SD8 Elite · 비건 가죽" },
  { mfr: "motorola", category: "foldable",   model: "Razr 60",          year: 2025, status: "released",  highlight: "Dimensity 7400 · 보급형 폴더블" },
  { mfr: "motorola", category: "foldable",   model: "Razr 50 Ultra",    year: 2024, status: "released",  highlight: "4\" 외부 · SD8s Gen3" },
  { mfr: "motorola", category: "smartphone", model: "Edge 60 Ultra",    year: 2025, status: "released",  highlight: "비건 가죽 · 125W 충전 · 6.7\"" },
  { mfr: "motorola", category: "smartphone", model: "Edge 50 Ultra",    year: 2024, status: "released",  highlight: "비건 가죽 · 125W · 50MP 메인" },

  // ========== 9. Sony ==========
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VII",     year: 2025, status: "released",  highlight: "Alpha 옵티컬 줌 · 4K 120Hz" },
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VI",      year: 2024, status: "released",  highlight: "Alpha 망원 · FHD+ 120Hz" },
  { mfr: "sony", category: "smartphone", model: "Xperia 5 VI",      year: 2024, status: "released",  highlight: "21:9 · 컴팩트 플래그십" },
  { mfr: "sony", category: "gaming",     model: "PlayStation Portal", year: 2023, status: "released",  highlight: "8\" 1080p · PS5 리모트" },

  // ========== 10. Asus ==========
  { mfr: "asus", category: "gaming",     model: "ROG Phone 9 Pro",  year: 2024, status: "released",  highlight: "SD8 Elite · AeroActive 쿨러 X" },
  { mfr: "asus", category: "gaming",     model: "ROG Phone 10",     year: 2025, status: "rumored",   highlight: "SD8 Elite Gen2 · 165Hz LTPO" },
  { mfr: "asus", category: "smartphone", model: "Zenfone 12 Ultra", year: 2025, status: "released",  highlight: "6.78\" · SD8 Elite · AI 보조" }
];
