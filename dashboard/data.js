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
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro Max", year: 2025, status: "released", highlight: "A19 Pro · 6.9\" LTPO · 새 카메라 plateau", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_17_Pro_Vector.svg/500px-IPhone_17_Pro_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17 Pro", year: 2025, status: "released", highlight: "A19 Pro · 6.3\" 120Hz · 티타늄 → 알루미늄 회귀", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/IPhone_17_Pro_Vector.svg/500px-IPhone_17_Pro_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone 17", year: 2025, status: "released", highlight: "A19 · 6.3\" ProMotion 120Hz 기본 탑재", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/IPhone_17_Vector.svg/500px-IPhone_17_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone Air", year: 2025, status: "released", highlight: "초슬림 · A19 · eSIM 전용 · iPhone Plus 대체", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/IPhone_Air_Vector.svg/500px-IPhone_Air_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16 Pro Max", year: 2024, status: "released", highlight: "A18 Pro · 6.9\" · Camera Control 버튼", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/IPhone_16_Pro_Vector.svg/500px-IPhone_16_Pro_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16", year: 2024, status: "released", highlight: "A18 · Action Button · Apple Intelligence", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/IPhone_16_Vector.svg/500px-IPhone_16_Vector.svg.png" },
  { mfr: "apple", category: "smartphone", model: "iPhone 16e", year: 2025, status: "released", highlight: "보급형 · A18 · 자체 5G 모뎀(C1)", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/IPhone_16e_Vector.svg/500px-IPhone_16e_Vector.svg.png" },
  { mfr: "apple", category: "tablet", model: "iPad Pro M5", year: 2025, status: "released", highlight: "M5 · Tandem OLED · 더 강력한 NPU", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/11-inch_iPad_Pro_M5_with_Apple_Pencil_Pro.jpg/500px-11-inch_iPad_Pro_M5_with_Apple_Pencil_Pro.jpg" },
  { mfr: "apple", category: "tablet", model: "iPad Air M3", year: 2025, status: "released", highlight: "M3 · 11/13\" · Center Stage 강화", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/IPad_Air_11-inch_%28M3%29_backside.jpg/500px-IPad_Air_11-inch_%28M3%29_backside.jpg" },
  { mfr: "apple", category: "tablet", model: "iPad mini A17 Pro", year: 2024, status: "released", highlight: "8.3\" · Apple Intelligence 지원", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/IPad_Mini.png/500px-IPad_Mini.png" },
  { mfr: "apple", category: "wearable", model: "Apple Watch Ultra 3", year: 2025, status: "released", highlight: "위성 통신 · 5G · 더 큰 디스플레이", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Apple_Watch_Series_10.jpg/500px-Apple_Watch_Series_10.jpg" },
  { mfr: "apple", category: "wearable", model: "Apple Watch Series 11", year: 2025, status: "released", highlight: "S11 · 혈압 추세 · 5G eSIM", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Apple_Watch_Series_10.jpg/500px-Apple_Watch_Series_10.jpg" },
  { mfr: "apple", category: "wearable", model: "Apple Watch SE 3", year: 2025, status: "released", highlight: "보급형 · 항상 켜짐 디스플레이 추가", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Apple_Watch_Series_10.jpg/500px-Apple_Watch_Series_10.jpg" },
  { mfr: "apple", category: "xr", model: "Vision Pro M5", year: 2025, status: "released", highlight: "M5 칩 · visionOS 26 · Air-puff 헤드밴드", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Apple_Vision_Pro_with_Solo_Knit_Band.jpg/500px-Apple_Vision_Pro_with_Solo_Knit_Band.jpg" },
  { mfr: "apple", category: "xr", model: "Vision Pro 2", year: 2026, status: "rumored", highlight: "더 가벼움 · 가격 인하 · 공급 확대 예정", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Apple_Vision_Pro_with_Solo_Knit_Band.jpg/500px-Apple_Vision_Pro_with_Solo_Knit_Band.jpg" },

  // ========== 2. Samsung ==========
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Ultra", year: 2025, status: "released", highlight: "SD8 Elite · 200MP · 7-step Galaxy AI", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png/500px-%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25+", year: 2025, status: "released", highlight: "6.7\" QHD+ · 4900mAh · S Pen 미지원", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png/500px-%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25", year: 2025, status: "released", highlight: "6.2\" · SD8 Elite · 컴팩트 플래그십", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png/500px-%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S25 Edge", year: 2025, status: "released", highlight: "초슬림 5.8mm · 티타늄 프레임", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png/500px-%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.00.07.100.png" },
  { mfr: "samsung", category: "smartphone", model: "Galaxy S26 Ultra", year: 2026, status: "released", highlight: "SD8 Elite Gen5 · 6.9\" 2600nit · Privacy Display · 알루미늄 회귀", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/20260227_%EC%82%BC%EC%84%B1_%EA%B0%A4%EB%9F%AD%EC%8B%9C_S26_%EC%8B%9C%EB%A6%AC%EC%A6%88.jpg/500px-20260227_%EC%82%BC%EC%84%B1_%EA%B0%A4%EB%9F%AD%EC%8B%9C_S26_%EC%8B%9C%EB%A6%AC%EC%A6%88.jpg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Fold7", year: 2025, status: "released", highlight: "8\" 내부 · 215g · 더 얇아진 힌지", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Samsung_Galaxy_Z_Fold_7_and_Z_Flip_7.jpg/500px-Samsung_Galaxy_Z_Fold_7_and_Z_Flip_7.jpg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Flip7", year: 2025, status: "released", highlight: "4.1\" 외부 풀스크린 · Exynos 2500", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Samsung_Galaxy_Z_Fold_7_and_Z_Flip_7.jpg/500px-Samsung_Galaxy_Z_Fold_7_and_Z_Flip_7.jpg" },
  { mfr: "samsung", category: "foldable", model: "Galaxy Z Fold6", year: 2024, status: "released", highlight: "7.6\" 내부 · IPX8 · DeX", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Samsung_Galaxy_Z_Fold6.png/500px-Samsung_Galaxy_Z_Fold6.png" },
  { mfr: "samsung", category: "tablet", model: "Galaxy Tab S11 Ultra", year: 2025, status: "released", highlight: "14.6\" AMOLED · Dimensity 9400+", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Imgi-17-samsung-galaxy-tab-s11-ultra-galaxy-ai-scaled.webp/500px-Imgi-17-samsung-galaxy-tab-s11-ultra-galaxy-ai-scaled.webp.png" },
  { mfr: "samsung", category: "tablet", model: "Galaxy Tab S10 Ultra", year: 2024, status: "released", highlight: "14.6\" · S Pen 포함", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Samsung_Galaxy_Tab_S10_Ultra.jpg/500px-Samsung_Galaxy_Tab_S10_Ultra.jpg" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Watch8", year: 2025, status: "released", highlight: "Exynos W1000 · Antioxidant 측정" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Watch Ultra (2025)", year: 2025, status: "released", highlight: "47mm · 다이빙 · 듀얼 시스템", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Samsung_Galaxy_Watch.jpg/500px-Samsung_Galaxy_Watch.jpg" },
  { mfr: "samsung", category: "wearable", model: "Galaxy Ring", year: 2024, status: "released", highlight: "수면/심박 · 7일 배터리 · 9사이즈", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Galaxy_Ring.jpg/500px-Galaxy_Ring.jpg" },

  // ========== 3. Xiaomi ==========
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Ultra", year: 2025, status: "released", highlight: "SD8 Elite · Leica 1\" 메인 센서", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Xiaomi_15_Ultra_001.jpg/500px-Xiaomi_15_Ultra_001.jpg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15 Pro", year: 2024, status: "released", highlight: "6.73\" 2K · 6100mAh · 90W 충전", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Xiaomi_15_Ultra_001.jpg/500px-Xiaomi_15_Ultra_001.jpg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 15", year: 2024, status: "released", highlight: "6.36\" LTPO · 컴팩트 플래그십", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Xiaomi_15_Ultra_001.jpg/500px-Xiaomi_15_Ultra_001.jpg" },
  { mfr: "xiaomi", category: "smartphone", model: "Xiaomi 16 Pro", year: 2025, status: "released", highlight: "SD8 Elite Gen2 · HyperOS 3" },
  { mfr: "xiaomi", category: "foldable", model: "Xiaomi MIX Flip 2", year: 2025, status: "released", highlight: "4\" 외부 · Leica · 50MP 망원" },
  { mfr: "xiaomi", category: "foldable", model: "Xiaomi MIX Fold 4", year: 2024, status: "released", highlight: "226g · 티타늄 힌지 · Leica", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Xiaomi_MIX_Fold_4_-_About_Phone_%281%29_%28November_1%2C_2024%29.jpg/500px-Xiaomi_MIX_Fold_4_-_About_Phone_%281%29_%28November_1%2C_2024%29.jpg" },
  { mfr: "xiaomi", category: "smartphone", model: "Redmi Note 14 Pro+", year: 2024, status: "released", highlight: "200MP · AMOLED 120Hz · 가성비" },
  { mfr: "xiaomi", category: "wearable", model: "Mi Band 10", year: 2025, status: "released", highlight: "1.72\" AMOLED · 21일 배터리", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mi_Band.jpg/500px-Mi_Band.jpg" },
  { mfr: "xiaomi", category: "wearable", model: "Mi Band 9 Pro", year: 2024, status: "released", highlight: "AMOLED · GNSS 5계 · 2주", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mi_Band.jpg/500px-Mi_Band.jpg" },
  { mfr: "xiaomi", category: "tablet", model: "Xiaomi Pad 7 Pro", year: 2025, status: "released", highlight: "11.2\" 3.2K · SD8s Gen3" },

  // ========== 4. Google ==========
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro XL", year: 2025, status: "released", highlight: "Tensor G5 · Gemini Nano v3 · 6.8\"", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pixel_10_front_%28Indigo%29.svg/500px-Pixel_10_front_%28Indigo%29.svg.png" },
  { mfr: "google", category: "smartphone", model: "Pixel 10 Pro", year: 2025, status: "released", highlight: "6.3\" LTPO · 5x 망원 · Gemini", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pixel_10_front_%28Indigo%29.svg/500px-Pixel_10_front_%28Indigo%29.svg.png" },
  { mfr: "google", category: "smartphone", model: "Pixel 10", year: 2025, status: "released", highlight: "Tensor G5 · 망원 추가 · 4910mAh", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pixel_10_front_%28Indigo%29.svg/500px-Pixel_10_front_%28Indigo%29.svg.png" },
  { mfr: "google", category: "foldable", model: "Pixel 10 Pro Fold", year: 2025, status: "released", highlight: "8\" 내부 · IPX8 · 더 얇음", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pixel_10_Pro_Fold_inside_%28Moonstone%29.svg/500px-Pixel_10_Pro_Fold_inside_%28Moonstone%29.svg.png" },
  { mfr: "google", category: "smartphone", model: "Pixel 9 Pro XL", year: 2024, status: "released", highlight: "Tensor G4 · 6.8\" · Gemini" },
  { mfr: "google", category: "smartphone", model: "Pixel 9a", year: 2025, status: "released", highlight: "보급형 · Tensor G4 · 5100mAh", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Google_Pixel_9a_%28Peony%29_front.svg/500px-Google_Pixel_9a_%28Peony%29_front.svg.png" },
  { mfr: "google", category: "tablet", model: "Pixel Tablet 2", year: 2025, status: "rumored", highlight: "Tensor 기반 · Hub 도크 개선", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pixel_Tablet_front.svg/500px-Pixel_Tablet_front.svg.png" },
  { mfr: "google", category: "tablet", model: "Pixel Tablet", year: 2023, status: "released", highlight: "11\" · 충전 도크 · Hub Mode", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pixel_Tablet_front.svg/500px-Pixel_Tablet_front.svg.png" },
  { mfr: "google", category: "wearable", model: "Pixel Watch 4", year: 2025, status: "released", highlight: "Snapdragon W5 Gen2 · 더 큰 배터리", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Pixel_Watch_-_1.jpg/500px-Google_Pixel_Watch_-_1.jpg" },
  { mfr: "google", category: "wearable", model: "Pixel Watch 3", year: 2024, status: "released", highlight: "41/45mm · Loss of Pulse 알림", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Pixel_Watch_3-41_%28Champagne_Gold_%2B_Hazel%29.svg/500px-Google_Pixel_Watch_3-41_%28Champagne_Gold_%2B_Hazel%29.svg.png" },

  // ========== 5. Huawei ==========
  { mfr: "huawei", category: "smartphone", model: "Mate 80 Pro", year: 2025, status: "released", highlight: "Kirin 9030 · 가변 조리개 메인", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/HUAWEI_Mate_80_Pro_Max_001.jpg/500px-HUAWEI_Mate_80_Pro_Max_001.jpg" },
  { mfr: "huawei", category: "smartphone", model: "Mate 70 Pro+", year: 2024, status: "released", highlight: "Kirin 9020 · XMAGE · 위성 통신", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Huawei_Mate_70_%2854235974194%29.jpg/500px-Huawei_Mate_70_%2854235974194%29.jpg" },
  { mfr: "huawei", category: "smartphone", model: "Pura 80 Ultra", year: 2025, status: "released", highlight: "1\" 메인 · 자기장 망원 전환", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Huawei_Pura80_Pro_001.jpg/500px-Huawei_Pura80_Pro_001.jpg" },
  { mfr: "huawei", category: "foldable", model: "Mate XT 2", year: 2025, status: "released", highlight: "트리폴드 2세대 · 더 얇음", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Huawei_Mate_XT_Ultimate_Design.jpg/500px-Huawei_Mate_XT_Ultimate_Design.jpg" },
  { mfr: "huawei", category: "foldable", model: "Mate XT (트리폴드)", year: 2024, status: "released", highlight: "세계 최초 트리폴드 · 10.2\"", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Huawei_Mate_XT_Ultimate_Design.jpg/500px-Huawei_Mate_XT_Ultimate_Design.jpg" },
  { mfr: "huawei", category: "foldable", model: "Mate X6", year: 2024, status: "released", highlight: "북향 폴드 · IPX8" },
  { mfr: "huawei", category: "wearable", model: "Watch Ultimate 2", year: 2025, status: "released", highlight: "다이빙 100m+ · ECG · 위성" },
  { mfr: "huawei", category: "wearable", model: "Watch GT 5 Pro", year: 2024, status: "released", highlight: "티타늄 · 14일 배터리", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E9%BE%8D%E8%8F%AF_Longhua_%E6%97%BA%E6%B0%91%E8%A1%97_Wangmin_Street_%E6%B0%91%E5%A1%98%E8%B7%AF_Mintang_Road_%E8%8F%AF%E6%BD%A4%E8%90%AC%E5%AE%B6_CRC_Vanguard_Mart_%E6%A2%85%E9%BE%8D%E5%BA%97_Meilong_shop_%E8%8F%AF%E7%B6%AD%E6%89%8B%E6%A9%9F%E5%BA%97_Huawei_Store_watch_display_September_2023_R12S_02.jpg/500px-thumbnail.jpg" },

  // ========== 6. OPPO / Vivo ==========
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X300 Pro", year: 2025, status: "released", highlight: "Dimensity 9500 · ZEISS APO · 200MP", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/The_front_of_the_unreleased_vivo_X300_Pro.jpg/500px-The_front_of_the_unreleased_vivo_X300_Pro.jpg" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X9 Pro", year: 2025, status: "released", highlight: "Dimensity 9500 · Hasselblad · 7000mAh" },
  { mfr: "oppo_vivo", category: "smartphone", model: "OPPO Find X8 Pro", year: 2024, status: "released", highlight: "Dimensity 9400 · Hasselblad", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Star_Grey_Oppo_Find_X8.jpg/500px-Star_Grey_Oppo_Find_X8.jpg" },
  { mfr: "oppo_vivo", category: "foldable", model: "OPPO Find N5", year: 2025, status: "released", highlight: "8.93mm · 세계 최슬림 폴더블 · IPX9" },
  { mfr: "oppo_vivo", category: "foldable", model: "Vivo X Fold5", year: 2025, status: "released", highlight: "236g · SD8 Elite · ZEISS", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E7%A6%8F%E7%94%B0%E5%8D%80_Futian_%E8%8F%AF%E5%BC%B7%E5%8C%97%E8%B7%AF_Huaqiang_North_Road_%E8%8F%AF%E5%BC%B7%E5%8C%97%E5%8D%9A%E7%89%A9%E9%A4%A8_HQB_Museum_%E6%99%BA%E8%83%BD%E6%89%8B%E6%A9%9F_Smartphone_models_history_exhibition_July_2023_Px3_52.jpg/500px-thumbnail.jpg" },
  { mfr: "oppo_vivo", category: "smartphone", model: "Vivo X200 Pro", year: 2024, status: "released", highlight: "ZEISS APO · 6000mAh" },
  { mfr: "oppo_vivo", category: "tablet", model: "OPPO Pad 4 Pro", year: 2025, status: "released", highlight: "13.2\" 3.4K · SD8 Gen3" },

  // ========== 7. Meta ==========
  { mfr: "meta", category: "xr", model: "Quest 3S", year: 2024, status: "released", highlight: "보급형 MR · SD XR2 Gen2", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Meta_Quest_3S_Display_Unit.jpg/500px-Meta_Quest_3S_Display_Unit.jpg" },
  { mfr: "meta", category: "xr", model: "Quest 3", year: 2023, status: "released", highlight: "MR 표준 · Pancake 렌즈", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Meta_Quest_3_display_unit.jpg/500px-Meta_Quest_3_display_unit.jpg" },
  { mfr: "meta", category: "xr", model: "Quest 4", year: 2026, status: "rumored", highlight: "유출 단계 · 더 가벼움 · MR 강화 예상" },
  { mfr: "meta", category: "xr", model: "Ray-Ban Meta (2세대)", year: 2025, status: "released", highlight: "디스플레이 탑재 · Live AI", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Ray-Ban_Stories.jpg/500px-Ray-Ban_Stories.jpg" },
  { mfr: "meta", category: "xr", model: "Orion (개발자 프로토타입)", year: 2024, status: "announced", highlight: "AR 글래스 컨셉 · holographic" },

  // ========== 8. Motorola ==========
  { mfr: "motorola", category: "foldable", model: "Razr 60 Ultra", year: 2025, status: "released", highlight: "4\" 외부 · SD8 Elite · 비건 가죽" },
  { mfr: "motorola", category: "foldable", model: "Razr 60", year: 2025, status: "released", highlight: "Dimensity 7400 · 보급형 폴더블" },
  { mfr: "motorola", category: "foldable", model: "Razr 50 Ultra", year: 2024, status: "released", highlight: "4\" 외부 · SD8s Gen3" },
  { mfr: "motorola", category: "smartphone", model: "Edge 60 Ultra", year: 2025, status: "released", highlight: "비건 가죽 · 125W 충전 · 6.7\"" },
  { mfr: "motorola", category: "smartphone", model: "Edge 50 Ultra", year: 2024, status: "released", highlight: "비건 가죽 · 125W · 50MP 메인" },

  // ========== 9. Sony ==========
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VII", year: 2025, status: "released", highlight: "Alpha 옵티컬 줌 · 4K 120Hz", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sony_Xperia_1.png/500px-Sony_Xperia_1.png" },
  { mfr: "sony", category: "smartphone", model: "Xperia 1 VI", year: 2024, status: "released", highlight: "Alpha 망원 · FHD+ 120Hz", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Sony_Xperia_1.png/500px-Sony_Xperia_1.png" },
  { mfr: "sony", category: "smartphone", model: "Xperia 5 VI", year: 2024, status: "released", highlight: "21:9 · 컴팩트 플래그십", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Sony_Xperia_5.jpg/500px-Sony_Xperia_5.jpg" },
  { mfr: "sony", category: "gaming", model: "PlayStation Portal", year: 2023, status: "released", highlight: "8\" 1080p · PS5 리모트", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/PlayStation_Portal.jpg/500px-PlayStation_Portal.jpg" },

  // ========== 10. Asus ==========
  { mfr: "asus", category: "gaming", model: "ROG Phone 9 Pro", year: 2024, status: "released", highlight: "SD8 Elite · AeroActive 쿨러 X", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/ROG_Phone_9.jpg/500px-ROG_Phone_9.jpg" },
  { mfr: "asus", category: "gaming", model: "ROG Phone 10", year: 2025, status: "rumored", highlight: "SD8 Elite Gen2 · 165Hz LTPO" },
  { mfr: "asus", category: "smartphone", model: "Zenfone 12 Ultra", year: 2025, status: "released", highlight: "6.78\" · SD8 Elite · AI 보조", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Zenfone_12_Ultra.png/500px-Zenfone_12_Ultra.png" }
];

// 풀 스펙 데이터 (모델명 키)
// 누락 필드는 UI에서 'N/A' 표시. 자동 갱신 스크립트(tools/fetch_specs.py)로 확장 가능.
// 출처: Wikipedia + 제조사 공식. lastUpdated 로 신선도 추적.
const SPECS = {
  "Galaxy S26 Ultra": {
    design:    { dimensions: "163.4 × 78.1 × 8.4 mm", weight: "232 g", materials: "알루미늄 프레임 · Gorilla Armor 2", colors: ["Titanium Black","Titanium White","Titanium Blue","Titanium Green"] },
    display:   { size: "6.9″", resolution: "3120×1440", panel: "Dynamic LTPO AMOLED 2X", refreshRate: "1–120 Hz", brightness: "2600 nits peak", hdr: "HDR10+", extra: "Privacy Display (세계 최초)" },
    processor: { ap: "Snapdragon 8 Elite Gen 5 for Galaxy", process: "TSMC 3nm" },
    memory:    { ram: "12 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "200 MP f/1.7 OIS", ultrawide: "50 MP", telephoto: "10 MP 3×", periscope: "50 MP 5×" }, front: "12 MP", video: "8K@30fps · 4K@120fps" },
    battery:   { capacity: "5000 mAh", chargingWired: "45 W", chargingWireless: "15 W (Qi2)", reverse: "4.5 W" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2 Gen 2", nfc: true, uwb: true },
    os:        { initial: "Android 16 (One UI 8.5)", updates: "7년 OS + 보안" },
    durability:{ ip: "IP68", biometric: ["초음파 지문","얼굴 인식"] },
    price:     { krw: "1,649,000원~", usd: "$1299", launchDate: "2026-03-11" },
    source:    "https://en.wikipedia.org/wiki/Samsung_Galaxy_S26_Ultra",
    lastUpdated: "2026-04-29"
  },
  "Galaxy S25 Ultra": {
    design:    { dimensions: "162.8 × 77.6 × 8.2 mm", weight: "218 g", materials: "티타늄 프레임 · Gorilla Armor 2" },
    display:   { size: "6.9″", resolution: "3120×1440", panel: "Dynamic LTPO AMOLED 2X", refreshRate: "1–120 Hz", brightness: "2600 nits peak", hdr: "HDR10+" },
    processor: { ap: "Snapdragon 8 Elite for Galaxy", process: "3nm" },
    memory:    { ram: "12 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "200 MP f/1.7 OIS", ultrawide: "50 MP", telephoto: "10 MP 3×", periscope: "50 MP 5×" }, front: "12 MP", video: "8K@30fps" },
    battery:   { capacity: "5000 mAh", chargingWired: "45 W", chargingWireless: "15 W", reverse: "4.5 W" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2", nfc: true, uwb: true },
    os:        { initial: "Android 15 (One UI 7)", updates: "7년" },
    durability:{ ip: "IP68", biometric: ["초음파 지문","얼굴 인식"] },
    price:     { krw: "1,698,500원~", usd: "$1299", launchDate: "2025-02-07" },
    source:    "https://en.wikipedia.org/wiki/Samsung_Galaxy_S25_Ultra",
    lastUpdated: "2026-04-29"
  },
  "iPhone 17 Pro Max": {
    design:    { dimensions: "163.4 × 78.0 × 8.75 mm", weight: "233 g", materials: "알루미늄 유니바디 · Ceramic Shield 2" },
    display:   { size: "6.9″", resolution: "2868×1320", panel: "Super Retina XDR ProMotion (LTPO OLED)", refreshRate: "1–120 Hz", brightness: "3000 nits peak", hdr: "Dolby Vision · HDR10" },
    processor: { ap: "Apple A19 Pro", process: "3nm 3rd gen" },
    memory:    { ram: "12 GB", storage: ["256 GB","512 GB","1 TB","2 TB"] },
    camera:    { rear: { main: "48 MP Fusion f/1.78", ultrawide: "48 MP", telephoto: "48 MP 4×/8× tetraprism" }, front: "18 MP Center Stage", video: "4K Dolby Vision@120fps · ProRes RAW" },
    battery:   { capacity: "5088 mAh", chargingWired: "40 W (PD)", chargingWireless: "25 W (MagSafe)" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", usb: "USB-C 3.2 (10 Gbps)", nfc: true, uwb: "U2" },
    os:        { initial: "iOS 26", updates: "통상 6+년" },
    durability:{ ip: "IP68", biometric: ["Face ID"] },
    price:     { krw: "1,990,000원~", usd: "$1199", launchDate: "2025-09-19" },
    source:    "https://en.wikipedia.org/wiki/IPhone_17_Pro",
    lastUpdated: "2026-04-29"
  },
  "iPhone 16 Pro Max": {
    design:    { dimensions: "163.0 × 77.6 × 8.25 mm", weight: "227 g", materials: "Grade 5 티타늄" },
    display:   { size: "6.9″", resolution: "2868×1320", panel: "LTPO Super Retina XDR", refreshRate: "1–120 Hz", brightness: "2000 nits peak" },
    processor: { ap: "Apple A18 Pro", process: "3nm 2nd gen" },
    memory:    { ram: "8 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "48 MP Fusion", ultrawide: "48 MP", telephoto: "12 MP 5× tetraprism" }, front: "12 MP", video: "4K@120fps" },
    battery:   { capacity: "4685 mAh", chargingWired: "27 W", chargingWireless: "25 W (MagSafe)" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.3", usb: "USB-C 3.2", nfc: true, uwb: "U2" },
    os:        { initial: "iOS 18", updates: "6+년" },
    durability:{ ip: "IP68", biometric: ["Face ID"] },
    price:     { krw: "1,900,000원~", usd: "$1199", launchDate: "2024-09-20" },
    source:    "https://en.wikipedia.org/wiki/IPhone_16_Pro",
    lastUpdated: "2026-04-29"
  },
  "Galaxy Z Fold7": {
    design:    { dimensions: "펴짐 153.5 × 142.7 × 4.2 mm / 접힘 153.5 × 72.8 × 8.9 mm", weight: "215 g", materials: "Armor Aluminum 힌지" },
    display:   { size: "내부 8.0″ / 외부 6.5″", resolution: "내부 2184×1968 / 외부 2520×1080", panel: "Dynamic AMOLED 2X", refreshRate: "1–120 Hz", brightness: "2600 nits peak" },
    processor: { ap: "Snapdragon 8 Elite for Galaxy" },
    memory:    { ram: "12/16 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "200 MP", ultrawide: "12 MP", telephoto: "10 MP 3×" }, front: "10 MP × 2 (외부+내부)", video: "8K@30fps" },
    battery:   { capacity: "4400 mAh", chargingWired: "25 W", chargingWireless: "15 W" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2", nfc: true },
    os:        { initial: "Android 15 (One UI 7)", updates: "7년" },
    durability:{ ip: "IP48", biometric: ["측면 지문","얼굴 인식"] },
    price:     { krw: "2,398,000원~", usd: "$1899", launchDate: "2025-07-25" },
    source:    "https://en.wikipedia.org/wiki/Samsung_Galaxy_Z_Fold7",
    lastUpdated: "2026-04-29"
  },
  "Pixel 10 Pro XL": {
    design:    { dimensions: "162.7 × 76.6 × 8.5 mm", weight: "232 g", materials: "알루미늄 프레임 · Gorilla Glass Victus 2" },
    display:   { size: "6.8″", resolution: "2992×1344", panel: "LTPO OLED", refreshRate: "1–120 Hz", brightness: "3000 nits peak" },
    processor: { ap: "Google Tensor G5", process: "TSMC 3nm" },
    memory:    { ram: "16 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "50 MP", ultrawide: "48 MP", telephoto: "48 MP 5×" }, front: "42 MP", video: "8K@30fps · Video Boost" },
    battery:   { capacity: "5200 mAh", chargingWired: "37 W", chargingWireless: "23 W (Qi2 magnetic)" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2", nfc: true, uwb: true },
    os:        { initial: "Android 16", updates: "7년" },
    durability:{ ip: "IP68", biometric: ["초음파 지문","얼굴 인식"] },
    price:     { krw: "1,549,000원~", usd: "$1199", launchDate: "2025-08-28" },
    source:    "https://en.wikipedia.org/wiki/Pixel_10",
    lastUpdated: "2026-04-29"
  },
  "Vision Pro M5": {
    design:    { dimensions: "프론트 알루미늄 + 라미네이트 글래스", weight: "헤드셋 600~650 g + 외부 배터리" },
    display:   { size: "마이크로 OLED 2개", resolution: "총 23M 픽셀", panel: "micro-OLED", refreshRate: "90/96/100 Hz" },
    processor: { ap: "Apple M5 + R1" },
    memory:    { ram: "16 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "—" }, front: "스테레오스코픽 3D · 6 LiDAR/카메라", video: "Spatial Video · 4K HDR" },
    battery:   { capacity: "외부 배터리 팩 (~2시간)", chargingWired: "USB-C" },
    connectivity:{ fiveG: false, wifi: "Wi-Fi 6E", bluetooth: "5.3", usb: "USB-C", nfc: false },
    os:        { initial: "visionOS 26" },
    durability:{ ip: "—", biometric: ["Optic ID"] },
    price:     { krw: "5,599,000원~", usd: "$3499", launchDate: "2025-10 (M5 갱신)" },
    source:    "https://en.wikipedia.org/wiki/Apple_Vision_Pro",
    lastUpdated: "2026-04-29"
  },
  "Quest 3": {
    design:    { dimensions: "184 × 160 × 98 mm", weight: "515 g" },
    display:   { size: "LCD 2개", resolution: "2064×2208 (각)", panel: "LCD with pancake lens", refreshRate: "90/120 Hz" },
    processor: { ap: "Snapdragon XR2 Gen 2" },
    memory:    { ram: "8 GB", storage: ["128 GB","512 GB"] },
    camera:    { rear: { main: "컬러 패스스루 (4 외부)" } },
    battery:   { capacity: "내장 (~2~2.2시간)", chargingWired: "USB-C 18W" },
    connectivity:{ fiveG: false, wifi: "Wi-Fi 6E", bluetooth: "5.2", usb: "USB-C 3.0" },
    os:        { initial: "Horizon OS (Meta Quest)" },
    durability:{ ip: "—", biometric: [] },
    price:     { krw: "699,000원~", usd: "$499", launchDate: "2023-10-10" },
    source:    "https://en.wikipedia.org/wiki/Meta_Quest_3",
    lastUpdated: "2026-04-29"
  },
  "Xiaomi 15 Ultra": {
    design:    { dimensions: "161.3 × 75.3 × 9.4 mm", weight: "229 g", materials: "알루미늄 + 비건 가죽 옵션" },
    display:   { size: "6.73″", resolution: "3200×1440", panel: "LTPO AMOLED", refreshRate: "1–120 Hz", brightness: "3200 nits peak" },
    processor: { ap: "Snapdragon 8 Elite" },
    memory:    { ram: "16 GB", storage: ["512 GB","1 TB"] },
    camera:    { rear: { main: "50 MP 1\" Sony LYT-900", ultrawide: "50 MP", telephoto: "50 MP 3×", periscope: "200 MP 4.3× HP9" }, front: "32 MP", video: "8K@24fps" },
    battery:   { capacity: "6000 mAh", chargingWired: "90 W HyperCharge", chargingWireless: "80 W" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2", nfc: true },
    os:        { initial: "HyperOS 2 (Android 15)", updates: "4 OS + 6 보안" },
    durability:{ ip: "IP68", biometric: ["광학 지문"] },
    price:     { krw: "1,599,000원~", usd: "~$1499", launchDate: "2025-03-13" },
    source:    "https://en.wikipedia.org/wiki/Xiaomi_15_Ultra",
    lastUpdated: "2026-04-29"
  },
  "OPPO Find X8 Pro": {
    design:    { dimensions: "162.3 × 76.7 × 8.2 mm", weight: "215 g" },
    display:   { size: "6.78″", resolution: "2780×1264", panel: "LTPO AMOLED", refreshRate: "1–120 Hz", brightness: "4500 nits peak" },
    processor: { ap: "MediaTek Dimensity 9400" },
    memory:    { ram: "16 GB", storage: ["256 GB","512 GB","1 TB"] },
    camera:    { rear: { main: "50 MP", ultrawide: "50 MP", telephoto: "50 MP 3×", periscope: "50 MP 6×" }, front: "32 MP", video: "4K@120fps Dolby Vision" },
    battery:   { capacity: "5910 mAh", chargingWired: "80 W", chargingWireless: "50 W" },
    connectivity:{ fiveG: true, wifi: "Wi-Fi 7", bluetooth: "5.4", usb: "USB-C 3.2", nfc: true },
    os:        { initial: "ColorOS 15 (Android 15)" },
    durability:{ ip: "IP68/IP69", biometric: ["광학 지문"] },
    price:     { krw: "—", usd: "~$1100", launchDate: "2024-11-21" },
    source:    "https://en.wikipedia.org/wiki/Oppo_Find_X8",
    lastUpdated: "2026-04-29"
  }
};
