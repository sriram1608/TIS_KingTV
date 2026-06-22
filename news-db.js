// KINGS 24×7 - Shared News Database Module

const rawDatabase = {
  // Editor's Picks
  'ep-1': {
    title: "Tamil Nadu's Green Energy Transition: Solar Power Capacity Doubles in 2 Years",
    category: "Environment",
    author: "Arul Mozhi",
    readTime: "3 min read",
    published: "June 16, 2026",
    updated: "1 hour ago",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Tamil Nadu has taken a pioneering role in India's transition to green energy, doubling its grid-connected solar power capacity over the last 24 months. State officials confirmed that aggressive subsidies and public-private partnerships have unlocked over ₹15,000 crore in fresh investments.",
      "The state's Southern districts, notably Tuticorin and Ramanathapuram, have emerged as mega hubs for wind-solar hybrid projects. This shift has not only reduced carbon emissions but also generated thousands of high-skilled jobs in rural areas.",
      "Experts estimate that by 2030, Tamil Nadu will source more than 55% of its electricity from renewable resources, far exceeding the national average. Local industries have welcomed the move, citing cheaper tariff rates for certified green energy users."
    ]
  },
  'ep-2': {
    title: "Global Tech Summit 2026: Next-Gen AI Innovations Unveiled in Chennai",
    category: "Technology",
    author: "Priya Nair",
    readTime: "4 min read",
    published: "June 15, 2026",
    updated: "3 hours ago",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The annual Global Tech Summit kicked off in Chennai today, attracting top scientific minds, CEOs, and developers from around the world. The core focus of this year's summit is Next-Generation Artificial Intelligence, with live showcases of localized large language models.",
      "A major highlight was the unveiling of 'Kural-AI', an advanced conversational intelligence assistant capable of coding, translating, and analyzing classic literature across 25 regional languages with high contextual nuance.",
      "Medical AI also stole the show, with Chennai-based startup BioSensing demonstrating an AI model that predicts cardiac anomalies up to 72 hours in advance using optical sensors on consumer smartwatches."
    ]
  },
  'ep-3': {
    title: "Young Chess Prodigy from Madurai Wins Grandmaster Title",
    category: "Sports",
    author: "K. Raja",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "5 hours ago",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Sixteen-year-old R. Praggnan from Madurai has officially secured the Grandmaster title, capping off a remarkable series of tournament wins in Europe. In the final round of the Budapest Open, he defeated a seasoned opponent with a brilliant positional queen sacrifice.",
      "Having started playing chess at the age of six under local coaching, Praggnan has steadily climbed the FIDE ratings. His victory has prompted celebrations in his hometown and praise from legendary chess champions worldwide.",
      "The state government has announced a special cash incentive of ₹25 lakhs to support his future international tournaments, as he prepares for the upcoming Candidates tournament."
    ]
  },
  'ep-4': {
    title: "Heritage Walk: Exploring the Chola-Era Temples of Thanjavur",
    category: "Culture",
    author: "S. Ram",
    readTime: "5 min read",
    published: "June 14, 2026",
    updated: "1 day ago",
    image: "https://images.unsplash.com/photo-1608958416790-27bb5d1fb1df?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The ancient town of Thanjavur hosted a historic heritage walk yesterday, bringing together historians, students, and tourists to explore the architectural wonders built during the peak of the Chola empire.",
      "Walking through the towering gates of the Brihadeeswarar Temple, participants were guided through the lesser-known inscriptions detail. The inscriptions reveal fascinating insights into the socio-economic life, tax systems, and community funding of the 11th century.",
      "Archaeological Survey officials presented recent preservation discoveries, including hidden fresco layers on the inner sanctuary walls that are now being restored using organic chemical vapor methods."
    ]
  },
  // Fact Checks
  'fc-1': {
    title: "Fact Check: Is the Tamil Nadu government giving free laptops to all 2026 college graduates?",
    category: "Fact Check",
    author: "KINGS Verify Team",
    readTime: "2 min read",
    published: "June 15, 2026",
    updated: "1 day ago",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Claim: A viral WhatsApp forward message claims that the Chief Minister of Tamil Nadu has approved a new scheme to distribute free laptops to all college graduates passing out in the year 2026.",
      "Verdict: MISLEADING. While the government runs active educational aid programs, there is no scheme to distribute free laptops to *all* college graduates. Laptops are only distributed to select high-merit graduates from marginalized socio-economic backgrounds enrolled in government scholarship programs.",
      "Our investigation verified with the Department of Higher Education that the viral post is fake. Citizens are advised to refer to the official government portal for true scheme announcements."
    ]
  },
  'fc-2': {
    title: "Fact Check: Did NASA release a bioluminescent photo of Chennai coast?",
    category: "Fact Check",
    author: "KINGS Verify Team",
    readTime: "3 min read",
    published: "June 14, 2026",
    updated: "2 days ago",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Claim: A stunning image of the Chennai coastline glowing in brilliant neon blue bioluminescence is circulating, with social posts claiming it was captured from space by NASA.",
      "Verdict: VERIFIED TRUE. The picture is indeed genuine. NASA Earth Observatory confirmed the image was captured during a night pass by an astronaut aboard the International Space Station (ISS) using an ultra-low-light lens on June 10, 2026.",
      "Scientists explained that the glowing effect is caused by a massive algal bloom of dinoflagellates under specific atmospheric conditions. The photo has been shared widely by space agencies and meteorological departments."
    ]
  },
  'fc-3': {
    title: "Fact Check: Is RBI withdrawing all ₹500 currency notes?",
    category: "Fact Check",
    author: "KINGS Verify Team",
    readTime: "2 min read",
    published: "June 13, 2026",
    updated: "3 days ago",
    image: "https://images.unsplash.com/photo-1627000086207-76eabf23aa2e?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Claim: A viral video on Facebook and YouTube claims that the Reserve Bank of India (RBI) is planning to withdraw all ₹500 currency notes from circulation by the end of this year.",
      "Verdict: FAKE. The Reserve Bank of India officially released a statement clarifying that the claim is completely baseless and untrue. The ₹500 currency note remains the primary legal tender, and there are no plans to phase it out.",
      "RBI advised the general public not to believe or spread financial rumors circulating on messaging apps and social media without checking official advisories."
    ]
  },
  // Live Alerts
  'live-1': {
    title: "LIVE Updates: Tamil Nadu Assembly Session Proceedings",
    category: "Live News",
    author: "Kings Legislative Bureau",
    readTime: "3 min read",
    published: "LIVE",
    updated: "Just now",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
    body: [
      "11:30 AM: Minister for Finance introduces the special industrial corridors bill, detailing ₹5,000 crore infra projects.",
      "10:45 AM: Opposition raises questions regarding water management and rain preparedness in Chennai.",
      "10:00 AM: The assembly session commences with customary question hour. Chief Minister arrives."
    ]
  },
  'live-2': {
    title: "LIVE Updates: CSK vs RCB Post-Match Analysis & Reviews",
    category: "Live Sports",
    author: "Sports Desk",
    readTime: "2 min read",
    published: "LIVE",
    updated: "Just now",
    image: "https://images.unsplash.com/photo-1531415080290-bc9b04f5ee92?w=1000&auto=format&fit=crop&q=80",
    body: [
      "CSK beats RCB by 28 runs in a highly entertaining match. Jadeja takes 3 crucial wickets during the middle overs.",
      "Chasing 188, RCB collapsed from 120/3 to 159/9 due to brilliant death bowling from Pathirana.",
      "Man of the Match: Ruturaj Gaikwad for his magnificent knock of 82 off 45 balls."
    ]
  },
  'live-3': {
    title: "LIVE Updates: Gold Prices Today in Chennai & Major Cities",
    category: "Business",
    author: "Market Watch",
    readTime: "2 min read",
    published: "LIVE",
    updated: "5 mins ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Gold rates hit an all-time high in Chennai today, trading at ₹7,350 per gram for 22-karat gold.",
      "Market analysts attribute the surge to rising geopolitical tensions and stock market volatility, pushing investors to safe-haven assets.",
      "Silver prices also witnessed a minor bump, trading at ₹92 per gram."
    ]
  },
  'live-4': {
    title: "LIVE Updates: Weather Alerts - Heavy Rainfall Warn in Chennai",
    category: "Weather",
    author: "Climate Desk",
    readTime: "3 min read",
    published: "LIVE",
    updated: "10 mins ago",
    image: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Regional Meteorological Department issues Orange Alert for Chennai and surrounding coastal districts for next 24 hours.",
      "Convective cloud formations are expected to bring intense localized showers. Residents are advised to avoid unnecessary travel.",
      "Emergency drainage control teams have been deployed to key low-lying junctions."
    ]
  },
  'live-5': {
    title: "LIVE Updates: Assembly Election Results Trends",
    category: "Politics",
    author: "Elections Desk",
    readTime: "4 min read",
    published: "LIVE",
    updated: "15 mins ago",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Vote counting starts for the adjacent state assembly elections. First trends show close margins in 12 constituencies.",
      "Early postal ballots show local parties leading in 6 rural seats.",
      "Official commission website to stream round-by-round tally results live starting from 12:00 PM."
    ]
  },
  // Photo Stories
  'ps-1': {
    title: "Photo Story: Legislative Assembly session highlights",
    category: "Politics",
    author: "Arul Mozhi",
    readTime: "1 min read",
    published: "June 16, 2026",
    updated: "4 hours ago",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
    body: [
      "A collection of photos from today's active Legislative Assembly session in Chennai, showing state cabinet ministers during policy introductions.",
      "High-definition snapshots depict cross-party debate circles, key presentation drafts, and press-conference addresses outside the main building."
    ]
  },
  'ps-2': {
    title: "Photo Story: Athletics Champions Medal Ceremony",
    category: "Sports",
    author: "K. Raja",
    readTime: "1 min read",
    published: "June 15, 2026",
    updated: "1 day ago",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Glimpses of gold-medal victories and podium finishes of our athletes at the Asian Track and Field Championship.",
      "Photos capture high-intensity moments of the relay handovers, record breaks, national flag runs, and emotional medal presentations."
    ]
  },
  'ps-3': {
    title: "Photo Story: Rain-washed streets of Chennai City",
    category: "Weather",
    author: "S. Ram",
    readTime: "1 min read",
    published: "June 14, 2026",
    updated: "2 days ago",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1000&auto=format&fit=crop&q=80",
    body: [
      "A gorgeous photo essay showcasing the monsoon atmosphere in Chennai. Reflective puddles on Mount Road and neon-lit lanes under cloud cover.",
      "Captions record local life carrying umbrellas, children playing, and vendors working under heavy, atmospheric showers."
    ]
  },
  'ps-4': {
    title: "Photo Story: Intricate temple carving architectural details",
    category: "Culture",
    author: "S. Ram",
    readTime: "1 min read",
    published: "June 14, 2026",
    updated: "2 days ago",
    image: "https://images.unsplash.com/photo-1608958416790-27bb5d1fb1df?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Fine-art close ups of Chola-era basalt temple structures, displaying details of stone carvings representing mythological events.",
      "The collection features detailed pillars, decorative ceiling medallions, and restoration specialists using modern soft-brush techniques."
    ]
  },
  'ps-5': {
    title: "Photo Story: Satellite Launch Operations Tower",
    category: "Space",
    author: "Priya Nair",
    readTime: "1 min read",
    published: "June 13, 2026",
    updated: "3 days ago",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Behind-the-scenes photography from the launch pad assembly towers and mission control centers prior to satellite lift-off.",
      "Visuals include fuel lines connection, solar panel unfolds checks, and teams of technicians in sterile suits reviewing command consoles."
    ]
  },
  // Sidebar cards
  'side-card-1': {
    title: "India Clinches Thriller Against Pakistan",
    category: "Sports",
    author: "Sports Desk",
    readTime: "3 min read",
    published: "June 16, 2026",
    updated: "2 hours ago",
    image: "https://images.unsplash.com/photo-1531415080290-bc9b04f5ee92?w=1000&auto=format&fit=crop&q=80",
    body: [
      "India registered a thrilling victory over Pakistan in the Asia Cup group match. Chasing a target of 160, India crossed the line on the very last ball with two wickets to spare.",
      "The chase was anchored by a magnificent half-century under extreme pressure, complemented by a late-order cameo that turned the game in the final over.",
      "Cricket fans worldwide erupted in celebration, and captains from both sides commended the match as a historic chapter in the rivalry."
    ]
  },
  'side-card-2': {
    title: "Vijay's Next Movie Official Announcement",
    category: "Cinema",
    author: "Cinema Desk",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "5 hours ago",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Kollywood superstar Thalapathy Vijay's next project title and primary crew details have been officially released. The announcement video went viral within seconds of launch.",
      "Directed by a leading filmmaker with music composed by a sensational hitmaker, the movie promises to be a high-octane action thriller packed with social commentary.",
      "Producers confirmed that the shooting begins next month, with a massive theatrical release scheduled for early next year."
    ]
  },
  'side-card-3': {
    title: "G7 Summit: Leaders Reach Historic Climate Deal",
    category: "World",
    author: "International Desk",
    readTime: "4 min read",
    published: "June 15, 2026",
    updated: "1 day ago",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The G7 Summit concluded with leaders from major economies signing a landmark agreement to accelerate green transition and phase out unabated coal power by 2035.",
      "The agreement also pledges billions in funding to developing nations to support clean energy grids and combat the effects of extreme climate events.",
      "Environmental groups have described the deal as a significant step forward, though they emphasized that strict compliance and accountability are vital for success."
    ]
  },
  // Latest News cards
  'news-card-1': {
    title: "Tamil Nadu Assembly Session: Key Highlights and Announcements",
    category: "Politics",
    author: "Kings Legislative Bureau",
    readTime: "3 min read",
    published: "June 16, 2026",
    updated: "10 mins ago",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The Tamil Nadu Legislative Assembly session opened with crucial discussions on infrastructure development, local welfare budgets, and renewable energy grids.",
      "Key policies targeting public transport expansion and clean water resources were introduced by the cabinet ministers, sparking debates on budget allocations.",
      "The session will continue through the week, focusing next on education policies and local government decentralization."
    ]
  },
  'news-card-2': {
    title: "ISRO Successfully Launches New Communication Satellite",
    category: "Technology",
    author: "Priya Nair",
    readTime: "3 min read",
    published: "June 16, 2026",
    updated: "20 mins ago",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The Indian Space Research Organisation (ISRO) successfully deployed its latest communication satellite into orbit using the heavy-lift launch vehicle.",
      "This state-of-the-art satellite is designed to expand high-speed internet connectivity across remote islands and mountainous regions.",
      "Mission controllers confirmed all health parameters of the satellite are normal, and solar arrays deployed successfully."
    ]
  },
  'news-card-3': {
    title: "Sensex Rises 600 Points as Market Closes in Green",
    category: "Business",
    author: "Market Watch",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "30 mins ago",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Indian indices closed in the green today, with the Sensex surging 600 points amid positive global cues and robust corporate earnings reports.",
      "Tech, financial, and metal stocks led the gains, bringing relief to investors after consecutive sessions of profit-booking.",
      "Analysts predict a steady upward trend as commodity prices stabilize and foreign investments remain positive."
    ]
  },
  'news-card-4': {
    title: "Heavy Rains Lashes Chennai, IMD Issues Orange Alert",
    category: "Weather",
    author: "Climate Desk",
    readTime: "3 min read",
    published: "June 16, 2026",
    updated: "45 mins ago",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Chennai and adjacent coastal districts experienced heavy convective showers, prompting the India Meteorological Department to issue an Orange Alert.",
      "Municipal corporation teams have deployed water pumps to prevent flooding at major subway crossings, and emergency response teams are on standby.",
      "Residents are advised to stay indoors and track official weather bulletins for updates."
    ]
  },
  'news-card-5': {
    title: "NEET 2024 Results Announced, Check Topper List",
    category: "Education",
    author: "Education Desk",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "1 hr ago",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The National Testing Agency (NTA) has released the results for the medical entrance exam, along with scorecards and cutoff lists.",
      "Top positions were secured by students scoring perfect marks, with high cutoffs recorded across all categories.",
      "Counseling schedules will be announced shortly, and students are advised to keep registration documents ready."
    ]
  },
  'news-card-6': {
    title: "WhatsApp to Stop Working on These Devices from Next Month",
    category: "Technology",
    author: "Priya Nair",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "1 hr ago",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1000&auto=format&fit=crop&q=80",
    body: [
      "WhatsApp announced it will withdraw support for older operating systems on Android and iOS starting next month to focus on security enhancements.",
      "Devices running outdated versions of Android (under 5.0) and iOS (under 12) will no longer be compatible with new updates.",
      "Users are advised to back up chat histories and upgrade their device software to prevent any service interruptions."
    ]
  },
  // Short News items
  'short-item-1': {
    title: "Petrol Price Cut by ₹2.50 Starting Tomorrow",
    category: "Business",
    author: "Market Watch",
    readTime: "1 min read",
    published: "June 16, 2026",
    updated: "2 mins read",
    image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=1000&auto=format&fit=crop&q=80",
    body: [
      "State-owned oil marketing companies announced a reduction of ₹2.50 per liter for petrol, starting midnight tonight.",
      "The price cut comes as global crude oil rates saw a downward correction, easing inflationary pressures on the common citizen."
    ]
  },
  'short-item-2': {
    title: "New Traffic Rules in Chennai from May 1",
    category: "Local News",
    author: "Kings Bureau",
    readTime: "1 min read",
    published: "June 15, 2026",
    updated: "1 min read",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Chennai traffic police introduced high-tech AI cameras to automatically detect helmet, seatbelt, and signal violations starting May 1.",
      "Fines will be sent digitally via e-challans, and penalty rates will be strictly enforced to improve road safety across key city junctions."
    ]
  },
  'short-item-3': {
    title: "Rohit Sharma Becomes Fastest to 10,000 ODI Runs",
    category: "Sports",
    author: "Sports Desk",
    readTime: "1 min read",
    published: "June 15, 2026",
    updated: "1 min read",
    image: "https://images.unsplash.com/photo-1540747737956-3787217aba61?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Indian cricket team skipper Rohit Sharma reached a massive milestone, becoming the second-fastest batsman to score 10,000 ODI runs.",
      "He achieved the feat during his masterclass innings in the Asia Cup match, joining an elite club of legendary batsmen."
    ]
  },
  // Trending cards
  'trend-1': {
    title: "Union Budget 2024 Key Announcements That You Should Know",
    category: "Business",
    author: "Market Watch",
    readTime: "3 min read",
    published: "June 14, 2026",
    updated: "2.4K reads",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The Union Budget 2024 introduced revised income tax slabs, higher capital expenditures for infrastructure, and custom duty cuts on electronics.",
      "Special packages were announced for rural development, solar energy grids installation, and green infrastructure investments.",
      "Industry bodies and markets reacted positively, while opposition groups called for more direct assistance to low-income sectors."
    ]
  },
  'trend-2': {
    title: "CSK Beats RCB by 28 Runs in Thrilling Match",
    category: "Sports",
    author: "Sports Desk",
    readTime: "2 min read",
    published: "June 15, 2026",
    updated: "1.8K reads",
    image: "https://images.unsplash.com/photo-1531415080290-bc9b04f5ee92?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Chennai Super Kings defeated Royal Challengers Bengaluru by 28 runs in a packed stadium. Ruturaj Gaikwad scored a brilliant 82 off 45 balls.",
      "RCB's chase fell apart during the middle overs under spin pressure, collapsing to 159/9 as Jadeja and Pathirana took key wickets.",
      "CSK consolidated their position at the top of the points table, delighting fans with a stellar home performance."
    ]
  },
  'trend-3': {
    title: "Rain Alert in 12 Districts of Tamil Nadu",
    category: "Weather",
    author: "Climate Desk",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "1.6K reads",
    image: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1000&auto=format&fit=crop&q=80",
    body: [
      "The meteorological department has issued a high alert for 12 districts of Tamil Nadu, predicting extremely heavy rainfall over the next 48 hours.",
      "District administrations have declared holidays for schools and colleges, placing disaster relief units on standby.",
      "Citizens in low-lying areas are advised to relocate to designated relief camps if water logging occurs."
    ]
  },
  'trend-4': {
    title: "WhatsApp Introduces New Privacy Features",
    category: "Technology",
    author: "Priya Nair",
    readTime: "2 min read",
    published: "June 15, 2026",
    updated: "1.2K reads",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1000&auto=format&fit=crop&q=80",
    body: [
      "WhatsApp rolled out new updates focusing on user privacy, including locked chats hidden under biometric keys and dynamic screen sharing controls.",
      "Users can now block profile screenshot attempts and manage custom filters for groups, boosting protection against online harassment.",
      "The new features are rolling out globally and will be active on all upgraded devices this week."
    ]
  },
  'trend-5': {
    title: "Gold Prices Hit All Time High in Chennai",
    category: "Business",
    author: "Market Watch",
    readTime: "2 min read",
    published: "June 16, 2026",
    updated: "1.1K reads",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
    body: [
      "Gold rates touched a record high in Chennai today, trading at ₹7,350 per gram for 22-karat sovereign gold.",
      "Market analysts note the surge is driven by global central bank reserves accumulations, geopolitical tensions, and equity volatility.",
      "Local jewelers report steady demand despite the high prices, as customers continue buying for the wedding season."
    ]
  }
};

const articleDatabaseHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    
    if (typeof prop === 'string') {
      if (prop.startsWith('news-card-loaded-')) {
        const parts = prop.split('-');
        const index = parseInt(parts[parts.length - 1]);
        const simulated = [
          {
            title: "Tamil Nadu Budget Session 2024: Major Allocations for Health & Infrastructure",
            image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80",
            category: "Politics",
            author: "Kings Legislative Bureau",
            time: "2 hours ago",
            reads: "1.1K reads"
          },
          {
            title: "Global Tech Summit Starts Today in Chennai: Key Exhibitors and Innovations",
            image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1000&auto=format&fit=crop&q=80",
            category: "Technology",
            author: "Priya Nair",
            time: "3 hours ago",
            reads: "890 reads"
          },
          {
            title: "Gold Rates Dip Slightly in Chennai Following Global Market Correction",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80",
            category: "Business",
            author: "Market Watch",
            time: "4 hours ago",
            reads: "2.5K reads"
          }
        ];
        const item = simulated[index % simulated.length];
        return {
          title: item.title,
          category: item.category,
          author: item.author,
          readTime: "3 min read",
          published: "June 16, 2026",
          updated: item.time,
          image: item.image,
          body: [
            `This is a live comprehensive report regarding: ${item.title}. Special reporters on the ground are currently gathering details as the story develops.`,
            `Reader interest is extremely high, with ${item.reads} recorded on the platform since publication. Stay tuned for official press releases and direct feeds from local administrative departments.`,
            `For instant coverage, toggle the Notifications Bell on the top-right header corner of the page.`
          ]
        };
      }
    }
    
    return undefined;
  }
};

export const articleDatabase = new Proxy(rawDatabase, articleDatabaseHandler);

export function getFallbackImage(category) {
  const fallbacks = {
    politics: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80',
    sports: 'https://images.unsplash.com/photo-1531415080290-bc9b04f5ee92?w=1000&auto=format&fit=crop&q=80',
    cinema: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
    technology: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80',
    business: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80',
    weather: 'https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=1000&auto=format&fit=crop&q=80',
    environment: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1000&auto=format&fit=crop&q=80',
    culture: 'https://images.unsplash.com/photo-1608958416790-27bb5d1fb1df?w=1000&auto=format&fit=crop&q=80',
    space: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1000&auto=format&fit=crop&q=80',
    education: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80',
    localnews: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1000&auto=format&fit=crop&q=80'
  };
  const cleanCat = (category || '').toLowerCase().replace(/[\s\-_]/g, '').trim();
  return fallbacks[cleanCat] || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80';
}
