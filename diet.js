const DIET_BASE_KCAL = 1800;
const DIET_BASE_PROTEIN = 120;

function yt(id, title, channel) {
  return { title, channel, url: "https://www.youtube.com/watch?v=" + id };
}

const YT = {
  catfish: yt("ulnDthexo1E", "Catfish Pepper Soup AKA Point and Kill - Watch This Before You Make Fish Pepper Soup - African Food", "Precious Kitchen"),
  chickenPs: yt("lnV6fj6xWgI", "How to make Nigerian Chicken Peppersoup for beginners | step by step", "Tspices Kitchen"),
  moiMoi: yt("ccjOaLGqiX8", "Nigerian Moi Moi with Beans Flour | Flo Chinyere", "Flo Chinyere"),
  beans: yt("k9b6E0eu6hc", "Benefits of Honey Beans | Super Healthy Nigerian Brown Beans Recipe", "Cosy Nutrition"),
  suya: yt("Nh_l3222JhI", "Oven Grilled Suya Chicken//How To Make The Best Chicken Suya @MasofsKitchen", "Masof's Kitchen"),
  okra: yt("czhKqZf9VPU", "How To Make Oil - Less Okro Soup//Okro Soup without Oil @MasofsKitchen", "Masof's Kitchen"),
  egusi: yt("yQDw8lVAhgM", "How to Make Oil-Less Egusi Soup | Healthy Nigerian Egusi Recipe for Weight Loss & Clean Eating", "Zeelicious Foods"),
  yamEgg: yt("8c5g5XaWnqo", "Boiled Yam With Veggie Egg Sauce | Quick Nigerian Breakfast / Lunch Idea.", "Chizoba Edemuzor"),
  ofada: yt("Jha4uYk4U2M", "How to make Authentic Ayamase Stew Recipe | Easy Ofada Sauce (Green Pepper Sauce)Start to Finish", "Meals with Abi"),
  jollof: yt("v4w6_3fUzmI", "Let’s Cook A Big Pot Of Jollof Rice & The Juiciest Baked Chicken Recipe Using Our All Purpose Stew", "Sweet Adjeley"),
  akara: yt("r2hVi_f4M6g", "How To Make THE BEST AKARA | Cook With Me On Saturday Morning!", "SisiYemmieTV"),
  efo: yt("jjlaQtILJoE", "Efo Riro Recipe | Nigerian Vegetable Soup with Smoked Fish & Prawns", "cheerstv25"),
  ugu: yt("sXKxiqy3vyk", "HOW TO COOK OFE UGU (PUMKIN LEAVES) | DELICIOUS VEGETABLE SOUP", "Assigned To Motherhood"),
  edikang: yt("6uYUMtUD81U", "HOW TO MAKE EDIKANG IKONG SOUP//THE BEST NIGERIAN VEGETABLE SOUP RECIPE", "Cooking  With Jorouka")
};

const DEFAULT_SALT = "Low salt: skip stock cubes and seasoning powder (use at most half a cube if you need one). Skip salted, dried or stockfish. Flavour with pepper, onion, garlic, ginger and herbs.";

function meal(name, items, kcal, protein, tip, video, salt) {
  return { name, items, kcal, protein, tip, video, salt: salt || DEFAULT_SALT };
}

const M = {
  yamEgg: meal(
    "Boiled yam with veggie egg sauce",
    ["200g boiled yam", "2 eggs", "tomato, onion, peppers, garlic, ginger", "1 tsp oil"],
    430, 20,
    "Boil the yam. Cook the sauce in a non-stick pan with 1 tsp oil, not a pour of palm oil. No stock cube — the peppers, onion, garlic and ginger are enough.",
    YT.yamEgg
  ),
  plantainEgg: meal(
    "Boiled plantain with veggie egg sauce",
    ["1 medium ripe plantain, boiled (not fried)", "2 eggs", "tomato, onion, peppers, garlic, ginger", "1 tsp oil"],
    420, 20,
    "The same egg sauce as the yam video. Boil the plantain; do not fry it as dodo. Skip stock cubes and seasoning powder.",
    YT.yamEgg
  ),
  akaraPap: meal(
    "Baked akara with pap (ogi)",
    ["4–5 baked akara", "1 cup unsweetened pap with semi-skimmed milk"],
    440, 20,
    "Follow the batter in the video, then bake at 200°C or air-fry until golden instead of deep-frying. Lightly oil the tray only. Season the batter with pepper, onion and a little ginger — no stock cube or seasoning powder.",
    YT.akara
  ),
  moiMoiPapEgg: meal(
    "Moi moi with pap and a boiled egg",
    ["1–2 medium steamed moi moi wraps", "unsweetened pap", "1 boiled egg"],
    460, 28,
    "Go easy on oil in the batter and steam, don't fry. Beans flour from a UK African shop is a shortcut. Leave salted fish and stock cubes out of the batter; use pepper, onion, garlic and ginger.",
    YT.moiMoi
  ),
  chickenPsPlantain: meal(
    "Chicken pepper soup with boiled plantain",
    ["200g skinless chicken", "pepper-soup spices, scent leaf, scotch bonnet", "onion, garlic, ginger", "1 small boiled plantain"],
    500, 48,
    "Use skinless chicken and no palm oil. Skim the broth. A small boiled plantain is enough on the side. No stock cube or seasoning powder.",
    YT.chickenPs
  ),
  catfishPsYam: meal(
    "Catfish pepper soup with boiled yam",
    ["220g fresh (not salted) catfish", "pepper-soup spices, uda, ehuru, scent leaf", "onion, garlic, ginger", "150g boiled yam"],
    490, 44,
    "No palm oil. Use fresh catfish, not salted or stockfish. Simmer in a light, well-spiced broth rather than frying it first.",
    YT.catfish
  ),
  beansEgg: meal(
    "Honey beans porridge (less oil) with a boiled egg",
    ["a generous bowl of ewa oloyin / honey beans", "onion, pepper, garlic, ginger", "1 boiled egg"],
    540, 30,
    "The linked video is a no-oil honey beans method. If you use palm oil, measure 1 teaspoon — don't pour freely. Skip stock cubes and seasoning powder.",
    YT.beans
  ),
  beansPlantain: meal(
    "Beans porridge (less oil) with boiled plantain",
    ["a bowl of honey beans or brown beans", "1 small boiled plantain", "pepper, onion, garlic, ginger"],
    560, 24,
    "Cook the beans with little or no palm oil, and boil the plantain instead of frying dodo. Skip stock cubes and seasoning powder.",
    YT.beans
  ),
  suyaChicken: meal(
    "Oven-grilled suya chicken with salad and yam",
    ["150g chicken breast in low-salt or homemade yaji", "cabbage, cucumber and tomato salad", "150g boiled yam"],
    520, 45,
    "Use skinless chicken breast. Oven-grill, don't fry. Go light on oil in the rub. Use a salt-free or low-salt suya rub — many shop yaji blends are salty. Save lean beef or goat for the 1–2 red-meat meals this week.",
    YT.suya
  ),
  suyaBeef: meal(
    "Grilled lean beef suya with salad",
    ["150g lean beef (trimmed), low-salt or homemade suya rub", "cabbage and tomato salad", "a small boiled sweet potato or yam"],
    500, 42,
    "This is the week’s red-meat meal (keep beef or goat to 1–2 times a week). Same oven-grill method as the chicken suya video. Choose a lean cut, trim visible fat, and skip frying. Use a low-salt rub, not a heavily salted shop suya.",
    YT.suya
  ),
  jollofChicken: meal(
    "Jollof rice with grilled chicken (portion-controlled)",
    ["a fist-sized scoop of jollof (about 200g cooked)", "150g baked or grilled chicken", "side salad"],
    590, 42,
    "Bake or grill the chicken. Serve a measured scoop of rice — about a fist — not a heaped plate. Cook the jollof without a stock cube, or use at most half a cube, and flavour with tomato, pepper, onion, garlic and ginger.",
    YT.jollof
  ),
  jollofChickenLight: meal(
    "Smaller jollof with grilled chicken",
    ["a modest scoop of jollof (about 160g cooked)", "150g grilled chicken", "extra salad or steamed greens"],
    520, 40,
    "Keep the rice portion smaller and fill the plate with chicken and salad. Grill, don't fry. Low salt: skip the stock cube or use at most half, and skip seasoning powder.",
    YT.jollof
  ),
  okraFish: meal(
    "Oil-less okra soup with fish and boiled yam",
    ["okra soup with fresh fish", "onion, pepper, garlic, ginger", "200g boiled yam (or a modest scoop of eba)"],
    580, 40,
    "Follow the oil-less okro method. Load the fish and vegetables; keep swallow or yam to a modest scoop. Skip stock cubes, seasoning powder and salted fish.",
    YT.okra
  ),
  egusiLight: meal(
    "Oil-less egusi with lean chicken and a modest swallow",
    ["oil-less egusi soup", "150g skinless chicken or turkey", "pepper, onion, garlic, ginger", "a modest scoop of eba or amala"],
    600, 42,
    "Egusi is already rich. Use the oil-less method, skinless chicken or turkey, and a small swallow — more soup than starch. Skip stock cubes, seasoning powder and salted fish.",
    YT.egusi
  ),
  efoPlantain: meal(
    "Efo riro with lean meat and boiled plantain",
    ["efo riro with lean turkey or fresh fish (not salted)", "spinach or ugu", "onion, pepper, garlic, ginger", "1 boiled plantain"],
    560, 36,
    "Measure 1–2 tsp palm oil instead of a generous pour. Choose lean meat or fresh fish and pile on the greens. Skip smoked or salted fish, stock cubes and seasoning powder.",
    YT.efo
  ),
  uguYam: meal(
    "Ugu soup with lean meat and boiled yam",
    ["ofe ugu / pumpkin-leaf soup", "lean turkey or chicken", "onion, garlic, ginger, pepper", "200g boiled yam or a modest amala scoop"],
    550, 38,
    "Frozen ugu from a UK African grocery works well. Less palm oil, turkey or chicken, modest starch. No stock cube or salted fish — use herbs and pepper for flavour.",
    YT.ugu
  ),
  edikang: meal(
    "Edikang ikong with lean meat and a modest swallow",
    ["ugu and waterleaf soup", "lean turkey or chicken plus fresh (not salted) fish", "onion, garlic, ginger", "a modest scoop of eba or pounded-yam powder"],
    580, 40,
    "The greens are the star. Cut the palm oil and fatty cuts; use turkey or chicken and fresh fish. Skip stockfish, salted fish and stock cubes.",
    YT.edikang
  ),
  ofadaLight: meal(
    "Ofada rice with a lighter ayamase sauce and lean turkey",
    ["a modest scoop of ofada or brown rice", "ayamase / ofada sauce made with less palm oil", "150g lean turkey or chicken", "pepper, onion, garlic"],
    620, 42,
    "Traditional ayamase uses a lot of bleached palm oil. Use a much smaller amount, trim fatty cuts, and keep the rice modest. Skip stock cubes and seasoning powder.",
    YT.ofada
  ),
  snackMoiMoi: meal(
    "Moi moi",
    ["1 medium steamed moi moi wrap"],
    220, 14,
    "Steam, with only a little oil in the batter. A good high-protein snack from leftover wraps. Keep the batter low salt: no stock cube or salted fish.",
    YT.moiMoi
  ),
  snackAkara: meal(
    "Baked akara (two pieces)",
    ["2 baked or air-fried akara"],
    180, 10,
    "Bake or air-fry the same batter. Don't deep-fry. Flavour with pepper and onion, not seasoning powder.",
    YT.akara
  ),
  snackChickenPs: meal(
    "Small bowl of chicken pepper soup",
    ["a cup of leftover chicken pepper soup, skinless chicken"],
    250, 30,
    "A light, high-protein leftover. No added oil; skim the broth if needed. The leftover should already be cooked without a stock cube.",
    YT.chickenPs
  ),
  snackCatfish: meal(
    "Small bowl of catfish pepper soup",
    ["a cup of leftover catfish pepper soup"],
    250, 30,
    "Keep it broth-based. No palm oil. Use fresh, not salted, fish, and no stock cube.",
    YT.catfish
  ),
  snackMoiMoiFruit: meal(
    "Moi moi and fruit",
    ["1 small moi moi wrap", "1 orange or apple"],
    260, 14,
    "Leftover steamed moi moi plus fruit. No fried snacks. The moi moi should be the low-salt, no-cube version.",
    YT.moiMoi
  )
};

const SALT_TIP = {
  title: "Low salt for blood pressure",
  body: "Cutting down on salt is general advice often given for high blood pressure. Every recipe here is written as a low-salt version: no stock cube, or at most half a cube if you really need one; no seasoning powder; and no salted, dried or stockfish. Build flavour with pepper, onion, garlic, ginger, herbs and spices instead. If a cooking video adds a stock cube or salted fish, skip those steps. This is general food guidance, not a personal medical plan — follow your GP’s advice."
};

const MEAT_GUIDE = {
  title: "Meat & protein guide",
  lead: "You don’t need to cut out meat. Protein helps keep muscle while you lose weight.",
  items: [
    { k: "Eat freely", v: "Skinless chicken or turkey, fish (fresh mackerel, tilapia, titus), eggs, beans and moi moi." },
    { k: "Limit", v: "Red meat (beef, goat) to 1–2 times a week, and choose lean cuts." },
    { k: "Avoid mostly (for blood pressure)", v: "Processed meat (sausages, corned beef), heavily salted suya, fatty cuts, shaki, ponmo and deep-fried meat." },
    { k: "Cook", v: "Grill, boil or make pepper soup instead of frying. Go easy on stock cubes — salt raises blood pressure." },
    { k: "Portion", v: "About the size of your palm per meal." }
  ],
  foot: "Follow your GP’s specific diet advice if you have been given any."
};

const COOK_TIPS = [
  "Measure palm oil (1–2 teaspoons) instead of pouring it freely. Many soups taste fine with much less, or with none.",
  "Grill, oven-bake or air-fry suya, chicken, fish and akara. Skip deep-frying and fried dodo when you can; boil plantain or yam instead.",
  "Choose lean cuts: skinless chicken or turkey, and fresh (not salted) fish. Keep lean beef or goat to 1–2 meals a week. Take the skin off chicken used in pepper soup.",
  "Fill the plate with soup, fish or chicken, and greens. Keep swallow (eba, amala, pounded yam) and jollof to a modest scoop.",
  "Steam moi moi and bake akara. Skim visible oil from stews and soups before serving."
];

const SHOP_CORE_AFRICAN = [
  "Honey beans (ewa oloyin) or brown beans, and beans flour for moi moi",
  "Yam (fresh or frozen) and plantain",
  "Long-grain rice for jollof; ofada or brown rice if you can find it",
  "Garri for eba, or yam flour (amala) / pounded-yam powder — buy a small bag and use modest scoops",
  "Egusi (melon seeds)",
  "Low-salt or homemade suya rub (paprika, cayenne, ginger, garlic, onion powder) — many shop yaji blends are salty",
  "Pepper-soup spices (uda, ehuru, calabash nutmeg) and iru / locust beans (dawadawa) for flavour without a stock cube",
  "Scotch bonnet (ata rodo), tatashe or red peppers, plenty of fresh garlic, ginger and onions",
  "Frozen ugu (fluted pumpkin leaves); waterleaf if available, or spinach as a stand-in",
  "Okra, scent leaf (or fresh basil if scent leaf is short)",
  "A small bottle of palm oil — you will use it sparingly",
  "Fresh catfish or other fresh fish — skip salted dried fish, stockfish and salty smoked fish",
  "Pap / ogi / akamu",
  "Scent leaf, basil or parsley. You do not need stock cubes or seasoning powder"
];

const SHOP_SUPERMARKET = [
  "Chicken breast, turkey and eggs. Lean beef only for 1–2 meals this week — skip sausages, corned beef, shaki, ponmo and fatty or processed cuts",
  "Fresh white fish if catfish is hard to find (not salty smoked fish)",
  "Tomatoes, onions, peppers, cabbage, cucumber, spinach, garlic and ginger",
  "Oranges, apples, bananas",
  "Semi-skimmed milk for pap",
  "Tomato passata or tinned tomatoes for jollof and egg sauce (choose a no-added-salt tin if you can)",
  "Skip stock cubes and seasoning powder, or keep half a cube only if you must"
];

function shopping(extraAfrican, extraShop) {
  return [
    { aisle: "African grocery / world-food aisle (UK)", items: SHOP_CORE_AFRICAN.concat(extraAfrican || []) },
    { aisle: "Supermarket", items: SHOP_SUPERMARKET.concat(extraShop || []) }
  ];
}

const DIET = [
  {
    id: 1, name: "Foundation",
    intro: "Nigerian and West African meals lead this plan, all cooked low salt: pepper soup, moi moi, beans, baked akara, and jollof with grilled chicken. High in protein, cooked with less palm oil, and scaled to your calorie target.",
    days: {
      Mon: { breakfast: M.yamEgg, lunch: M.chickenPsPlantain, dinner: M.jollofChicken, snacks: M.snackMoiMoi },
      Tue: { breakfast: M.akaraPap, lunch: M.beansEgg, dinner: M.okraFish, snacks: M.snackChickenPs },
      Wed: { breakfast: M.moiMoiPapEgg, lunch: M.suyaChicken, dinner: M.efoPlantain, snacks: M.snackAkara },
      Thu: { breakfast: M.plantainEgg, lunch: M.catfishPsYam, dinner: M.egusiLight, snacks: M.snackMoiMoi },
      Fri: { breakfast: M.akaraPap, lunch: M.jollofChickenLight, dinner: M.uguYam, snacks: M.snackCatfish },
      Sat: { breakfast: M.yamEgg, lunch: M.beansPlantain, dinner: M.ofadaLight, snacks: M.snackChickenPs },
      Sun: { breakfast: M.moiMoiPapEgg, lunch: M.suyaBeef, dinner: M.efoPlantain, snacks: M.snackMoiMoiFruit }
    },
    shopping: shopping(["Catfish if you can get it this week", "Scent leaf for pepper soup"])
  },
  {
    id: 2, name: "Build",
    intro: "The same Nigerian rotation, with more ugu, efo riro and oil-less okra. Keep swallow modest and protein high as the workouts get a little denser.",
    days: {
      Mon: { breakfast: M.akaraPap, lunch: M.catfishPsYam, dinner: M.efoPlantain, snacks: M.snackMoiMoi },
      Tue: { breakfast: M.yamEgg, lunch: M.suyaChicken, dinner: M.okraFish, snacks: M.snackChickenPs },
      Wed: { breakfast: M.moiMoiPapEgg, lunch: M.beansEgg, dinner: M.uguYam, snacks: M.snackChickenPs },
      Thu: { breakfast: M.plantainEgg, lunch: M.chickenPsPlantain, dinner: M.jollofChicken, snacks: M.snackMoiMoi },
      Fri: { breakfast: M.akaraPap, lunch: M.suyaBeef, dinner: M.egusiLight, snacks: M.snackCatfish },
      Sat: { breakfast: M.moiMoiPapEgg, lunch: M.jollofChickenLight, dinner: M.ofadaLight, snacks: M.snackChickenPs },
      Sun: { breakfast: M.yamEgg, lunch: M.beansEgg, dinner: M.edikang, snacks: M.snackCatfish }
    },
    shopping: shopping(["Extra frozen ugu and spinach", "Smoked fish for efo riro"])
  },
  {
    id: 3, name: "Strength",
    intro: "Oil-less egusi, a lighter ofada sauce, grilled suya and pepper soup do the heavy lifting for protein, with beans and moi moi still in the breakfast and lunch rotation.",
    days: {
      Mon: { breakfast: M.moiMoiPapEgg, lunch: M.suyaChicken, dinner: M.egusiLight, snacks: M.snackCatfish },
      Tue: { breakfast: M.yamEgg, lunch: M.chickenPsPlantain, dinner: M.ofadaLight, snacks: M.snackMoiMoi },
      Wed: { breakfast: M.akaraPap, lunch: M.beansEgg, dinner: M.okraFish, snacks: M.snackChickenPs },
      Thu: { breakfast: M.plantainEgg, lunch: M.catfishPsYam, dinner: M.jollofChicken, snacks: M.snackAkara },
      Fri: { breakfast: M.moiMoiPapEgg, lunch: M.suyaBeef, dinner: M.uguYam, snacks: M.snackMoiMoiFruit },
      Sat: { breakfast: M.yamEgg, lunch: M.jollofChickenLight, dinner: M.efoPlantain, snacks: M.snackChickenPs },
      Sun: { breakfast: M.akaraPap, lunch: M.beansPlantain, dinner: M.edikang, snacks: M.snackCatfish }
    },
    shopping: shopping(["Egusi (melon seeds)", "Ofada or brown rice", "Lean turkey for ayamase"])
  },
  {
    id: 4, name: "Conditioning",
    intro: "Lighter broths and grilled fish and chicken sit well next to the HIIT-style month: catfish and chicken pepper soup, oil-less okra, and baked akara instead of fried snacks.",
    days: {
      Mon: { breakfast: M.plantainEgg, lunch: M.catfishPsYam, dinner: M.okraFish, snacks: M.snackMoiMoi },
      Tue: { breakfast: M.akaraPap, lunch: M.chickenPsPlantain, dinner: M.efoPlantain, snacks: M.snackCatfish },
      Wed: { breakfast: M.yamEgg, lunch: M.suyaChicken, dinner: M.uguYam, snacks: M.snackMoiMoiFruit },
      Thu: { breakfast: M.moiMoiPapEgg, lunch: M.beansEgg, dinner: M.jollofChickenLight, snacks: M.snackChickenPs },
      Fri: { breakfast: M.akaraPap, lunch: M.catfishPsYam, dinner: M.edikang, snacks: M.snackAkara },
      Sat: { breakfast: M.plantainEgg, lunch: M.suyaBeef, dinner: M.egusiLight, snacks: M.snackMoiMoi },
      Sun: { breakfast: M.moiMoiPapEgg, lunch: M.beansPlantain, dinner: M.ofadaLight, snacks: M.snackChickenPs }
    },
    shopping: shopping(["Plenty of catfish or a firm white-fish stand-in", "Extra okra and ugu"])
  },
  {
    id: 5, name: "Advanced",
    intro: "A full rotation of the lighter Nigerian staples — ugu, edikang ikong, ofada with less oil, grilled suya, and jollof kept to a measured scoop.",
    days: {
      Mon: { breakfast: M.yamEgg, lunch: M.suyaChicken, dinner: M.edikang, snacks: M.snackMoiMoi },
      Tue: { breakfast: M.moiMoiPapEgg, lunch: M.catfishPsYam, dinner: M.jollofChicken, snacks: M.snackAkara },
      Wed: { breakfast: M.akaraPap, lunch: M.beansEgg, dinner: M.uguYam, snacks: M.snackChickenPs },
      Thu: { breakfast: M.plantainEgg, lunch: M.chickenPsPlantain, dinner: M.ofadaLight, snacks: M.snackMoiMoiFruit },
      Fri: { breakfast: M.yamEgg, lunch: M.suyaBeef, dinner: M.okraFish, snacks: M.snackCatfish },
      Sat: { breakfast: M.akaraPap, lunch: M.jollofChickenLight, dinner: M.efoPlantain, snacks: M.snackChickenPs },
      Sun: { breakfast: M.moiMoiPapEgg, lunch: M.beansPlantain, dinner: M.egusiLight, snacks: M.snackMoiMoi }
    },
    shopping: shopping(["Waterleaf if you can find it, otherwise spinach with ugu", "Lean beef for suya"])
  },
  {
    id: 6, name: "Peak",
    intro: "The same high-protein Nigerian rotation you already know, so the last month is easy to shop and cook. Keep portions honest and cooking light as you finish the programme.",
    days: {
      Mon: { breakfast: M.akaraPap, lunch: M.chickenPsPlantain, dinner: M.jollofChicken, snacks: M.snackMoiMoi },
      Tue: { breakfast: M.yamEgg, lunch: M.beansEgg, dinner: M.okraFish, snacks: M.snackCatfish },
      Wed: { breakfast: M.moiMoiPapEgg, lunch: M.suyaChicken, dinner: M.efoPlantain, snacks: M.snackChickenPs },
      Thu: { breakfast: M.plantainEgg, lunch: M.catfishPsYam, dinner: M.egusiLight, snacks: M.snackAkara },
      Fri: { breakfast: M.akaraPap, lunch: M.jollofChickenLight, dinner: M.uguYam, snacks: M.snackMoiMoiFruit },
      Sat: { breakfast: M.yamEgg, lunch: M.suyaBeef, dinner: M.ofadaLight, snacks: M.snackChickenPs },
      Sun: { breakfast: M.moiMoiPapEgg, lunch: M.beansPlantain, dinner: M.edikang, snacks: M.snackCatfish }
    },
    shopping: shopping(["Restock beans flour, yaji and pepper-soup spices", "Frozen ugu and plantain for the last weeks"])
  }
];
