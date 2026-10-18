module.exports = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    tagline: "Cafés, galleries, and golden-hour boulevards",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=80",
    currency: "EUR",
    activities: [
      { title: "Louvre Museum", category: "culture", location: "1st arrondissement", duration: 180, cost: { budget: 18, mid: 22, luxury: 70 }, description: "Masterpieces from antiquity to Delacroix, paced so it never feels like a checklist." },
      { title: "Musée d'Orsay", category: "culture", location: "7th arrondissement", duration: 120, cost: { budget: 16, mid: 16, luxury: 45 }, description: "Impressionism in a converted railway station — Monet, Degas, and a Seine-side pause." },
      { title: "Walk the Marais", category: "culture", location: "Le Marais", duration: 120, cost: { budget: 0, mid: 0, luxury: 0 }, description: "Hôtel courtyards, vintage shops, and falafel queues on Rue des Rosiers." },
      { title: "Sainte-Chapelle stained glass", category: "culture", location: "Île de la Cité", duration: 60, cost: { budget: 13, mid: 13, luxury: 13 }, description: "A jewel-box of 13th-century color. Go early for quieter naves." },
      { title: "Seine sunset cruise", category: "relaxation", location: "Pont Neuf", duration: 75, cost: { budget: 16, mid: 35, luxury: 90 }, description: "Notre-Dame and the Eiffel Tower from the water as the lights come on." },
      { title: "Eiffel Tower & Champ de Mars picnic", category: "relaxation", location: "7th arrondissement", duration: 120, cost: { budget: 12, mid: 25, luxury: 80 }, description: "Summit tickets if you want the view; otherwise cheese, wine, and lawn time." },
      { title: "Montmartre hill wander", category: "culture", location: "18th arrondissement", duration: 150, cost: { budget: 0, mid: 10, luxury: 40 }, description: "Sacré-Cœur steps, Place du Tertre painters, and a quiet side-street espresso." },
      { title: "Latin Quarter bookshops", category: "shopping", location: "5th arrondissement", duration: 90, cost: { budget: 15, mid: 40, luxury: 80 }, description: "Shakespeare and Company plus independent presses along Boulevard Saint-Michel." },
      { title: "Le Marais vintage hunt", category: "shopping", location: "3rd arrondissement", duration: 120, cost: { budget: 20, mid: 80, luxury: 220 }, description: "Concept stores and archives — set a budget before you try anything on." },
      { title: "Bistro lunch in Saint-Germain", category: "food", location: "6th arrondissement", duration: 90, cost: { budget: 22, mid: 45, luxury: 110 }, description: "Steak-frites or a plat du jour. Ask for the wine by the glass, not the tourist menu." },
      { title: "Covered market tasting", category: "food", location: "Marché des Enfants Rouges", duration: 75, cost: { budget: 14, mid: 28, luxury: 50 }, description: "Moroccan, Japanese, and French stalls in Paris's oldest covered market." },
      { title: "Patisserie crawl", category: "food", location: "Rue des Martyrs", duration: 60, cost: { budget: 8, mid: 18, luxury: 35 }, description: "Croissants, choux, and a pistachio Paris-Brest if you only pick one." },
      { title: "Jazz cellar in Saint-Germain", category: "nightlife", location: "Caveau de la Huchette", duration: 120, cost: { budget: 16, mid: 30, luxury: 70 }, description: "Swing under vaulted stone. Arrive after 21:00, stay for the second set." },
      { title: "Rooftop apéro", category: "nightlife", location: "9th arrondissement", duration: 90, cost: { budget: 12, mid: 28, luxury: 65 }, description: "A spritz above Haussmann roofs as the city turns amber." },
      { title: "Versailles day gardens", category: "nature", location: "Versailles", duration: 300, cost: { budget: 20, mid: 28, luxury: 90 }, description: "Palace if you must; the gardens and Marie-Antoinette's hamlet are the better half-day." },
      { title: "Luxembourg Gardens", category: "nature", location: "6th arrondissement", duration: 75, cost: { budget: 0, mid: 0, luxury: 0 }, description: "Chairs around the basin, sailboats, and a pause between museums." }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    tagline: "Neon alleys, quiet shrines, and perfect bowls",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=80",
    currency: "JPY",
    activities: [
      { title: "Meiji Jingū forest walk", category: "culture", location: "Shibuya", duration: 90, cost: { budget: 0, mid: 0, luxury: 0 }, description: "A shrine island of cedar in the middle of the city. Go at opening for the still air." },
      { title: "Senso-ji & Nakamise", category: "culture", location: "Asakusa", duration: 120, cost: { budget: 8, mid: 20, luxury: 40 }, description: "Incense, ningyo-yaki, and the skyline view from the temple grounds." },
      { title: "teamLab Planets", category: "culture", location: "Toyosu", duration: 120, cost: { budget: 38, mid: 38, luxury: 38 }, description: "Water rooms and floating blooms. Book a weekday slot." },
      { title: "Tsukiji outer market breakfast", category: "food", location: "Tsukiji", duration: 90, cost: { budget: 12, mid: 28, luxury: 70 }, description: "Tamagoyaki, grilled scallops, and coffee before the city fully wakes." },
      { title: "Ramen tasting in Ogikubo", category: "food", location: "Ogikubo", duration: 75, cost: { budget: 10, mid: 16, luxury: 28 }, description: "Shoyu bowls in the neighborhood Tokyoites still argue about." },
      { title: "Depachika picnic", category: "food", location: "Ginza", duration: 60, cost: { budget: 18, mid: 40, luxury: 80 }, description: "Department-store basement treasures: fruit sandwiches, karaage, seasonal wagashi." },
      { title: "Yanaka old-town stroll", category: "relaxation", location: "Yanaka", duration: 120, cost: { budget: 0, mid: 12, luxury: 30 }, description: "Cats, temples, and a slower Tokyo that survived the firebombing." },
      { title: "Onsen bathhouse", category: "relaxation", location: "Oedo Onsen or local sento", duration: 120, cost: { budget: 8, mid: 25, luxury: 70 }, description: "Soak, then cold milk from the vending machine. Tattoo policies vary — check first." },
      { title: "Shimokitazawa vintage", category: "shopping", location: "Shimokitazawa", duration: 150, cost: { budget: 20, mid: 70, luxury: 180 }, description: "Records, workwear, and thrift that actually fits. Cash still helps." },
      { title: "Akihabara hobby hunt", category: "shopping", location: "Akihabara", duration: 120, cost: { budget: 15, mid: 50, luxury: 150 }, description: "Figures, used games, and a floor of nothing but cables if you need one." },
      { title: "Golden Gai bar hop", category: "nightlife", location: "Shinjuku", duration: 150, cost: { budget: 25, mid: 50, luxury: 90 }, description: "Tiny rooms, house rules, and one drink per bar. Cover charges are normal." },
      { title: "Shibuya night crossing", category: "nightlife", location: "Shibuya", duration: 60, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Watch from the Starbucks or MAGNET rooftop, then drop into a basement bar." },
      { title: "Imperial Palace East Gardens", category: "nature", location: "Chiyoda", duration: 90, cost: { budget: 0, mid: 0, luxury: 0 }, description: "Moats, lawns, and leftover castle stone. Closed Mondays and Fridays." },
      { title: "Mount Takao half-day", category: "adventure", location: "Takao", duration: 300, cost: { budget: 12, mid: 20, luxury: 45 }, description: "Cable car plus ridge trail. Clear days give you Fuji on the descent." },
      { title: "Sumida cycling", category: "adventure", location: "Sumida River", duration: 120, cost: { budget: 10, mid: 18, luxury: 30 }, description: "Flat riverside path from Asakusa toward Tokyo Skytree." }
    ]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    tagline: "Pink stone, rooftop thalis, and desert light",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80",
    currency: "INR",
    activities: [
      { title: "Amber Fort & Maota Lake", category: "culture", location: "Amer", duration: 180, cost: { budget: 8, mid: 20, luxury: 60 }, description: "Mirror palaces and ramparts. Skip the elephant; walk or jeep the last climb." },
      { title: "City Palace museum", category: "culture", location: "Old City", duration: 120, cost: { budget: 10, mid: 18, luxury: 40 }, description: "Courtyards, royal textiles, and a still-lived-in palace." },
      { title: "Jantar Mantar", category: "culture", location: "Old City", duration: 60, cost: { budget: 4, mid: 6, luxury: 15 }, description: "18th-century instruments that still track the sky. Hire a guide for ten minutes." },
      { title: "Hawa Mahal photo hour", category: "culture", location: "Badi Choupad", duration: 45, cost: { budget: 3, mid: 5, luxury: 10 }, description: "Honeycomb façade at golden hour from the street, then the inner museum if open." },
      { title: "Johari Bazaar jewellery walk", category: "shopping", location: "Johari Bazaar", duration: 120, cost: { budget: 15, mid: 60, luxury: 250 }, description: "Kundan and enamel. Buy from established shops; ask for bills." },
      { title: "Block-print workshop", category: "shopping", location: "Sanganer / city studio", duration: 150, cost: { budget: 12, mid: 35, luxury: 80 }, description: "Print a stole yourself. Carry it home still smelling of dye." },
      { title: "LMB thali lunch", category: "food", location: "Johari Bazaar", duration: 75, cost: { budget: 8, mid: 14, luxury: 28 }, description: "Rajasthani thali, ghewar if it's the season, and a slow ceiling fan." },
      { title: "Street chaat trail", category: "food", location: "MI Road", duration: 60, cost: { budget: 4, mid: 8, luxury: 12 }, description: "Kachori, lassi, and pyaaz kachori. Follow the longest queue." },
      { title: "Rooftop Rajasthani dinner", category: "food", location: "Old City", duration: 120, cost: { budget: 12, mid: 28, luxury: 70 }, description: "Dal baati churma under the palace lights." },
      { title: "Nahargarh sunset", category: "nature", location: "Nahargarh", duration: 120, cost: { budget: 5, mid: 12, luxury: 40 }, description: "The whole pink city in one view. Stay for the first streetlights." },
      { title: "Sisodia Rani garden", category: "nature", location: "East Jaipur", duration: 75, cost: { budget: 2, mid: 4, luxury: 8 }, description: "Terraced murals and shade when the city is too hot." },
      { title: "Hot-air balloon (seasonal)", category: "adventure", location: "Amber countryside", duration: 180, cost: { budget: 90, mid: 140, luxury: 220 }, description: "Dawn lift over forts. Winter mornings only — book ahead." },
      { title: "Cycling the walled city", category: "adventure", location: "Old City", duration: 120, cost: { budget: 8, mid: 15, luxury: 25 }, description: "Early morning gates, havelis, and almost no traffic." },
      { title: "Palace hotel high tea", category: "relaxation", location: "Rambagh / Rajmahal", duration: 90, cost: { budget: 18, mid: 35, luxury: 70 }, description: "Lawns, silver service, and a cheaper way to see a palace hotel." },
      { title: "Haveli courtyard evening", category: "nightlife", location: "Old City", duration: 120, cost: { budget: 8, mid: 20, luxury: 50 }, description: "Folk music, a drink, and stars over carved sandstone." }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    tagline: "Rice terraces, temples, and warm night markets",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=80",
    currency: "IDR",
    activities: [
      { title: "Tirta Empul purification", category: "culture", location: "Tampaksiring", duration: 90, cost: { budget: 4, mid: 8, luxury: 20 }, description: "Spring water temples. Bring a sarong and go before tour buses." },
      { title: "Ubud palace & market", category: "culture", location: "Ubud", duration: 90, cost: { budget: 6, mid: 15, luxury: 30 }, description: "Evening dance if the courtyard is performing; otherwise wander the pavilions." },
      { title: "Tanah Lot sunset temple", category: "culture", location: "Tanah Lot", duration: 120, cost: { budget: 5, mid: 10, luxury: 20 }, description: "Sea temple on a rock. The light is the point — skip the souvenir gauntlet." },
      { title: "Tegalalang rice terraces", category: "nature", location: "Tegalalang", duration: 120, cost: { budget: 3, mid: 10, luxury: 35 }, description: "Walk the paths, not just the swing photos. Tip the farmers if you enter fields." },
      { title: "Campuhan Ridge Walk", category: "nature", location: "Ubud", duration: 90, cost: { budget: 0, mid: 0, luxury: 0 }, description: "Sunrise ridge before it gets hot. Coconut at the end is traditional." },
      { title: "Nusa Penida day boat", category: "adventure", location: "Nusa Penida", duration: 540, cost: { budget: 35, mid: 55, luxury: 140 }, description: "Kelingking and broken beach. Seas can be rough — pick a reputable boat." },
      { title: "Sunrise Mount Batur trek", category: "adventure", location: "Kintamani", duration: 360, cost: { budget: 35, mid: 50, luxury: 90 }, description: "Volcano at 4 a.m. with a boiled egg from the steam vents." },
      { title: "Surf lesson at Batu Bolong", category: "adventure", location: "Canggu", duration: 120, cost: { budget: 20, mid: 30, luxury: 55 }, description: "Soft sand, patient instructors, and a smoothie after you stand up." },
      { title: "Warung lunch crawl", category: "food", location: "Ubud / Canggu", duration: 75, cost: { budget: 5, mid: 12, luxury: 25 }, description: "Nasi campur, satay lilit, and sambal that actually hurts." },
      { title: "Jimbaran grilled seafood", category: "food", location: "Jimbaran Bay", duration: 120, cost: { budget: 18, mid: 35, luxury: 80 }, description: "Table in the sand, prawns by the kilo, bargain the set before you sit." },
      { title: "Night market in Gianyar", category: "food", location: "Gianyar", duration: 90, cost: { budget: 6, mid: 12, luxury: 20 }, description: "Babi guling stalls and plastic stools. Go hungry." },
      { title: "Spa & sound bath", category: "relaxation", location: "Ubud", duration: 120, cost: { budget: 18, mid: 40, luxury: 90 }, description: "Balinese massage, then tea in a garden. Book the midday heat away." },
      { title: "Beach club sunset (light)", category: "nightlife", location: "Seminyak / Canggu", duration: 150, cost: { budget: 15, mid: 40, luxury: 90 }, description: "One drink, the sky, then leave before the DJ volume becomes the point." },
      { title: "Ubud artisan shopping", category: "shopping", location: "Jalan Monkey Forest", duration: 120, cost: { budget: 12, mid: 45, luxury: 120 }, description: "Silver, ikat, and ceramics. Ship the heavy pieces." }
    ]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    tagline: "Tiles, tapas, and late Mediterranean nights",
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80",
    currency: "EUR",
    activities: [
      { title: "Sagrada Família timed visit", category: "culture", location: "Eixample", duration: 120, cost: { budget: 26, mid: 33, luxury: 80 }, description: "Book the towers if you can. The light inside is the whole argument for Gaudí." },
      { title: "Park Güell", category: "culture", location: "Gràcia", duration: 120, cost: { budget: 10, mid: 13, luxury: 13 }, description: "Mosaics and the city from above. Timed tickets; the free park around it is also good." },
      { title: "Gothic Quarter wander", category: "culture", location: "Barri Gòtic", duration: 120, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Roman walls, hidden plazas, and a cathedral cloister with geese." },
      { title: "Picasso Museum", category: "culture", location: "El Born", duration: 90, cost: { budget: 14, mid: 14, luxury: 14 }, description: "Early Picasso in medieval palaces. Free some evenings — check the week." },
      { title: "Boqueria & El Born tapas", category: "food", location: "La Rambla / Born", duration: 90, cost: { budget: 16, mid: 32, luxury: 70 }, description: "Market fruit, then vermouth and anchovies. Avoid the first three stalls on La Rambla." },
      { title: "Poble Sec pintxos night", category: "food", location: "Poble Sec", duration: 150, cost: { budget: 20, mid: 40, luxury: 75 }, description: "Blai street: one pintxo, one step, repeat." },
      { title: "Barceloneta swim & vermut", category: "relaxation", location: "Barceloneta", duration: 150, cost: { budget: 8, mid: 18, luxury: 40 }, description: "A swim, a shower, a cold vermouth. Lockers exist if you look." },
      { title: "Bunkers del Carmel sunset", category: "nature", location: "El Carmel", duration: 90, cost: { budget: 0, mid: 0, luxury: 8 }, description: "360° city and sea. Bring a small picnic, leave no glass." },
      { title: "Montserrat day trip", category: "nature", location: "Montserrat", duration: 360, cost: { budget: 22, mid: 35, luxury: 70 }, description: "Rack railway, monastery choir, and a short ridge hike." },
      { title: "Beach bike to Bogatell", category: "adventure", location: "Poblenou", duration: 90, cost: { budget: 8, mid: 14, luxury: 20 }, description: "Flat seaside lane, fewer tourists than Barceloneta." },
      { title: "Gràcia boutique stroll", category: "shopping", location: "Vila de Gràcia", duration: 120, cost: { budget: 15, mid: 50, luxury: 140 }, description: "Independent fashion and design shops on quiet plazas." },
      { title: "El Born design shops", category: "shopping", location: "El Born", duration: 90, cost: { budget: 12, mid: 40, luxury: 100 }, description: "Ceramics and linen. Good for gifts that are not fridge magnets." },
      { title: "Raval / Born night out", category: "nightlife", location: "El Raval", duration: 180, cost: { budget: 18, mid: 40, luxury: 80 }, description: "Cocktail bars, then a late table. Dinner is at 21:30 here — plan accordingly." }
    ]
  },
  {
    id: "new-york",
    name: "New York",
    country: "USA",
    tagline: "Neighborhoods stacked like stories",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=80",
    currency: "USD",
    activities: [
      { title: "The Met (focused rooms)", category: "culture", location: "Upper East Side", duration: 180, cost: { budget: 30, mid: 30, luxury: 30 }, description: "Pick two wings. Temple of Dendur at dusk if you can." },
      { title: "MoMA", category: "culture", location: "Midtown", duration: 120, cost: { budget: 30, mid: 30, luxury: 30 }, description: "Starry Night, then the design floor. Uncrowded weekday mornings." },
      { title: "Brooklyn Bridge to DUMBO", category: "culture", location: "Brooklyn", duration: 120, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Walk at sunrise. Coffee on the other side is part of the ritual." },
      { title: "The High Line & Chelsea", category: "relaxation", location: "Chelsea", duration: 90, cost: { budget: 0, mid: 10, luxury: 25 }, description: "Park in the air, then galleries if you have the legs." },
      { title: "Central Park ramble", category: "nature", location: "Central Park", duration: 120, cost: { budget: 0, mid: 8, luxury: 20 }, description: "The Ramble, not just Bethesda. Rent a rowboat if the lake is open." },
      { title: "Ferry to Staten Island (round trip)", category: "nature", location: "Whitehall", duration: 90, cost: { budget: 0, mid: 0, luxury: 0 }, description: "Harbor, Statue, skyline. Stay on the boat if you only want the view." },
      { title: "Slice-and-bagel crawl", category: "food", location: "Lower East Side", duration: 90, cost: { budget: 14, mid: 22, luxury: 40 }, description: "A proper slice, then a bagel with the works. No more than two stops." },
      { title: "Katz's or a pastrami rival", category: "food", location: "Lower East Side", duration: 75, cost: { budget: 22, mid: 28, luxury: 40 }, description: "Share. It is larger than optimism." },
      { title: "Chinatown dumpling run", category: "food", location: "Chinatown", duration: 60, cost: { budget: 10, mid: 18, luxury: 30 }, description: "Soup dumplings, scallion pancake, then walk it off on Mott." },
      { title: "Jazz at Smalls or Village Vanguard", category: "nightlife", location: "West Village", duration: 150, cost: { budget: 25, mid: 40, luxury: 80 }, description: "Late set, no talking during the solo. Cash at some doors." },
      { title: "Rooftop at golden hour", category: "nightlife", location: "Lower Manhattan", duration: 90, cost: { budget: 18, mid: 32, luxury: 70 }, description: "One drink. The skyline does the rest." },
      { title: "SoHo / Nolita browse", category: "shopping", location: "SoHo", duration: 120, cost: { budget: 20, mid: 80, luxury: 250 }, description: "Cast-iron streets. Set a budget or you will own a coat you cannot pack." },
      { title: "Strand Bookstore", category: "shopping", location: "East Village", duration: 75, cost: { budget: 12, mid: 25, luxury: 45 }, description: "18 miles of books. The dollar carts outside are honest." },
      { title: "Kayak the Hudson (seasonal)", category: "adventure", location: "Pier 26 / 84", duration: 90, cost: { budget: 0, mid: 20, luxury: 45 }, description: "Free community paddles exist. Book early." }
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    tagline: "Wood, moss, and tea in the hills",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e21f786d?auto=format&fit=crop&w=1400&q=80",
    currency: "JPY",
    activities: [
      { title: "Fushimi Inari early climb", category: "culture", location: "Fushimi", duration: 150, cost: { budget: 0, mid: 0, luxury: 8 }, description: "Gates before 8 a.m. Go at least to Yotsutsuji for the city view." },
      { title: "Kinkaku-ji", category: "culture", location: "Northern Kyoto", duration: 60, cost: { budget: 5, mid: 5, luxury: 5 }, description: "Gold pavilion, then keep walking — the gardens are the quieter half." },
      { title: "Gion evening etiquette walk", category: "culture", location: "Gion", duration: 90, cost: { budget: 0, mid: 12, luxury: 80 }, description: "Look, don't chase. A tea-house reservation beats a selfie with a maiko." },
      { title: "Arashiyama bamboo & river", category: "nature", location: "Arashiyama", duration: 180, cost: { budget: 8, mid: 20, luxury: 50 }, description: "Bamboo grove at open, then monkey park or a slow river boat." },
      { title: "Philosopher's Path", category: "nature", location: "Higashiyama", duration: 120, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Canal, blossoms or maple, small temples you can actually sit in." },
      { title: "Kaiseki lunch", category: "food", location: "Pontocho / Gion", duration: 120, cost: { budget: 40, mid: 80, luxury: 180 }, description: "Seasonal courses. Lunch is kinder on the wallet than dinner." },
      { title: "Nishiki Market graze", category: "food", location: "Nishiki", duration: 75, cost: { budget: 12, mid: 22, luxury: 40 }, description: "Pickles, tofu donuts, and knife shops. Don't block the aisle." },
      { title: "Tea ceremony", category: "relaxation", location: "Higashiyama", duration: 60, cost: { budget: 18, mid: 35, luxury: 70 }, description: "Matcha, sweets, and twenty minutes of silence you will remember." },
      { title: "Kiyomizu-dera", category: "culture", location: "Higashiyama", duration: 90, cost: { budget: 4, mid: 4, luxury: 4 }, description: "Wooden stage over the city. The walk up Sannenzaka is half the visit." },
      { title: "Cycle along the Kamo", category: "adventure", location: "Kamo River", duration: 90, cost: { budget: 8, mid: 12, luxury: 20 }, description: "Flat, shaded, and how locals actually move between neighborhoods." },
      { title: "Pontocho alley night", category: "nightlife", location: "Pontocho", duration: 120, cost: { budget: 20, mid: 45, luxury: 100 }, description: "Lanterns, river decks, and one carefully chosen bar." },
      { title: "Incense & crafts in Teramachi", category: "shopping", location: "Teramachi", duration: 90, cost: { budget: 12, mid: 40, luxury: 90 }, description: "Washi, incense, and kitchen tools that last a decade." }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    tagline: "Caldera light and slow island hours",
    image:
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1400&q=80",
    currency: "EUR",
    activities: [
      { title: "Oia caldera walk", category: "culture", location: "Oia", duration: 120, cost: { budget: 0, mid: 10, luxury: 30 }, description: "Blue domes without the 18:00 crush. Dawn is kinder." },
      { title: "Fira to Oia hike", category: "adventure", location: "Caldera path", duration: 240, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Volcanic path with the whole island under you. Hat, water, decent shoes." },
      { title: "Akrotiri archaeological site", category: "culture", location: "Akrotiri", duration: 90, cost: { budget: 12, mid: 12, luxury: 20 }, description: "A Bronze Age city under a roof. Cooler than the cliffs, and better than another church photo." },
      { title: "Red Beach swim", category: "nature", location: "Akrotiri", duration: 90, cost: { budget: 0, mid: 8, luxury: 20 }, description: "Volcanic sand, short walk, go early for shade." },
      { title: "Amoudi Bay swim & lunch", category: "food", location: "Amoudi", duration: 150, cost: { budget: 22, mid: 40, luxury: 80 }, description: "Stairs down from Oia, grilled fish, jump off the rock if the locals are doing it." },
      { title: "Winery tasting", category: "food", location: "Pyrgos / Megalochori", duration: 90, cost: { budget: 18, mid: 35, luxury: 70 }, description: "Assyrtiko with a caldera view. Spit if you are driving the island." },
      { title: "Sunset catamaran", category: "relaxation", location: "Vlychada / Ammoudi", duration: 300, cost: { budget: 70, mid: 110, luxury: 220 }, description: "Hot springs, swimming off the boat, and the famous light from the water." },
      { title: "Pyrgos village evening", category: "nightlife", location: "Pyrgos", duration: 120, cost: { budget: 12, mid: 28, luxury: 55 }, description: "Fewer crowds than Oia, a castle, and a glass of wine." },
      { title: "Pottery studio", category: "shopping", location: "Megalochori", duration: 90, cost: { budget: 20, mid: 45, luxury: 80 }, description: "Volcanic clay pieces that actually survive a suitcase." }
    ]
  }
];
