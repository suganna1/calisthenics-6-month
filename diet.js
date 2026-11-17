const DIET_BASE_KCAL = 1800;
const DIET_BASE_PROTEIN = 110;
const DIET = [
  {
    id: 1, name: "Foundation",
    intro: "Simple, cheap meals you can cook in one pan or assemble from tins and bread. Repeat this week for the whole of Month 1.",
    days: {
      Mon: {
        breakfast: { name: "Porridge with milk and banana", items: ["60g oats", "200ml semi-skimmed milk", "1 banana"], kcal: 420, protein: 16 },
        lunch: { name: "Tuna and sweetcorn sandwich", items: ["2 slices wholemeal bread", "1 tin tuna in spring water", "1 tbsp light mayo", "sweetcorn", "1 apple"], kcal: 520, protein: 38 },
        dinner: { name: "Chicken, rice and mixed veg", items: ["150g chicken breast", "75g dry rice", "frozen mixed vegetables", "tomato sauce"], kcal: 620, protein: 46 },
        snacks: { name: "Greek yoghurt and a pear", items: ["170g low-fat Greek yoghurt", "1 pear"], kcal: 240, protein: 18 }
      },
      Tue: {
        breakfast: { name: "Weetabix and milk", items: ["2 Weetabix", "200ml milk", "1 tsp sugar or honey", "a handful of frozen berries"], kcal: 350, protein: 14 },
        lunch: { name: "Cheese and ham sandwich plus soup", items: ["2 slices wholemeal bread", "2 slices ham", "20g cheddar", "1 mug supermarket vegetable soup"], kcal: 530, protein: 28 },
        dinner: { name: "Spaghetti bolognese", items: ["75g dry spaghetti", "125g lean beef mince", "tinned tomatoes and onion", "side salad"], kcal: 680, protein: 40 },
        snacks: { name: "Banana and a small handful of peanuts", items: ["1 banana", "25g peanuts"], kcal: 280, protein: 10 }
      },
      Wed: {
        breakfast: { name: "Beans on toast with an egg", items: ["2 slices wholemeal toast", "half a tin of baked beans", "1 fried or poached egg"], kcal: 450, protein: 26 },
        lunch: { name: "Leftover bolognese or a jacket potato with beans", items: ["1 medium jacket potato", "half a tin of baked beans", "20g cheddar"], kcal: 540, protein: 22 },
        dinner: { name: "Salmon (or tinned salmon) with potatoes and peas", items: ["1 salmon fillet or 1 large tin salmon", "250g potatoes", "frozen peas"], kcal: 640, protein: 42 },
        snacks: { name: "Cottage cheese and crackers", items: ["150g cottage cheese", "4 plain crackers"], kcal: 250, protein: 20 }
      },
      Thu: {
        breakfast: { name: "Greek yoghurt, oats and honey", items: ["170g Greek yoghurt", "40g oats", "1 tsp honey"], kcal: 400, protein: 24 },
        lunch: { name: "Egg mayo sandwich and a banana", items: ["2 slices wholemeal bread", "2 eggs", "1 tsp light mayo", "1 banana"], kcal: 560, protein: 28 },
        dinner: { name: "Turkey mince chilli with rice", items: ["125g turkey mince", "tinned tomatoes and kidney beans", "75g dry rice"], kcal: 650, protein: 44 },
        snacks: { name: "Apple and cheese", items: ["1 apple", "30g cheddar"], kcal: 230, protein: 8 }
      },
      Fri: {
        breakfast: { name: "Scrambled eggs on toast", items: ["2 eggs", "2 slices wholemeal toast", "a little spread"], kcal: 420, protein: 24 },
        lunch: { name: "Tuna pasta salad", items: ["75g dry pasta, cooked and cooled", "1 tin tuna", "sweetcorn and cucumber"], kcal: 580, protein: 40 },
        dinner: { name: "Chicken stir-fry with noodles", items: ["150g chicken", "1 nest dried egg noodles", "frozen stir-fry veg", "soy sauce"], kcal: 640, protein: 44 },
        snacks: { name: "Milk and a digestive", items: ["200ml milk", "2 digestive biscuits"], kcal: 260, protein: 9 }
      },
      Sat: {
        breakfast: { name: "Porridge with peanut butter", items: ["60g oats", "200ml milk", "1 tbsp peanut butter"], kcal: 470, protein: 20 },
        lunch: { name: "Chicken wrap", items: ["1 large wrap", "100g leftover chicken", "salad", "1 tbsp yoghurt"], kcal: 500, protein: 36 },
        dinner: { name: "Fish finger bake alternative: white fish, oven chips and peas", items: ["1 white fish fillet", "150g oven chips", "frozen peas"], kcal: 620, protein: 36 },
        snacks: { name: "Yoghurt and berries", items: ["170g Greek yoghurt", "frozen berries"], kcal: 220, protein: 16 }
      },
      Sun: {
        breakfast: { name: "Eggs, beans and toast", items: ["2 eggs", "half a tin of baked beans", "1 slice wholemeal toast"], kcal: 430, protein: 28 },
        lunch: { name: "Roast-style chicken dinner (simple)", items: ["150g chicken", "250g potatoes", "frozen carrots and broccoli", "gravy"], kcal: 650, protein: 44 },
        dinner: { name: "Omelette with cheese and leftover veg", items: ["3 eggs", "20g cheddar", "leftover vegetables", "side salad"], kcal: 520, protein: 36 },
        snacks: { name: "Banana", items: ["1 banana"], kcal: 100, protein: 1 }
      }
    },
    shopping: [
      { aisle: "Fresh / Tesco or Aldi aisle", items: ["7 bananas", "7 apples", "2 pears", "1 orange optional", "2 onions", "a bag of salad", "cucumber"] },
      { aisle: "Fridge", items: ["2 litres semi-skimmed milk", "1 kg low-fat Greek yoghurt or 4 large pots", "1 pack cottage cheese", "a block of cheddar", "1 pack ham", "a dozen eggs", "chicken breasts or thighs for 4 meals", "1 salmon fillet or 2 tins salmon", "1 pack lean beef mince"] },
      { aisle: "Freezer", items: ["mixed vegetables", "peas", "stir-fry veg", "berries", "oven chips for Saturday"] },
      { aisle: "Cupboard", items: ["porridge oats", "Weetabix", "wholemeal bread (2 loaves over the week, freeze a few slices)", "rice", "pasta/spaghetti", "tinned tuna (4 tins)", "baked beans (3 tins)", "tinned tomatoes (3)", "sweetcorn", "kidney beans", "peanut butter", "light mayo", "peanuts", "digestives", "crackers", "stock or gravy"] }
    ]
  },
  {
    id: 2, name: "Build",
    intro: "Still supermarket basics, with a bit more yoghurt, chicken and mince to support training.",
    days: {
      Mon: {
        breakfast: { name: "Porridge, milk, banana and a scoop of yoghurt", items: ["60g oats", "200ml milk", "1 banana", "80g Greek yoghurt"], kcal: 500, protein: 24 },
        lunch: { name: "Chicken and salad sandwich", items: ["2 slices wholemeal bread", "100g chicken", "salad and light mayo"], kcal: 480, protein: 36 },
        dinner: { name: "Lentil dhal with rice", items: ["1 tin lentils", "onion, garlic, curry powder, tinned tomatoes", "75g dry rice"], kcal: 620, protein: 28 },
        snacks: { name: "Cottage cheese and pineapple (tinned in juice)", items: ["150g cottage cheese", "3 rings pineapple"], kcal: 220, protein: 18 }
      },
      Tue: {
        breakfast: { name: "Weetabix, milk and a boiled egg", items: ["2 Weetabix", "200ml milk", "1 boiled egg"], kcal: 400, protein: 20 },
        lunch: { name: "Tuna crunch pittas", items: ["2 wholemeal pittas", "1 tin tuna", "sweetcorn and cucumber"], kcal: 540, protein: 38 },
        dinner: { name: "Pork or chicken loin, mash and veg", items: ["150g pork or chicken", "250g potatoes", "frozen mixed veg"], kcal: 650, protein: 44 },
        snacks: { name: "Peanuts and an apple", items: ["25g peanuts", "1 apple"], kcal: 260, protein: 8 }
      },
      Wed: {
        breakfast: { name: "Peanut butter on toast and a banana", items: ["2 slices wholemeal toast", "1 tbsp peanut butter", "1 banana"], kcal: 480, protein: 16 },
        lunch: { name: "Leftover dhal in a wrap, plus yoghurt", items: ["1 wrap", "leftover lentils", "120g yoghurt"], kcal: 520, protein: 26 },
        dinner: { name: "Beef mince and potato cottage pie", items: ["125g lean mince", "onion and tinned tomatoes", "250g mash on top"], kcal: 680, protein: 38 },
        snacks: { name: "Greek yoghurt", items: ["170g Greek yoghurt"], kcal: 130, protein: 16 }
      },
      Thu: {
        breakfast: { name: "Overnight oats", items: ["60g oats", "150g yoghurt", "100ml milk", "frozen berries"], kcal: 450, protein: 22 },
        lunch: { name: "Ham salad box and a yoghurt", items: ["3 slices ham", "salad", "1 wholemeal roll", "120g yoghurt"], kcal: 520, protein: 32 },
        dinner: { name: "Baked chicken thighs, rice and broccoli", items: ["2 skinless chicken thighs", "75g dry rice", "frozen broccoli"], kcal: 650, protein: 46 },
        snacks: { name: "Cheese and crackers", items: ["25g cheddar", "4 crackers"], kcal: 230, protein: 9 }
      },
      Fri: {
        breakfast: { name: "Beans, eggs and toast", items: ["half a tin of baked beans", "2 eggs", "1 slice toast"], kcal: 430, protein: 28 },
        lunch: { name: "Pasta with tuna and peas", items: ["75g dry pasta", "1 tin tuna", "frozen peas"], kcal: 580, protein: 40 },
        dinner: { name: "Chilli con carne with rice", items: ["125g lean mince", "kidney beans and tomatoes", "75g dry rice"], kcal: 670, protein: 42 },
        snacks: { name: "Banana", items: ["1 banana"], kcal: 100, protein: 1 }
      },
      Sat: {
        breakfast: { name: "Porridge and honey", items: ["60g oats", "200ml milk", "1 tsp honey"], kcal: 400, protein: 16 },
        lunch: { name: "Egg fried rice (simple, leftover rice)", items: ["leftover rice, about 200g cooked", "2 eggs", "frozen peas and soy sauce"], kcal: 560, protein: 24 },
        dinner: { name: "Salmon pasta", items: ["75g dry pasta", "1 salmon fillet or tin", "frozen spinach or peas"], kcal: 640, protein: 40 },
        snacks: { name: "Yoghurt and a digestive", items: ["170g yoghurt", "1 digestive"], kcal: 230, protein: 14 }
      },
      Sun: {
        breakfast: { name: "Scrambled eggs on toast", items: ["3 eggs", "2 slices toast"], kcal: 480, protein: 30 },
        lunch: { name: "Chicken, stuffing-style veg and potatoes", items: ["150g chicken", "250g potatoes", "frozen veg"], kcal: 640, protein: 44 },
        dinner: { name: "Tomato soup with a cheese toastie", items: ["1 carton tomato soup", "2 slices bread", "30g cheddar"], kcal: 520, protein: 20 },
        snacks: { name: "Apple", items: ["1 apple"], kcal: 80, protein: 0 }
      }
    },
    shopping: [
      { aisle: "Fresh", items: ["7 bananas", "6 apples", "berries or a bag of frozen instead", "onions", "peppers", "salad"] },
      { aisle: "Fridge", items: ["2 litres milk", "Greek yoghurt", "cottage cheese", "cheddar", "ham", "a dozen eggs", "chicken", "turkey mince", "1 salmon fillet or tins", "pork or chicken for Tuesday"] },
      { aisle: "Freezer", items: ["mixed veg", "broccoli", "peas", "spinach"] },
      { aisle: "Cupboard", items: ["oats", "Weetabix", "bread", "wraps", "rice", "pasta", "tinned tuna", "lentils", "tinned tomatoes", "beans", "peanut butter", "peanuts", "curry powder or a mild jar sauce", "soy sauce"] }
    ]
  },
  {
    id: 3, name: "Strength",
    intro: "A slightly higher-protein week. Batch-cook the pasta bake and curry so weeknights stay short.",
    days: {
      Mon: {
        breakfast: { name: "Porridge, milk and two eggs on the side", items: ["60g oats", "200ml milk", "2 boiled eggs"], kcal: 520, protein: 30 },
        lunch: { name: "Tuna jacket potato", items: ["1 large jacket potato", "1 tin tuna", "1 tbsp light mayo", "salad"], kcal: 560, protein: 36 },
        dinner: { name: "Chicken fajita-style wrap bowl", items: ["150g chicken", "peppers and onion", "75g dry rice", "1 tbsp yoghurt"], kcal: 650, protein: 46 },
        snacks: { name: "Greek yoghurt", items: ["200g Greek yoghurt"], kcal: 150, protein: 18 }
      },
      Tue: {
        breakfast: { name: "Weetabix, milk and a banana", items: ["2 Weetabix", "200ml milk", "1 banana"], kcal: 400, protein: 14 },
        lunch: { name: "Chicken pasta salad", items: ["75g dry pasta", "100g chicken", "sweetcorn and cucumber"], kcal: 560, protein: 38 },
        dinner: { name: "Turkey mince pasta bake", items: ["125g turkey mince", "75g dry pasta", "tinned tomatoes", "20g cheese on top"], kcal: 680, protein: 44 },
        snacks: { name: "Apple and peanuts", items: ["1 apple", "25g peanuts"], kcal: 260, protein: 8 }
      },
      Wed: {
        breakfast: { name: "Yoghurt bowl", items: ["200g Greek yoghurt", "40g oats", "berries", "1 tsp honey"], kcal: 430, protein: 26 },
        lunch: { name: "Ham and cheese sandwich plus an orange", items: ["2 slices wholemeal bread", "2 slices ham", "20g cheddar", "1 orange"], kcal: 520, protein: 26 },
        dinner: { name: "White fish, new potatoes and green beans", items: ["1 white fish fillet", "250g potatoes", "frozen green beans"], kcal: 560, protein: 40 },
        snacks: { name: "Milk and banana", items: ["200ml milk", "1 banana"], kcal: 230, protein: 9 }
      },
      Thu: {
        breakfast: { name: "Beans on toast and a yoghurt", items: ["2 slices toast", "half a tin of beans", "120g yoghurt"], kcal: 450, protein: 24 },
        lunch: { name: "Leftover pasta bake", items: ["a generous leftover portion"], kcal: 560, protein: 32 },
        dinner: { name: "Chicken curry with rice (jar sauce is fine)", items: ["150g chicken", "75g dry rice", "half a jar mild curry sauce", "frozen veg"], kcal: 680, protein: 44 },
        snacks: { name: "Cottage cheese and cucumber", items: ["150g cottage cheese"], kcal: 140, protein: 18 }
      },
      Fri: {
        breakfast: { name: "Scrambled eggs and toast", items: ["3 eggs", "2 slices toast"], kcal: 480, protein: 30 },
        lunch: { name: "Tuna and bean salad", items: ["1 tin tuna", "1/2 tin mixed beans", "salad and a little oil"], kcal: 480, protein: 42 },
        dinner: { name: "Lean beef stir-fry with noodles", items: ["125g lean beef strips or mince", "1 nest noodles", "frozen stir-fry veg"], kcal: 650, protein: 40 },
        snacks: { name: "Yoghurt and honey", items: ["170g yoghurt", "1 tsp honey"], kcal: 180, protein: 16 }
      },
      Sat: {
        breakfast: { name: "Porridge and peanut butter", items: ["60g oats", "200ml milk", "1 tbsp peanut butter"], kcal: 470, protein: 20 },
        lunch: { name: "Chicken baguette", items: ["1 small baguette or 2 slices bread", "100g chicken", "salad"], kcal: 500, protein: 34 },
        dinner: { name: "Homemade pizza on a wrap or pitta", items: ["2 pittas or wraps", "tomato puree", "60g cheese", "ham or tuna", "side salad"], kcal: 640, protein: 36 },
        snacks: { name: "Banana", items: ["1 banana"], kcal: 100, protein: 1 }
      },
      Sun: {
        breakfast: { name: "Eggs and beans", items: ["2 eggs", "half a tin of beans", "1 slice toast"], kcal: 400, protein: 26 },
        lunch: { name: "Simple roast chicken plate", items: ["150g chicken", "250g roast or boiled potatoes", "carrots and peas", "gravy"], kcal: 680, protein: 46 },
        dinner: { name: "Omelette and salad", items: ["3 eggs", "20g cheese", "leftover veg"], kcal: 480, protein: 32 },
        snacks: { name: "Yoghurt", items: ["170g yoghurt"], kcal: 130, protein: 16 }
      }
    },
    shopping: [
      { aisle: "Fresh", items: ["7 bananas", "apples and an orange", "salad", "onion", "peppers"] },
      { aisle: "Fridge", items: ["milk", "Greek yoghurt", "cottage cheese", "cheddar", "ham", "eggs (at least 12\u201315)", "chicken", "turkey mince", "white fish", "lean beef strips or mince"] },
      { aisle: "Freezer", items: ["mixed veg", "green beans", "peas", "spinach", "berries"] },
      { aisle: "Cupboard", items: ["oats", "Weetabix", "bread", "wraps", "rice", "pasta", "tuna", "mixed beans", "tinned tomatoes", "mild curry sauce", "peanuts", "honey"] }
    ]
  },
  {
    id: 4, name: "Conditioning",
    intro: "Built for a busier conditioning month: leftovers at lunch, and a few quicker dinners.",
    days: {
      Mon: {
        breakfast: { name: "Overnight oats with yoghurt", items: ["60g oats", "150g yoghurt", "100ml milk", "berries"], kcal: 450, protein: 22 },
        lunch: { name: "Tuna wrap and an apple", items: ["1 large wrap", "1 tin tuna", "salad", "1 apple"], kcal: 520, protein: 36 },
        dinner: { name: "Chicken and vegetable soup with bread, plus leftover chicken", items: ["150g chicken in a big homemade or carton soup", "frozen veg", "2 slices bread"], kcal: 620, protein: 42 },
        snacks: { name: "Peanuts", items: ["30g peanuts"], kcal: 180, protein: 8 }
      },
      Tue: {
        breakfast: { name: "Weetabix, milk and a boiled egg", items: ["2 Weetabix", "200ml milk", "1 egg"], kcal: 400, protein: 20 },
        lunch: { name: "Cheese salad sandwich and yoghurt", items: ["2 slices bread", "30g cheddar", "salad", "170g yoghurt"], kcal: 560, protein: 28 },
        dinner: { name: "Sausage (chicken or 2 reduced-fat pork), mash and beans", items: ["2 sausages", "250g mash", "half a tin of beans"], kcal: 650, protein: 34 },
        snacks: { name: "Banana", items: ["1 banana"], kcal: 100, protein: 1 }
      },
      Wed: {
        breakfast: { name: "Porridge and banana", items: ["60g oats", "200ml milk", "1 banana"], kcal: 420, protein: 16 },
        lunch: { name: "Leftover sausage in a wrap, plus salad", items: ["1 wrap", "leftover sausage", "salad and yoghurt"], kcal: 500, protein: 24 },
        dinner: { name: "Cod or pollock, rice and peas", items: ["1 white fish fillet", "75g dry rice", "frozen peas"], kcal: 600, protein: 40 },
        snacks: { name: "Cottage cheese and crackers", items: ["150g cottage cheese", "4 crackers"], kcal: 250, protein: 20 }
      },
      Thu: {
        breakfast: { name: "Greek yoghurt, banana and oats", items: ["170g yoghurt", "40g oats", "1 banana"], kcal: 450, protein: 22 },
        lunch: { name: "Chicken salad box", items: ["120g chicken", "salad", "1 wholemeal roll"], kcal: 500, protein: 38 },
        dinner: { name: "Pasta with lean mince and tomato sauce", items: ["75g dry pasta", "125g lean mince", "tinned tomatoes"], kcal: 680, protein: 40 },
        snacks: { name: "Apple and cheese", items: ["1 apple", "25g cheddar"], kcal: 210, protein: 8 }
      },
      Fri: {
        breakfast: { name: "Beans, toast and egg", items: ["half a tin of beans", "2 slices toast", "1 egg"], kcal: 430, protein: 22 },
        lunch: { name: "Tuna pasta", items: ["75g dry pasta", "1 tin tuna", "sweetcorn"], kcal: 560, protein: 38 },
        dinner: { name: "Chicken fried-style rice (low oil)", items: ["150g chicken", "200g cooked rice", "frozen veg", "1 egg"], kcal: 650, protein: 48 },
        snacks: { name: "Yoghurt", items: ["170g yoghurt"], kcal: 130, protein: 16 }
      },
      Sat: {
        breakfast: { name: "Porridge and honey", items: ["60g oats", "200ml milk", "honey"], kcal: 400, protein: 16 },
        lunch: { name: "Egg sandwiches and a yoghurt", items: ["2 slices bread", "2 eggs", "170g yoghurt"], kcal: 540, protein: 30 },
        dinner: { name: "Homemade burger alternative: lean beef or turkey patty, bun, salad, oven wedges", items: ["125g lean mince patty", "1 bun", "salad", "150g potato wedges"], kcal: 700, protein: 38 },
        snacks: { name: "Milk", items: ["200ml milk"], kcal: 100, protein: 7 }
      },
      Sun: {
        breakfast: { name: "Scrambled eggs on toast", items: ["3 eggs", "2 slices toast"], kcal: 480, protein: 30 },
        lunch: { name: "Roast chicken leftovers plate", items: ["150g chicken", "250g potatoes", "veg and gravy"], kcal: 650, protein: 44 },
        dinner: { name: "Tomato pasta with cheese", items: ["75g dry pasta", "tinned tomatoes and garlic", "30g cheddar"], kcal: 560, protein: 22 },
        snacks: { name: "Yoghurt and berries", items: ["170g yoghurt", "berries"], kcal: 200, protein: 16 }
      }
    },
    shopping: [
      { aisle: "Fresh", items: ["bananas", "apples", "salad", "onion"] },
      { aisle: "Fridge", items: ["milk", "yoghurt", "cottage cheese", "cheddar", "ham", "eggs", "chicken", "lean mince", "white fish", "chicken or reduced-fat sausages"] },
      { aisle: "Freezer", items: ["mixed veg", "peas", "oven wedges or potatoes you can bake"] },
      { aisle: "Cupboard", items: ["oats", "Weetabix", "bread", "wraps", "rolls", "rice", "pasta", "noodles", "tuna", "baked beans", "soup cartons", "peanuts", "digestives", "stock"] }
    ]
  },
  {
    id: 5, name: "Advanced",
    intro: "Familiar UK staples, rotated so you are not eating the same dinner every night.",
    days: {
      Mon: {
        breakfast: { name: "Porridge, milk, yoghurt and berries", items: ["60g oats", "150ml milk", "100g yoghurt", "berries"], kcal: 450, protein: 22 },
        lunch: { name: "Chicken caesar-style wrap (no fancy kit needed)", items: ["1 wrap", "100g chicken", "salad", "1 tbsp yoghurt"], kcal: 480, protein: 34 },
        dinner: { name: "Chickpea curry and rice", items: ["1 tin chickpeas", "onion, curry powder, tinned tomatoes", "75g dry rice"], kcal: 620, protein: 22 },
        snacks: { name: "Greek yoghurt and honey", items: ["200g yoghurt", "1 tsp honey"], kcal: 180, protein: 20 }
      },
      Tue: {
        breakfast: { name: "Eggs on toast", items: ["2 eggs", "2 slices toast"], kcal: 400, protein: 24 },
        lunch: { name: "Tuna rice pot", items: ["1 tin tuna", "200g cooked rice", "sweetcorn and soy or mayo"], kcal: 560, protein: 36 },
        dinner: { name: "Chicken traybake (chicken, potatoes, frozen veg, one tin of tomatoes)", items: ["150g chicken", "250g potatoes", "frozen veg"], kcal: 650, protein: 44 },
        snacks: { name: "Peanuts and an apple", items: ["25g peanuts", "1 apple"], kcal: 260, protein: 8 }
      },
      Wed: {
        breakfast: { name: "Weetabix, milk and banana", items: ["2 Weetabix", "200ml milk", "1 banana"], kcal: 400, protein: 14 },
        lunch: { name: "Leftover traybake in a box, plus yoghurt", items: ["leftover chicken and potatoes", "170g yoghurt"], kcal: 560, protein: 36 },
        dinner: { name: "Spaghetti with tuna, garlic and peas", items: ["75g dry spaghetti", "1 tin tuna", "frozen peas"], kcal: 600, protein: 40 },
        snacks: { name: "Cheese and crackers", items: ["25g cheddar", "4 crackers"], kcal: 230, protein: 9 }
      },
      Thu: {
        breakfast: { name: "Yoghurt, oats and banana", items: ["170g yoghurt", "40g oats", "1 banana"], kcal: 450, protein: 22 },
        lunch: { name: "Ham salad sandwich and soup", items: ["2 slices bread", "2 slices ham", "1 mug soup"], kcal: 500, protein: 24 },
        dinner: { name: "Turkey meatballs (oven) with pasta", items: ["125g turkey mince as 6 small balls", "75g dry pasta", "tomato sauce"], kcal: 660, protein: 42 },
        snacks: { name: "Cottage cheese", items: ["150g cottage cheese"], kcal: 140, protein: 18 }
      },
      Fri: {
        breakfast: { name: "Beans and eggs on toast", items: ["half a tin of beans", "2 eggs", "1 slice toast"], kcal: 430, protein: 28 },
        lunch: { name: "Chicken noodle pot", items: ["100g chicken", "1 nest noodles", "frozen veg"], kcal: 520, protein: 32 },
        dinner: { name: "Fish and potatoes with peas", items: ["1 fish fillet", "250g potatoes", "peas"], kcal: 600, protein: 38 },
        snacks: { name: "Banana and yoghurt", items: ["1 banana", "120g yoghurt"], kcal: 200, protein: 10 }
      },
      Sat: {
        breakfast: { name: "Porridge and peanut butter", items: ["60g oats", "200ml milk", "1 tbsp peanut butter"], kcal: 470, protein: 20 },
        lunch: { name: "Cheese omelette and toast", items: ["3 eggs", "30g cheddar", "1 slice toast"], kcal: 520, protein: 34 },
        dinner: { name: "Chilli and rice", items: ["125g lean mince", "beans and tomatoes", "75g dry rice"], kcal: 670, protein: 42 },
        snacks: { name: "Apple", items: ["1 apple"], kcal: 80, protein: 0 }
      },
      Sun: {
        breakfast: { name: "Big breakfast-style plate (home, not a cafe)", items: ["2 eggs", "1 reduced-fat sausage or extra egg", "beans", "1 toast"], kcal: 500, protein: 32 },
        lunch: { name: "Roast chicken dinner", items: ["150g chicken", "250g potatoes", "veg and gravy"], kcal: 680, protein: 46 },
        dinner: { name: "Soup and a sandwich", items: ["1 carton soup", "2 slices bread", "ham or cheese"], kcal: 480, protein: 20 },
        snacks: { name: "Yoghurt", items: ["170g yoghurt"], kcal: 130, protein: 16 }
      }
    },
    shopping: [
      { aisle: "Fresh", items: ["bananas", "apples", "salad", "onion"] },
      { aisle: "Fridge", items: ["milk", "yoghurt", "cottage cheese", "cheddar", "ham", "eggs", "chicken", "turkey mince", "white fish"] },
      { aisle: "Freezer", items: ["mixed veg", "berries", "peas"] },
      { aisle: "Cupboard", items: ["oats", "Weetabix", "bread", "wraps", "rice", "pasta", "noodles", "tuna", "chickpeas", "tinned tomatoes", "beans", "peanut butter", "peanuts", "curry powder", "soup"] }
    ]
  },
  {
    id: 6, name: "Peak",
    intro: "A peak-month week that still stays on porridge, eggs, chicken, tuna, rice and yoghurt.",
    days: {
      Mon: {
        breakfast: { name: "Porridge, milk and banana", items: ["60g oats", "200ml milk", "1 banana"], kcal: 420, protein: 16 },
        lunch: { name: "Chicken sandwich and yoghurt", items: ["2 slices bread", "100g chicken", "salad", "170g yoghurt"], kcal: 560, protein: 44 },
        dinner: { name: "Salmon, rice and greens", items: ["1 salmon fillet or tin", "75g dry rice", "frozen greens"], kcal: 650, protein: 40 },
        snacks: { name: "Cottage cheese and an apple", items: ["150g cottage cheese", "1 apple"], kcal: 200, protein: 18 }
      },
      Tue: {
        breakfast: { name: "Weetabix, milk and a boiled egg", items: ["2 Weetabix", "200ml milk", "1 egg"], kcal: 400, protein: 20 },
        lunch: { name: "Tuna pittas", items: ["2 pittas", "1 tin tuna", "salad"], kcal: 520, protein: 36 },
        dinner: { name: "Chicken pasta with tomato and spinach", items: ["150g chicken", "75g dry pasta", "tinned tomatoes", "frozen spinach"], kcal: 670, protein: 50 },
        snacks: { name: "Peanuts", items: ["25g peanuts"], kcal: 150, protein: 7 }
      },
      Wed: {
        breakfast: { name: "Yoghurt bowl with oats and honey", items: ["200g yoghurt", "40g oats", "honey and berries"], kcal: 430, protein: 26 },
        lunch: { name: "Leftover chicken pasta", items: ["leftover portion"], kcal: 560, protein: 36 },
        dinner: { name: "Bean chilli with rice", items: ["2 tins mixed beans", "tomatoes, onion, chilli powder", "75g dry rice"], kcal: 640, protein: 28 },
        snacks: { name: "Banana and milk", items: ["1 banana", "200ml milk"], kcal: 230, protein: 9 }
      },
      Thu: {
        breakfast: { name: "Eggs and toast", items: ["2 eggs", "2 slices toast"], kcal: 400, protein: 24 },
        lunch: { name: "Ham salad roll and yoghurt", items: ["1 roll", "3 slices ham", "salad", "170g yoghurt"], kcal: 520, protein: 32 },
        dinner: { name: "Pork or chicken steak, mash and veg", items: ["150g meat", "250g mash", "frozen veg"], kcal: 660, protein: 44 },
        snacks: { name: "Apple and cheese", items: ["1 apple", "25g cheddar"], kcal: 210, protein: 8 }
      },
      Fri: {
        breakfast: { name: "Beans on toast and yoghurt", items: ["2 slices toast", "half a tin of beans", "120g yoghurt"], kcal: 450, protein: 24 },
        lunch: { name: "Tuna pasta salad", items: ["75g dry pasta", "1 tin tuna", "sweetcorn"], kcal: 560, protein: 38 },
        dinner: { name: "Stir-fry chicken and noodles", items: ["150g chicken", "1 nest noodles", "frozen veg"], kcal: 640, protein: 44 },
        snacks: { name: "Digestives and milk", items: ["2 digestives", "200ml milk"], kcal: 250, protein: 8 }
      },
      Sat: {
        breakfast: { name: "Porridge and peanut butter", items: ["60g oats", "200ml milk", "1 tbsp peanut butter"], kcal: 470, protein: 20 },
        lunch: { name: "Egg wrap", items: ["1 wrap", "2 eggs", "spinach or leftover veg"], kcal: 420, protein: 24 },
        dinner: { name: "Lean mince tacos or wraps", items: ["125g lean mince", "2 wraps", "salad and yoghurt", "tinned tomatoes"], kcal: 700, protein: 42 },
        snacks: { name: "Yoghurt", items: ["170g yoghurt"], kcal: 130, protein: 16 }
      },
      Sun: {
        breakfast: { name: "Scrambled eggs, beans and toast", items: ["3 eggs", "half a tin of beans", "1 slice toast"], kcal: 500, protein: 36 },
        lunch: { name: "Roast-style dinner", items: ["150g chicken", "250g potatoes", "veg and gravy"], kcal: 680, protein: 46 },
        dinner: { name: "Omelette and salad", items: ["3 eggs", "leftover veg", "20g cheese"], kcal: 480, protein: 32 },
        snacks: { name: "Banana", items: ["1 banana"], kcal: 100, protein: 1 }
      }
    },
    shopping: [
      { aisle: "Fresh", items: ["bananas", "apples", "salad", "onion"] },
      { aisle: "Fridge", items: ["milk", "yoghurt", "cottage cheese", "cheddar", "ham", "eggs (plenty)", "chicken for several meals", "lean mince", "salmon or tinned salmon"] },
      { aisle: "Freezer", items: ["greens", "mixed veg", "stir-fry veg", "berries"] },
      { aisle: "Cupboard", items: ["oats", "Weetabix", "bread", "pittas and wraps", "rice", "pasta", "noodles", "tuna", "mixed beans", "tinned tomatoes", "peanut butter", "peanuts", "digestives"] }
    ]
  }
];
