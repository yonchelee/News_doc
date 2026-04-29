// 모바일 제품 비교 AI플랫폼 — 데이터
// 소스: 제조사 정보_검색용.pdf + 2024~2026 출시/발표 기준 갱신
// imageUrl: Wikipedia/Commons thumbnail (자동 수집 + 일부 매뉴얼)

const CATEGORIES = [
  { key: "smartphone", label: "스마트폰" },
  { key: "foldable", label: "폴더블" },
  { key: "tablet", label: "태블릿" },
  { key: "wearable", label: "웨어러블" },
  { key: "xr", label: "XR / 글래스" },
  { key: "gaming", label: "게이밍" }
];

const MANUFACTURERS = [
  { rank: 1, key: "apple", name: "Apple", note: "가장 정제된 스펙 제공, 비교 기준점(Benchmark)" },
  { rank: 2, key: "samsung", name: "Samsung", note: "폴더블 및 웨어러블 라인업이 가장 다양함" },
  { rank: 3, key: "xiaomi", name: "Xiaomi", note: "가성비 스펙 비교 및 IoT 연동성 데이터 풍부" },
  { rank: 4, key: "google", name: "Google", note: "AI 기능(Gemini) 중심의 소프트웨어 스펙 강조" },
  { rank: 5, key: "huawei", name: "Huawei", note: "독자적인 카메라 센서 및 통신 기술 스펙 보유" },
  { rank: 6, key: "oppo_vivo", name: "OPPO / Vivo", note: "초고속 충전(W) 및 슬림한 폼팩터 데이터 특화" },
  { rank: 7, key: "meta", name: "Meta", note: "XR / 스마트 글래스 분야의 표준 스펙 제공" },
  { rank: 8, key: "motorola", name: "Motorola", note: "북미 시장 중심의 폴더블 사양 비교에 필수" },
  { rank: 9, key: "sony", name: "Sony", note: "고성능 카메라(Alpha 기술) 및 게이밍 특화 사양" },
  { rank: 10, key: "asus", name: "Asus", note: "게이밍 특화 스펙(주사율, 냉각 시스템) 데이터" }
];

// status: "released" 출시, "announced" 발표/공개, "rumored" 유출/예정
// imageUrl 누락 시 카드는 SVG 아이콘 + 모노그램으로 폴백
const PRODUCTS = [
  // ========== 1. Apple ==========
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro Max", year: 2025, status: "released", highlight: "A19 Pro · 6.9\" LTPO · 새 카메라 plateau", imageUrl: "img/iphone-17-pro-max.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro", year: 2025, status: "released", highlight: "A19 Pro · 6.3\" 120Hz · 티타늄 → 알루미늄 회귀", imageUrl: "img/iphone-17-pro.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17", year: 2025, status: "released", highlight: "A19 · 6.3\" ProMotion 120Hz 기본 탑재", imageUrl: "img/iphone-17.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone Air", year: 2025, status: "released", highlight: "초슬림 · A19 · eSIM 전용 · iPhone Plus 대체", imageUrl: "img/iphone-air.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16 Pro Max", year: 2024, status: "released", highlight: "A18 Pro · 6.9\" · Camera Control 버튼", imageUrl: "img/iphone-16-pro-max.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16", year: 2024, status: "released", highlight: "A18 · Action Button · Apple Intelligence", imageUrl: "img/iphone-16.svg" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16e", year: 2025, status: "released", highlight: "보급형 · A18 · 자체 5G 모뎀(C1)", imageUrl: "img/iphone-16e.svg" },
  { mfr: "apple", category: "tablet", model: "iPad Pro M5", year: 2025, status: "released", highlight: "M5 · Tandem OLED · 더 강력한 NPU", imageUrl: "img/ipad-pro-m5.svg" },
  { mfr: "apple", category: "tablet", model: "iPad Air M3", year: 2025, status: "released", highlight: "M3 · 11/13\" · Center Stage 강화", imageUrl: "img/ipad-air-m3.svg" },
  { mfr: "apple", category: "tablet", model: "iPad mini A17 Pro", year: 2024, status: "released", highlight: "8.3\" · Apple Intelligence 지원", imageUrl: "img/ipad-mini-a17-pro.svg" },
  { mfr: "apple", category: "wearable", model: "Apple Watch Ultra 3", year: 2025, status: "released", highlight: "위성 통신 · 5G · 더 큰 디스플레이", imageUrl: "img/apple-watch-ultra-3.svg" },
  { mfr: "apple", category: "wearable", model: "Apple Watch Series 11", year: 2025, status: "released", highlight: "S11 · 혈압 추세 · 5G eSIM", imageUrl: "img/apple-watch-series-11.svg" },
  { mfr: "apple", category: "wearable", model: "Apple Watch SE 3", year: 2025, status: "released", highlight: "보급형 · 항상 켜짐 디스플레이 추가", imageUrl: "img/apple-watch-se-3.svg" },
  { mfr: "apple", category: "xr", model: "Vision Pro M5", year: 2025, status: "released", highlight: "M5 칩 · visionOS 26 · Air-puff 헤드밴드", imageUrl: "img/vision-pro-m5.svg" },
  { mfr: "apple", category: "xr", model: "Vision Pro 2", year: 2026, status: "rumored", highlight: "더 가벼움 · 가격 인하 · 공급 확대 예정", imageUrl: "img/vision-pro-2.svg" },

  // ========== 2. Samsung ==========
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Ultra", year: 2025, status: "released", highlight: "SD8 Elite · 200MP · 7-step Galaxy AI", imageUrl: "img/galaxy-s25-ultra.svg" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25+", year: 2025, status: "released", highlight: "6.7\" QHD+ · 4900mAh · S Pen 미지원", imageUrl: "img/galaxy-s25-plus.svg" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25", year: 2025, status: "released", highlight: "6.2\" · SD8 Elite · 컴팩트 플래그십", imageUrl: "img/galaxy-s25.svg" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Edge", year: 2025, status: "released", highlight: "초슬림 5.8mm · 티타늄 프레임", imageUrl: "img/galaxy-s25-edge.svg" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S26 Ultra", year: 2026, status: "released", highlight: "SD8 Elite Gen5 · 6.9\" 2600nit · Privacy Display · 알루미늄 회귀", imageUrl: "img/galaxy-s26-ultra.svg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Fold7", year: 2025, status: "released", highlight: "8\" 내부 · 215g · 더 얇아진 힌지", imageUrl: "img/galaxy-z-fold7.svg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Flip7", year: 2025, status: "released", highlight: "4.1\" 외부 풀스크린 · Exynos 2500", imageUrl: "img/galaxy-z-flip7.svg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Fold6", year: 2024, status: "released", highlight: "7.6\" 내부 · IPX8 · DeX", imageUrl: "img/galaxy-z-fold6.svg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Flip6", year: 2024, status: "released", highlight: "FlexWindow 3.4\" · 50MP · 4000mAh", imageUrl: "img/galaxy-z-flip6.svg" },
  { mfr: "samsung", category: "tablet", model: "Galaxy Tab S11 Ultra", year: 2025, status: "released", highlight: "14.6\" AMOLED · Dimensity 9400+", imageUrl: "img/galaxy-tab-s11-ultra.svg" },
  { mfr: "samsung", category: "tablet", model: "Galaxy Tab S10 Ultra", year: 2024, status: "released", highlight: "14.6\" · S Pen 포함", imageUrl: "img/galaxy-tab-s10-ultra.svg" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Watch8", year: 2025, status: "released", highlight: "Exynos W1000 · Antioxidant 측정", imageUrl: "img/galaxy-watch8.svg" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Watch Ultra (2025)", year: 2025, status: "released", highlight: "47mm · 다이빙 · 듀얼 시스템", imageUrl: "img/galaxy-watch-ultra-2025.svg" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Ring", year: 2024, status: "released", highlight: "수면/심박 · 7일 배터리 · 9사이즈", imageUrl: "img/galaxy-ring.svg" },

  // ========== 3. Xiaomi ==========
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Ultra", year: 2025, status: "released", highlight: "SD8 Elite · Leica 1\" 메인 센서", imageUrl: "img/xiaomi-15-ultra.svg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Pro", year: 2024, status: "released", highlight: "6.73\" 2K · 6100mAh · 90W 충전", imageUrl: "img/xiaomi-15-pro.svg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15", year: 2024, status: "released", highlight: "6.36\" LTPO · 컴팩트 플래그십", imageUrl: "img/xiaomi-15.svg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 16 Pro", year: 2025, status: "released", highlight: "SD8 Elite Gen2 · HyperOS 3", imageUrl: "img/xiaomi-16-pro.svg" },
  { mfr: "xiaomi", category: "foldable", model: "Xiaomi MIX Flip 2", year: 2025, status: "released", highlight: "4\" 외부 · Leica · 50MP 망원", imageUrl: "img/xiaomi-mix-flip-2.svg" },
  { mfr: "xiaomi", category: "foldable", model: "Xiaomi MIX Fold 4", year: 2024, status: "released", highlight: "226g · 티타늄 힌지 · Leica", imageUrl: "img/xiaomi-mix-fold-4.svg" },
  { mfr: "xiaomi", category: "smartphone", model: "Redmi Note 14 Pro+", year: 2024, status: "released", highlight: "200MP · AMOLED 120Hz · 가성비", imageUrl: "img/redmi-note-14-pro-plus.svg" },
  { mfr: "xiaomi", category: "wearable", model: "Mi Band 10", year: 2025, status: "released", highlight: "1.72\" AMOLED · 21일 배터리", imageUrl: "img/mi-band-10.svg" },
  { mfr: "xiaomi", category: "wearable", model: "Mi Band 9 Pro", year: 2024, status: "released", highlight: "AMOLED · GNSS 5계 · 2주", imageUrl: "img/mi-band-9-pro.svg" },
  { mfr: "xiaomi", category: "tablet", model: "Xiaomi Pad 7 Pro", year: 2025, status: "released", highlight: "11.2\" 3.2K · SD8s Gen3", imageUrl: "img/xiaomi-pad-7-pro.svg" },

  // ========== 4. Google ==========
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro XL", year: 2025, status: "released", highlight: "Tensor G5 · Gemini Nano v3 · 6.8\"", imageUrl: "img/pixel-10-pro-xl.svg" },
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro", year: 2025, status: "released", highlight: "6.3\" LTPO · 5x 망원 · Gemini", imageUrl: "img/pixel-10-pro.svg" },
  { mfr: "google", category: "smartphone", model: "Pixel 10", year: 2025, status: "released", highlight: "Tensor G5 · 망원 추가 · 4910mAh", imageUrl: "img/pixel-10.svg" },
  { mfr: "google", category: "foldable", model: "Pixel 10 Pro Fold", year: 2025, status: "released", highlight: "8\" 내부 · IPX8 · 더 얇음", imageUrl: "img/pixel-10-pro-fold.svg" },
  { mfr: "google", category: "smartphone", model: "Pixel 9 Pro XL", year: 2024, status: "released", highlight: "Tensor G4 · 6.8\" · Gemini", imageUrl: "img/pixel-9-pro-xl.svg" },
  { mfr: "google", category: "smartphone", model: "Pixel 9a", year: 2025, status: "released", highlight: "보급형 · Tensor G4 · 5100mAh", imageUrl: "img/pixel-9a.svg" },
  { mfr: "google", category: "tablet", model: "Pixel Tablet 2", year: 2025, status: "rumored", highlight: "Tensor 기반 · Hub 도크 개선", imageUrl: "img/pixel-tablet-2.svg" },
  { mfr: "google", category: "tablet", model: "Pixel Tablet", year: 2023, status: "released", highlight: "11\" · 충전 도크 · Hub Mode", imageUrl: "img/pixel-tablet.svg" },
  { mfr: "google", category: "wearable", model: "Pixel Watch 4", year: 2025, status: "released", highlight: "Snapdragon W5 Gen2 · 더 큰 배터리", imageUrl: "img/pixel-watch-4.svg" },
  { mfr: "google", category: "wearable", model: "Pixel Watch 3", year: 2024, status: "released", highlight: "41/45mm · Loss of Pulse 알림", imageUrl: "img/pixel-watch-3.svg" },

  // ========== 5. Huawei ==========
  { mfr: "huawei", category: "smartphone", model: "Mate 80 Pro", year: 2025, status: "released", highlight: "Kirin 9030 · 가변 조리개 메인", imageUrl: "img/mate-80-pro.svg" },
  { mfr: "huawei", category: "smartphone", model: "Mate 70 Pro+", year: 2024, status: "released", highlight: "Kirin 9020 · XMAGE · 위성 통신", imageUrl: "img/mate-70-pro-plus.svg" },
  { mfr: "huawei", category: "smartphone", model: "Pura 80 Ultra", year: 2025, status: "released", highlight: "1\" 메인 · 자기장 망원 전환", imageUrl: "img/pura-80-ultra.svg" },
  { mfr: "huawei", category: "foldable", model: "Mate XT 2", year: 2025, status: "released", highlight: "트리폴드 2세대 · 더 얇음", imageUrl: "img/mate-xt-2.svg" },
  { mfr: "huawei", category: "foldable", model: "Mate XT (트리폴드)", year: 2024, status: "released", highlight: "세계 최초 트리폴드 · 10.2\"", imageUrl: "img/mate-xt-트리폴드.svg" },
  { mfr: "huawei", category: "foldable", model: "Mate X6", year: 2024, status: "released", highlight: "북향 폴드 · IPX8", imageUrl: "img/mate-x6.svg" },
  { mfr: "huawei", category: "wearable", model: "Watch Ultimate 2", year: 2025, status: "released", highlight: "다이빙 100m+ · ECG · 위성", imageUrl: "img/watch-ultimate-2.svg" },
  { mfr: "huawei", category: "wearable", model: "Watch GT 5 Pro", year: 2024, status: "released", highlight: "티타늄 · 14일 배터리", imageUrl: "img/watch-gt-5-pro.svg" },

  // ========== 6. OPPO / Vivo ==========
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X300 Pro", year: 2025, status: "released", highlight: "Dimensity 9500 · ZEISS APO · 200MP", imageUrl: "img/vivo-x300-pro.svg" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X9 Pro", year: 2025, status: "released", highlight: "Dimensity 9500 · Hasselblad · 7000mAh", imageUrl: "img/oppo-find-x9-pro.svg" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X8 Pro", year: 2024, status: "released", highlight: "Dimensity 9400 · Hasselblad", imageUrl: "img/oppo-find-x8-pro.svg" },
  { mfr: "oppo_vivo", category: "foldable", model: "OPPO Find N5", year: 2025, status: "released", highlight: "8.93mm · 세계 최슬림 폴더블 · IPX9", imageUrl: "img/oppo-find-n5.svg" },
  { mfr: "oppo_vivo", category: "foldable", model: "Vivo X Fold5", year: 2025, status: "released", highlight: "236g · SD8 Elite · ZEISS", imageUrl: "img/vivo-x-fold5.svg" },
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X200 Pro", year: 2024, status: "released", highlight: "ZEISS APO · 6000mAh", imageUrl: "img/vivo-x200-pro.svg" },
  { mfr: "oppo_vivo", category: "tablet", model: "OPPO Pad 4 Pro", year: 2025, status: "released", highlight: "13.2\" 3.4K · SD8 Gen3", imageUrl: "img/oppo-pad-4-pro.svg" },

  // ========== 7. Meta ==========
  { mfr: "meta", category: "xr", model: "Quest 3S", year: 2024, status: "released", highlight: "보급형 MR · SD XR2 Gen2", imageUrl: "img/quest-3s.svg" },
  { mfr: "meta", category: "xr", model: "Quest 3", year: 2023, status: "released", highlight: "MR 표준 · Pancake 렌즈", imageUrl: "img/quest-3.svg" },
  { mfr: "meta", category: "xr", model: "Quest 4", year: 2026, status: "rumored", highlight: "유출 단계 · 더 가벼움 · MR 강화 예상", imageUrl: "img/quest-4.svg" },
  { mfr: "meta", category: "xr", model: "Ray-Ban Meta (2세대)", year: 2025, status: "released", highlight: "디스플레이 탑재 · Live AI", imageUrl: "img/ray-ban-meta-2세대.svg" },
  { mfr: "meta", category: "xr", model: "Orion (개발자 프로토타입)", year: 2024, status: "announced", highlight: "AR 글래스 컨셉 · holographic", imageUrl: "img/orion-개발자-프로토타입.svg" },

  // ========== 8. Motorola ==========
  { mfr: "motorola", category: "foldable", model: "Razr 60 Ultra", year: 2025, status: "released", highlight: "4\" 외부 · SD8 Elite · 비건 가죽", imageUrl: "img/razr-60-ultra.svg" },
  { mfr: "motorola", category: "foldable", model: "Razr 60", year: 2025, status: "released", highlight: "Dimensity 7400 · 보급형 폴더블", imageUrl: "img/razr-60.svg" },
  { mfr: "motorola", category: "foldable", model: "Razr 50 Ultra", year: 2024, status: "released", highlight: "4\" 외부 · SD8s Gen3", imageUrl: "img/razr-50-ultra.svg" },
  { mfr: "motorola", category: "smartphone", model: "Edge 60 Ultra", year: 2025, status: "released", highlight: "비건 가죽 · 125W 충전 · 6.7\"", imageUrl: "img/edge-60-ultra.svg" },
  { mfr: "motorola", category: "smartphone", model: "Edge 50 Ultra", year: 2024, status: "released", highlight: "비건 가죽 · 125W · 50MP 메인", imageUrl: "img/edge-50-ultra.svg" },

  // ========== 9. Sony ==========
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VII", year: 2025, status: "released", highlight: "Alpha 옵티컬 줌 · 4K 120Hz", imageUrl: "img/xperia-1-vii.svg" },
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VI", year: 2024, status: "released", highlight: "Alpha 망원 · FHD+ 120Hz", imageUrl: "img/xperia-1-vi.svg" },
  { mfr: "sony", category: "smartphone", model: "Xperia 5 VI", year: 2024, status: "released", highlight: "21:9 · 컴팩트 플래그십", imageUrl: "img/xperia-5-vi.svg" },
  { mfr: "sony", category: "gaming", model: "PlayStation Portal", year: 2023, status: "released", highlight: "8\" 1080p · PS5 리모트", imageUrl: "img/playstation-portal.svg" },

  // ========== 10. Asus ==========
  { mfr: "asus", category: "gaming", model: "ROG Phone 9 Pro", year: 2024, status: "released", highlight: "SD8 Elite · AeroActive 쿨러 X", imageUrl: "img/rog-phone-9-pro.svg" },
  { mfr: "asus", category: "gaming", model: "ROG Phone 10", year: 2025, status: "rumored", highlight: "SD8 Elite Gen2 · 165Hz LTPO", imageUrl: "img/rog-phone-10.svg" },
  { mfr: "asus", category: "smartphone", model: "Zenfone 12 Ultra", year: 2025, status: "released", highlight: "6.78\" · SD8 Elite · AI 보조", imageUrl: "img/zenfone-12-ultra.svg" }
];

// 풀 스펙 데이터 (모델명 키)
// 누락 필드는 UI에서 'N/A' 표시. 자동 갱신 스크립트(tools/fetch_specs.py)로 확장 가능.
// 출처: Wikipedia + 제조사 공식. lastUpdated 로 신선도 추적.

const SPECS = {
  "Galaxy S26 Ultra": {
    "design": {
      "dimensions": "163.4 × 78.1 × 8.4 mm",
      "weight": "232 g",
      "materials": "알루미늄 프레임 · Gorilla Armor 2",
      "colors": [
        "Titanium Black",
        "Titanium White",
        "Titanium Blue",
        "Titanium Green"
      ]
    },
    "display": {
      "size": "6.9″",
      "resolution": "3120×1440",
      "panel": "Dynamic LTPO AMOLED 2X",
      "refreshRate": "1–120 Hz",
      "brightness": "2600 nits peak",
      "hdr": "HDR10+",
      "extra": "Privacy Display (세계 최초)"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite Gen 5 for Galaxy",
      "process": "TSMC 3nm"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "200 MP f/1.7 OIS",
        "ultrawide": "50 MP",
        "telephoto": "10 MP 3×",
        "periscope": "50 MP 5×"
      },
      "front": "12 MP",
      "video": "8K@30fps · 4K@120fps"
    },
    "battery": {
      "capacity": "5000 mAh",
      "chargingWired": "45 W",
      "chargingWireless": "15 W (Qi2)",
      "reverse": "4.5 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2 Gen 2",
      "nfc": true,
      "uwb": true,
      "summary": "Wi-Fi 7, NFC"
    },
    "os": {
      "initial": "Android 16 (One UI 8.5)",
      "updates": "7년 OS + 보안"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "초음파 지문",
        "얼굴 인식"
      ]
    },
    "price": {
      "krw": "1,649,000원~",
      "usd": "$1299",
      "launchDate": "2026-03-11"
    },
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S26_Ultra",
    "lastUpdated": "2026-04-29"
  },
  "Galaxy S25 Ultra": {
    "design": {
      "dimensions": "162.8 × 77.6 × 8.2 mm",
      "weight": "218 g",
      "materials": "티타늄 프레임 · Gorilla Armor 2"
    },
    "display": {
      "size": "6.9″",
      "resolution": "3120×1440",
      "panel": "Dynamic LTPO AMOLED 2X",
      "refreshRate": "1–120 Hz",
      "brightness": "2600 nits peak",
      "hdr": "HDR10+"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite for Galaxy",
      "process": "3nm"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "200 MP f/1.7 OIS",
        "ultrawide": "50 MP",
        "telephoto": "10 MP 3×",
        "periscope": "50 MP 5×"
      },
      "front": "12 MP",
      "video": "8K@30fps",
      "rear_text": "S25 and S25+ : 50 MP, f/1.8, 24mm (wide), 1/1.56\", 1.0μm, Dual Pixel PDAF, OIS 10 MP, f/2.4, 67mm (telephoto), 1/3.94\", 1.0μm, PDAF, OIS, 3× optical zoom 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video S25 Ultra : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7μm, dual pixel PDAF, OIS, 5× optical zoom 10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12μm, PDAF, OIS, 3× optical zoom 50 MP, f/1.9, 120˚ (ultrawide), 0.7μm, dual pixel PDAF, Super Steady Video S25 Edge : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video"
    },
    "battery": {
      "capacity": "5000 mAh",
      "chargingWired": "45 W",
      "chargingWireless": "15 W",
      "reverse": "4.5 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2",
      "nfc": true,
      "uwb": true,
      "summary": "Wi-Fi 7 802.11 a/b/g/n/ac/ax/be tri-band , Bluetooth 5.4 A2DP LE S25+/S25 Edge/S25 Ultra : UWB"
    },
    "os": {
      "initial": "Android 15 (One UI 7)",
      "updates": "7년"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "초음파 지문",
        "얼굴 인식"
      ]
    },
    "price": {
      "krw": "1,698,500원~",
      "usd": "$1299",
      "launchDate": "2025-02-07"
    },
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25_Ultra",
    "lastUpdated": "2026-04-29"
  },
  "iPhone 17 Pro Max": {
    "design": {
      "dimensions": "163.4 × 78.0 × 8.75 mm",
      "weight": "233 g",
      "materials": "알루미늄 유니바디 · Ceramic Shield 2"
    },
    "display": {
      "size": "6.9″",
      "resolution": "2868×1320",
      "panel": "Super Retina XDR ProMotion (LTPO OLED)",
      "refreshRate": "1–120 Hz",
      "brightness": "3000 nits peak",
      "hdr": "Dolby Vision · HDR10"
    },
    "processor": {
      "ap": "Apple A19 Pro",
      "process": "3nm 3rd gen"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB",
        "2 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "48 MP Fusion f/1.78",
        "ultrawide": "48 MP",
        "telephoto": "48 MP 4×/8× tetraprism"
      },
      "front": "18 MP Center Stage",
      "video": "4K Dolby Vision@120fps · ProRes RAW",
      "rear_text": "Fusion Main: 48MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.78, 24mm (wide) Fusion Ultrawide: 48MP, f / 2.2, 13mm (ultrawide) Fusion Telephoto: 48MP, f / 2.8, 100mm (periscope telephoto) TOF 3D LiDAR scanner Dolby Vision ProRes ProRes RAW"
    },
    "battery": {
      "capacity": "5088 mAh",
      "chargingWired": "40 W (PD)",
      "chargingWireless": "25 W (MagSafe)"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.3",
      "usb": "USB-C 3.2 (10 Gbps)",
      "nfc": true,
      "uwb": "U2",
      "summary": "Wi-Fi 7 tri-band, Bluetooth 6.0 ( A2DP , LE ), Ultra-wideband , Thread , NFC (reader mode, Express Cards), LEO satellite ( Globalstar , limited), USB-C : USB 10Gbps , Dual-frequency GPS ( L1, &#160; L5 ), GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "iOS 26",
      "updates": "통상 6+년"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "Face ID"
      ]
    },
    "price": {
      "krw": "1,990,000원~",
      "usd": "$1199",
      "launchDate": "2025-09-19"
    },
    "source": "https://en.wikipedia.org/wiki/IPhone_17_Pro",
    "lastUpdated": "2026-04-29"
  },
  "iPhone 16 Pro Max": {
    "design": {
      "dimensions": "163.0 × 77.6 × 8.25 mm",
      "weight": "227 g",
      "materials": "Grade 5 티타늄"
    },
    "display": {
      "size": "6.9″",
      "resolution": "2868×1320",
      "panel": "LTPO Super Retina XDR",
      "refreshRate": "1–120 Hz",
      "brightness": "2000 nits peak"
    },
    "processor": {
      "ap": "Apple A18 Pro",
      "process": "3nm 2nd gen"
    },
    "memory": {
      "ram": "8 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "48 MP Fusion",
        "ultrawide": "48 MP",
        "telephoto": "12 MP 5× tetraprism"
      },
      "front": "12 MP",
      "video": "4K@120fps",
      "rear_text": "48 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.8, 24mm (wide) 12 MP, f / 2.8, 120mm (periscope telephoto) 48 MP, f / 2.2, 13mm (ultrawide) TOF 3D LiDAR scanner"
    },
    "battery": {
      "capacity": "4685 mAh",
      "chargingWired": "27 W",
      "chargingWireless": "25 W (MagSafe)"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.3",
      "usb": "USB-C 3.2",
      "nfc": true,
      "uwb": "U2",
      "summary": "Wi-Fi 7 tri-band, Bluetooth 5.3 ( A2DP , LE ), Ultra-wideband , Thread , NFC (reader mode, Express Cards), LEO satellite ( Globalstar , limited), USB-C : USB 10Gbps , Dual-frequency GPS ( L1, &#160; L5 ), GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "iOS 18",
      "updates": "6+년"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "Face ID"
      ]
    },
    "price": {
      "krw": "1,900,000원~",
      "usd": "$1199",
      "launchDate": "2024-09-20"
    },
    "source": "https://en.wikipedia.org/wiki/IPhone_16_Pro",
    "lastUpdated": "2026-04-29"
  },
  "Galaxy Z Fold7": {
    "design": {
      "dimensions": "펴짐 153.5 × 142.7 × 4.2 mm / 접힘 153.5 × 72.8 × 8.9 mm",
      "weight": "215 g",
      "materials": "Armor Aluminum 힌지"
    },
    "display": {
      "size": "내부 8.0″ / 외부 6.5″",
      "resolution": "내부 2184×1968 / 외부 2520×1080",
      "panel": "Dynamic AMOLED 2X",
      "refreshRate": "1–120 Hz",
      "brightness": "2600 nits peak"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite for Galaxy"
    },
    "memory": {
      "ram": "12/16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "200 MP",
        "ultrawide": "12 MP",
        "telephoto": "10 MP 3×"
      },
      "front": "10 MP × 2 (외부+내부)",
      "video": "8K@30fps"
    },
    "battery": {
      "capacity": "4400 mAh",
      "chargingWired": "25 W",
      "chargingWireless": "15 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2",
      "nfc": true
    },
    "os": {
      "initial": "Android 15 (One UI 7)",
      "updates": "7년"
    },
    "durability": {
      "ip": "IP48",
      "biometric": [
        "측면 지문",
        "얼굴 인식"
      ]
    },
    "price": {
      "krw": "2,398,000원~",
      "usd": "$1899",
      "launchDate": "2025-07-25"
    },
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold7",
    "lastUpdated": "2026-04-29"
  },
  "Pixel 10 Pro XL": {
    "design": {
      "dimensions": "162.7 × 76.6 × 8.5 mm",
      "weight": "232 g",
      "materials": "알루미늄 프레임 · Gorilla Glass Victus 2"
    },
    "display": {
      "size": "6.8″",
      "resolution": "2992×1344",
      "panel": "LTPO OLED",
      "refreshRate": "1–120 Hz",
      "brightness": "3000 nits peak"
    },
    "processor": {
      "ap": "Google Tensor G5",
      "process": "TSMC 3nm"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "48 MP",
        "telephoto": "48 MP 5×"
      },
      "front": "42 MP",
      "video": "8K@30fps · Video Boost",
      "rear_text": "50 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.68, 82˚ field of view (wide), 1/1.3\" 48 MP, f / 1.7, 123˚ field of view (ultrawide), 1/2.55\" 48 MP, f / 2.8, 22˚ field of view (telephoto), 5× optical zoom , 1/2.55\" 1080p video at 24, 30, or 60 FPS 4K video at 24, 30, or 60 FPS 8K video at 30 FPS"
    },
    "battery": {
      "capacity": "5200 mAh",
      "chargingWired": "37 W",
      "chargingWireless": "23 W (Qi2 magnetic)"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2",
      "nfc": true,
      "uwb": true,
      "summary": "Wi-Fi 7 + MIMO Bluetooth 6.0 NFC Google Cast Dual-band GNSS ( GPS / GLONASS / Galileo ) USB-C 3.2"
    },
    "os": {
      "initial": "Android 16",
      "updates": "7년"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "초음파 지문",
        "얼굴 인식"
      ]
    },
    "price": {
      "krw": "1,549,000원~",
      "usd": "$1199",
      "launchDate": "2025-08-28"
    },
    "source": "https://en.wikipedia.org/wiki/Pixel_10",
    "lastUpdated": "2026-04-29"
  },
  "Vision Pro M5": {
    "design": {
      "dimensions": "프론트 알루미늄 + 라미네이트 글래스",
      "weight": "헤드셋 600~650 g + 외부 배터리"
    },
    "display": {
      "size": "마이크로 OLED 2개",
      "resolution": "총 23M 픽셀",
      "panel": "micro-OLED",
      "refreshRate": "90/96/100 Hz"
    },
    "processor": {
      "ap": "Apple M5 + R1"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "—"
      },
      "front": "스테레오스코픽 3D · 6 LiDAR/카메라",
      "video": "Spatial Video · 4K HDR"
    },
    "battery": {
      "capacity": "외부 배터리 팩 (~2시간)",
      "chargingWired": "USB-C"
    },
    "connectivity": {
      "fiveG": false,
      "wifi": "Wi-Fi 6E",
      "bluetooth": "5.3",
      "usb": "USB-C",
      "nfc": false,
      "summary": "Wi‑Fi 6 , Bluetooth 5.3"
    },
    "os": {
      "initial": "visionOS 26"
    },
    "durability": {
      "ip": "—",
      "biometric": [
        "Optic ID"
      ]
    },
    "price": {
      "krw": "5,599,000원~",
      "usd": "$3499",
      "launchDate": "2025-10 (M5 갱신)"
    },
    "source": "https://en.wikipedia.org/wiki/Apple_Vision_Pro",
    "lastUpdated": "2026-04-29"
  },
  "Quest 3": {
    "design": {
      "dimensions": "184 × 160 × 98 mm",
      "weight": "515 g"
    },
    "display": {
      "size": "LCD 2개",
      "resolution": "2064×2208 (각)",
      "panel": "LCD with pancake lens",
      "refreshRate": "90/120 Hz"
    },
    "processor": {
      "ap": "Snapdragon XR2 Gen 2"
    },
    "memory": {
      "ram": "8 GB",
      "storage": [
        "128 GB",
        "512 GB"
      ]
    },
    "camera": {
      "rear": {
        "main": "컬러 패스스루 (4 외부)"
      }
    },
    "battery": {
      "capacity": "내장 (~2~2.2시간)",
      "chargingWired": "USB-C 18W"
    },
    "connectivity": {
      "fiveG": false,
      "wifi": "Wi-Fi 6E",
      "bluetooth": "5.2",
      "usb": "USB-C 3.0",
      "summary": "Wi-Fi 6E , Bluetooth 5.2"
    },
    "os": {
      "initial": "Horizon OS (Meta Quest)"
    },
    "durability": {
      "ip": "—",
      "biometric": []
    },
    "price": {
      "krw": "699,000원~",
      "usd": "$499",
      "launchDate": "2023-10-10"
    },
    "source": "https://en.wikipedia.org/wiki/Meta_Quest_3",
    "lastUpdated": "2026-04-29"
  },
  "Xiaomi 15 Ultra": {
    "design": {
      "dimensions": "161.3 × 75.3 × 9.4 mm",
      "weight": "229 g",
      "materials": "알루미늄 + 비건 가죽 옵션"
    },
    "display": {
      "size": "6.73″",
      "resolution": "3200×1440",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz",
      "brightness": "3200 nits peak"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 1\" Sony LYT-900",
        "ultrawide": "50 MP",
        "telephoto": "50 MP 3×",
        "periscope": "200 MP 4.3× HP9"
      },
      "front": "32 MP",
      "video": "8K@24fps",
      "rear_text": "50 MP (Primary, Leica, OIS), 50 MP (Ultra-wide), 50 MP (Telephoto)"
    },
    "battery": {
      "capacity": "6000 mAh",
      "chargingWired": "90 W HyperCharge",
      "chargingWireless": "80 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2",
      "nfc": true,
      "summary": "5G , Wi-Fi 7 , Bluetooth 6.0 , NFC , USB-C"
    },
    "os": {
      "initial": "HyperOS 2 (Android 15)",
      "updates": "4 OS + 6 보안"
    },
    "durability": {
      "ip": "IP68",
      "biometric": [
        "광학 지문"
      ]
    },
    "price": {
      "krw": "1,599,000원~",
      "usd": "~$1499",
      "launchDate": "2025-03-13"
    },
    "source": "https://en.wikipedia.org/wiki/Xiaomi_15_Ultra",
    "lastUpdated": "2026-04-29"
  },
  "OPPO Find X8 Pro": {
    "design": {
      "dimensions": "162.3 × 76.7 × 8.2 mm",
      "weight": "215 g"
    },
    "display": {
      "size": "6.78″",
      "resolution": "2780×1264",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz",
      "brightness": "4500 nits peak"
    },
    "processor": {
      "ap": "MediaTek Dimensity 9400"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP",
        "telephoto": "50 MP 3×",
        "periscope": "50 MP 6×"
      },
      "front": "32 MP",
      "video": "4K@120fps Dolby Vision"
    },
    "battery": {
      "capacity": "5910 mAh",
      "chargingWired": "80 W",
      "chargingWireless": "50 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "usb": "USB-C 3.2",
      "nfc": true
    },
    "os": {
      "initial": "ColorOS 15 (Android 15)"
    },
    "durability": {
      "ip": "IP68/IP69",
      "biometric": [
        "광학 지문"
      ]
    },
    "price": {
      "krw": "—",
      "usd": "~$1100",
      "launchDate": "2024-11-21"
    },
    "source": "https://en.wikipedia.org/wiki/Oppo_Find_X8",
    "lastUpdated": "2026-04-29"
  },
  "iPhone 17 Pro": {
    "design": {
      "materials": "Slate",
      "dimensions": "Pro: 150.0&#160;×&#160;71.9&#160;×&#160;8.75&#160;mm (5.91&#160;×&#160;2.83&#160;×&#160;0.34&#160;in) Pro Max: 163.4&#160;×&#160;78.0&#160;×&#160;8.75&#160;mm (6.43&#160;×&#160;3.07&#160;×&#160;0.34&#160;in)",
      "weight": "Pro: 206&#160;g (7.27&#160;oz) Pro Max: 233&#160;g (8.22&#160;oz)"
    },
    "display": {
      "panel": "Pro: 6.3&#160;in (160&#160;mm) 2622 × 1206 -pixel resolution at 460 ppi Pro Max: 6.9&#160;in (175&#160;mm) 2868 × 1320 -pixel resolution at 460 ppi ProMotion technology with adaptive refresh rates up to 120&#160;Hz Always-On display at 1&#160;Hz Wide colour gamut (P3) 2,000,000:1 contrast ratio (typical) 1,000 nits max brightness (typical) 1,600 nits peak brightness ( HDR ) 3,000 nits peak brightness (outdoor) 1 nit minimum brightness"
    },
    "processor": {
      "ap": "Apple A19 Pro"
    },
    "memory": {
      "ram": "12 GB LPDDR5X",
      "storage": "256 GB 512 GB 1 TB 2 TB (Pro Max only) NVMe"
    },
    "camera": {
      "rear_text": "Fusion Main: 48MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.78, 24mm (wide) Fusion Ultrawide: 48MP, f / 2.2, 13mm (ultrawide) Fusion Telephoto: 48MP, f / 2.8, 100mm (periscope telephoto) TOF 3D LiDAR scanner Dolby Vision ProRes ProRes RAW",
      "front": "18MP Centre Stage camera, f / 1.9, 23 mm (wide) Dolby Vision ProRes ProRes RAW"
    },
    "battery": {
      "capacity": "Pro: 15.534&#160;Wh (3988&#160;mAh) @ 3.895&#160;V (physical SIM) 16.558&#160;Wh (4252&#160;mAh) @ 3.894&#160;V (eSIM) Pro Max: 18.748&#160;Wh (4823&#160;mAh) @ 3.887&#160;V (physical SIM) 19.772&#160;Wh (5088&#160;mAh) @ 3.886&#160;V (eSIM) &#91; 2 &#93;",
      "chargingWired": "MagSafe and Qi 2 wireless USB-C fast-charge Up to 50% charge in 20 minutes with 40&#160;W adaptor or higher, provided via 15&#160;V"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 tri-band, Bluetooth 6.0 ( A2DP , LE ), Ultra-wideband , Thread , NFC (reader mode, Express Cards), LEO satellite ( Globalstar , limited), USB-C : USB 10Gbps , Dual-frequency GPS ( L1, &#160; L5 ), GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "Original: iOS 26 Current: iOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 dust/water resistant (up to 6 m for 30 minutes)"
    },
    "price": {
      "launchDate": "September&#160;19,&#160;2025 &#160;( 2025-09-19 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPhone_17_Pro"
  },
  "iPhone 17": {
    "design": {
      "materials": "Slate",
      "dimensions": "149.6&#160;mm ×&#160;71.5&#160;mm ×&#160;7.95&#160;mm (5.89&#160;in ×&#160;2.81&#160;in ×&#160;0.31&#160;in)",
      "weight": "177&#160;g (6.24&#160;oz)"
    },
    "display": {
      "panel": "6.3&#160;in (160&#160;mm) 2622 × 1206 resolution (~460 ppi density), 120&#160;Hz, LTPO Super Retina XDR OLED, HDR10, 1000 nits (typ), 3000 nits (peak)"
    },
    "processor": {
      "ap": "Apple A19"
    },
    "memory": {
      "ram": "8&#160;GB LPDDR5X",
      "storage": "256 GB 512 GB NVMe"
    },
    "camera": {
      "rear_text": "48 MP, f/1.6, 26 mm (wide) 48 MP, f/2.2, 13 mm (ultrawide)",
      "front": "18 MP, f/1.9, 23 mm (wide)"
    },
    "battery": {
      "capacity": "14.351&#160;Wh (3692&#160;mAh) @ 3.887&#160;V lithium-ion &#91; 2 &#93;",
      "chargingWired": "MagSafe and Qi 2 wireless USB-C fast-charge Up to 50% charge in 20 minutes with 40&#160;W adapter or higher"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 (802.11a/b/g/n/ac/ax/be) tri-band Bluetooth 6.0 ( A2DP , LE ) Ultra-wideband (UWB) Thread NFC (reader mode, Express Cards) USB-C : USB 2.0 480 Mbit/s Dual-frequency GPS ( L1, &#160; L5 ), GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "Original: iOS 26 Current: iOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 dust/water resistant (up to 6&#160;m for 30 minutes)"
    },
    "price": {
      "launchDate": "September&#160;19,&#160;2025 &#160;( 2025-09-19 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPhone_17"
  },
  "iPhone Air": {
    "design": {
      "materials": "Slate",
      "dimensions": "156.2&#160;×&#160;74.7&#160;×&#160;5.64&#160;mm (6.15&#160;×&#160;2.94&#160;×&#160;0.22&#160;in)",
      "weight": "165&#160;g (5.82&#160;oz)"
    },
    "display": {
      "panel": "6.5&#160;in (165&#160;mm) OLED, 2736 × 1260 resolution at 460 ppi, 120 Hz refresh rate"
    },
    "processor": {
      "ap": "Apple A19 Pro"
    },
    "memory": {
      "ram": "12 GB LPDDR5X",
      "storage": "256 GB, 512 GB or 1&#160;TB NVMe"
    },
    "camera": {
      "rear_text": "48 MP, f/1.6, 26 mm (wide)",
      "front": "18 MP, f/1.9 (wide)"
    },
    "battery": {
      "capacity": "12.263Wh (3149mAh) @ 3.894V &#91; 2 &#93;",
      "chargingWired": "MagSafe and Qi 2 wireless USB-C fast-charge"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 (802.11a/b/g/n/ac/ax/be) tri-band Bluetooth 6.0 ( A2DP , LE ) Ultra-wideband (UWB) Thread NFC (reader mode, Express Cards) USB-C : USB 2.0 480 Mbit/s Dual-frequency GPS ( L1, &#160; L5 ), GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "Original: iOS 26 Current: iOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 dust/water resistant (up to 6 m for 30 minutes)"
    },
    "price": {
      "launchDate": "September&#160;19,&#160;2025 &#160;( 2025-09-19 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPhone_Air"
  },
  "iPhone 16": {
    "design": {
      "materials": "Slate",
      "dimensions": "16 : 147.6&#160;×&#160;71.6&#160;×&#160;7.8&#160;mm (5.81&#160;×&#160;2.82&#160;×&#160;0.31&#160;in) 16 Plus : 160.9&#160;×&#160;77.8&#160;×&#160;7.8&#160;mm (6.33&#160;×&#160;3.06&#160;×&#160;0.31&#160;in)",
      "weight": "16: 170&#160;g (6.0&#160;oz) 16 Plus: 199&#160;g (7.0&#160;oz)"
    },
    "display": {
      "panel": "Super Retina XDR OLED 16: 6.1&#160;in (155&#160;mm) 2556 × 1179 resolution (~460 ppi density) 16 Plus: 6.7&#160;in (170&#160;mm) 2796 × 1290 resolution (~460 ppi density)"
    },
    "processor": {
      "ap": "Apple A18"
    },
    "memory": {
      "ram": "8&#160;GB LPDDR5X &#91; 2 &#93;",
      "storage": "128, 256 or 512 &#160; GB NVMe"
    },
    "camera": {
      "rear_text": "48 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.6, 26&#160;mm (wide) 12 MP, f / 2.2, 13&#160;mm (ultrawide)",
      "front": "12 MP, f / 1.9, 23&#160;mm (wide)"
    },
    "battery": {
      "capacity": "16: 13.84 Wh ( 3561 mAh ) Li-ion @ 3.89&#160;V 16 Plus: 18.11 Wh ( 4674 mAh ) Li-ion @ 3.88 V &#91; 3 &#93;",
      "chargingWired": "MagSafe and Qi 2 wireless USB-C fast-charge"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 (802.11a/b/g/n/ac/ax/be) tri-band Bluetooth 5.3 ( A2DP , LE ) Ultra-wideband (UWB) Thread NFC (reader mode, Express Cards) USB-C : USB 2.0 480&#160;Mbit/s GPS , GLONASS , Galileo , QZSS , BeiDou"
    },
    "os": {
      "initial": "Original: iOS 18 Current: iOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 dust/water resistant (up to 6&#160;m for 30&#160;min)"
    },
    "price": {
      "launchDate": "September&#160;20,&#160;2024 &#160;( 2024-09-20 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPhone_16"
  },
  "iPhone 16e": {
    "design": {
      "materials": "Slate",
      "dimensions": "146.7&#160;×&#160;71.5&#160;×&#160;7.8&#160;mm (5.78&#160;×&#160;2.81&#160;×&#160;0.31&#160;in)",
      "weight": "167&#160;g (5.9&#160;oz)"
    },
    "display": {
      "panel": "6.1&#160;in (150&#160;mm) 2532 × 1170 resolution at 60&#160;Hz"
    },
    "processor": {
      "ap": "Apple A18"
    },
    "memory": {
      "ram": "8&#160;GB LPDDR5X &#91; 2 &#93;",
      "storage": "128, 256 or 512 &#160; GB NVMe"
    },
    "camera": {
      "rear_text": "48 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.6, 26&#160;mm (wide)",
      "front": "12 MP, f / 1.9, 23&#160;mm (wide)"
    },
    "battery": {
      "capacity": "15.55&#160;W⋅h (4005&#160;mA⋅h) Li-ion @ 3.88&#160;V",
      "chargingWired": "Qi wireless up to 7.5&#160;W USB-C"
    },
    "connectivity": {
      "summary": "Wi-Fi 6 (802.11a/b/g/n/ac/ax) dual-band Bluetooth 5.3 ( A2DP , LE ) NFC (reader mode, Express Cards) USB-C : USB 2.0 480&#160;Mbit/s GPS , GLONASS , Galileo , QZSS , BeiDou , NavIC"
    },
    "os": {
      "initial": "Original: iOS 18.3 Current: iOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 dust/water resistant (up to 6&#160;m for 30&#160;min)"
    },
    "price": {
      "launchDate": "February&#160;28,&#160;2025 &#160;( 2025-02-28 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPhone_16e"
  },
  "iPad Pro M5": {
    "design": {
      "dimensions": "13-inch: 281.6&#160;mm (11.09&#160;in)&#160; (h) 215.5&#160;mm (8.48&#160;in)&#160; (w) 5.1&#160;mm (0.20&#160;in)&#160; (d) 11-inch: 249.7&#160;mm (9.83&#160;in)&#160; (h) 177.5&#160;mm (6.99&#160;in)&#160; (w) 5.3&#160;mm (0.21&#160;in)&#160; (d) &#91; 2 &#93;",
      "weight": "13-inch Wi-Fi: 579&#160;g (1.28 pounds) 13-inch Wi-Fi + Cellular: 582&#160;g (1.28 pounds) 11-inch Wi-Fi: 444&#160;g (0.98 pounds) 11-inch Wi-Fi + Cellular: 446&#160;g (0.98 pounds)"
    },
    "display": {},
    "processor": {
      "ap": "Apple M5"
    },
    "memory": {
      "ram": "12 or 16 GB LPDDR5X RAM &#91; a &#93;",
      "storage": "256 GB, 512 GB, 1 TB or 2 TB"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi-Fi 7 with 2x2 MIMO and Simultaneous dual band, Bluetooth 6 , Thread Wi-Fi + Cellular models 5G (sub‑6 GHz) with 4x4 MIMO, Gigabit LTE with 4x4 MIMO and LAA"
    },
    "os": {
      "initial": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} Original : iPadOS 26.0 Current: iPadOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {},
    "price": {
      "launchDate": "October&#160;22, 2025 &#59;&#32;6 months ago &#160;( 2025-10-22 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPad_Pro_%28M5%29"
  },
  "iPad Air M3": {
    "design": {
      "weight": "11\": 461 g (1.02 lbs) 13\": 617 g (1.36 lbs)"
    },
    "display": {
      "panel": "11 inches (280&#160;mm) 13 inches (330&#160;mm)"
    },
    "processor": {
      "ap": "Apple M3"
    },
    "memory": {
      "ram": "8 GB",
      "storage": "128 GB, 256 GB, 512 GB, 1 TB"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi-Fi 6E, Bluetooth 5.3, sub‑6 GHz 5G"
    },
    "os": {
      "initial": "Original : iPadOS 18.3.2 Current: iPadOS 26.4.2 , released April&#160;22,&#160;2026 &#160;( 2026-04-22 ) &#91; 1 &#93;"
    },
    "durability": {},
    "price": {
      "launchDate": "March&#160;12, 2025 &#59;&#32;13 months ago &#160;( 2025-03-12 )",
      "usd": "$599 USD (11\") / $799 USD (13\")"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPad_Air_%28M3%29"
  },
  "iPad mini A17 Pro": {
    "design": {},
    "display": {},
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi-Fi and cellular"
    },
    "os": {
      "initial": "iOS (2012–2019) iPadOS (2019–present)"
    },
    "durability": {},
    "price": {
      "launchDate": "November&#160;2, 2012 &#59;&#32;13 years ago &#160;( 2012-11-02 ) ( 1st generation )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/IPad_Mini"
  },
  "Apple Watch Ultra 3": {
    "design": {},
    "display": {
      "panel": "Retina display with OLED"
    },
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": ".mw-parser-output .hlist dl,.mw-parser-output .hlist ol,.mw-parser-output .hlist ul{margin:0;padding:0}.mw-parser-output .hlist dd,.mw-parser-output .hlist dt,.mw-parser-output .hlist li{margin:0;display:inline}.mw-parser-output .hlist.inline,.mw-parser-output .hlist.inline dl,.mw-parser-output .hlist.inline ol,.mw-parser-output .hlist.inline ul,.mw-parser-output .hlist dl dl,.mw-parser-output .hlist dl ol,.mw-parser-output .hlist dl ul,.mw-parser-output .hlist ol dl,.mw-parser-output .hlist ol ol,.mw-parser-output .hlist ol ul,.mw-parser-output .hlist ul dl,.mw-parser-output .hlist ul ol,.mw-parser-output .hlist ul ul{display:inline}.mw-parser-output .hlist .mw-empty-li{display:none}.mw-parser-output .hlist dt::after{content:\": \"}.mw-parser-output .hlist dd::after,.mw-parser-output .hlist li::after{content:\"\\a0 · \";font-weight:bold}.mw-parser-output .hlist dd:last-child::after,.mw-parser-output .hlist dt:last-child::after,.mw-parser-output .hlist li:last-child::after{content:none}.mw-parser-output .hlist dd dd:first-child::before,.mw-parser-output .hlist dd dt:first-child::before,.mw-parser-output .hlist dd li:first-child::before,.mw-parser-output .hlist dt dd:first-child::before,.mw-parser-output .hlist dt dt:first-child::before,.mw-parser-output .hlist dt li:first-child::before,.mw-parser-output .hlist li dd:first-child::before,.mw-parser-output .hlist li dt:first-child::before,.mw-parser-output .hlist li li:first-child::before{content:\" (\";font-weight:normal}.mw-parser-output .hlist dd dd:last-child::after,.mw-parser-output .hlist dd dt:last-child::after,.mw-parser-output .hlist dd li:last-child::after,.mw-parser-output .hlist dt dd:last-child::after,.mw-parser-output .hlist dt dt:last-child::after,.mw-parser-output .hlist dt li:last-child::after,.mw-parser-output .hlist li dd:last-child::after,.mw-parser-output .hlist li dt:last-child::after,.mw-parser-output .hlist li li:last-child::after{content:\")\";font-weight:normal}.mw-parser-output .hlist ol{counter-reset:listitem}.mw-parser-output .hlist ol>li{counter-increment:listitem}.mw-parser-output .hlist ol>li::before{content:\" \"counter(listitem)\"\\a0 \"}.mw-parser-output .hlist dd ol>li:first-child::before,.mw-parser-output .hlist dt ol>li:first-child::before,.mw-parser-output .hlist li ol>li:first-child::before{content:\" (\"counter(listitem)\"\\a0 \"} Wi-Fi 802.11 b / g / n Bluetooth NFC GPS"
    },
    "os": {
      "initial": "watchOS"
    },
    "durability": {},
    "price": {
      "launchDate": "April&#160;24, 2015 &#59;&#32;11 years ago &#160;( 2015-04-24 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Apple_Watch"
  },
  "Apple Watch Series 11": {
    "design": {},
    "display": {
      "panel": "Retina display with OLED"
    },
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": ".mw-parser-output .hlist dl,.mw-parser-output .hlist ol,.mw-parser-output .hlist ul{margin:0;padding:0}.mw-parser-output .hlist dd,.mw-parser-output .hlist dt,.mw-parser-output .hlist li{margin:0;display:inline}.mw-parser-output .hlist.inline,.mw-parser-output .hlist.inline dl,.mw-parser-output .hlist.inline ol,.mw-parser-output .hlist.inline ul,.mw-parser-output .hlist dl dl,.mw-parser-output .hlist dl ol,.mw-parser-output .hlist dl ul,.mw-parser-output .hlist ol dl,.mw-parser-output .hlist ol ol,.mw-parser-output .hlist ol ul,.mw-parser-output .hlist ul dl,.mw-parser-output .hlist ul ol,.mw-parser-output .hlist ul ul{display:inline}.mw-parser-output .hlist .mw-empty-li{display:none}.mw-parser-output .hlist dt::after{content:\": \"}.mw-parser-output .hlist dd::after,.mw-parser-output .hlist li::after{content:\"\\a0 · \";font-weight:bold}.mw-parser-output .hlist dd:last-child::after,.mw-parser-output .hlist dt:last-child::after,.mw-parser-output .hlist li:last-child::after{content:none}.mw-parser-output .hlist dd dd:first-child::before,.mw-parser-output .hlist dd dt:first-child::before,.mw-parser-output .hlist dd li:first-child::before,.mw-parser-output .hlist dt dd:first-child::before,.mw-parser-output .hlist dt dt:first-child::before,.mw-parser-output .hlist dt li:first-child::before,.mw-parser-output .hlist li dd:first-child::before,.mw-parser-output .hlist li dt:first-child::before,.mw-parser-output .hlist li li:first-child::before{content:\" (\";font-weight:normal}.mw-parser-output .hlist dd dd:last-child::after,.mw-parser-output .hlist dd dt:last-child::after,.mw-parser-output .hlist dd li:last-child::after,.mw-parser-output .hlist dt dd:last-child::after,.mw-parser-output .hlist dt dt:last-child::after,.mw-parser-output .hlist dt li:last-child::after,.mw-parser-output .hlist li dd:last-child::after,.mw-parser-output .hlist li dt:last-child::after,.mw-parser-output .hlist li li:last-child::after{content:\")\";font-weight:normal}.mw-parser-output .hlist ol{counter-reset:listitem}.mw-parser-output .hlist ol>li{counter-increment:listitem}.mw-parser-output .hlist ol>li::before{content:\" \"counter(listitem)\"\\a0 \"}.mw-parser-output .hlist dd ol>li:first-child::before,.mw-parser-output .hlist dt ol>li:first-child::before,.mw-parser-output .hlist li ol>li:first-child::before{content:\" (\"counter(listitem)\"\\a0 \"} Wi-Fi 802.11 b / g / n Bluetooth NFC GPS"
    },
    "os": {
      "initial": "watchOS"
    },
    "durability": {},
    "price": {
      "launchDate": "April&#160;24, 2015 &#59;&#32;11 years ago &#160;( 2015-04-24 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Apple_Watch"
  },
  "Apple Watch SE 3": {
    "design": {},
    "display": {
      "panel": "Retina display with OLED"
    },
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": ".mw-parser-output .hlist dl,.mw-parser-output .hlist ol,.mw-parser-output .hlist ul{margin:0;padding:0}.mw-parser-output .hlist dd,.mw-parser-output .hlist dt,.mw-parser-output .hlist li{margin:0;display:inline}.mw-parser-output .hlist.inline,.mw-parser-output .hlist.inline dl,.mw-parser-output .hlist.inline ol,.mw-parser-output .hlist.inline ul,.mw-parser-output .hlist dl dl,.mw-parser-output .hlist dl ol,.mw-parser-output .hlist dl ul,.mw-parser-output .hlist ol dl,.mw-parser-output .hlist ol ol,.mw-parser-output .hlist ol ul,.mw-parser-output .hlist ul dl,.mw-parser-output .hlist ul ol,.mw-parser-output .hlist ul ul{display:inline}.mw-parser-output .hlist .mw-empty-li{display:none}.mw-parser-output .hlist dt::after{content:\": \"}.mw-parser-output .hlist dd::after,.mw-parser-output .hlist li::after{content:\"\\a0 · \";font-weight:bold}.mw-parser-output .hlist dd:last-child::after,.mw-parser-output .hlist dt:last-child::after,.mw-parser-output .hlist li:last-child::after{content:none}.mw-parser-output .hlist dd dd:first-child::before,.mw-parser-output .hlist dd dt:first-child::before,.mw-parser-output .hlist dd li:first-child::before,.mw-parser-output .hlist dt dd:first-child::before,.mw-parser-output .hlist dt dt:first-child::before,.mw-parser-output .hlist dt li:first-child::before,.mw-parser-output .hlist li dd:first-child::before,.mw-parser-output .hlist li dt:first-child::before,.mw-parser-output .hlist li li:first-child::before{content:\" (\";font-weight:normal}.mw-parser-output .hlist dd dd:last-child::after,.mw-parser-output .hlist dd dt:last-child::after,.mw-parser-output .hlist dd li:last-child::after,.mw-parser-output .hlist dt dd:last-child::after,.mw-parser-output .hlist dt dt:last-child::after,.mw-parser-output .hlist dt li:last-child::after,.mw-parser-output .hlist li dd:last-child::after,.mw-parser-output .hlist li dt:last-child::after,.mw-parser-output .hlist li li:last-child::after{content:\")\";font-weight:normal}.mw-parser-output .hlist ol{counter-reset:listitem}.mw-parser-output .hlist ol>li{counter-increment:listitem}.mw-parser-output .hlist ol>li::before{content:\" \"counter(listitem)\"\\a0 \"}.mw-parser-output .hlist dd ol>li:first-child::before,.mw-parser-output .hlist dt ol>li:first-child::before,.mw-parser-output .hlist li ol>li:first-child::before{content:\" (\"counter(listitem)\"\\a0 \"} Wi-Fi 802.11 b / g / n Bluetooth NFC GPS"
    },
    "os": {
      "initial": "watchOS"
    },
    "durability": {},
    "price": {
      "launchDate": "April&#160;24, 2015 &#59;&#32;11 years ago &#160;( 2015-04-24 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Apple_Watch"
  },
  "Vision Pro 2": {
    "design": {
      "weight": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} M2: 600–650 g (21.2–22.9 oz) M5: 750–800 g (26.4–28.2 oz) (excluding 353 g battery))"
    },
    "display": {
      "panel": "Internal: ~3660×3200 per eye &#91; 3 &#93; dual OLED up to 100 Hz (M2) or 120 Hz (M5) refresh rate , &#91; 4 &#93; FoV ~100°×73° &#91; 5 &#93; External: \"EyeSight\" curved lenticular OLED &#91; 6 &#93;"
    },
    "processor": {
      "ap": "Apple M2 or M5 and Apple R1"
    },
    "memory": {
      "ram": "16 GB unified memory &#91; 2 &#93;",
      "storage": "256&#160;GB, 512&#160;GB or 1&#160;TB"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi‑Fi 6 , Bluetooth 5.3"
    },
    "os": {
      "initial": "visionOS 26 ( iPadOS -based &#91; 1 &#93; )"
    },
    "durability": {},
    "price": {
      "launchDate": "February 2, 2024 &#32;(2 years ago) &#160;( February 2, 2024 ) (M2 variant)",
      "usd": "US$3,499"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Apple_Vision_Pro"
  },
  "Galaxy S25+": {
    "design": {
      "materials": "Slate",
      "dimensions": "S25 : H: 146.9&#160;mm (5.78&#160;in) , W: 70.5&#160;mm (2.78&#160;in) , D: 7.2&#160;mm (0.28&#160;in) S25+ : H: 158.4&#160;mm (6.24&#160;in) , W: 75.8&#160;mm (2.98&#160;in) , D: 7.3&#160;mm (0.29&#160;in) S25 Ultra : H: 162.8&#160;mm (6.41&#160;in) , W: 77.6&#160;mm (3.06&#160;in) , D: 8.2&#160;mm (0.32&#160;in) S25 Edge : H: 158.2&#160;mm (6.23&#160;in) , W: 75.6&#160;mm (2.98&#160;in) , D: 5.8&#160;mm (0.23&#160;in)",
      "weight": "S25: 162&#160;g (5.7&#160;oz) S25+: 190&#160;g (6.7&#160;oz) S25 Edge: 163&#160;g (5.7&#160;oz) S25 Ultra: 218&#160;g (7.7&#160;oz)"
    },
    "display": {
      "panel": "Dynamic LTPO AMOLED 2X, 120 Hz, HDR10+ peak brightness 2600 nits S25 : 6.2&#160;in (160&#160;mm) 2340 × 1080 (416 ppi), 19.5:9 aspect ratio , 120&#160;Hz refresh rate LTPO S25+ & S25 Edge : 6.7&#160;in (170&#160;mm) 3120 × 1440 (513 ppi), 19.5:9 aspect ratio, 120 Hz LTPO S25 Ultra : 6.9&#160;in (180&#160;mm) 3120 × 1440 (498 ppi), 19.5:9 aspect ratio, 120&#160;Hz LTPO"
    },
    "processor": {
      "ap": "2x 4.47 GHz Oryon (Phoenix L) and 6x 3.53 GHz Oryon (Phoenix M)"
    },
    "memory": {
      "ram": "12 GB across lineup. 16 GB for only S25 Ultra 1 TB (Asia exclusive)",
      "storage": "S25 & S25 FE: 128/256/512 GB S25+ & S25 Edge: 256/512 GB S25 Ultra: 256/512 GB, 1 TB UFS 4.0"
    },
    "camera": {
      "rear_text": "S25 and S25+ : 50 MP, f/1.8, 24mm (wide), 1/1.56\", 1.0μm, Dual Pixel PDAF, OIS 10 MP, f/2.4, 67mm (telephoto), 1/3.94\", 1.0μm, PDAF, OIS, 3× optical zoom 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video S25 Ultra : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7μm, dual pixel PDAF, OIS, 5× optical zoom 10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12μm, PDAF, OIS, 3× optical zoom 50 MP, f/1.9, 120˚ (ultrawide), 0.7μm, dual pixel PDAF, Super Steady Video S25 Edge : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video",
      "front": "12 MP, f/2.2, 26mm (wide), 1.12μm, dual pixel PDAF HDR, HDR10+ 4K@30/60fps, 1080p@30fps"
    },
    "battery": {
      "capacity": "S25 : Li-ion 4000 mAh S25+ & S25 FE : Li-ion 4900 mAh S25 Ultra : Li-ion 5000 mAh S25 Edge : Li-ion 3900 mAh",
      "chargingWired": "S25 & S25 Edge: Super fast charging at 25W S25+ & S25 Ultra & S25 FE: Super fast charging 2.0 at 45W All: Qi2 wireless charging at up to 15W Reverse charging at 4.5W (wired and wireless)"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 802.11 a/b/g/n/ac/ax/be tri-band , Bluetooth 5.4 A2DP LE S25+/S25 Edge/S25 Ultra : UWB"
    },
    "os": {
      "initial": "All except S25 FE: Android 15 , up to 7 major Android upgrades, One UI 7 S25 FE: Android 16 , up to 7 major Android upgrades, One UI 8 &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 , up to 1.5&#160;m (4.9&#160;ft) for 30 minutes"
    },
    "price": {
      "launchDate": "S25, S25+ and S25 Ultra : January&#160;22, 2025 &#59;&#32;15 months ago &#160;( 2025-01-22 ) S25 Edge : May&#160;13, 2025 &#59;&#32;11 months ago &#160;( 2025-05-13 ) S25 FE : September&#160;4, 2025 &#59;&#32;7 months ago &#160;( 2025-09-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25"
  },
  "Galaxy S25": {
    "design": {
      "materials": "Slate",
      "dimensions": "S25 : H: 146.9&#160;mm (5.78&#160;in) , W: 70.5&#160;mm (2.78&#160;in) , D: 7.2&#160;mm (0.28&#160;in) S25+ : H: 158.4&#160;mm (6.24&#160;in) , W: 75.8&#160;mm (2.98&#160;in) , D: 7.3&#160;mm (0.29&#160;in) S25 Ultra : H: 162.8&#160;mm (6.41&#160;in) , W: 77.6&#160;mm (3.06&#160;in) , D: 8.2&#160;mm (0.32&#160;in) S25 Edge : H: 158.2&#160;mm (6.23&#160;in) , W: 75.6&#160;mm (2.98&#160;in) , D: 5.8&#160;mm (0.23&#160;in)",
      "weight": "S25: 162&#160;g (5.7&#160;oz) S25+: 190&#160;g (6.7&#160;oz) S25 Edge: 163&#160;g (5.7&#160;oz) S25 Ultra: 218&#160;g (7.7&#160;oz)"
    },
    "display": {
      "panel": "Dynamic LTPO AMOLED 2X, 120 Hz, HDR10+ peak brightness 2600 nits S25 : 6.2&#160;in (160&#160;mm) 2340 × 1080 (416 ppi), 19.5:9 aspect ratio , 120&#160;Hz refresh rate LTPO S25+ & S25 Edge : 6.7&#160;in (170&#160;mm) 3120 × 1440 (513 ppi), 19.5:9 aspect ratio, 120 Hz LTPO S25 Ultra : 6.9&#160;in (180&#160;mm) 3120 × 1440 (498 ppi), 19.5:9 aspect ratio, 120&#160;Hz LTPO"
    },
    "processor": {
      "ap": "2x 4.47 GHz Oryon (Phoenix L) and 6x 3.53 GHz Oryon (Phoenix M)"
    },
    "memory": {
      "ram": "12 GB across lineup. 16 GB for only S25 Ultra 1 TB (Asia exclusive)",
      "storage": "S25 & S25 FE: 128/256/512 GB S25+ & S25 Edge: 256/512 GB S25 Ultra: 256/512 GB, 1 TB UFS 4.0"
    },
    "camera": {
      "rear_text": "S25 and S25+ : 50 MP, f/1.8, 24mm (wide), 1/1.56\", 1.0μm, Dual Pixel PDAF, OIS 10 MP, f/2.4, 67mm (telephoto), 1/3.94\", 1.0μm, PDAF, OIS, 3× optical zoom 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video S25 Ultra : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7μm, dual pixel PDAF, OIS, 5× optical zoom 10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12μm, PDAF, OIS, 3× optical zoom 50 MP, f/1.9, 120˚ (ultrawide), 0.7μm, dual pixel PDAF, Super Steady Video S25 Edge : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video",
      "front": "12 MP, f/2.2, 26mm (wide), 1.12μm, dual pixel PDAF HDR, HDR10+ 4K@30/60fps, 1080p@30fps"
    },
    "battery": {
      "capacity": "S25 : Li-ion 4000 mAh S25+ & S25 FE : Li-ion 4900 mAh S25 Ultra : Li-ion 5000 mAh S25 Edge : Li-ion 3900 mAh",
      "chargingWired": "S25 & S25 Edge: Super fast charging at 25W S25+ & S25 Ultra & S25 FE: Super fast charging 2.0 at 45W All: Qi2 wireless charging at up to 15W Reverse charging at 4.5W (wired and wireless)"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 802.11 a/b/g/n/ac/ax/be tri-band , Bluetooth 5.4 A2DP LE S25+/S25 Edge/S25 Ultra : UWB"
    },
    "os": {
      "initial": "All except S25 FE: Android 15 , up to 7 major Android upgrades, One UI 7 S25 FE: Android 16 , up to 7 major Android upgrades, One UI 8 &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 , up to 1.5&#160;m (4.9&#160;ft) for 30 minutes"
    },
    "price": {
      "launchDate": "S25, S25+ and S25 Ultra : January&#160;22, 2025 &#59;&#32;15 months ago &#160;( 2025-01-22 ) S25 Edge : May&#160;13, 2025 &#59;&#32;11 months ago &#160;( 2025-05-13 ) S25 FE : September&#160;4, 2025 &#59;&#32;7 months ago &#160;( 2025-09-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25"
  },
  "Galaxy S25 Edge": {
    "design": {
      "materials": "Slate",
      "dimensions": "S25 : H: 146.9&#160;mm (5.78&#160;in) , W: 70.5&#160;mm (2.78&#160;in) , D: 7.2&#160;mm (0.28&#160;in) S25+ : H: 158.4&#160;mm (6.24&#160;in) , W: 75.8&#160;mm (2.98&#160;in) , D: 7.3&#160;mm (0.29&#160;in) S25 Ultra : H: 162.8&#160;mm (6.41&#160;in) , W: 77.6&#160;mm (3.06&#160;in) , D: 8.2&#160;mm (0.32&#160;in) S25 Edge : H: 158.2&#160;mm (6.23&#160;in) , W: 75.6&#160;mm (2.98&#160;in) , D: 5.8&#160;mm (0.23&#160;in)",
      "weight": "S25: 162&#160;g (5.7&#160;oz) S25+: 190&#160;g (6.7&#160;oz) S25 Edge: 163&#160;g (5.7&#160;oz) S25 Ultra: 218&#160;g (7.7&#160;oz)"
    },
    "display": {
      "panel": "Dynamic LTPO AMOLED 2X, 120 Hz, HDR10+ peak brightness 2600 nits S25 : 6.2&#160;in (160&#160;mm) 2340 × 1080 (416 ppi), 19.5:9 aspect ratio , 120&#160;Hz refresh rate LTPO S25+ & S25 Edge : 6.7&#160;in (170&#160;mm) 3120 × 1440 (513 ppi), 19.5:9 aspect ratio, 120 Hz LTPO S25 Ultra : 6.9&#160;in (180&#160;mm) 3120 × 1440 (498 ppi), 19.5:9 aspect ratio, 120&#160;Hz LTPO"
    },
    "processor": {
      "ap": "2x 4.47 GHz Oryon (Phoenix L) and 6x 3.53 GHz Oryon (Phoenix M)"
    },
    "memory": {
      "ram": "12 GB across lineup. 16 GB for only S25 Ultra 1 TB (Asia exclusive)",
      "storage": "S25 & S25 FE: 128/256/512 GB S25+ & S25 Edge: 256/512 GB S25 Ultra: 256/512 GB, 1 TB UFS 4.0"
    },
    "camera": {
      "rear_text": "S25 and S25+ : 50 MP, f/1.8, 24mm (wide), 1/1.56\", 1.0μm, Dual Pixel PDAF, OIS 10 MP, f/2.4, 67mm (telephoto), 1/3.94\", 1.0μm, PDAF, OIS, 3× optical zoom 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video S25 Ultra : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 50 MP, f/3.4, 111mm (periscope telephoto), 1/2.52\", 0.7μm, dual pixel PDAF, OIS, 5× optical zoom 10 MP, f/2.4, 67mm (telephoto), 1/3.52\", 1.12μm, PDAF, OIS, 3× optical zoom 50 MP, f/1.9, 120˚ (ultrawide), 0.7μm, dual pixel PDAF, Super Steady Video S25 Edge : 200 MP, f/1.7, 24mm (wide), 1/1.3\", 0.6μm, multi-directional PDAF, OIS 12 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 1.4μm, Super Steady video",
      "front": "12 MP, f/2.2, 26mm (wide), 1.12μm, dual pixel PDAF HDR, HDR10+ 4K@30/60fps, 1080p@30fps"
    },
    "battery": {
      "capacity": "S25 : Li-ion 4000 mAh S25+ & S25 FE : Li-ion 4900 mAh S25 Ultra : Li-ion 5000 mAh S25 Edge : Li-ion 3900 mAh",
      "chargingWired": "S25 & S25 Edge: Super fast charging at 25W S25+ & S25 Ultra & S25 FE: Super fast charging 2.0 at 45W All: Qi2 wireless charging at up to 15W Reverse charging at 4.5W (wired and wireless)"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 802.11 a/b/g/n/ac/ax/be tri-band , Bluetooth 5.4 A2DP LE S25+/S25 Edge/S25 Ultra : UWB"
    },
    "os": {
      "initial": "All except S25 FE: Android 15 , up to 7 major Android upgrades, One UI 7 S25 FE: Android 16 , up to 7 major Android upgrades, One UI 8 &#91; 1 &#93;"
    },
    "durability": {
      "ip": "IP68 , up to 1.5&#160;m (4.9&#160;ft) for 30 minutes"
    },
    "price": {
      "launchDate": "S25, S25+ and S25 Ultra : January&#160;22, 2025 &#59;&#32;15 months ago &#160;( 2025-01-22 ) S25 Edge : May&#160;13, 2025 &#59;&#32;11 months ago &#160;( 2025-05-13 ) S25 FE : September&#160;4, 2025 &#59;&#32;7 months ago &#160;( 2025-09-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25"
  },
  "Galaxy Z Flip7": {
    "design": {},
    "display": {},
    "processor": {
      "ap": "Qualcomm Snapdragon (2019–) Samsung Exynos (2025–)"
    },
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {},
    "os": {
      "initial": "Android"
    },
    "durability": {},
    "price": {
      "launchDate": "September&#160;6, 2019 &#59;&#32;6 years ago &#160;( 2019-09-06 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_series"
  },
  "Galaxy Z Fold6": {
    "design": {
      "materials": "Folio",
      "dimensions": "Folded: 153.5&#160;mm (6.04&#160;in) H 68.1&#160;mm (2.68&#160;in) W 12.1&#160;mm (0.48&#160;in) D Unfolded: 153.5&#160;mm (6.04&#160;in) H 132.6&#160;mm (5.22&#160;in) W 5.6&#160;mm (0.22&#160;in) D",
      "weight": "239&#160;g (8.4&#160;oz)"
    },
    "display": {
      "panel": "Foldable Dynamic LTPO AMOLED 2X, 120Hz, HDR10+, 2600 nits (peak), 7.6 inches (~91.0% screen-to-body ratio), 1856 × 2160 pixels, 20.9:18 aspect ratio, ~374 ppi"
    },
    "processor": {
      "ap": "Octa-core (1×3.39 GHz Cortex-X4 & 3×3.1 GHz Cortex-A720 & 2×2.9 GHz Cortex-A720 & 2×2.2 GHz Cortex-A520)"
    },
    "memory": {
      "ram": "12 GB LPDDR5X",
      "storage": "256 GB, 512 GB, 1 TB (UFS 4.0)"
    },
    "camera": {
      "rear_text": "50 MP, f/1.8, 23mm (wide), 1.0 μm, dual pixel PDAF, OIS 10 MP, f/2.4, 66mm (telephoto), 1.0 μm, PDAF, OIS, 3x optical zoom 12 MP, f/2.2, 123°, 12mm (ultrawide), 1.12 μm LED flash, HDR, panorama 8K@30fps, 4K@60fps, 1080p@60/120/240fps (gyro-EIS), 720p@960fps (gyro-EIS), HDR10+",
      "front": "4 MP, f/1.8, 26 mm (wide), 2.0 μm, under display Cover camera: 10 MP, f/2.2, 24 mm (wide), 1/3\", 1.22 μm HDR 4K@30/60fps, 1080p@30/60fps, gyro-EIS"
    },
    "battery": {
      "capacity": "Li-Ion 4400 mAh, non-removable",
      "chargingWired": "25W Super fast charging 2.0 15W Fast wireless charging 4.5W Reverse wireless charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11 a/b/g/n/ac/6e, tri-band, Wi-Fi Direct, Bluetooth 5.3, A2DP, LE, aptX HD, USB Type-C 3.2, OTG"
    },
    "os": {
      "initial": "Original : Android 14 with One UI 6.1.1 Current : Android 16 with One UI 8.0"
    },
    "durability": {
      "ip": "IP48 (up to 1.5m for 30 minutes)"
    },
    "price": {
      "launchDate": "Z Fold 6: July&#160;10, 2024 &#59;&#32;21 months ago &#160;( 2024-07-10 ) Z Fold SE: October&#160;21, 2024 &#59;&#32;18 months ago &#160;( 2024-10-21 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold_6"
  },
  "Galaxy Z Flip6": {
    "design": {},
    "display": {},
    "processor": {
      "ap": "Qualcomm Snapdragon (2019–) Samsung Exynos (2025–)"
    },
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {},
    "os": {
      "initial": "Android"
    },
    "durability": {},
    "price": {
      "launchDate": "September&#160;6, 2019 &#59;&#32;6 years ago &#160;( 2019-09-06 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_series"
  },
  "Galaxy Tab S11 Ultra": {
    "design": {
      "materials": "Bar",
      "dimensions": "Tab S11: 165.3 × 253.8 × 5.5 mm Tab S11 Ultra: 208.5 × 326.3 × 5.1 mm",
      "weight": "Tab S11: 469 g Tab S11 Ultra: 692 g"
    },
    "display": {},
    "processor": {
      "ap": "Octa-core (1x3.63 GHz Cortex-X925 & 3x3.3 GHz Cortex-X4 & 4x2.4 GHz Cortex-A720)"
    },
    "memory": {
      "ram": "Tab S11: 12 GB RAM Tab S11 Ultra: 12 GB, 16 GB RAM",
      "storage": "Tab S11: 128 GB, 256 GB, 512 GB Tab S11 Ultra: 256 GB, 512 GB, 1 TB"
    },
    "camera": {
      "rear_text": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} Single-Camera Setup Tab S11: OmniVision PureCel®Plus‑S OV13A10; 13 MP , .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f /2.0 , 26mm (wide), FoV 80.4°, 1/3.4\", 1.0&#160; µm , AF Dual-Camera Setup Tab S11 Ultra: Primary: OmniVision PureCel®Plus‑S OV13A10; 13 MP , f /2.0 , 26mm (wide), FoV 80.4°, 1/3.4\", 1.0&#160; µm , AF Ultrawide : Hynix Hi-847; 8 MP , f /2.2 , 16mm, FoV 120°, 1/4.4\", 1.0&#160; µm , FF Camera features: All: LED flash, HDR , Panorama Video recording: All: 4K @30 fps , 1080p @30 fps",
      "front": "All: OmniVision PureCel®Plus‑S OV13A10F; 12 MP , f /2.2 , 15mm, 120° (ultrawide), 1/3.4\", 1.0&#160; µm , FF Camera features: HDR Video recording: 4K @30 fps , 1080p @30 fps"
    },
    "battery": {
      "capacity": "Tab S11 : 8400 mAh non-user replaceable LiPo Tab S11 Ultra : 11600 mAh non-user replaceable LiPo",
      "chargingWired": "45 W USB PD charging"
    },
    "connectivity": {},
    "os": {
      "initial": "Android 16 with One UI 8"
    },
    "durability": {},
    "price": {
      "launchDate": "September&#160;4, 2025 &#59;&#32;7 months ago &#160;( 2025-09-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Tab_S11"
  },
  "Galaxy Tab S10 Ultra": {
    "design": {
      "materials": "Bar",
      "dimensions": "Tab S10+ : 285.4 x 185.4 x 5.6 mm (11.24 x 7.30 x 0.22 in) Tab S10 Ultra : 326.4 x 208.6 x 5.4 mm (12.85 x 8.21 x 0.21 in) Tab S10 FE : 254.3 x 165.8 x 6 mm (10.01 x 6.53 x 0.24 in) Tab S10 FE+ : 300.6 x 194.7 x 6 mm (11.83 x 7.67 x 0.24 in)",
      "weight": "Tab S10+ : 571g (Wi-Fi), 576g (5G) Tab S10 Ultra : 718g (Wi-Fi), 723g (5G) Tab S10 FE : 497g (Wi-Fi), 500g (5G) Tab S10 FE+ : 664g (Wi-Fi), 668g (5G)"
    },
    "display": {
      "panel": "Tab S10+ : 12.4&#160;in (310&#160;mm) diagonal Dynamic AMOLED 2X 1752 x 2800 px 16:10 aspect-ratio wide-screen 120HZ HDR10+ Tab S10 Ultra : 14.6&#160;in (370&#160;mm) diagonal Dynamic AMOLED 2X 1848 x 2960 px 16:10 aspect-ratio wide-screen 120HZ HDR10+ Tab S10 FE : 10.9&#160;in (280&#160;mm) diagonal Super PLS LCD 1440 x 2304 px 16:10 aspect-ratio wide-screen 90HZ HDR10 Tab S10 FE+ : 13.1&#160;in (330&#160;mm) diagonal Super PLS LCD 1800 x 2880 px 16:10 aspect-ratio wide-screen 90HZ HDR10"
    },
    "processor": {
      "ap": "Tab S10+/S10 Ultra : MediaTek Dimensity 9300+ (4nm) Tab S10 FE/S10 FE+ : Samsung Exynos 1580 (4nm)"
    },
    "memory": {
      "ram": "Tab S10+ : 12GB Tab S10 Ultra : 12GB/16GB Tab S10 FE/S10 FE+ : 8GB/12GB",
      "storage": "Tab S10+ : 256GB/512GB UFS 4.0 Tab S10 Ultra : 256GB/512GB/1TB UFS 4.0 Tab S10 FE/S10 FE+ : 128GB/256GB UFS 3.1"
    },
    "camera": {
      "rear_text": "Wide : 13 MP, f/2.0, 26mm, 1/3.4\", 1.0μm, AF Ultrawide : 8 MP, f/2.2",
      "front": "Ultrawide: 12MP 120° Wide (Tab S10 Ultra): 12MP 26mm"
    },
    "battery": {
      "capacity": "Tab S10+ and S10 FE+ : 10090 mAh non-user replaceable LiPo Tab S10 Ultra : 11200 mAh non-user replaceable LiPo Tab S10 FE : 8000 mAh non-user replaceable LiPo",
      "chargingWired": "45 W USB PD charging"
    },
    "connectivity": {},
    "os": {
      "initial": "Original (Tab S10+/S10 Ultra): Android 14 with One UI 6.1.1 Original (Tab S10 FE/S10 FE+/S10 Lite): Android 15 with One UI 7.0 Current (Tab S10+/S10 Ultra/S10 FE/S10 FE+/S10 Lite): Android 16 with One UI 8.0"
    },
    "durability": {
      "ip": "IP68 water resistance (1.5m of fresh water for 30 minutes) for tablet and S Pen"
    },
    "price": {
      "launchDate": "Tab S10+/S10 Ultra: September&#160;27, 2024 &#59;&#32;19 months ago &#160;( 2024-09-27 ) Tab S10 FE/FE+: April&#160;2, 2025 &#59;&#32;12 months ago &#160;( 2025-04-02 ) Tab S10 Lite: August&#160;25, 2025 &#59;&#32;8 months ago &#160;( 2025-08-25 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Tab_S10"
  },
  "Galaxy Watch8": {
    "design": {
      "dimensions": "40/44 mm 케이스",
      "weight": "30~34 g",
      "materials": "알루미늄"
    },
    "display": {
      "size": "1.34/1.47″",
      "panel": "Super AMOLED",
      "brightness": "3000 nits"
    },
    "processor": {
      "ap": "Exynos W1000"
    },
    "memory": {
      "ram": "2 GB",
      "storage": [
        "32 GB"
      ]
    },
    "battery": {
      "capacity": "325/435 mAh"
    },
    "connectivity": {
      "wifi": "Wi-Fi 5",
      "bluetooth": "5.3",
      "nfc": true
    },
    "os": {
      "initial": "Wear OS 6 (One UI Watch 8)"
    },
    "durability": {
      "ip": "IP68 + 5 ATM",
      "biometric": [
        "BioActive 센서"
      ]
    },
    "price": {
      "krw": "439,000원~",
      "usd": "$349",
      "launchDate": "2025-07-25"
    },
    "source": "https://www.samsung.com/sec/watches/galaxy-watch/",
    "lastUpdated": "2026-04-29"
  },
  "Galaxy Watch Ultra (2025)": {
    "design": {},
    "display": {},
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {},
    "os": {
      "initial": "Tizen 4.0"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "August&#160;24, 2018 &#59;&#32;7 years ago &#160;( 2018-08-24 ) (US)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Watch"
  },
  "Galaxy Ring": {
    "design": {
      "dimensions": "7.0 x 2.6 mm",
      "weight": "2.3 to 3.0 g"
    },
    "display": {},
    "processor": {},
    "memory": {
      "ram": "8 MB RAM"
    },
    "camera": {},
    "battery": {
      "capacity": "18-23.5 mAh"
    },
    "connectivity": {
      "summary": "BLE 5.4"
    },
    "os": {},
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "July&#160;10, 2024 &#59;&#32;21 months ago &#160;( 2024-07-10 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Samsung_Galaxy_Ring"
  },
  "Xiaomi 15 Pro": {
    "design": {
      "materials": "Slate",
      "dimensions": "15: 152.3 × 71.2 × 8.08 mm",
      "weight": "181&#160;g (6&#160;oz) 213 g (15 Pro/S Pro)"
    },
    "display": {
      "panel": "15: 6.36-inch LTPO AMOLED, 1.5K resolution, 120 Hz refresh rate, 3200 nits peak brightness 15 Pro/Ultra/S Pro: 6.73-inch LTPO AMOLED, 2K resolution, 120 Hz refresh rate, 3200 nits peak brightness"
    },
    "processor": {
      "ap": "Octa-core (1x 4.32 GHz Prime + 4x Performance + 3x Efficiency)"
    },
    "memory": {
      "ram": "12 GB / 16 GB LPDDR5X",
      "storage": "256 GB / 512 GB / 1 TB UFS 4.0"
    },
    "camera": {
      "rear_text": "50 MP (Primary, Leica, OIS), 50 MP (Ultra-wide), 50 MP (Telephoto)",
      "front": "32 MP (OmniVision OV32B40)"
    },
    "battery": {
      "capacity": "15: .mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 5240 mAh 5400 mAh (China) 15 Pro: 6100 mAh 15 Ultra: 5410 mAh 6000 mAh (China)",
      "chargingWired": "90W wired, 50W wireless"
    },
    "connectivity": {
      "summary": "5G , Wi-Fi 7 , Bluetooth 6.0 , NFC , USB-C"
    },
    "os": {
      "initial": "Original: Xiaomi HyperOS 2 (based on Android 15 ) Current: Xiaomi HyperOS 3 (based on Android 16)"
    },
    "durability": {},
    "price": {
      "launchDate": "15/Pro: October&#160;29, 2024 &#59;&#32;18 months ago &#160;( 2024-10-29 ) 15 Ultra: February&#160;27, 2025 &#59;&#32;14 months ago &#160;( 2025-02-27 ) 15S Pro: May&#160;22, 2025 &#59;&#32;11 months ago &#160;( 2025-05-22 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_15"
  },
  "Xiaomi 15": {
    "design": {
      "materials": "Slate",
      "dimensions": "15: 152.3 × 71.2 × 8.08 mm",
      "weight": "181&#160;g (6&#160;oz) 213 g (15 Pro/S Pro)"
    },
    "display": {
      "panel": "15: 6.36-inch LTPO AMOLED, 1.5K resolution, 120 Hz refresh rate, 3200 nits peak brightness 15 Pro/Ultra/S Pro: 6.73-inch LTPO AMOLED, 2K resolution, 120 Hz refresh rate, 3200 nits peak brightness"
    },
    "processor": {
      "ap": "Octa-core (1x 4.32 GHz Prime + 4x Performance + 3x Efficiency)"
    },
    "memory": {
      "ram": "12 GB / 16 GB LPDDR5X",
      "storage": "256 GB / 512 GB / 1 TB UFS 4.0"
    },
    "camera": {
      "rear_text": "50 MP (Primary, Leica, OIS), 50 MP (Ultra-wide), 50 MP (Telephoto)",
      "front": "32 MP (OmniVision OV32B40)"
    },
    "battery": {
      "capacity": "15: .mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 5240 mAh 5400 mAh (China) 15 Pro: 6100 mAh 15 Ultra: 5410 mAh 6000 mAh (China)",
      "chargingWired": "90W wired, 50W wireless"
    },
    "connectivity": {
      "summary": "5G , Wi-Fi 7 , Bluetooth 6.0 , NFC , USB-C"
    },
    "os": {
      "initial": "Original: Xiaomi HyperOS 2 (based on Android 15 ) Current: Xiaomi HyperOS 3 (based on Android 16)"
    },
    "durability": {},
    "price": {
      "launchDate": "15/Pro: October&#160;29, 2024 &#59;&#32;18 months ago &#160;( 2024-10-29 ) 15 Ultra: February&#160;27, 2025 &#59;&#32;14 months ago &#160;( 2025-02-27 ) 15S Pro: May&#160;22, 2025 &#59;&#32;11 months ago &#160;( 2025-05-22 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_15"
  },
  "Xiaomi 16 Pro": {
    "design": {
      "dimensions": "162.4 × 76.5 × 8.6 mm",
      "weight": "230 g"
    },
    "display": {
      "size": "6.78″",
      "resolution": "2832×1280",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite Gen 5"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP Light Fusion",
        "ultrawide": "50 MP",
        "telephoto": "50 MP 3×"
      },
      "front": "32 MP"
    },
    "battery": {
      "capacity": "6300 mAh",
      "chargingWired": "100 W",
      "chargingWireless": "50 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "nfc": true
    },
    "os": {
      "initial": "HyperOS 3 (Android 16)"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "usd": "~$700~",
      "launchDate": "2025-09-25"
    },
    "source": "https://en.wikipedia.org/wiki/Xiaomi_16",
    "lastUpdated": "2026-04-29"
  },
  "Xiaomi MIX Flip 2": {
    "design": {
      "materials": "Slate",
      "dimensions": "158.8&#160;mm ×&#160;81.9&#160;mm ×&#160;7.9&#160;mm (6.25&#160;in ×&#160;3.22&#160;in ×&#160;0.31&#160;in)",
      "weight": "209&#160;g (7.4&#160;oz)"
    },
    "display": {
      "panel": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 2040×1080 1080p IPS LCD , 6.4&#160;in (160&#160;mm), ( 362&#160; ppi )"
    },
    "processor": {
      "ap": "Quad-core (2× 2.35&#160;GHz Kryo & 2× 2.19&#160;GHz Kryo)"
    },
    "memory": {
      "ram": "4 or 6&#160; GB LPDDR4 RAM",
      "storage": "128 or 256&#160;GB UFS 2.0"
    },
    "camera": {
      "rear_text": "16&#160; MP ( 1&#160; μm ), f/ 2.0, 4K at 30&#160;fps , 1080p at 30&#160;fps , 720p at 120&#160;fps",
      "front": "5&#160; MP"
    },
    "battery": {
      "capacity": "Non-removable 4400&#160;mAh battery"
    },
    "connectivity": {
      "summary": "List Wi-Fi Wi-Fi Direct Wi-Fi hotspot GPS / GLONASS NFC Bluetooth 4.2 USB-C"
    },
    "os": {
      "initial": "Original : Android 6.0.1 \"Marshmallow\" With MIUI 8 Current : MIUI 11 based on Android 8.0 \"Oreo\""
    },
    "durability": {},
    "price": {
      "launchDate": "4&#160;November 2016 &#59;&#32;9 years ago &#160;( 2016-11-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_Mi_MIX"
  },
  "Xiaomi MIX Fold 4": {
    "design": {
      "materials": "Foldable",
      "dimensions": "Unfolded: 159.4 x 143.3 x 4.6 mm Folded: 159.4 x 73.1 x 9.5 mm",
      "weight": "226 g or 228 g (7.97 oz)"
    },
    "display": {
      "panel": "Foldable LTPO AMOLED, 1B colors, 120Hz, HDR10+, Dolby Vision, 1700 nits (HBM), 3000 nits (peak), 7.98 inches (~89.4% screen-to-body ratio), 2224 x 2488 pixels (~418 ppi)"
    },
    "processor": {
      "ap": "Octa-core (1x3.3 GHz Cortex-X4 & 3x3.2 GHz Cortex-A720 & 2x3.0 GHz Cortex-A720 & 2x2.3 GHz Cortex-A520)"
    },
    "memory": {
      "ram": "12 GB / 16 GB",
      "storage": "256 GB, 512 GB, 1 TB (UFS 4.0)"
    },
    "camera": {
      "rear_text": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 50 MP, f/1.7, 23mm (wide), 1/1.49\", 1.0µm, PDAF, OIS 50 MP, f/2.0, 47mm (telephoto), PDAF, OIS, 2x optical zoom 10 MP, f/2.9, 115mm (periscope telephoto), PDAF, OIS, 5x optical zoom 12 MP, f/2.2, 15mm, 120˚ (ultrawide) Laser AF, color spectrum sensor, LED flash, HDR, panorama, Leica lenses 8K@24fps, 4K@24/30/60fps, 1080p@30/60/120/240/960fps, 720p@1920fps, Dolby Vision HDR",
      "front": "16 MP, (wide) Cover camera: 16 MP, (wide) Dolby Vision HDR 1080p@30/60fps"
    },
    "battery": {
      "capacity": "Li-Po 5100 mAh, non-removable",
      "chargingWired": "67W wired, PD3.0, QC4, 31% in 10 min 50W wireless, 24% in 10 min"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11 a/b/g/n/ac/6e/7, dual-band (tri-band after SW update), Wi-Fi Direct, Bluetooth 5.4, A2DP, LE, aptX HD, aptX Adaptive, LHDC, NFC, Infrared port, USB Type-C 3.2, OTG"
    },
    "os": {
      "initial": "Original: Android 14 , Xiaomi HyperOS Current: Android 15 , Xiaomi HyperOS 2"
    },
    "durability": {
      "ip": "IPX8 (immersible up to 1.5m for 30 min)"
    },
    "price": {
      "launchDate": "2024, July 19"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_Mix_Fold_4"
  },
  "Redmi Note 14 Pro+": {
    "design": {
      "dimensions": "162.5 × 74.7 × 8.8 mm",
      "weight": "210 g"
    },
    "display": {
      "size": "6.67″",
      "resolution": "2712×1220",
      "panel": "AMOLED",
      "refreshRate": "120 Hz"
    },
    "processor": {
      "ap": "Snapdragon 7s Gen 3"
    },
    "memory": {
      "ram": "8/12 GB",
      "storage": [
        "256 GB",
        "512 GB"
      ]
    },
    "camera": {
      "rear": {
        "main": "200 MP",
        "ultrawide": "8 MP",
        "telephoto": "2 MP"
      },
      "front": "20 MP"
    },
    "battery": {
      "capacity": "5110 mAh",
      "chargingWired": "120 W"
    },
    "os": {
      "initial": "HyperOS (Android 14)"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "usd": "$329~",
      "launchDate": "2024-09-26"
    },
    "source": "https://en.wikipedia.org/wiki/Redmi_Note_14_series",
    "lastUpdated": "2026-04-29"
  },
  "Mi Band 10": {
    "design": {
      "dimensions": "152x486 pixels",
      "weight": "13&#160;g (0.46&#160;oz)"
    },
    "display": {
      "panel": "Type : AMOLED Size : 1.56-inch Resolution : 152x486 pixels Pixel Density : 326ppi"
    },
    "processor": {
      "ap": "Dialog SmartBond DA14580"
    },
    "memory": {
      "ram": "512KB RAM, 16MB storage"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Bluetooth 4.0"
    },
    "os": {
      "initial": "MI Band OS"
    },
    "durability": {},
    "price": {
      "launchDate": "July&#160;22,&#160;2014 &#160;( 2014-07-22 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_Mi_Band"
  },
  "Mi Band 9 Pro": {
    "design": {
      "dimensions": "152x486 pixels",
      "weight": "13&#160;g (0.46&#160;oz)"
    },
    "display": {
      "panel": "Type : AMOLED Size : 1.56-inch Resolution : 152x486 pixels Pixel Density : 326ppi"
    },
    "processor": {
      "ap": "Dialog SmartBond DA14580"
    },
    "memory": {
      "ram": "512KB RAM, 16MB storage"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Bluetooth 4.0"
    },
    "os": {
      "initial": "MI Band OS"
    },
    "durability": {},
    "price": {
      "launchDate": "July&#160;22,&#160;2014 &#160;( 2014-07-22 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Xiaomi_Mi_Band"
  },
  "Xiaomi Pad 7 Pro": {
    "design": {
      "dimensions": "251 × 173 × 6.2 mm",
      "weight": "500 g"
    },
    "display": {
      "size": "11.2″",
      "resolution": "3200×2136",
      "panel": "LCD 3.2K",
      "refreshRate": "144 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8s Gen 3"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "battery": {
      "capacity": "8850 mAh",
      "chargingWired": "67 W"
    },
    "connectivity": {
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4"
    },
    "os": {
      "initial": "HyperOS (Android 15)"
    },
    "price": {
      "krw": "—",
      "usd": "~$420",
      "launchDate": "2025-02-27"
    },
    "source": "https://www.mi.com/global/product/xiaomi-pad-7-pro/",
    "lastUpdated": "2026-04-29"
  },
  "Pixel 10 Pro": {
    "design": {
      "materials": "Slate",
      "dimensions": "Pixel 10 Pro: H :&#160;6.0&#160;in (152.8&#160;mm) W :&#160;2.8&#160;in (72&#160;mm) D :&#160;0.3&#160;in (8.6&#160;mm) Pixel 10 Pro XL: H :&#160;6.4&#160;in (162.8&#160;mm) W :&#160;3.0&#160;in (76.6&#160;mm) D :&#160;0.3&#160;in (8.5&#160;mm)",
      "weight": "Pixel 10 Pro: 7.3&#160;oz (207&#160;g) Pixel 10 Pro XL: 8.2&#160;oz (232&#160;g)"
    },
    "display": {
      "panel": "Pixel 10 Pro: 6.3&#160;in (161&#160;mm) FHD+ LTPO OLED at 495&#160;ppi 2856 × 1280 &#160;px (20:9) 2200 nits ( HDR ) 3300 nits (peak brightness) 1–120&#160;Hz refresh rate Pixel 10 Pro XL: 6.8&#160;in (172&#160;mm) QHD+ LTPO OLED at 486&#160;ppi 2992 × 1344 &#160;px (20:9) 2200 nits (HDR) 3300 nits (peak brightness) 1–120&#160;Hz refresh rate"
    },
    "processor": {
      "ap": "1x 3.78&#160;GHz Cortex-X4 + 5x 3.05&#160;GHz Cortex-A725 + 2x 2.25&#160;GHz Cortex-A520"
    },
    "memory": {
      "ram": "16&#160;GB LPDDR5X",
      "storage": "Pixel 10 Pro: 128&#160;GB UFS 3.1, 256&#160;GB UFS 4.0 512&#160;GB & 1&#160;TB Zoned UFS 4.0 Pixel 10 Pro XL: 256&#160;GB UFS 4.0 512&#160;GB & 1&#160;TB Zoned UFS 4.0"
    },
    "camera": {
      "rear_text": "50 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.68, 82˚ field of view (wide), 1/1.3\" 48 MP, f / 1.7, 123˚ field of view (ultrawide), 1/2.55\" 48 MP, f / 2.8, 22˚ field of view (telephoto), 5× optical zoom , 1/2.55\" 1080p video at 24, 30, or 60 FPS 4K video at 24, 30, or 60 FPS 8K video at 30 FPS",
      "front": "42 MP, f / 2.2, 103˚ field of view (ultrawide) 4K video at 30 or 60 FPS"
    },
    "battery": {
      "capacity": "Pixel 10 Pro: 4870&#160;mAh Pixel 10 Pro XL: 5200&#160;mAh",
      "chargingWired": "Pixel 10 Pro: 30&#160;W fast charging 15&#160;W Qi2 wireless charging Pixel 10 Pro XL: 45&#160;W fast charging 25&#160;W Qi2.2 wireless charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 + MIMO Bluetooth 6.0 NFC Google Cast Dual-band GNSS ( GPS / GLONASS / Galileo ) USB-C 3.2"
    },
    "os": {
      "initial": "Android 16"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "August&#160;28, 2025 &#59;&#32;8 months ago &#160;( 2025-08-28 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_10_Pro"
  },
  "Pixel 10": {
    "design": {
      "materials": "Slate",
      "dimensions": "Pixel 10: H :&#160;6.0&#160;in (152.8&#160;mm) W :&#160;2.8&#160;in (72&#160;mm) D :&#160;0.3&#160;in (8.6&#160;mm)",
      "weight": "7.2&#160;oz (204&#160;g)"
    },
    "display": {
      "panel": "6.3&#160;in (161&#160;mm) FHD+ 1080p OLED 2424 × 1080 &#160;px (20:9) aspect ratio at 422&#160; ppi HDR , 60–120&#160; Hz refresh rate"
    },
    "processor": {
      "ap": "1x 3.78&#160;GHz Cortex-X4 + 5x 3.05&#160;GHz Cortex-A725 + 2x 2.25&#160;GHz Cortex-A520"
    },
    "memory": {
      "ram": "12&#160;GB LPDDR5X",
      "storage": "128&#160;GB UFS 3.1, 256&#160;GB UFS 4.0"
    },
    "camera": {
      "rear_text": "48 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.7, 82˚ field of view (wide), 1/2\" 13 MP, f / 2.2, 120˚ field of view (ultrawide), 1/3.1\" 10.8 MP, f / 3.1, 23° field of view (telephoto), 5x optical zoom , 1/3.2\" 4K video at 24, 30, or 60 FPS 1080p video at 24, 30, or 60 FPS",
      "front": "10.5 MP, f / 2.2, 95˚ field of view (ultrawide) 4K video at 24, 30, or 60 FPS 1080p video at 24, 30, or 60 FPS"
    },
    "battery": {
      "capacity": "4970&#160; mAh",
      "chargingWired": "29&#160;W fast charging 15&#160;W Qi2 wireless charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 6E + MIMO Bluetooth 6.0 NFC Google Cast Dual-band GNSS ( GPS / GLONASS / Galileo ) USB-C 3.2"
    },
    "os": {
      "initial": "Android 16"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "August&#160;28, 2025 &#59;&#32;8 months ago &#160;( 2025-08-28 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_10"
  },
  "Pixel 10 Pro Fold": {
    "design": {
      "materials": "Foldable",
      "dimensions": "Folded: H :&#160;6.1&#160;in (155.2&#160;mm) W :&#160;3.0&#160;in (76.3&#160;mm) D :&#160;0.4&#160;in (10.8&#160;mm) Unfolded: H :&#160;6.1&#160;in (155.2&#160;mm) W :&#160;5.9&#160;in (150.4&#160;mm) D :&#160;0.2&#160;in (5.2&#160;mm)",
      "weight": "9.1&#160;oz (258&#160;g)"
    },
    "display": {
      "panel": "Folded: 6.4&#160;in (162&#160;mm)? FHD+ 1080p OLED at 408&#160; ppi ? 2364 × 1080 &#160;px (20:9) 60-120&#160; Hz refresh rate Unfolded: 8.0&#160;in (204&#160;mm) FHD+ LTPO OLED at 373&#160; ppi 2152 × 2076 &#160;px (1.04:1) 1-120&#160; Hz refresh rate Both: HDR"
    },
    "processor": {
      "ap": "1x 3.78&#160;GHz Cortex-X4 + 5x 3.05&#160;GHz Cortex-A725 + 2x 2.25&#160;GHz Cortex-A520"
    },
    "memory": {
      "ram": "16&#160;GB LPDDR5X",
      "storage": "256&#160;GB UFS 4.0 512&#160;GB & 1&#160;TB Zoned UFS 4.0"
    },
    "camera": {
      "rear_text": "48 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.7, 82˚ field of view (wide), 1/2\" 10.5 MP, f / 2.2, 127˚ field of view (ultrawide), 1/3.4\" 10.8 MP, f / 3.1, 23° field of view (telephoto), 5x optical zoom , 1/3.4\" 4K video at 24, 30, 60 FPS 1080p video at 24, 30, 60 FPS",
      "front": "Front & Inner: 10 MP, f / 2.2, 87˚ field of view (ultrawide) 4K video at 24, 30, 60 FPS 1080p video at 24, 30, 60 FPS"
    },
    "battery": {
      "capacity": "5015&#160; mAh",
      "chargingWired": "30&#160;W fast charging 15&#160;W Qi2 wireless charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 + MIMO Bluetooth 6.0 NFC Google Cast Dual-band GNSS ( GPS / GLONASS / Galileo ) USB-C 3.2"
    },
    "os": {
      "initial": "Android 16"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "October&#160;9, 2025 &#59;&#32;6 months ago &#160;( 2025-10-09 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_10_Pro_Fold"
  },
  "Pixel 9 Pro XL": {
    "design": {
      "materials": "Slate",
      "dimensions": "Pixel 9 and 9 Pro: H :&#160;6.0&#160;in (152.8&#160;mm) W :&#160;2.8&#160;in (72&#160;mm) D :&#160;0.3&#160;in (8.5&#160;mm) Pixel 9 Pro XL: H :&#160;6.4&#160;in (162.8&#160;mm) W :&#160;3.0&#160;in (76.6&#160;mm) D :&#160;0.3&#160;in (8.5&#160;mm)",
      "weight": "Pixel 9: 7.0&#160;oz (198&#160;g) Pixel 9 Pro: 7.0&#160;oz (199&#160;g) Pixel 9 Pro XL: 7.8&#160;oz (221&#160;g)"
    },
    "display": {
      "panel": "Pixel 9: 6.3&#160;in (160&#160;mm) FHD+ 1080p OLED at 422&#160; ppi 2424 × 1080 &#160;px (20:9) 60–120&#160; Hz refresh rate Pixel 9 Pro: 6.3&#160;in (161&#160;mm) FHD+ 1080p LTPO OLED at 495&#160;ppi 2856 × 1280 &#160;px (20:9) 1–120&#160;Hz refresh rate Pixel 9 Pro XL: 6.7&#160;in (171&#160;mm) QHD+ 1440p LTPO OLED at 486&#160;ppi 2992 × 1344 &#160;px (20:9) 1–120&#160;Hz refresh rate All: HDR"
    },
    "processor": {
      "ap": "1x 3.1&#160;GHz Cortex-X4 + 3x 2.6&#160;GHz Cortex-A720 + 4x 1.9&#160;GHz Cortex-A520"
    },
    "memory": {
      "ram": "Pixel 9: 12&#160;GB LPDDR5X Pixel 9 Pro and 9 Pro XL: 16&#160;GB LPDDR5X",
      "storage": "Pixel 9: 128 or 256&#160;GB UFS 3.1 Pixel 9 Pro and 9 Pro XL: 128&#160;GB, 256&#160;GB, 512&#160;GB, or 1&#160;TB UFS 3.1"
    },
    "camera": {
      "rear_text": "All: 50 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.68, 82˚ field of view (wide) 48 MP, f / 1.7, 123˚ field of view (ultrawide) 4K video at 24, 30, or 60 FPS 1080p video at 24, 30, or 60 FPS Pixel 9 Pro and 9 Pro XL: 48 MP, f / 2.8, 22˚ field of view (telephoto), 5× optical zoom 8K video at 30 FPS",
      "front": "Pixel 9: 10.5 MP, f / 2.2, 95˚ field of view (ultrawide) Pixel 9 Pro and 9 Pro XL: 42 MP, f / 2.2, 103˚ field of view (ultrawide) All: 4K video at 30 or 60 FPS"
    },
    "battery": {
      "capacity": "Pixel 9 and 9 Pro: 4700&#160;mAh Pixel 9 Pro XL: 5060&#160;mAh",
      "chargingWired": "All: Reverse wireless charging Pixel 9: 27&#160;W fast charging 15&#160;W Qi wireless charging Pixel 9 Pro: 27&#160;W fast charging 21&#160;W Qi wireless charging Pixel 9 Pro XL: 37&#160;W fast charging 23&#160;W Qi wireless charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 7 + MIMO Bluetooth 5.3 NFC Google Cast Dual-band GNSS ( GPS / GLONASS / Galileo ) USB-C 3.2"
    },
    "os": {
      "initial": "Android 14 , upgradable to Android 16"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "Pixel 9 and 9 Pro XL: August&#160;22, 2024 &#59;&#32;20 months ago &#160;( 2024-08-22 ) Pixel 9 Pro: September&#160;4, 2024 &#59;&#32;19 months ago &#160;( 2024-09-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_9"
  },
  "Pixel 9a": {
    "design": {
      "materials": "Slate",
      "dimensions": "154.7&#160;mm (6.09&#160;in) H 73.3&#160;mm (2.89&#160;in) W 8.9&#160;mm (0.35&#160;in) D",
      "weight": "185.9&#160;g (6.56&#160;oz)"
    },
    "display": {
      "panel": "6.3&#160;in (160.0&#160;mm) 1080p FHD+ OLED 1080 × 2424 px resolution, 20:9 aspect ratio (~422.2 ppi density) HDR , 60-120 &#160; Hz refresh rate , Corning Gorilla Glass 3"
    },
    "processor": {
      "ap": "Google Tensor G4"
    },
    "memory": {
      "ram": "8 GB LPDDR5X",
      "storage": "128 or 256&#160;GB UFS 3.1"
    },
    "camera": {
      "rear_text": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 48 MP , .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.7, 82° (wide), 1/2\", 0.8&#160;μm, Quad-PD Dual Pixel CLAF, OIS 13 MP , f / 2.2, 120˚ (ultrawide), 1.12&#160;μm, EIS Pixel Shift, Auto-HDR, panorama 4K@30/60fps, 1080p@30/60/120fps; gyro-EIS, OIS",
      "front": "13 MP , f / 2.2, 96.1° (ultrawide), 1.12&#160;μm Auto-HDR, panorama 4K@30fps, 1080p@30fps"
    },
    "battery": {
      "capacity": "5100 mAh",
      "chargingWired": "Fast charging up to 23W 7.5W Qi wireless charging"
    },
    "connectivity": {},
    "os": {
      "initial": "Original: Android 15 Current: Android 16"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "launchDate": "April&#160;10, 2025 &#59;&#32;12 months ago &#160;( 2025-04-10 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_9a"
  },
  "Pixel Tablet 2": {
    "design": {
      "dimensions": "258&#160;mm (10.2&#160;in) × 169&#160;mm (6.7&#160;in) × 8.1&#160;mm (0.3&#160;in)",
      "weight": "493&#160;g (17.39&#160;oz)"
    },
    "display": {},
    "processor": {
      "ap": "Google Tensor G2"
    },
    "memory": {
      "ram": "8 GB LPDDR5 RAM",
      "storage": "128/256 GB UFS 3.1 non-expandable"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": ".mw-parser-output .hlist dl,.mw-parser-output .hlist ol,.mw-parser-output .hlist ul{margin:0;padding:0}.mw-parser-output .hlist dd,.mw-parser-output .hlist dt,.mw-parser-output .hlist li{margin:0;display:inline}.mw-parser-output .hlist.inline,.mw-parser-output .hlist.inline dl,.mw-parser-output .hlist.inline ol,.mw-parser-output .hlist.inline ul,.mw-parser-output .hlist dl dl,.mw-parser-output .hlist dl ol,.mw-parser-output .hlist dl ul,.mw-parser-output .hlist ol dl,.mw-parser-output .hlist ol ol,.mw-parser-output .hlist ol ul,.mw-parser-output .hlist ul dl,.mw-parser-output .hlist ul ol,.mw-parser-output .hlist ul ul{display:inline}.mw-parser-output .hlist .mw-empty-li{display:none}.mw-parser-output .hlist dt::after{content:\": \"}.mw-parser-output .hlist dd::after,.mw-parser-output .hlist li::after{content:\"\\a0 · \";font-weight:bold}.mw-parser-output .hlist dd:last-child::after,.mw-parser-output .hlist dt:last-child::after,.mw-parser-output .hlist li:last-child::after{content:none}.mw-parser-output .hlist dd dd:first-child::before,.mw-parser-output .hlist dd dt:first-child::before,.mw-parser-output .hlist dd li:first-child::before,.mw-parser-output .hlist dt dd:first-child::before,.mw-parser-output .hlist dt dt:first-child::before,.mw-parser-output .hlist dt li:first-child::before,.mw-parser-output .hlist li dd:first-child::before,.mw-parser-output .hlist li dt:first-child::before,.mw-parser-output .hlist li li:first-child::before{content:\" (\";font-weight:normal}.mw-parser-output .hlist dd dd:last-child::after,.mw-parser-output .hlist dd dt:last-child::after,.mw-parser-output .hlist dd li:last-child::after,.mw-parser-output .hlist dt dd:last-child::after,.mw-parser-output .hlist dt dt:last-child::after,.mw-parser-output .hlist dt li:last-child::after,.mw-parser-output .hlist li dd:last-child::after,.mw-parser-output .hlist li dt:last-child::after,.mw-parser-output .hlist li li:last-child::after{content:\")\";font-weight:normal}.mw-parser-output .hlist ol{counter-reset:listitem}.mw-parser-output .hlist ol>li{counter-increment:listitem}.mw-parser-output .hlist ol>li::before{content:\" \"counter(listitem)\"\\a0 \"}.mw-parser-output .hlist dd ol>li:first-child::before,.mw-parser-output .hlist dt ol>li:first-child::before,.mw-parser-output .hlist li ol>li:first-child::before{content:\" (\"counter(listitem)\"\\a0 \"} Wi-Fi 6 (802.11 a/b/g/n/ac/ax) + MIMO Bluetooth 5.2 Ultra-wideband chip Google Cast"
    },
    "os": {
      "initial": "Android 13 Upgradable to Android 16 and Android 17 Beta"
    },
    "durability": {},
    "price": {
      "launchDate": "June&#160;20, 2023 &#59;&#32;2 years ago &#160;( 2023-06-20 )",
      "usd": "$399 (128GB, tablet only), $499 (256GB, tablet only), $499 (128 GB, tablet + dock), $599 (256 GB, tablet + dock)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_Tablet"
  },
  "Pixel Tablet": {
    "design": {
      "dimensions": "258&#160;mm (10.2&#160;in) × 169&#160;mm (6.7&#160;in) × 8.1&#160;mm (0.3&#160;in)",
      "weight": "493&#160;g (17.39&#160;oz)"
    },
    "display": {},
    "processor": {
      "ap": "Google Tensor G2"
    },
    "memory": {
      "ram": "8 GB LPDDR5 RAM",
      "storage": "128/256 GB UFS 3.1 non-expandable"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": ".mw-parser-output .hlist dl,.mw-parser-output .hlist ol,.mw-parser-output .hlist ul{margin:0;padding:0}.mw-parser-output .hlist dd,.mw-parser-output .hlist dt,.mw-parser-output .hlist li{margin:0;display:inline}.mw-parser-output .hlist.inline,.mw-parser-output .hlist.inline dl,.mw-parser-output .hlist.inline ol,.mw-parser-output .hlist.inline ul,.mw-parser-output .hlist dl dl,.mw-parser-output .hlist dl ol,.mw-parser-output .hlist dl ul,.mw-parser-output .hlist ol dl,.mw-parser-output .hlist ol ol,.mw-parser-output .hlist ol ul,.mw-parser-output .hlist ul dl,.mw-parser-output .hlist ul ol,.mw-parser-output .hlist ul ul{display:inline}.mw-parser-output .hlist .mw-empty-li{display:none}.mw-parser-output .hlist dt::after{content:\": \"}.mw-parser-output .hlist dd::after,.mw-parser-output .hlist li::after{content:\"\\a0 · \";font-weight:bold}.mw-parser-output .hlist dd:last-child::after,.mw-parser-output .hlist dt:last-child::after,.mw-parser-output .hlist li:last-child::after{content:none}.mw-parser-output .hlist dd dd:first-child::before,.mw-parser-output .hlist dd dt:first-child::before,.mw-parser-output .hlist dd li:first-child::before,.mw-parser-output .hlist dt dd:first-child::before,.mw-parser-output .hlist dt dt:first-child::before,.mw-parser-output .hlist dt li:first-child::before,.mw-parser-output .hlist li dd:first-child::before,.mw-parser-output .hlist li dt:first-child::before,.mw-parser-output .hlist li li:first-child::before{content:\" (\";font-weight:normal}.mw-parser-output .hlist dd dd:last-child::after,.mw-parser-output .hlist dd dt:last-child::after,.mw-parser-output .hlist dd li:last-child::after,.mw-parser-output .hlist dt dd:last-child::after,.mw-parser-output .hlist dt dt:last-child::after,.mw-parser-output .hlist dt li:last-child::after,.mw-parser-output .hlist li dd:last-child::after,.mw-parser-output .hlist li dt:last-child::after,.mw-parser-output .hlist li li:last-child::after{content:\")\";font-weight:normal}.mw-parser-output .hlist ol{counter-reset:listitem}.mw-parser-output .hlist ol>li{counter-increment:listitem}.mw-parser-output .hlist ol>li::before{content:\" \"counter(listitem)\"\\a0 \"}.mw-parser-output .hlist dd ol>li:first-child::before,.mw-parser-output .hlist dt ol>li:first-child::before,.mw-parser-output .hlist li ol>li:first-child::before{content:\" (\"counter(listitem)\"\\a0 \"} Wi-Fi 6 (802.11 a/b/g/n/ac/ax) + MIMO Bluetooth 5.2 Ultra-wideband chip Google Cast"
    },
    "os": {
      "initial": "Android 13 Upgradable to Android 16 and Android 17 Beta"
    },
    "durability": {},
    "price": {
      "launchDate": "June&#160;20, 2023 &#59;&#32;2 years ago &#160;( 2023-06-20 )",
      "usd": "$399 (128GB, tablet only), $499 (256GB, tablet only), $499 (128 GB, tablet + dock), $599 (256 GB, tablet + dock)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_Tablet"
  },
  "Pixel Watch 4": {
    "design": {
      "dimensions": "41/45mm",
      "weight": "31/36.7g (without strap)"
    },
    "display": {},
    "processor": {
      "ap": "4x ARM Cortex A53 &#91; 1 &#93; + 1x ARM Cortex M55 (co-processor) &#91; 2 &#93;"
    },
    "memory": {
      "ram": "2 GB SDRAM",
      "storage": "32 GB eMMC flash"
    },
    "camera": {},
    "battery": {
      "capacity": "325 mAh (41mm)/455 mAh (45mm)"
    },
    "connectivity": {},
    "os": {
      "initial": "Wear OS 6"
    },
    "durability": {},
    "price": {
      "launchDate": "October&#160;9, 2025 &#59;&#32;6 months ago &#160;( 2025-10-09 ) (GA)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_Watch_4"
  },
  "Pixel Watch 3": {
    "design": {},
    "display": {},
    "processor": {
      "ap": "ARM Cortex M33"
    },
    "memory": {
      "ram": "2 GB SDRAM",
      "storage": "32 GB eMMC flash"
    },
    "camera": {},
    "battery": {
      "capacity": "307 mAh (41mm)/420 mAh (45mm)"
    },
    "connectivity": {},
    "os": {
      "initial": "Wear OS 6"
    },
    "durability": {},
    "price": {
      "launchDate": "September&#160;10, 2024 &#59;&#32;19 months ago &#160;( 2024-09-10 ) (GA)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Pixel_Watch_3"
  },
  "Mate 80 Pro": {
    "design": {
      "dimensions": "163 × 75.5 × 8.3 mm",
      "weight": "218 g"
    },
    "display": {
      "size": "6.8″",
      "resolution": "2848×1276",
      "panel": "LTPO OLED",
      "refreshRate": "1–120 Hz"
    },
    "processor": {
      "ap": "Kirin 9030"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 가변조리개",
        "ultrawide": "40 MP",
        "telephoto": "48 MP 3.5×"
      },
      "front": "13 MP"
    },
    "battery": {
      "capacity": "5500 mAh",
      "chargingWired": "100 W",
      "chargingWireless": "80 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7"
    },
    "os": {
      "initial": "HarmonyOS 5"
    },
    "durability": {
      "ip": "IP68/IP69"
    },
    "price": {
      "usd": "~$1100",
      "launchDate": "2025-11-26"
    },
    "source": "https://consumer.huawei.com/cn/phones/mate70/",
    "lastUpdated": "2026-04-29"
  },
  "Mate 70 Pro+": {
    "design": {
      "materials": "Slate",
      "weight": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} Mate 70: 203&#160;g (7.2&#160;oz) Mate 70 Pro: 221&#160;g (7.8&#160;oz) Mate 70 Pro+: 226&#160;g (8.0&#160;oz) Mate 70 RS: 251&#160;g (8.9&#160;oz)"
    },
    "display": {
      "panel": "1 panel: 6.9&#160;in (180&#160;mm) Resolution: 1316 x 2832 px"
    },
    "processor": {
      "ap": "Mate 70 : HiSilicon Kirin 9010 (7&#160;nm) Mate 70 Pro, Pro+, and RS : HiSilicon Kirin 9020"
    },
    "memory": {
      "ram": "Mate 70, Pro: 12 GB RAM ( LPDDR5 specification) Mate 70 Pro+, RS: 16GB (LPDDR5)",
      "storage": "Mate 70, 70 Pro: 256GB / 512GB / 1TB ROM Mate 70 Pro+, RS: 512GB / 1TB ROM ( UFS 4.0 specification)"
    },
    "camera": {
      "rear_text": "50 MP, f/1.4-f/4.0, 24mm (wide), PDAF, OIS 12 MP, f/2.1, 93mm (periscope telephoto), PDAF, OIS, 3.5x Optical zoom 40 MP, f/2.2, 13mm, 120˚ (ultrawide), PDAF",
      "front": "13 MP, f/2.4, 18mm (ultrawide) TOF 3D, (depth/biometrics sensor)"
    },
    "battery": {
      "capacity": "Mate 70: 5,300mAh (rated), not removable or replaceable Mate 70 Pro: 5,500mAh (rated), not removable or replaceable Mate 70 Pro+,RS: 5,700mAh (rated), not removable or replaceable",
      "chargingWired": "Mate 70: Wired charging: 66W, Wireless charging: 50W, Wireless reverse charging: 20W, Wired reverse charging: 18W Mate 70 Pro, Pro+, and RS: Wired charging: 100W, Wireless charging: 80W, Wireless reverse charging: 7.5W, Wired reverse charging: 5W"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11a/b/g/n/ac/ax/be, 2x2 MIMO, HE160, 4096 QAM, 8 spatial-stream sounding MU-MIMO Bluetooth 5.2, Bluetooth Low Energy, SBC, AAC, LDAC and L2HC, HD audio NearLink USB 3.1 Gen1 Type-C"
    },
    "os": {
      "initial": "HarmonyOS 5 (Pioneer SKU) also supports HarmonyOS 4.3 standard SKU Current: HarmonyOS 6"
    },
    "durability": {},
    "price": {
      "launchDate": "November 26, 2024"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Huawei_Mate_70"
  },
  "Pura 80 Ultra": {
    "design": {
      "dimensions": "162.6 × 76.1 × 8.3 mm",
      "weight": "234 g"
    },
    "display": {
      "size": "6.8″",
      "resolution": "2844×1276",
      "panel": "LTPO OLED",
      "refreshRate": "1–120 Hz"
    },
    "processor": {
      "ap": "Kirin 9020"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 1\" 가변조리개",
        "ultrawide": "40 MP",
        "telephoto": "전환식 망원 (3.7× / 9.4×)"
      },
      "front": "13 MP"
    },
    "battery": {
      "capacity": "5170 mAh",
      "chargingWired": "100 W",
      "chargingWireless": "80 W"
    },
    "os": {
      "initial": "HarmonyOS 5"
    },
    "durability": {
      "ip": "IP68/IP69"
    },
    "price": {
      "usd": "~$1500",
      "launchDate": "2025-06-11"
    },
    "source": "https://consumer.huawei.com/cn/phones/pura80-ultra/",
    "lastUpdated": "2026-04-29"
  },
  "Mate XT 2": {
    "design": {
      "dimensions": "트리폴드 · 펴짐 219 × 156 × 3.6 mm",
      "weight": "294 g"
    },
    "display": {
      "size": "10.2″ 트리폴드 / 6.4″ 외부",
      "panel": "LTPO OLED",
      "refreshRate": "120 Hz"
    },
    "processor": {
      "ap": "Kirin 9020"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 가변",
        "ultrawide": "40 MP",
        "telephoto": "12 MP"
      },
      "front": "8 MP"
    },
    "battery": {
      "capacity": "5600 mAh",
      "chargingWired": "66 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "HarmonyOS 5"
    },
    "price": {
      "usd": "~$2900",
      "launchDate": "2025-09-24"
    },
    "source": "https://consumer.huawei.com/cn/phones/mate-xt2/",
    "lastUpdated": "2026-04-29"
  },
  "Mate XT (트리폴드)": {
    "design": {
      "dimensions": "트리폴드 · 펴짐 219 × 156 × 3.6 mm",
      "weight": "298 g"
    },
    "display": {
      "size": "10.2″ 트리폴드 (3+3 패널)",
      "panel": "LTPO OLED"
    },
    "processor": {
      "ap": "Kirin 9010"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 가변",
        "ultrawide": "12 MP",
        "telephoto": "12 MP 5.5×"
      },
      "front": "8 MP"
    },
    "battery": {
      "capacity": "5600 mAh",
      "chargingWired": "66 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "HarmonyOS 4.2"
    },
    "price": {
      "usd": "~$2800 (CN)",
      "launchDate": "2024-09-20"
    },
    "source": "https://consumer.huawei.com/cn/phones/mate-xt/",
    "lastUpdated": "2026-04-29"
  },
  "Mate X6": {
    "design": {
      "dimensions": "펴짐 156.7 × 144.6 × 4.6 mm / 접힘 156.7 × 73.9 × 9.85 mm",
      "weight": "239 g"
    },
    "display": {
      "size": "내부 7.93″ / 외부 6.45″",
      "panel": "LTPO OLED",
      "refreshRate": "120 Hz"
    },
    "processor": {
      "ap": "Kirin 9010"
    },
    "memory": {
      "ram": "12/16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP 가변",
        "ultrawide": "40 MP",
        "telephoto": "48 MP 4×"
      },
      "front": "8 MP"
    },
    "battery": {
      "capacity": "5110 mAh",
      "chargingWired": "66 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "HarmonyOS 4.3"
    },
    "durability": {
      "ip": "IPX8"
    },
    "price": {
      "usd": "~$1800 (CN)",
      "launchDate": "2024-12-12"
    },
    "source": "https://consumer.huawei.com/cn/phones/mate-x6/",
    "lastUpdated": "2026-04-29"
  },
  "Watch Ultimate 2": {
    "design": {
      "dimensions": "49 mm 케이스",
      "weight": "75 g (NATO 밴드)",
      "materials": "Liquid Metal · 사파이어 글래스"
    },
    "display": {
      "size": "1.5″",
      "panel": "AMOLED",
      "refreshRate": "60 Hz"
    },
    "processor": {
      "ap": "—"
    },
    "battery": {
      "capacity": "530 mAh",
      "chargingWired": "Qi 무선 충전"
    },
    "connectivity": {
      "wifi": "Wi-Fi",
      "bluetooth": "5.4",
      "nfc": true,
      "extra": "Beidou 위성 통신"
    },
    "os": {
      "initial": "HarmonyOS 5"
    },
    "durability": {
      "ip": "100m+ 다이빙",
      "biometric": [
        "혈중산소",
        "ECG"
      ]
    },
    "price": {
      "usd": "~$900",
      "launchDate": "2025-09-04"
    },
    "source": "https://consumer.huawei.com/cn/wearables/watch-ultimate-2/",
    "lastUpdated": "2026-04-29"
  },
  "Watch GT 5 Pro": {
    "design": {
      "dimensions": "46/42 mm",
      "weight": "53/48 g",
      "materials": "티타늄/세라믹"
    },
    "display": {
      "size": "1.43/1.32″",
      "panel": "AMOLED"
    },
    "battery": {
      "capacity": "21일 (46mm)",
      "chargingWired": "Qi"
    },
    "connectivity": {
      "bluetooth": "5.2",
      "nfc": true
    },
    "os": {
      "initial": "HarmonyOS 4.2"
    },
    "durability": {
      "ip": "5 ATM + IP69K",
      "biometric": [
        "ECG",
        "혈중산소"
      ]
    },
    "price": {
      "usd": "~$430",
      "launchDate": "2024-09-19"
    },
    "source": "https://consumer.huawei.com/cn/wearables/watch-gt5-pro/",
    "lastUpdated": "2026-04-29"
  },
  "Vivo X300 Pro": {
    "design": {
      "materials": "Slate",
      "dimensions": "161.2&#160;mm ×&#160;75.5&#160;mm ×&#160;8&#160;mm (6.35&#160;in ×&#160;2.97&#160;in ×&#160;0.31&#160;in)",
      "weight": "226&#160;g (8.0&#160;oz)"
    },
    "display": {
      "panel": "6.78&#160;in (172&#160;mm) LTPO OLED, 1B colors 1260 × 2800 px @ 120 Hz HDR10 , HDR Vivid, Dolby Vision Up to 4500 nits (peak) , ~1600 nits (HBM) Armor Glass"
    },
    "processor": {
      "ap": "Octa-core (1×4.21&#160;GHz C1-Ultra, 3×3.5&#160;GHz C1-Premium, 4×2.7&#160;GHz C1-Pro)"
    },
    "memory": {
      "ram": "12&#160;GB or 16&#160;GB LPDDR5X",
      "storage": "256&#160;GB, 512&#160;GB or 1&#160;TB ( UFS 4.1)"
    },
    "camera": {
      "rear_text": "50 MP, .mw-parser-output span.fnumber,.mw-parser-output .fnumber-fallback{display:inline-block;white-space:nowrap;width:max-content}.mw-parser-output span.fnumber::first-letter,.mw-parser-output .fnumber-fallback .first-letter{font-style:italic;font-family:Trebuchet MS,Candara,Georgia,Calibri,Corbel,serif}.mw-parser-output span.fnumber.noitalic::first-letter,.mw-parser-output .fnumber-fallback.noitalic .first-letter{font-style:normal;font-family:inherit} f / 1.6, 24 mm ( wide ), PDAF , OIS (Sony LYT-828) 200 MP, f / 2.7, 85 mm ( telephoto ), PDAF , OIS , 3.7× optical zoom (Samsung ISOCELL) 50 MP, f / 2.0, 15 mm ( ultrawide camera ), AF (Samsung S5KJN1) Rear video: 8K@30 fps , 4K @30/60/120 fps, 1080p@30/60/120/240 fps, gyro-EIS , Dolby Vision HDR",
      "front": "50 MP, f / 2.0, 20 mm (wide), AF (Samsung S5KJN1) Front video: 4K @30/60 fps, 1080p@30/60 fps"
    },
    "battery": {
      "capacity": "6510 mAh ( Si/C ) Global 5440 mAh EU",
      "chargingWired": "90 W wired ( PD3.0 ) 40 W wireless Reverse wired Reverse wireless"
    },
    "connectivity": {
      "summary": "Wi-Fi 6E (802.11 a/b/g/n/ac/6/7) Bluetooth 5.4 (A2DP, LE, aptX HD, LHDC 5) NFC Infrared port USB-C 3.2 OTG GPS (L1+L5), GLONASS , BDS , Galileo , QZSS, NavIC"
    },
    "os": {
      "initial": "Android 16 with OriginOS 6"
    },
    "durability": {
      "ip": "IP68 /IP69 dust and water resistant"
    },
    "price": {
      "launchDate": "October&#160;17, 2025 &#59;&#32;6 months ago &#160;( 2025-10-17 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Vivo_X300_Pro"
  },
  "OPPO Find X9 Pro": {
    "design": {
      "dimensions": "162 × 76 × 8.4 mm",
      "weight": "224 g"
    },
    "display": {
      "size": "6.78″",
      "resolution": "2780×1264",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz",
      "brightness": "3600 nits peak"
    },
    "processor": {
      "ap": "MediaTek Dimensity 9500"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP",
        "telephoto": "200 MP 3× Hasselblad"
      },
      "front": "32 MP"
    },
    "battery": {
      "capacity": "7500 mAh",
      "chargingWired": "80 W",
      "chargingWireless": "50 W"
    },
    "connectivity": {
      "fiveG": true,
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4",
      "nfc": true
    },
    "os": {
      "initial": "ColorOS 16 (Android 16)"
    },
    "durability": {
      "ip": "IP68/IP69"
    },
    "price": {
      "usd": "~$1300",
      "launchDate": "2025-10-23"
    },
    "source": "https://www.oppo.com/cn/smartphone/find-x9-pro/",
    "lastUpdated": "2026-04-29"
  },
  "OPPO Find N5": {
    "design": {
      "dimensions": "펴짐 158.8 × 145.6 × 4.21 mm / 접힘 158.8 × 74.4 × 8.93 mm",
      "weight": "229 g"
    },
    "display": {
      "size": "내부 8.12″ / 외부 6.62″",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "8 MP",
        "telephoto": "50 MP 3× Hasselblad"
      },
      "front": "8 MP"
    },
    "battery": {
      "capacity": "5600 mAh",
      "chargingWired": "80 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "ColorOS 15 (Android 15)"
    },
    "durability": {
      "ip": "IPX9"
    },
    "price": {
      "usd": "~$1700",
      "launchDate": "2025-02-20"
    },
    "source": "https://www.oppo.com/global/smartphone/find-n5/",
    "lastUpdated": "2026-04-29"
  },
  "Vivo X Fold5": {
    "design": {
      "dimensions": "펴짐 159.1 × 142.4 × 4.3 mm / 접힘 159.1 × 72.6 × 9.2 mm",
      "weight": "217 g"
    },
    "display": {
      "size": "내부 8.03″ / 외부 6.53″",
      "panel": "LTPO AMOLED",
      "refreshRate": "1–120 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP",
        "telephoto": "50 MP 3× ZEISS APO"
      },
      "front": "32 MP"
    },
    "battery": {
      "capacity": "6000 mAh",
      "chargingWired": "80 W",
      "chargingWireless": "40 W"
    },
    "os": {
      "initial": "OriginOS 5 (Android 15)"
    },
    "durability": {
      "ip": "IPX8/IPX9"
    },
    "price": {
      "usd": "~$1300 (CN)",
      "launchDate": "2025-06-25"
    },
    "source": "https://www.vivo.com/cn/product/x-fold5",
    "lastUpdated": "2026-04-29"
  },
  "Vivo X200 Pro": {
    "design": {
      "materials": "Slate",
      "dimensions": "160.3×74.8×8&#160;mm (6.31×2.94×0.31&#160;in)",
      "weight": "197&#160;g (7&#160;oz) / 202 g (varies by model)"
    },
    "display": {
      "panel": "6.67-inch AMOLED 1260 x 2800 pixels (460 ppi) 120Hz refresh rate 4500 nits peak brightness HDR10+ support Schott Xensation Alpha glass"
    },
    "processor": {
      "ap": "X200, X200 Pro, X200 Pro Mini Octa-core (1× Cortex-X925 @ 3.63 GHz + 3× Cortex-X4 @ 3.3 GHz + 4× Cortex-A720 @ 2.4 GHz) X200 Ultra Octa-core (2x 4.32 GHz Oryon Prime cores+ 6x 3.53 GHz Performance cores) X200s Octa-core (1× Cortex-X925 @ 3.73 GHz + 3× Cortex-X4 @ 3.3 GHz + 4× Cortex-A720 @ 2.4 GHz)"
    },
    "memory": {
      "ram": "12 GB / 16 GB LPDDR5X RAM",
      "storage": "256 GB / 512 GB / 1 TB (UFS 4.0)"
    },
    "camera": {
      "rear_text": "50 MP (f/1.6, PDAF, OIS) (wide) 50 MP (f/2.6, PDAF, OIS) (periscope telephoto, 3x optical zoom) 50 MP (f/2.0, ultra-wide, 119° field of view, AF)",
      "front": "32 MP (f/2.0, ultrawide)"
    },
    "battery": {
      "capacity": "X200 - 5800 mAh (Global) - 5220 mAh (Austria) X200 Pro - 6000 mAh (Global) - 5200 mAh (Austria, Hungary) X200 Pro Mini - 5700 mAh (China) X200 Ultra - 6000 mAh (China) X200s - 6200 mAh (China)",
      "chargingWired": "90W wired fast charging - Reverse wired charging"
    },
    "connectivity": {
      "summary": "5G , Wi-Fi 7 , Bluetooth 5.4 , NFC , USB-C (OTG), Infrared port"
    },
    "os": {
      "initial": "Android 15 ( Funtouch OS 15 / OriginOS 5)"
    },
    "durability": {},
    "price": {},
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Vivo_X200"
  },
  "OPPO Pad 4 Pro": {
    "design": {
      "dimensions": "291.7 × 211.5 × 5.97 mm",
      "weight": "595 g"
    },
    "display": {
      "size": "13.2″",
      "resolution": "3392×2400",
      "panel": "LCD 3.4K",
      "refreshRate": "144 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8 Gen 3"
    },
    "memory": {
      "ram": "12/16 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "battery": {
      "capacity": "9510 mAh",
      "chargingWired": "67 W"
    },
    "os": {
      "initial": "ColorOS (Android 15)"
    },
    "price": {
      "usd": "~$430~",
      "launchDate": "2025-04-10"
    },
    "source": "https://www.oppo.com/cn/pad/oppo-pad-4-pro/",
    "lastUpdated": "2026-04-29"
  },
  "Quest 3S": {
    "design": {
      "weight": "514 g"
    },
    "display": {
      "panel": "RGB LCD 1832x1920 per eye @ 90-120 Hz"
    },
    "processor": {
      "ap": "Qualcomm Snapdragon XR2 Gen 2"
    },
    "memory": {
      "ram": "8 GB LPDDR5",
      "storage": "128 GB, 256 GB"
    },
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi-Fi 6E , Bluetooth 5.2"
    },
    "os": {
      "initial": "Meta Horizon OS , based on Android source code Current: Android 14"
    },
    "durability": {},
    "price": {
      "launchDate": "October 15, 2024",
      "usd": "US$299 (128 GB) US$399 (256 GB)"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Meta_Quest_3S"
  },
  "Quest 4": {
    "design": {
      "weight": "~470 g (예상)",
      "materials": "플라스틱"
    },
    "display": {
      "size": "LCD 또는 micro-OLED 2개",
      "panel": "차세대 pancake",
      "refreshRate": "120 Hz+ (예상)"
    },
    "processor": {
      "ap": "Snapdragon XR3 Gen 1 (예상)"
    },
    "memory": {
      "ram": "12 GB (예상)",
      "storage": [
        "128 GB",
        "512 GB"
      ]
    },
    "battery": {
      "capacity": "내장 (~3시간 목표)"
    },
    "connectivity": {
      "wifi": "Wi-Fi 7",
      "bluetooth": "5.4"
    },
    "os": {
      "initial": "Horizon OS"
    },
    "price": {
      "usd": "~$499 (예상)",
      "launchDate": "2026 (루머 단계)"
    },
    "source": "https://en.wikipedia.org/wiki/Meta_Quest",
    "lastUpdated": "2026-04-29"
  },
  "Ray-Ban Meta (2세대)": {
    "design": {
      "weight": "50 g",
      "materials": "선글라스 프레임"
    },
    "display": {
      "extra": "단안 컬러 마이크로 디스플레이 (도수 가능)"
    },
    "processor": {
      "ap": "Snapdragon AR1 Gen 1"
    },
    "memory": {
      "ram": "—",
      "storage": [
        "32 GB"
      ]
    },
    "camera": {
      "rear": {
        "main": "12 MP UltraWide"
      },
      "video": "3K@30fps"
    },
    "battery": {
      "capacity": "내장 (~4시간) · 케이스 충전"
    },
    "connectivity": {
      "wifi": "Wi-Fi 6",
      "bluetooth": "5.3"
    },
    "os": {
      "initial": "Meta Glass OS · Live AI 통합"
    },
    "price": {
      "usd": "$379~",
      "launchDate": "2025-09-17"
    },
    "source": "https://www.meta.com/smart-glasses/",
    "lastUpdated": "2026-04-29"
  },
  "Orion (개발자 프로토타입)": {
    "design": {
      "weight": "98 g",
      "materials": "Magnesium 프레임"
    },
    "display": {
      "extra": "Holographic AR · 70° FoV · 마이크로 LED"
    },
    "processor": {
      "ap": "Custom Meta SoC"
    },
    "connectivity": {
      "wifi": "Wi-Fi",
      "bluetooth": "5.x",
      "extra": "Wireless Compute Puck"
    },
    "os": {
      "initial": "Orion OS"
    },
    "price": {
      "usd": "비공개 (개발자 한정)",
      "launchDate": "2024-09-25 (announce)"
    },
    "source": "https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/",
    "lastUpdated": "2026-04-29"
  },
  "Razr 60 Ultra": {
    "design": {
      "dimensions": "펴짐 171.5 × 74.0 × 7.2 mm",
      "weight": "199 g",
      "materials": "비건 가죽"
    },
    "display": {
      "size": "내부 7.0″ / 외부 4.0″",
      "panel": "LTPO pOLED",
      "refreshRate": "165 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8 Elite"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP"
      },
      "front": "50 MP"
    },
    "battery": {
      "capacity": "4700 mAh",
      "chargingWired": "68 W",
      "chargingWireless": "30 W"
    },
    "os": {
      "initial": "Android 15"
    },
    "durability": {
      "ip": "IP48"
    },
    "price": {
      "usd": "$1299~",
      "launchDate": "2025-04-24"
    },
    "source": "https://www.motorola.com/us/smartphones-razr-60-ultra/",
    "lastUpdated": "2026-04-29"
  },
  "Razr 60": {
    "design": {
      "dimensions": "펴짐 171.3 × 74.0 × 7.3 mm",
      "weight": "188 g"
    },
    "display": {
      "size": "내부 6.9″ / 외부 3.6″",
      "panel": "pOLED",
      "refreshRate": "120 Hz"
    },
    "processor": {
      "ap": "MediaTek Dimensity 7400X"
    },
    "memory": {
      "ram": "8 GB",
      "storage": [
        "256 GB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "13 MP"
      },
      "front": "32 MP"
    },
    "battery": {
      "capacity": "4500 mAh",
      "chargingWired": "30 W",
      "chargingWireless": "15 W"
    },
    "os": {
      "initial": "Android 15"
    },
    "durability": {
      "ip": "IP48"
    },
    "price": {
      "usd": "$699~",
      "launchDate": "2025-04-24"
    },
    "source": "https://www.motorola.com/us/smartphones-razr-60/",
    "lastUpdated": "2026-04-29"
  },
  "Razr 50 Ultra": {
    "design": {
      "dimensions": "펴짐 171.4 × 74.0 × 7.1 mm",
      "weight": "189 g"
    },
    "display": {
      "size": "내부 6.9″ / 외부 4.0″",
      "panel": "pOLED",
      "refreshRate": "165 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8s Gen 3"
    },
    "memory": {
      "ram": "12 GB",
      "storage": [
        "256 GB",
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "telephoto": "50 MP 2×"
      },
      "front": "32 MP"
    },
    "battery": {
      "capacity": "4000 mAh",
      "chargingWired": "45 W",
      "chargingWireless": "15 W"
    },
    "os": {
      "initial": "Android 14"
    },
    "durability": {
      "ip": "IPX8"
    },
    "price": {
      "usd": "$999~",
      "launchDate": "2024-07-10"
    },
    "source": "https://www.motorola.com/us/smartphones-razr-plus-2024/",
    "lastUpdated": "2026-04-29"
  },
  "Edge 60 Ultra": {
    "design": {
      "dimensions": "161.2 × 73.0 × 8.2 mm",
      "weight": "190 g",
      "materials": "비건 가죽"
    },
    "display": {
      "size": "6.7″",
      "resolution": "2712×1220",
      "panel": "LTPO pOLED",
      "refreshRate": "165 Hz"
    },
    "processor": {
      "ap": "MediaTek Dimensity 9400"
    },
    "memory": {
      "ram": "16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP",
        "telephoto": "50 MP 3×"
      },
      "front": "50 MP"
    },
    "battery": {
      "capacity": "5200 mAh",
      "chargingWired": "125 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "Android 15"
    },
    "durability": {
      "ip": "IP68/IP69"
    },
    "price": {
      "usd": "~$700",
      "launchDate": "2025-04-24"
    },
    "source": "https://www.motorola.com/us/smartphones-edge-60-ultra/",
    "lastUpdated": "2026-04-29"
  },
  "Edge 50 Ultra": {
    "design": {
      "dimensions": "161.1 × 72.4 × 8.6 mm",
      "weight": "197 g",
      "materials": "비건 가죽"
    },
    "display": {
      "size": "6.7″",
      "resolution": "2712×1220",
      "panel": "pOLED",
      "refreshRate": "144 Hz"
    },
    "processor": {
      "ap": "Snapdragon 8s Gen 3"
    },
    "memory": {
      "ram": "12/16 GB",
      "storage": [
        "512 GB",
        "1 TB"
      ]
    },
    "camera": {
      "rear": {
        "main": "50 MP",
        "ultrawide": "50 MP",
        "telephoto": "64 MP 3×"
      },
      "front": "50 MP"
    },
    "battery": {
      "capacity": "4500 mAh",
      "chargingWired": "125 W",
      "chargingWireless": "50 W"
    },
    "os": {
      "initial": "Android 14"
    },
    "durability": {
      "ip": "IP68"
    },
    "price": {
      "usd": "~$700",
      "launchDate": "2024-04-16"
    },
    "source": "https://www.motorola.com/us/smartphones-edge-50-ultra/",
    "lastUpdated": "2026-04-29"
  },
  "Xperia 1 VII": {
    "design": {
      "materials": "Slate",
      "dimensions": "162&#160;mm (6.4&#160;in) H 74&#160;mm (2.9&#160;in) W 8.2&#160;mm (0.32&#160;in) D",
      "weight": "192&#160;g (6.8&#160;oz)"
    },
    "display": {
      "panel": "6.5&#160;in (170&#160;mm) FHD+ 19.5:9 (2340 x 1080) HDR OLED , ~396 pixel density Gorilla Glass Victus 2 HDR10 HLG 10-bit color depth 120 Hz refresh rate"
    },
    "processor": {
      "ap": "Octa-core, 3&#160;nm (3LPE) 2x 3.30&#160;GHz Kryo Prime ( ARM Cortex-X4 -based) 3x 3.20&#160;GHz Kryo Gold (3× ARM Cortex-A720 , 3× ARM Cortex-A720 -based) 2x 3.00&#160;GHz Kryo Gold (2× ARM Cortex-A720 , 2× ARM Cortex-A720 -based) 2x 2.30&#160;GHz Kryo Silver ( ARM Cortex-A520 -based)"
    },
    "memory": {
      "ram": "LPDDR5X RAM 12&#160;GB 16&#160;GB",
      "storage": "Universal Flash Storage (UFS 4.0) 256&#160;GB 512&#160;GB"
    },
    "camera": {
      "rear_text": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 52 MP effectively used 48 MP (Sony Exmor T IMX888/Lytia LYT-800), f/1.9, 24 mm (wide), 1/1.35\", 1.12&#160;μm, Dual Pixel PDAF, OIS 12 MP (Sony Exmor RS IMX650), f/2.3, 85 mm (telephoto), f/3.5, 170 mm (telephoto), 1/3.5\", Dual Pixel PDAF, 3.5x/7.1x optical zoom, OIS 50 MP effectively used 48 MP (Sony Exmor), f/2.0, 104˚, 16 mm (ultrawide), 1/1.56\", Dual Pixel PDAF 4K@24/25/30/60/120 fps, 1080p@30/60/120/240 fps",
      "front": "12 MP (Sony Exmor RS IMX663), f/2.0, 20 mm (wide) 1/2.93\", 5-axis gyro-EIS, HDR Photo, Portrait selfie, Display flash, Hand and Smile Shutter 4K@30/60fps, 1080@30/60fps"
    },
    "battery": {
      "capacity": "Non-removable Li-ion 5000&#160;mAh USB PD 3.1 30 &#160; W Charging Qi Wireless Charging",
      "chargingWired": "Fast Charging USB PD 3.1 30 &#160; W Charging Qi Wireless Charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11 a/b/g/n/ac/ax/be (2.4/5GHz) Bluetooth 5.4 USB-C 3.2 Gen 1 (supports DisplayPort ) NFC GPS with Assisted GPS Galileo GLONASS BeiDou"
    },
    "os": {
      "initial": "Android 15 (Upgradable to Android 16 ) Up to 4 major Android upgrades"
    },
    "durability": {
      "ip": "IP65/IP68"
    },
    "price": {
      "launchDate": "4&#160;June 2025 &#59;&#32;10 months ago &#160;( 2025-06-04 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Sony_Xperia_1_VII"
  },
  "Xperia 1 VI": {
    "design": {
      "materials": "Slate",
      "dimensions": "162&#160;mm (6.4&#160;in) H 74&#160;mm (2.9&#160;in) W 8.2&#160;mm (0.32&#160;in) D",
      "weight": "192&#160;g (6.8&#160;oz)"
    },
    "display": {
      "panel": "6.5&#160;in (170&#160;mm) 1080p+ 19.5:9 (2340 x 1080) HDR OLED , ~396 pixel density Gorilla Glass Victus 2 HDR10 HLG 10-bit color depth 120 Hz refresh rate"
    },
    "processor": {
      "ap": "Octa-core, 4&#160;nm (4LPE) 1x 3.30&#160;GHz Kryo Prime ( ARM Cortex-X4 -based) 3x 3.20&#160;GHz Kryo Gold (3× ARM Cortex-A720 , 3× ARM Cortex-A720 -based) 2x 3.00&#160;GHz Kryo Gold (2× ARM Cortex-A720 , 2× ARM Cortex-A720 -based) 2x 2.30&#160;GHz Kryo Silver ( ARM Cortex-A520 -based)"
    },
    "memory": {
      "ram": "LPDDR5X RAM 12&#160;GB (XQ-EC54, XQ-EC72) 16&#160;GB (XQ-EC44; Japan only)",
      "storage": "Universal Flash Storage (UFS 4.0) 256&#160;GB (XQ-EC54, XQ-EC72) 512&#160;GB (XQ-EC44, XQ-EC54 in Scarlet)"
    },
    "camera": {
      "rear_text": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} 52 MP effectively used 48 MP (Sony Exmor T IMX888/Lytia LYT-800), f/1.9, 24 mm (wide), 1/1.35\", 1.12&#160;μm, Dual Pixel PDAF, OIS 12 MP (Sony Exmor RS IMX650), f/2.3, 85 mm (telephoto), f/3.5, 170 mm (telephoto), 1/3.5\", Dual Pixel PDAF, 3.5x/7.1x optical zoom, OIS 12 MP (Sony Exmor RS IMX563), f/2.2, 124˚, 16 mm (ultrawide), 1/2.55\", Dual Pixel PDAF 4K@24/25/30/60/120 fps, 1080p@30/60/120/240 fps",
      "front": "12 MP (Sony Exmor RS IMX663), f/2.0, 20 mm (wide) 1/2.93\", 5-axis gyro-EIS, HDR Photo, Portrait selfie, Display flash, Hand and Smile Shutter 4K@30/60fps, 1080@30/60fps"
    },
    "battery": {
      "capacity": "Non-removable Li-ion 5000&#160;mAh USB PD 3.1 30 &#160; W Charging Qi Wireless Charging",
      "chargingWired": "Fast Charging USB PD 3.1 30 &#160; W Charging Qi Wireless Charging"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11 a/b/g/n/ac/ax/be (2.4/5GHz) Bluetooth 5.4 USB-C 3.2 Gen 1 (supports DisplayPort ) NFC GPS with Assisted GPS Galileo GLONASS BeiDou"
    },
    "os": {
      "initial": "Android 14 (Upgradable to Android 16 )"
    },
    "durability": {
      "ip": "IP65/IP68"
    },
    "price": {
      "launchDate": "3&#160;June 2024 &#59;&#32;22 months ago &#160;( 2024-06-03 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Sony_Xperia_1_VI"
  },
  "Xperia 5 VI": {
    "design": {
      "materials": "Slate",
      "dimensions": "158&#160;mm (6.2&#160;in) H 68&#160;mm (2.7&#160;in) W 8.2&#160;mm (0.32&#160;in) D",
      "weight": "164&#160;g (5.8&#160;oz)"
    },
    "display": {
      "panel": "6.1&#160;in (150&#160;mm) 1080p (2520 x 1080) HDR OLED , ~449 pixel density, Gorilla Glass 6, 8-bit (16M colors)"
    },
    "processor": {
      "ap": "Octa-core (1x 2.84 GHz Gold Prime , 3x 2.42 GHz Gold , 4x 1.8 GHz Silver ) Kryo 485"
    },
    "memory": {
      "ram": "6&#160; GB LPDDR4X RAM",
      "storage": "Universal Flash Storage (UFS) 64&#160;GB (SO-01M, SOV41 and 901SO models) 128&#160;GB (J8210, J8270, J9210 and J9260 models)"
    },
    "camera": {
      "rear_text": "12.2 MP (Sony IMX563), f /1.6, 26mm (wide), 1/2.6\", 1.4&#160;μm, predictive Dual Pixel PDAF, 5-axis OIS 12.2 MP (Samsung ISOCELL S5K3M3), f /2.4, 52mm (telephoto), 1/3.4\", 1.0&#160;μm, predictive Dual Pixel PDAF, 2x optical zoom, 5-axis OIS 12.2 MP (Samsung ISOCELL S5K3M3), f /2.4, 16mm (ultra-wide), 1/3.4\", 1.0&#160;μm",
      "front": "8 MP (Samsung ISOCELL S5K4H7), f /2.0, 24mm (wide), 1/4\", 1.0&#160;μm, 1080p@30fps (5-axis gyro-EIS)"
    },
    "battery": {
      "capacity": "Non-removable Li-ion 3140&#160;mAh rated capacity: 3000&#160;mAh"
    },
    "connectivity": {
      "summary": "Wi-Fi 802.11 a/b/g/n/ac (2.4/5GHz) Bluetooth 5.0 USB-C NFC GPS with Assisted GPS Galileo GLONASS BeiDou 1seg (SO-01M, SOV41 and 901SO models only) Mobile FeliCa / Osaifu-Keitai (J9260, SO-01M, SOV41 and 901SO models only)"
    },
    "os": {
      "initial": "Android 9 \"Pie\" upgradeable to Android 11"
    },
    "durability": {},
    "price": {
      "launchDate": "24&#160;September 2019 &#59;&#32;6 years ago &#160;( 2019-09-24 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Sony_Xperia_5"
  },
  "PlayStation Portal": {
    "design": {
      "dimensions": "14.0 × 3.88 × 6.0 inches &#91; 8 &#93;",
      "weight": "1.15 pounds (520 grams) &#91; 9 &#93;"
    },
    "display": {
      "panel": "1920 × 1080, touch-enabled, 8 inches, 60Hz LCD &#91; 8 &#93;"
    },
    "processor": {},
    "memory": {},
    "camera": {},
    "battery": {},
    "connectivity": {
      "summary": "Wi-Fi"
    },
    "os": {
      "initial": "Android &#91; 7 &#93;"
    },
    "durability": {},
    "price": {
      "launchDate": ".mw-parser-output .plainlist ol,.mw-parser-output .plainlist ul{line-height:inherit;list-style:none;margin:0;padding:0}.mw-parser-output .plainlist ol li,.mw-parser-output .plainlist ul li{margin-bottom:0} JP / NA / EU / AU : November 15, 2023 AE / SA / ZA : February 21, 2024 &#91; 1 &#93; &#91; 2 &#93; BR / MX : June 28, 2024 &#91; 3 &#93; IN : August 3, 2024 &#91; 4 &#93; SG / HK / TW : September 4, 2024 &#91; 5 &#93; &#91; 6 &#93; MY / ID / TH : October 9, 2024 &#91; 5 &#93;",
      "usd": "$199.99"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/PlayStation_Portal"
  },
  "ROG Phone 9 Pro": {
    "design": {
      "dimensions": "163.8×77×8.9&#160;mm (6.45×3.03×0.35&#160;in)",
      "weight": "227&#160;g (8&#160;oz) 225g (9 FE)"
    },
    "display": {
      "panel": "6.78\" FHD+ (2400x1080 pixels) 185Hz SAMSUNG Flexible AMOLED"
    },
    "processor": {},
    "memory": {
      "ram": "12GB or 16GB LPDDR5X 16GB LPDDR5X (9 FE and 9 Pro) 24GB LPDDR5X (9 Pro Edition)",
      "storage": "256GB, 512GB or 1TB UFS 4.0"
    },
    "camera": {},
    "battery": {
      "capacity": "5800mAh 5500mAh (9 FE)"
    },
    "connectivity": {},
    "os": {
      "initial": "Android 15"
    },
    "durability": {},
    "price": {
      "launchDate": "November 19, 2024"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/ROG_Phone_9"
  },
  "ROG Phone 10": {
    "design": {
      "materials": "Slate"
    },
    "display": {
      "panel": "6.0&#160;in (152&#160;mm) 1080×2160 FHD+ AMOLED"
    },
    "processor": {
      "ap": "Octa-core (4x2.96 GHz & 4x1.7 GHz) Kryo 385"
    },
    "memory": {
      "ram": "8 GB LPDDR4 RAM",
      "storage": "UFS2.1 128GB / 512GB"
    },
    "camera": {
      "rear_text": "13 MP (f/1.8, 4-axis) + 8 MP, active autofocus, LED flash 2160p@30fps, HDR",
      "front": "8 MP, f/2.0"
    },
    "battery": {
      "capacity": "4000 mAh Li-Po , non removable"
    },
    "connectivity": {
      "summary": "USB-C 1.0 reversible connector + 802.11 a/b/g/n/ac/ad Wi-fi, dual-band + Bluetooth 5.0 + NFC + Radio + GPS"
    },
    "os": {
      "initial": "Original: Android 8.1 \"Oreo\""
    },
    "durability": {},
    "price": {
      "launchDate": "October 18, 2018"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/ROG_Phone"
  },
  "Zenfone 12 Ultra": {
    "design": {
      "dimensions": "163.8×77.0×8.9&#160;mm (6.45×3.03×0.35&#160;in)",
      "weight": "220&#160;g (8&#160;oz)"
    },
    "display": {},
    "processor": {},
    "memory": {
      "storage": "UFS4.0 256GB UFS4.0 512GB"
    },
    "camera": {
      "rear_text": "Main Camera: Sony® Lytia 700 50MP Second Camera: 13MP ultra-wide lens Third Camera: 32MP, 3X optical zoom",
      "front": "32MP RGBW sensor Pixel binning 1.4μm (Actual output photo: 8MP) 22 mm equivalent focal length in 35 mm film camera"
    },
    "battery": {
      "capacity": "5,500 mAh"
    },
    "connectivity": {},
    "os": {
      "initial": "Android 15"
    },
    "durability": {},
    "price": {
      "launchDate": "February&#160;2025 &#59;&#32;1&#160;year ago &#160;( 2025-02 )"
    },
    "lastUpdated": "2026-04-29",
    "source": "https://en.wikipedia.org/wiki/Asus_Zenfone_12_Ultra"
  }
};
