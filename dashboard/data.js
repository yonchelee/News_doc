/* Tech-Lens. — Source-First Dataset
   Manufacturers: PDF "제조사 정보_검색용" 기준 10사
   카테고리: Phone · Foldable · Tablet · Watch · Ring · Earable · XR · Gaming
   미확인 항목은 "정보 미제공"으로 표기 (Fact-Only) */

window.TECHLENS_MAKERS = [
  { id: "apple",    name: "Apple",    note: "Benchmark · 정제된 스펙",       url: "https://www.apple.com/" },
  { id: "samsung",  name: "Samsung",  note: "폴더블·웨어러블 라인업 최다",    url: "https://www.samsung.com/" },
  { id: "xiaomi",   name: "Xiaomi",   note: "가성비 · IoT 연동",              url: "https://www.mi.com/global/" },
  { id: "google",   name: "Google",   note: "AI(Gemini) 중심 SW 스펙",        url: "https://store.google.com/" },
  { id: "huawei",   name: "Huawei",   note: "독자 카메라·통신 기술",          url: "https://consumer.huawei.com/" },
  { id: "oppovivo", name: "OPPO/Vivo",note: "초고속 충전 · 슬림 폼팩터",       url: "https://www.oppo.com/" },
  { id: "meta",     name: "Meta",     note: "XR·스마트 글래스 표준",          url: "https://www.meta.com/" },
  { id: "motorola", name: "Motorola", note: "북미 폴더블 시장 중심",          url: "https://www.motorola.com/" },
  { id: "sony",     name: "Sony",     note: "Alpha 카메라 · 게이밍",          url: "https://www.sony.com/" },
  { id: "asus",     name: "Asus",     note: "게이밍 특화(주사율·냉각)",       url: "https://www.asus.com/" },
];

window.TECHLENS_CATEGORIES = [
  { id: "phone",    label: "Phone" },
  { id: "foldable", label: "Foldable" },
  { id: "tablet",   label: "Tablet" },
  { id: "watch",    label: "Watch" },
  { id: "ring",     label: "Ring" },
  { id: "earable",  label: "Earable" },
  { id: "xr",       label: "XR / Glass" },
  { id: "gaming",   label: "Gaming" },
];

window.TECHLENS_DATA = [
  /* ===== APPLE ===== */
  {
    id: "ip16pm", makerId: "apple", category: "phone", name: "iPhone 16 Pro Max",
    specs: {
      "디스플레이": "6.9\" Super Retina XDR · ProMotion 120Hz",
      "AP": "Apple A18 Pro",
      "RAM/저장": "8GB / 256·512GB·1TB",
      "메인 카메라": "48MP Fusion",
      "배터리": "동영상 33h (공칭)",
      "무게": "227 g",
      "방수": "IP68",
    },
    source: { label: "Apple — iPhone 16 Pro", url: "https://www.apple.com/iphone-16-pro/" },
    metrics: { weight: 227, refresh: 120, mainMP: 48, peakNits: 2000 }
  },
  {
    id: "ip16", makerId: "apple", category: "phone", name: "iPhone 16",
    specs: {
      "디스플레이": "6.1\" Super Retina XDR · 60Hz",
      "AP": "Apple A18",
      "RAM/저장": "8GB / 128·256·512GB",
      "메인 카메라": "48MP Fusion",
      "배터리": "동영상 22h (공칭)",
      "무게": "170 g",
      "방수": "IP68",
    },
    source: { label: "Apple — iPhone 16", url: "https://www.apple.com/iphone-16/" },
    metrics: { weight: 170, refresh: 60, mainMP: 48, peakNits: 2000 }
  },
  {
    id: "ipadprom4", makerId: "apple", category: "tablet", name: "iPad Pro (M4) 13\"",
    specs: {
      "디스플레이": "13\" Tandem OLED · ProMotion 120Hz",
      "AP": "Apple M4",
      "RAM/저장": "8/16GB · 256GB–2TB",
      "무게": "579 g (Wi-Fi)",
      "포트": "USB-C / Thunderbolt 4",
      "펜슬": "Apple Pencil Pro 지원",
    },
    source: { label: "Apple — iPad Pro", url: "https://www.apple.com/ipad-pro/" },
    metrics: { weight: 579, refresh: 120, peakNits: 1600 }
  },
  {
    id: "ipadair", makerId: "apple", category: "tablet", name: "iPad Air (M2) 13\"",
    specs: {
      "디스플레이": "13\" Liquid Retina · 60Hz",
      "AP": "Apple M2",
      "RAM/저장": "8GB · 128GB–1TB",
      "무게": "617 g",
      "펜슬": "Apple Pencil Pro 지원",
    },
    source: { label: "Apple — iPad Air", url: "https://www.apple.com/ipad-air/" },
    metrics: { weight: 617, refresh: 60, peakNits: 600 }
  },
  {
    id: "awu2", makerId: "apple", category: "watch", name: "Apple Watch Ultra 2",
    specs: {
      "디스플레이": "1.93\" LTPO OLED · 3,000 nits",
      "프로세서": "Apple S9 SiP",
      "헬스 센서": "ECG · SpO₂ · 온도 · 심박",
      "배터리": "최대 36h (저전력 72h)",
      "방수": "WR100 + EN13319",
      "무게": "61.4 g",
    },
    source: { label: "Apple — Watch Ultra 2", url: "https://www.apple.com/apple-watch-ultra-2/" },
    metrics: { weight: 61.4, battery: 2160, peakNits: 3000 }
  },
  {
    id: "aw10", makerId: "apple", category: "watch", name: "Apple Watch Series 10",
    specs: {
      "디스플레이": "LTPO3 OLED · 와이드뷰",
      "프로세서": "Apple S10",
      "헬스 센서": "ECG · SpO₂ · 수면 무호흡 감지",
      "배터리": "최대 18h",
      "방수": "WR50",
      "무게": "36.4 g (42mm 알루미늄)",
    },
    source: { label: "Apple — Watch Series 10", url: "https://www.apple.com/apple-watch-series-10/" },
    metrics: { weight: 36.4, battery: 1080, peakNits: 2000 }
  },
  {
    id: "vp", makerId: "apple", category: "xr", name: "Vision Pro",
    specs: {
      "디스플레이": "Dual Micro-OLED · 23M px",
      "프로세서": "Apple M2 + R1",
      "FOV": "약 100°",
      "PPD": "≈ 34",
      "트래킹": "Inside-Out 6DoF + Eye + Hand",
      "무게": "600–650 g (밴드 제외)",
    },
    source: { label: "Apple — Vision Pro", url: "https://www.apple.com/apple-vision-pro/" },
    metrics: { weight: 625, fov: 100, ppd: 34 }
  },
  {
    id: "appp2", makerId: "apple", category: "earable", name: "AirPods Pro 2 (USB-C)",
    specs: {
      "드라이버": "Apple 커스텀 11mm",
      "칩셋": "Apple H2",
      "ANC": "Adaptive Audio · 적응형 ANC",
      "배터리": "최대 6h (ANC, 케이스 포함 30h)",
      "보조 기능": "청력 검사 · 보청기 기능 (지원국 한정)",
      "방수": "IP54",
    },
    source: { label: "Apple — AirPods Pro 2", url: "https://www.apple.com/airpods-pro/" },
    metrics: { weight: 5.3, battery: 360 }
  },

  /* ===== SAMSUNG ===== */
  {
    id: "s25u", makerId: "samsung", category: "phone", name: "Galaxy S25 Ultra",
    specs: {
      "디스플레이": "6.9\" QHD+ Dynamic AMOLED 2X · 120Hz",
      "AP": "Snapdragon 8 Elite for Galaxy",
      "RAM/저장": "12GB / 256·512GB·1TB",
      "메인 카메라": "200MP (1/1.3\")",
      "배터리": "5,000 mAh",
      "무게": "218 g",
      "방수": "IP68",
    },
    source: { label: "Samsung — Galaxy S25 Ultra", url: "https://www.samsung.com/global/galaxy/galaxy-s25-ultra/" },
    metrics: { weight: 218, battery: 5000, refresh: 120, mainMP: 200, peakNits: 2600 }
  },
  {
    id: "s25", makerId: "samsung", category: "phone", name: "Galaxy S25",
    specs: {
      "디스플레이": "6.2\" FHD+ Dynamic AMOLED 2X · 120Hz",
      "AP": "Snapdragon 8 Elite for Galaxy",
      "RAM/저장": "12GB / 128·256·512GB",
      "메인 카메라": "50MP",
      "배터리": "4,000 mAh",
      "무게": "162 g",
      "방수": "IP68",
    },
    source: { label: "Samsung — Galaxy S25", url: "https://www.samsung.com/global/galaxy/galaxy-s25/" },
    metrics: { weight: 162, battery: 4000, refresh: 120, mainMP: 50, peakNits: 2600 }
  },
  {
    id: "zfold6", makerId: "samsung", category: "foldable", name: "Galaxy Z Fold 6",
    specs: {
      "메인 디스플레이": "7.6\" QXGA+ Dynamic AMOLED 2X · 120Hz",
      "커버 디스플레이": "6.3\" HD+ · 120Hz",
      "AP": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM/저장": "12GB / 256·512GB·1TB",
      "배터리": "4,400 mAh",
      "무게": "239 g",
      "방수": "IP48",
    },
    source: { label: "Samsung — Galaxy Z Fold 6", url: "https://www.samsung.com/global/galaxy/galaxy-z-fold6/" },
    metrics: { weight: 239, battery: 4400, refresh: 120, mainMP: 50, peakNits: 2600 }
  },
  {
    id: "zflip6", makerId: "samsung", category: "foldable", name: "Galaxy Z Flip 6",
    specs: {
      "메인 디스플레이": "6.7\" FHD+ Dynamic AMOLED 2X · 120Hz",
      "커버 디스플레이": "3.4\" Super AMOLED",
      "AP": "Snapdragon 8 Gen 3 for Galaxy",
      "RAM/저장": "12GB / 256·512GB",
      "배터리": "4,000 mAh",
      "무게": "187 g",
      "방수": "IP48",
    },
    source: { label: "Samsung — Galaxy Z Flip 6", url: "https://www.samsung.com/global/galaxy/galaxy-z-flip6/" },
    metrics: { weight: 187, battery: 4000, refresh: 120, mainMP: 50, peakNits: 2600 }
  },
  {
    id: "tabs10u", makerId: "samsung", category: "tablet", name: "Galaxy Tab S10 Ultra",
    specs: {
      "디스플레이": "14.6\" Dynamic AMOLED 2X · 120Hz",
      "AP": "MediaTek Dimensity 9300+",
      "RAM/저장": "12·16GB / 256GB–1TB",
      "배터리": "11,200 mAh",
      "무게": "718 g",
      "S Pen": "포함",
    },
    source: { label: "Samsung — Galaxy Tab S10 Ultra", url: "https://www.samsung.com/global/galaxy/galaxy-tab-s10-ultra/" },
    metrics: { weight: 718, battery: 11200, refresh: 120, peakNits: 1600 }
  },
  {
    id: "gwu", makerId: "samsung", category: "watch", name: "Galaxy Watch Ultra",
    specs: {
      "디스플레이": "1.5\" Super AMOLED · 3,000 nits",
      "프로세서": "Exynos W1000",
      "헬스 센서": "BioActive (PPG·ECG·BIA·온도)",
      "배터리": "최대 100h (절전)",
      "방수": "10 ATM + IP68 + MIL-STD-810H",
      "무게": "60.5 g",
    },
    source: { label: "Samsung — Galaxy Watch Ultra", url: "https://www.samsung.com/global/galaxy/galaxy-watch-ultra/" },
    metrics: { weight: 60.5, battery: 6000, peakNits: 3000 }
  },
  {
    id: "gw7", makerId: "samsung", category: "watch", name: "Galaxy Watch 7",
    specs: {
      "디스플레이": "Super AMOLED · 최대 2,000 nits",
      "프로세서": "Exynos W1000",
      "헬스 센서": "BioActive · AGEs Index",
      "배터리": "최대 40h",
      "방수": "5 ATM + IP68",
      "무게": "33.8 g (44mm)",
    },
    source: { label: "Samsung — Galaxy Watch 7", url: "https://www.samsung.com/global/galaxy/galaxy-watch7/" },
    metrics: { weight: 33.8, battery: 2400, peakNits: 2000 }
  },
  {
    id: "gring", makerId: "samsung", category: "ring", name: "Galaxy Ring",
    specs: {
      "센서": "PPG · 가속도 · 온도",
      "배터리": "최대 7일 (사이즈 별 상이)",
      "방수": "10 ATM + IP68",
      "무게": "2.3–3.0 g",
      "사이즈": "5–13",
      "소재": "티타늄",
    },
    source: { label: "Samsung — Galaxy Ring", url: "https://www.samsung.com/global/galaxy/galaxy-ring/" },
    metrics: { weight: 2.6, battery: 10080 }
  },
  {
    id: "gbuds3p", makerId: "samsung", category: "earable", name: "Galaxy Buds 3 Pro",
    specs: {
      "드라이버": "듀얼 다이내믹 · 11mm + 6.1mm",
      "ANC": "Adaptive ANC",
      "배터리": "최대 6h (ANC, 케이스 26h)",
      "코덱": "Samsung Seamless Codec UHQ",
      "방수": "IP57",
      "무게": "5.4 g (개당)",
    },
    source: { label: "Samsung — Galaxy Buds 3 Pro", url: "https://www.samsung.com/global/galaxy/galaxy-buds3-pro/" },
    metrics: { weight: 5.4, battery: 360 }
  },

  /* ===== XIAOMI ===== */
  {
    id: "mi15u", makerId: "xiaomi", category: "phone", name: "Xiaomi 15 Ultra",
    specs: {
      "디스플레이": "6.73\" WQHD+ LTPO AMOLED · 120Hz",
      "AP": "Snapdragon 8 Elite",
      "RAM/저장": "16GB / 512GB·1TB",
      "메인 카메라": "50MP 1\" (Leica Summilux)",
      "배터리": "6,000 mAh",
      "무게": "229 g",
      "방수": "IP68",
    },
    source: { label: "Xiaomi — Xiaomi 15 Ultra", url: "https://www.mi.com/global/product/xiaomi-15-ultra/" },
    metrics: { weight: 229, battery: 6000, refresh: 120, mainMP: 50, peakNits: 3200 }
  },
  {
    id: "mi15", makerId: "xiaomi", category: "phone", name: "Xiaomi 15",
    specs: {
      "디스플레이": "6.36\" LTPO AMOLED · 120Hz",
      "AP": "Snapdragon 8 Elite",
      "RAM/저장": "12GB / 256·512GB·1TB",
      "메인 카메라": "50MP Leica",
      "배터리": "5,400 mAh",
      "무게": "191 g",
      "방수": "IP68",
    },
    source: { label: "Xiaomi — Xiaomi 15", url: "https://www.mi.com/global/product/xiaomi-15/" },
    metrics: { weight: 191, battery: 5400, refresh: 120, mainMP: 50, peakNits: 3200 }
  },
  {
    id: "redminote14p", makerId: "xiaomi", category: "phone", name: "Redmi Note 14 Pro+",
    specs: {
      "디스플레이": "6.67\" 1.5K AMOLED · 120Hz",
      "AP": "Snapdragon 7s Gen 3",
      "RAM/저장": "8·12GB / 256·512GB",
      "메인 카메라": "200MP",
      "배터리": "5,110 mAh",
      "무게": "210 g",
      "방수": "IP68",
    },
    source: { label: "Redmi — Note 14 Pro+", url: "https://www.mi.com/global/product/redmi-note-14-pro-plus-5g/" },
    metrics: { weight: 210, battery: 5110, refresh: 120, mainMP: 200, peakNits: 3000 }
  },
  {
    id: "mipad7", makerId: "xiaomi", category: "tablet", name: "Xiaomi Pad 7 Pro",
    specs: {
      "디스플레이": "11.2\" 3.2K · 144Hz",
      "AP": "Snapdragon 8s Gen 3",
      "RAM/저장": "8·12GB / 128·256·512GB",
      "배터리": "8,850 mAh",
      "무게": "500 g",
    },
    source: { label: "Xiaomi — Pad 7 Pro", url: "https://www.mi.com/global/product/xiaomi-pad-7-pro/" },
    metrics: { weight: 500, battery: 8850, refresh: 144 }
  },
  {
    id: "miwatchs4", makerId: "xiaomi", category: "watch", name: "Xiaomi Watch S4",
    specs: {
      "디스플레이": "1.43\" AMOLED · 60Hz",
      "헬스 센서": "심박 · SpO₂ · 스트레스",
      "배터리": "최대 15일 (일반)",
      "방수": "5 ATM",
      "무게": "정보 미제공",
    },
    source: { label: "Xiaomi — Watch S4", url: "https://www.mi.com/global/" },
    metrics: { battery: 21600, refresh: 60 }
  },
  {
    id: "miband9", makerId: "xiaomi", category: "watch", name: "Smart Band 9",
    specs: {
      "디스플레이": "1.62\" AMOLED · 60Hz · 1,200 nits",
      "헬스 센서": "심박 · SpO₂ · 수면",
      "배터리": "최대 21일",
      "방수": "5 ATM",
      "무게": "15.8 g (스트랩 제외)",
    },
    source: { label: "Xiaomi — Smart Band 9", url: "https://www.mi.com/global/product/xiaomi-smart-band-9/" },
    metrics: { weight: 15.8, battery: 30240, refresh: 60, peakNits: 1200 }
  },
  {
    id: "redmibuds6p", makerId: "xiaomi", category: "earable", name: "Redmi Buds 6 Pro",
    specs: {
      "드라이버": "트리플 드라이버",
      "ANC": "최대 55dB",
      "배터리": "최대 9.5h (ANC 꺼짐)",
      "코덱": "LDAC 지원",
      "방수": "IP54",
    },
    source: { label: "Redmi — Buds 6 Pro", url: "https://www.mi.com/global/" },
    metrics: { battery: 570 }
  },

  /* ===== GOOGLE ===== */
  {
    id: "p9pxl", makerId: "google", category: "phone", name: "Pixel 9 Pro XL",
    specs: {
      "디스플레이": "6.8\" Super Actua LTPO · 120Hz",
      "AP": "Google Tensor G4",
      "RAM/저장": "16GB / 256GB·512GB·1TB",
      "메인 카메라": "50MP Octa PD",
      "배터리": "5,060 mAh",
      "무게": "221 g",
      "방수": "IP68",
    },
    source: { label: "Google Store — Pixel 9 Pro XL", url: "https://store.google.com/product/pixel_9_pro_xl" },
    metrics: { weight: 221, battery: 5060, refresh: 120, mainMP: 50, peakNits: 3000 }
  },
  {
    id: "p9pfold", makerId: "google", category: "foldable", name: "Pixel 9 Pro Fold",
    specs: {
      "메인 디스플레이": "8.0\" LTPO OLED · 120Hz",
      "커버 디스플레이": "6.3\" Actua · 120Hz",
      "AP": "Google Tensor G4",
      "RAM/저장": "16GB / 256GB·512GB·1TB",
      "배터리": "4,650 mAh",
      "무게": "257 g",
      "방수": "IPX8",
    },
    source: { label: "Google Store — Pixel 9 Pro Fold", url: "https://store.google.com/product/pixel_9_pro_fold" },
    metrics: { weight: 257, battery: 4650, refresh: 120, mainMP: 48, peakNits: 2700 }
  },
  {
    id: "p9", makerId: "google", category: "phone", name: "Pixel 9",
    specs: {
      "디스플레이": "6.3\" Actua · 120Hz",
      "AP": "Google Tensor G4",
      "RAM/저장": "12GB / 128·256GB",
      "메인 카메라": "50MP",
      "배터리": "4,700 mAh",
      "무게": "198 g",
      "방수": "IP68",
    },
    source: { label: "Google Store — Pixel 9", url: "https://store.google.com/product/pixel_9" },
    metrics: { weight: 198, battery: 4700, refresh: 120, mainMP: 50, peakNits: 2700 }
  },
  {
    id: "pixeltab", makerId: "google", category: "tablet", name: "Pixel Tablet",
    specs: {
      "디스플레이": "11\" LCD · 60Hz",
      "AP": "Google Tensor G2",
      "RAM/저장": "8GB / 128·256GB",
      "배터리": "27Wh",
      "무게": "493 g",
      "악세서리": "충전 스피커 도크",
    },
    source: { label: "Google Store — Pixel Tablet", url: "https://store.google.com/product/pixel_tablet" },
    metrics: { weight: 493, refresh: 60, peakNits: 500 }
  },
  {
    id: "pw3", makerId: "google", category: "watch", name: "Pixel Watch 3 (45mm)",
    specs: {
      "디스플레이": "1.4\" AMOLED · 최대 2,000 nits · 60Hz",
      "프로세서": "Snapdragon W5 + Cortex M33",
      "헬스 센서": "심박 · ECG · SpO₂ · 피부온도",
      "배터리": "최대 36h (배터리 절약)",
      "방수": "5 ATM",
      "무게": "37 g",
    },
    source: { label: "Google Store — Pixel Watch 3", url: "https://store.google.com/product/pixel_watch_3" },
    metrics: { weight: 37, battery: 2160, refresh: 60, peakNits: 2000 }
  },
  {
    id: "pixelbudspro2", makerId: "google", category: "earable", name: "Pixel Buds Pro 2",
    specs: {
      "드라이버": "11mm 다이내믹",
      "칩셋": "Google Tensor A1",
      "ANC": "Silent Seal 2.0",
      "배터리": "최대 8h (ANC, 케이스 30h)",
      "방수": "IP54",
      "무게": "4.7 g (개당)",
    },
    source: { label: "Google Store — Pixel Buds Pro 2", url: "https://store.google.com/product/pixel_buds_pro_2" },
    metrics: { weight: 4.7, battery: 480 }
  },

  /* ===== HUAWEI ===== */
  {
    id: "mate70p", makerId: "huawei", category: "phone", name: "Mate 70 Pro",
    specs: {
      "디스플레이": "6.8\" LTPO OLED · 120Hz",
      "AP": "Kirin 9020",
      "RAM/저장": "12GB / 256·512GB·1TB",
      "메인 카메라": "50MP 가변 조리개 (Ultra Aperture)",
      "배터리": "5,500 mAh",
      "무게": "220 g",
      "방수": "IP68/IP69",
    },
    source: { label: "Huawei — Mate 70 Pro", url: "https://consumer.huawei.com/en/phones/mate70-pro/" },
    metrics: { weight: 220, battery: 5500, refresh: 120, mainMP: 50, peakNits: 2500 }
  },
  {
    id: "pura70u", makerId: "huawei", category: "phone", name: "Pura 70 Ultra",
    specs: {
      "디스플레이": "6.8\" LTPO OLED · 120Hz",
      "AP": "Kirin 9010",
      "RAM/저장": "16GB / 512GB·1TB",
      "메인 카메라": "50MP 1\" + 가변 조리개",
      "배터리": "5,200 mAh",
      "무게": "226 g",
      "방수": "IP68",
    },
    source: { label: "Huawei — Pura 70 Ultra", url: "https://consumer.huawei.com/en/phones/pura70-ultra/" },
    metrics: { weight: 226, battery: 5200, refresh: 120, mainMP: 50, peakNits: 2500 }
  },
  {
    id: "matepadprov", makerId: "huawei", category: "tablet", name: "MatePad Pro 13.2\"",
    specs: {
      "디스플레이": "13.2\" Flexible OLED · 144Hz",
      "AP": "Kirin 9000s",
      "RAM/저장": "12GB / 256·512GB·1TB",
      "무게": "580 g",
      "펜슬": "M-Pencil Pro",
    },
    source: { label: "Huawei — MatePad Pro 13.2", url: "https://consumer.huawei.com/en/tablets/matepad-pro-13-2/" },
    metrics: { weight: 580, refresh: 144, peakNits: 1000 }
  },
  {
    id: "watchultd", makerId: "huawei", category: "watch", name: "Watch Ultimate Design",
    specs: {
      "디스플레이": "1.5\" LTPO AMOLED",
      "헬스 센서": "TruSeen 5.5+ · ECG",
      "배터리": "최대 14일 (스마트 모드)",
      "방수": "다이빙 100m",
      "무게": "정보 미제공",
      "소재": "골드 합금 · 나노결정 세라믹",
    },
    source: { label: "Huawei — Watch Ultimate Design", url: "https://consumer.huawei.com/en/wearables/watch-ultimate-design/" },
    metrics: { battery: 20160 }
  },
  {
    id: "watchgt5p", makerId: "huawei", category: "watch", name: "Watch GT 5 Pro",
    specs: {
      "디스플레이": "1.43\" AMOLED",
      "헬스 센서": "TruSeen 5.5+ · ECG",
      "배터리": "최대 14일",
      "방수": "5 ATM + IP69",
      "무게": "53 g (스트랩 제외)",
    },
    source: { label: "Huawei — Watch GT 5 Pro", url: "https://consumer.huawei.com/en/wearables/watch-gt5-pro/" },
    metrics: { weight: 53, battery: 20160 }
  },
  {
    id: "freebudspro3", makerId: "huawei", category: "earable", name: "FreeBuds Pro 3",
    specs: {
      "드라이버": "듀얼 드라이버 (다이내믹 + 평판)",
      "ANC": "Pure Voice · Intelligent ANC 3.0",
      "배터리": "최대 6.5h (ANC)",
      "코덱": "LDAC · L2HC 2.0",
      "방수": "IP54",
    },
    source: { label: "Huawei — FreeBuds Pro 3", url: "https://consumer.huawei.com/en/audio/freebuds-pro-3/" },
    metrics: { battery: 390 }
  },

  /* ===== OPPO / VIVO ===== */
  {
    id: "findx8p", makerId: "oppovivo", category: "phone", name: "OPPO Find X8 Pro",
    specs: {
      "디스플레이": "6.78\" LTPO AMOLED · 120Hz",
      "AP": "MediaTek Dimensity 9400",
      "RAM/저장": "16GB / 256·512GB·1TB",
      "메인 카메라": "Quad 50MP (Hasselblad)",
      "배터리": "5,910 mAh",
      "무게": "215 g",
      "충전": "유선 80W · 무선 50W",
      "방수": "IP68/IP69",
    },
    source: { label: "OPPO — Find X8 Pro", url: "https://www.oppo.com/en/smartphones/series-find-x/find-x8-pro/" },
    metrics: { weight: 215, battery: 5910, refresh: 120, mainMP: 50, peakNits: 4500 }
  },
  {
    id: "vivox200p", makerId: "oppovivo", category: "phone", name: "Vivo X200 Pro",
    specs: {
      "디스플레이": "6.78\" LTPO AMOLED · 120Hz",
      "AP": "MediaTek Dimensity 9400",
      "RAM/저장": "12·16GB / 256GB–1TB",
      "메인 카메라": "ZEISS Quad 50MP (200MP 망원)",
      "배터리": "6,000 mAh",
      "무게": "223 g",
      "충전": "유선 100W · 무선 30W",
      "방수": "IP68/IP69",
    },
    source: { label: "Vivo — X200 Pro", url: "https://www.vivo.com/en/products/x200-pro" },
    metrics: { weight: 223, battery: 6000, refresh: 120, mainMP: 50, peakNits: 4500 }
  },
  {
    id: "oppopad3p", makerId: "oppovivo", category: "tablet", name: "OPPO Pad 3 Pro",
    specs: {
      "디스플레이": "13.2\" 3.4K LTPS · 144Hz",
      "AP": "Snapdragon 8 Gen 3",
      "RAM/저장": "12·16GB / 256·512GB·1TB",
      "배터리": "9,510 mAh",
      "무게": "675 g",
    },
    source: { label: "OPPO — Pad 3 Pro", url: "https://www.oppo.com/en/" },
    metrics: { weight: 675, battery: 9510, refresh: 144 }
  },
  {
    id: "vivopad3p", makerId: "oppovivo", category: "tablet", name: "Vivo Pad 3 Pro",
    specs: {
      "디스플레이": "13\" LCD · 144Hz",
      "AP": "MediaTek Dimensity 9300",
      "RAM/저장": "8·12·16GB / 256·512GB·1TB",
      "배터리": "11,500 mAh",
      "무게": "586 g",
    },
    source: { label: "Vivo — Pad 3 Pro", url: "https://www.vivo.com/" },
    metrics: { weight: 586, battery: 11500, refresh: 144 }
  },

  /* ===== META ===== */
  {
    id: "q3", makerId: "meta", category: "xr", name: "Meta Quest 3",
    specs: {
      "디스플레이": "LCD 2064×2208/eye · 120Hz",
      "프로세서": "Snapdragon XR2 Gen 2",
      "FOV": "약 110° H",
      "PPD": "≈ 25",
      "트래킹": "Inside-Out 6DoF + Hand",
      "무게": "515 g",
    },
    source: { label: "Meta — Quest 3", url: "https://www.meta.com/quest/quest-3/" },
    metrics: { weight: 515, fov: 110, ppd: 25 }
  },
  {
    id: "q3s", makerId: "meta", category: "xr", name: "Meta Quest 3S",
    specs: {
      "디스플레이": "LCD 1832×1920/eye · 120Hz",
      "프로세서": "Snapdragon XR2 Gen 2",
      "FOV": "약 96° H",
      "PPD": "≈ 20",
      "트래킹": "Inside-Out 6DoF + Hand",
      "무게": "514 g",
    },
    source: { label: "Meta — Quest 3S", url: "https://www.meta.com/quest/quest-3s/" },
    metrics: { weight: 514, fov: 96, ppd: 20 }
  },
  {
    id: "rbmeta", makerId: "meta", category: "xr", name: "Ray-Ban Meta Smart Glasses",
    specs: {
      "카메라": "12MP UWA",
      "오디오": "오픈-이어 스피커",
      "AI": "Meta AI (Look & Ask)",
      "프레임": "Wayfarer / Headliner / Skyler",
      "배터리": "최대 4h (사용량 기준)",
      "무게": "약 49 g",
    },
    source: { label: "Meta — Ray-Ban Meta", url: "https://www.meta.com/smart-glasses/" },
    metrics: { weight: 49, battery: 240 }
  },

  /* ===== MOTOROLA ===== */
  {
    id: "razr50u", makerId: "motorola", category: "foldable", name: "Razr 50 Ultra",
    specs: {
      "메인 디스플레이": "6.9\" pOLED · 165Hz",
      "커버 디스플레이": "4.0\" pOLED · 165Hz",
      "AP": "Snapdragon 8s Gen 3",
      "RAM/저장": "12GB / 512GB·1TB",
      "배터리": "4,000 mAh",
      "무게": "189 g",
      "방수": "IPX8",
    },
    source: { label: "Motorola — Razr 50 Ultra", url: "https://www.motorola.com/us/smartphones-motorola-razr-50-ultra/p" },
    metrics: { weight: 189, battery: 4000, refresh: 165, mainMP: 50, peakNits: 3000 }
  },
  {
    id: "razr50", makerId: "motorola", category: "foldable", name: "Razr 50",
    specs: {
      "메인 디스플레이": "6.9\" pOLED · 120Hz",
      "커버 디스플레이": "3.6\" pOLED · 90Hz",
      "AP": "MediaTek Dimensity 7300X",
      "RAM/저장": "8GB / 256GB",
      "배터리": "4,200 mAh",
      "무게": "188 g",
      "방수": "IPX8",
    },
    source: { label: "Motorola — Razr 50", url: "https://www.motorola.com/us/smartphones-motorola-razr-50/p" },
    metrics: { weight: 188, battery: 4200, refresh: 120, mainMP: 50, peakNits: 3000 }
  },
  {
    id: "edge50u", makerId: "motorola", category: "phone", name: "Edge 50 Ultra",
    specs: {
      "디스플레이": "6.7\" pOLED · 144Hz",
      "AP": "Snapdragon 8s Gen 3",
      "RAM/저장": "12·16GB / 512GB·1TB",
      "메인 카메라": "50MP",
      "배터리": "4,500 mAh",
      "무게": "197 g",
      "방수": "IP68",
    },
    source: { label: "Motorola — Edge 50 Ultra", url: "https://www.motorola.com/" },
    metrics: { weight: 197, battery: 4500, refresh: 144, mainMP: 50, peakNits: 2500 }
  },

  /* ===== SONY ===== */
  {
    id: "xperia1vi", makerId: "sony", category: "phone", name: "Xperia 1 VI",
    specs: {
      "디스플레이": "6.5\" FHD+ OLED · 120Hz",
      "AP": "Snapdragon 8 Gen 3",
      "RAM/저장": "12GB / 256·512GB",
      "메인 카메라": "Exmor T (48MP) · 광학 7배 가변 망원",
      "배터리": "5,000 mAh",
      "무게": "192 g",
      "방수": "IP65/68",
    },
    source: { label: "Sony — Xperia 1 VI", url: "https://www.sony.com/electronics/xperia-smartphones/xperia-1-vi" },
    metrics: { weight: 192, battery: 5000, refresh: 120, mainMP: 48, peakNits: 1300 }
  },
  {
    id: "xperia5v", makerId: "sony", category: "phone", name: "Xperia 5 V",
    specs: {
      "디스플레이": "6.1\" FHD+ OLED · 120Hz",
      "AP": "Snapdragon 8 Gen 2",
      "RAM/저장": "8GB / 128·256GB",
      "메인 카메라": "Exmor T 듀얼",
      "배터리": "5,000 mAh",
      "무게": "182 g",
      "방수": "IP65/68",
    },
    source: { label: "Sony — Xperia 5 V", url: "https://www.sony.com/electronics/xperia-smartphones/xperia-5-v" },
    metrics: { weight: 182, battery: 5000, refresh: 120, mainMP: 48 }
  },
  {
    id: "psportal", makerId: "sony", category: "gaming", name: "PlayStation Portal",
    specs: {
      "디스플레이": "8\" LCD · 1080p · 60Hz",
      "용도": "PS5 리모트 플레이 전용",
      "컨트롤": "DualSense 일체형 (햅틱·적응형 트리거)",
      "오디오": "내장 스테레오 · 3.5mm",
      "배터리": "최대 7–9h (사용량 기준)",
      "무게": "529 g",
    },
    source: { label: "Sony — PlayStation Portal", url: "https://www.playstation.com/ps5/playstation-portal-remote-player/" },
    metrics: { weight: 529, refresh: 60 }
  },

  /* ===== ASUS ===== */
  {
    id: "rog9p", makerId: "asus", category: "gaming", name: "ROG Phone 9 Pro",
    specs: {
      "디스플레이": "6.78\" LTPO AMOLED · 185Hz",
      "AP": "Snapdragon 8 Elite",
      "RAM/저장": "16·24GB / 512GB·1TB",
      "메인 카메라": "50MP (Sony LYT-700)",
      "배터리": "5,800 mAh",
      "무게": "227 g",
      "냉각": "GameCool 9 (외장 AeroActive Cooler X Pro)",
      "방수": "IP68",
    },
    source: { label: "Asus — ROG Phone 9 Pro", url: "https://rog.asus.com/phones/rog-phone-9-pro/" },
    metrics: { weight: 227, battery: 5800, refresh: 185, mainMP: 50, peakNits: 2500 }
  },
  {
    id: "zenfone11u", makerId: "asus", category: "phone", name: "Zenfone 11 Ultra",
    specs: {
      "디스플레이": "6.78\" LTPO AMOLED · 144Hz",
      "AP": "Snapdragon 8 Gen 3",
      "RAM/저장": "12·16GB / 256·512GB",
      "메인 카메라": "50MP (Sony IMX890, 6축 짐벌)",
      "배터리": "5,500 mAh",
      "무게": "224 g",
      "방수": "IP68",
    },
    source: { label: "Asus — Zenfone 11 Ultra", url: "https://www.asus.com/mobile/phones/zenfone/zenfone-11-ultra/" },
    metrics: { weight: 224, battery: 5500, refresh: 144, mainMP: 50, peakNits: 2500 }
  },
];

/* 비교 시 사용되는 수치 메트릭 정의
   dir: "higher" → 큰 값이 우위, "lower" → 작은 값이 우위 */
window.TECHLENS_METRICS = [
  { key: "weight",   label: "무게 (g)",         dir: "lower",  unit: "g" },
  { key: "battery",  label: "배터리 (mAh/min)", dir: "higher", unit: "" },
  { key: "refresh",  label: "주사율 (Hz)",      dir: "higher", unit: "Hz" },
  { key: "peakNits", label: "최대 휘도 (nits)", dir: "higher", unit: "nits" },
  { key: "mainMP",   label: "메인 카메라 (MP)", dir: "higher", unit: "MP" },
  { key: "fov",      label: "FOV (°)",          dir: "higher", unit: "°" },
  { key: "ppd",      label: "PPD",              dir: "higher", unit: "" },
];
