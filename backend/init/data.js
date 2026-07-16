const seedData = [
    {
        title: "Wanderlust Web App",
        description: "Full-stack property rental platform allowing users to list, discover, and book unique accommodations worldwide.",
        tickets: [
            { title: "Image Upload Crashing", description: "Cloudinary upload fails when image is over 5MB.", status: "Open", priority: "High" },
            { title: "Session Timeout on Checkout", description: "MongoDB session expires before users can enter credit card details.", status: "In Progress", priority: "High" },
            { title: "Mobile Nav Menu Hidden", description: "Hamburger menu doesn't toggle on screens smaller than 768px.", status: "Closed", priority: "Medium" },
            { title: "Mapbox API Error", description: "Geocoding fails for certain rural zip codes.", status: "Open", priority: "Medium" },
            { title: "Currency Converter API Down", description: "Prices default to USD when the European Central Bank API limits are hit.", status: "In Progress", priority: "Medium" },
            { title: "Password Reset Token", description: "Bcrypt hash mismatch when resetting password via email link.", status: "Closed", priority: "High" }
        ]
    },
    {
        title: "Nexus Issue Tracker",
        description: "Internal developer tool for tracking bugs, features, and project progression across engineering teams.",
        tickets: [
            { title: "Joi Validation Bypassed", description: "Users can submit tickets with empty titles if they send raw JSON.", status: "Closed", priority: "High" },
            { title: "Middleware Cascade Delete", description: "Orphaned tickets remain in DB when a project is deleted.", status: "Closed", priority: "High" },
            { title: "Add Dark Mode", description: "Implement a dark mode toggle using Tailwind CSS.", status: "Open", priority: "Low" },
            { title: "isTicketAuthor Error", description: "Middleware crashes if project isn't populated first.", status: "Closed", priority: "Medium" },
            { title: "Pagination for Projects", description: "GET /projects is too slow, need to implement pagination.", status: "Open", priority: "Medium" },
            { title: "Search Indexing", description: "Implement MongoDB text search across ticket titles and descriptions.", status: "In Progress", priority: "Medium" },
            { title: "Rate Limiting on Login", description: "Add express-rate-limit to prevent brute force attacks.", status: "Open", priority: "High" },
            { title: "Role-Based Access Control", description: "Add 'Admin' vs 'Developer' roles for project deletion.", status: "Open", priority: "Medium" }
        ]
    },
    {
        title: "Lumina E-Commerce",
        description: "Headless e-commerce storefront specializing in boutique lighting fixtures and home decor.",
        tickets: [
            { title: "Stripe Webhook Failing", description: "Payment confirmation webhooks are returning a 401 error.", status: "Open", priority: "High" },
            { title: "Cart State Clears on Refresh", description: "Redux store isn't persisting to local storage.", status: "In Progress", priority: "High" },
            { title: "Missing Alt Tags on Products", description: "Accessibility audit flagged 400 product images missing alt text.", status: "Open", priority: "Low" },
            { title: "Discount Code Logic Error", description: "10% discount is being applied after taxes instead of before.", status: "In Progress", priority: "Medium" },
            { title: "Search Bar Debounce", description: "API is being called on every keystroke, causing rate limits.", status: "Closed", priority: "Medium" },
        ]
    },
    {
        title: "Vitality Health Dashboard",
        description: "Patient portal for tracking biometrics, booking appointments, and viewing lab results.",
        tickets: [
            { title: "HIPAA Compliance Flag", description: "Patient names are being logged in the server console.", status: "In Progress", priority: "High" },
            { title: "PDF Export Failing", description: "Generating lab result PDFs throws a memory limit error in Node.", status: "Open", priority: "High" },
            { title: "Weight Graph Scaling", description: "Y-axis on the Chart.js weight graph starts at 0, making changes hard to read.", status: "Closed", priority: "Low" },
            { title: "Password Reset Email", description: "SendGrid templates are rendering with broken CSS.", status: "In Progress", priority: "Medium" },
            { title: "Doctor Search Filter", description: "Filtering doctors by specialty returns empty arrays.", status: "Open", priority: "Medium" },
            { title: "Insurance Card OCR", description: "Tesseract.js failing to read low-light images of insurance cards.", status: "In Progress", priority: "Low" },
            { title: "Session Timeout Too Long", description: "Medical portal session stays active for 24h, needs to be 15m.", status: "Closed", priority: "High" }
        ]
    },
    {
        title: "CryptoFolio",
        description: "Real-time cryptocurrency portfolio tracker integrating with multiple exchange APIs.",
        tickets: [
            { title: "Binance API Rate Limit", description: "Fetching user balances hits rate limit during peak hours.", status: "Open", priority: "High" },
            { title: "WebSocket Reconnect Logic", description: "Live price feed disconnects and doesn't attempt to reconnect.", status: "In Progress", priority: "High" },
            { title: "Portfolio Value NaN", description: "If a coin has 0 volume, total portfolio value renders as NaN.", status: "Closed", priority: "Medium" },
            { title: "Historical Chart Data Gap", description: "Missing data for Ethereum on Feb 29th (leap year bug).", status: "Open", priority: "Medium" },
            { title: "Export to CSV", description: "Add feature to download trade history for tax purposes.", status: "In Progress", priority: "Low" },
            { title: "2FA Verification", description: "Twilio SMS codes are occasionally delayed by 5+ minutes.", status: "Open", priority: "High" },
            { title: "Cold Wallet Import", description: "Ledger CSV import fails if headers are lowercase.", status: "Closed", priority: "Medium" },
            { title: "Push Notification Spam", description: "Price alerts are firing multiple times per second during high volatility.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "TaskMaster Pro",
        description: "Productivity app combining Kanban boards, Pomodoro timers, and team chat.",
        tickets: [
            { title: "Drag and Drop Glitch", description: "Moving a card between Kanban columns sometimes duplicates the card.", status: "In Progress", priority: "High" },
            { title: "Timezone Offset", description: "Due dates are shifted by one day for users in Asia.", status: "In Progress", priority: "High" },
            { title: "Archive Board Permissions", description: "Non-owners can archive an entire board.", status: "Open", priority: "High" }
        ]
    },
    {
        title: "GamerHub API",
        description: "RESTful API aggregating game reviews, release dates, and platform availability.",
        tickets: [
            { title: "IGDB API Authentication", description: "Twitch OAuth token expires and breaks the nightly database sync.", status: "In Progress", priority: "High" },
            { title: "Duplicate Game Entries", description: "Remasters are being merged with original games in search results.", status: "Open", priority: "Medium" },
            { title: "Review Score Aggregation", description: "Metacritic scores are pulled as strings, breaking math functions.", status: "Closed", priority: "Medium" },
            { title: "Cache Invalidation", description: "Redis cache isn't clearing when a new review is posted.", status: "Open", priority: "High" },
            { title: "Rate Limit Headers", description: "API response is missing standard X-RateLimit remaining headers.", status: "In Progress", priority: "Low" },
            { title: "Database Connection Pool", description: "Too many connections error during E3 press conferences.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "EduStream",
        description: "Online learning platform hosting video courses, quizzes, and student forums.",
        tickets: [
            { title: "Video Player Buffering", description: "HLS streams are buffering excessively for users in South America.", status: "Open", priority: "High" },
            { title: "Quiz Scoring Bug", description: "Multiple choice questions with multiple correct answers are graded wrong.", status: "In Progress", priority: "High" },
            { title: "Forum Markdown Parsing", description: "Code blocks in forum posts are rendering without syntax highlighting.", status: "Closed", priority: "Low" },
            { title: "Certificate Generation", description: "Completion certificates are rendering with the wrong timezone date.", status: "In Progress", priority: "Medium" },
            { title: "Instructor Dashboard Stats", description: "Revenue graph displays gross instead of net payouts.", status: "Open", priority: "Medium" },
            { title: "Mobile App Deep Linking", description: "Clicking a course email link doesn't open the native iOS app.", status: "Open", priority: "High" },
            { title: "Subtitle Desync", description: "SRT files are drifting out of sync with video after 20 minutes.", status: "In Progress", priority: "Medium" },
            { title: "Empty State UI", description: "Users with no enrolled courses see a blank white screen.", status: "Closed", priority: "Low" }
        ]
    },
    {
        title: "ChefConnect",
        description: "Marketplace connecting private chefs with clients for dinner parties and events.",
        tickets: [
            { title: "Booking Calendar Overlap", description: "Chefs can be double-booked if requests come in at the exact same time.", status: "Open", priority: "High" },
            { title: "Push Notifications", description: "FCM tokens are expiring, causing missed messages between clients and chefs.", status: "In Progress", priority: "Medium" },
            { title: "Missing Ingredients List", description: "Menu PDF generation cuts off ingredients list if it exceeds one page.", status: "Open", priority: "Medium" },
            { title: "Admin Fee Calculation", description: "Platform takes 10% on gross instead of subtotal.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "DevRel Docs",
        description: "Open-source documentation generator built on Next.js and MDX.",
        tickets: [
            { title: "Broken Anchor Links", description: "Clicking a sidebar heading link scrolls past the actual heading.", status: "In Progress", priority: "Low" },
            { title: "Version Dropdown", description: "Switching from v1 to v2 documentation throws a 404 on certain pages.", status: "Open", priority: "High" },
            { title: "Code Block Copy Button", description: "Copying code grabs line numbers as well as the code itself.", status: "Closed", priority: "Medium" },
            { title: "i18n Routing", description: "Changing language to Spanish redirects users back to the homepage.", status: "Open", priority: "Medium" },
            { title: "SEO Meta Tags", description: "Twitter card descriptions are pulling the footer content instead of the page intro.", status: "In Progress", priority: "Medium" },
            { title: "Mobile Sidebar Swipe", description: "Swiping left on mobile accidentally closes the navigation menu.", status: "Closed", priority: "Low" }
        ]
    },
    {
        title: "CodeCollab",
        description: "Real-time collaborative code editor with integrated terminal and live share.",
        tickets: [
            { title: "Cursor Desync", description: "Yjs CRDT algorithm causes cursor positions to shift when users type simultaneously.", status: "In Progress", priority: "High" },
            { title: "Terminal Shell Injection", description: "Users can escape the Docker container via specific bash commands.", status: "Open", priority: "High" },
            { title: "Syntax Highlighting Lag", description: "Prism.js struggles to parse files larger than 10,000 lines.", status: "Open", priority: "Medium" },
            { title: "Live Preview CORS", description: "The iframe live preview is blocked by strict CSP headers.", status: "Closed", priority: "Medium" },
            { title: "File Tree Drag Drop", description: "Moving a folder into a child of itself causes an infinite recursion crash.", status: "In Progress", priority: "High" },
            { title: "Socket Authentication", description: "WebSocket connection doesn't verify JWT on reconnect.", status: "Open", priority: "High" },
            { title: "NPM Install Timeout", description: "Large dependencies cause the integrated terminal to hang indefinitely.", status: "Closed", priority: "Low" },
            { title: "Missing Auto-Complete", description: "IntelliSense for React components isn't loading the prop definitions.", status: "Open", priority: "Medium" }
        ]
    },
    {
        title: "FleetTrack GPS",
        description: "Logistics and dispatch software for delivery fleets with real-time routing.",
        tickets: [
            { title: "Ghost Vehicles", description: "Trucks are appearing on the map in the ocean at coordinates 0,0.", status: "In Progress", priority: "High" },
            { title: "Reporting Export", description: "Weekly PDF reports are missing the Sunday data due to UTC timezone offset.", status: "In Progress", priority: "Low" }
        ]
    },
    {
        title: "PayFlow Payroll",
        description: "B2B SaaS platform for managing employee timesheets, taxes, and direct deposits.",
        tickets: [
            { title: "Leap Year Tax Calc", description: "Prorated salaries are miscalculated in February during leap years.", status: "Open", priority: "High" },
            { title: "SSN Masking", description: "Full Social Security Numbers are briefly visible before the React component mounts.", status: "Closed", priority: "High" },
            { title: "Overtime Rules Logic", description: "California double-time rules aren't applying for shifts over 12 hours.", status: "Open", priority: "Medium" },
            { title: "W-2 Generation Format", description: "PDF alignment is off by 2mm, causing rejections when physically printed.", status: "In Progress", priority: "Medium" },
            { title: "Timesheet Approval Flow", description: "Managers cannot approve timesheets if the employee is on PTO.", status: "Open", priority: "Low" },
            { title: "Onboarding Document Sign", description: "DocuSign iframe fails to load in Safari cross-site tracking block.", status: "Closed", priority: "Medium" },
            { title: "Holiday Pay Multiplier", description: "Custom holiday rates are applying to salaried employees incorrectly.", status: "Open", priority: "Medium" }
        ]
    },
    {
        title: "BlockVault NFT",
        description: "Decentralized marketplace for minting, buying, and trading digital assets on Polygon.",
        tickets: [
            { title: "Metamask Disconnect", description: "Wallet drops connection when switching between Mainnet and Testnet.", status: "In Progress", priority: "High" },
            { title: "IPFS Image Loading", description: "Images hosted on Pinata are taking 30+ seconds to resolve.", status: "Open", priority: "Medium" },
            { title: "Gas Estimation Failure", description: "Ethers.js throws unpredictable gas limit errors during high network traffic.", status: "In Progress", priority: "High" },
            { title: "Lazy Minting Vulnerability", description: "Signatures can be replayed to mint multiple items from the same voucher.", status: "Closed", priority: "High" },
            { title: "Royalties Splitting", description: "Secondary sales are routing 100% of funds to the seller, bypassing creator fees.", status: "Open", priority: "High" },
            { title: "Auction Bid Refresh", description: "Live auction prices don't update unless the user manually refreshes the page.", status: "Closed", priority: "Medium" },
            { title: "Search by Wallet Address", description: "Graph Protocol query fails when searching by ENS domain.", status: "Open", priority: "Low" },
            { title: "Mobile Wallet Connect", description: "QR code modal for WalletConnect is cut off on smaller screens.", status: "In Progress", priority: "Low" }
        ]
    },
    {
        title: "SocialPlate",
        description: "Community-driven recipe sharing network with meal planning and grocery lists.",
        tickets: [
            { title: "Infinite Scroll Jump", description: "Loading the next page of the feed pushes the user back to the top.", status: "Closed", priority: "Medium" },
            { title: "Grocery List Sync", description: "Checking off an item on mobile doesn't update the web dashboard.", status: "Open", priority: "High" },
            { title: "Unit Conversion API", description: "Grams to Ounces conversion is failing for values under 5g.", status: "Closed", priority: "Low" },
            { title: "Comment Section Socket", description: "Real-time comments duplicate on screen when connection flickers.", status: "In Progress", priority: "Medium" },
            { title: "Recipe Scraping Tool", description: "Pasting a URL to import a recipe fails on sites with strict paywalls.", status: "Open", priority: "Medium" },
            { title: "Nutritional API Limit", description: "Edamam API blocks our requests after 100 recipe calculations.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "LinguaLearn",
        description: "AI-powered language learning application with speech recognition and spaced repetition.",
        tickets: [
            { title: "Microphone Permissions", description: "App crashes on iOS when user denies microphone access.", status: "Closed", priority: "High" },
            { title: "Spaced Repetition Algorithm", description: "Cards marked 'Hard' are showing up too frequently, ignoring the multiplier.", status: "Open", priority: "Medium" },
            { title: "Streak Freeze Exploit", description: "Users can change device time to maintain their daily streak.", status: "In Progress", priority: "Medium" },
            { title: "Speech-to-Text Accuracy", description: "Whisper API misinterprets heavy accents as completely different words.", status: "Open", priority: "High" },
            { title: "Leaderboard Cache Delay", description: "Weekly XP leaderboard takes 12 hours to reflect current scores.", status: "Closed", priority: "Low" },
            { title: "Kanji Stroke Order", description: "Animation for drawing characters skips the third stroke consistently.", status: "Open", priority: "Medium" },
            { title: "Offline Mode Sync", description: "Lessons completed offline overwrite online progress when reconnected.", status: "In Progress", priority: "High" },
            { title: "Push Notification Local", description: "Reminders are sent in English regardless of the user's native language setting.", status: "Open", priority: "Low" }
        ]
    },
    {
        title: "OmniCRM",
        description: "Enterprise customer relationship management software with automated email pipelines.",
        tickets: [
            { title: "CSV Import Mapping", description: "Importing contacts swaps First Name and Last Name if commas are present in data.", status: "In Progress", priority: "High" },
            { title: "Email Blast Queue", description: "BullMQ workers freeze when processing lists larger than 50,000 emails.", status: "Open", priority: "High" },
            { title: "Lead Assignment Round-Robin", description: "Algorithm assigns all weekend leads to the same sales rep.", status: "Closed", priority: "Medium" },
            { title: "Kanji Support in PDF", description: "Generating invoices for Japanese clients results in square box characters.", status: "Open", priority: "Medium" },
            { title: "Session Hijacking Risk", description: "JWT tokens are stored in localStorage instead of HttpOnly cookies.", status: "Open", priority: "High" }
        ]
    },
    {
        title: "EventTix",
        description: "High-volume ticketing platform for concerts, sports, and theater performances.",
        tickets: [
            { title: "Promo Code Expiration", description: "Codes set to expire at midnight UTC are expiring at local time instead.", status: "Closed", priority: "Medium" },
            { title: "Apple Wallet Integration", description: "pkpass files are missing the event location coordinates.", status: "Open", priority: "Low" },
            { title: "Dynamic Pricing Algorithm", description: "Prices drop to $0 when demand spikes faster than the cron job can process.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "SmartHome Hub IoT",
        description: "Centralized control panel for smart lights, locks, thermostats, and security cameras.",
        tickets: [
            { title: "Light Dimming Debounce", description: "Sliding the brightness bar sends 100 API requests, crashing the bulb.", status: "Closed", priority: "Medium" },
            { title: "Offline Mode Toggle", description: "Local network control fails when the internet goes down, stranding users.", status: "Open", priority: "High" },
            { title: "Camera Stream Latency", description: "RTSP video feed has a 10-second delay on the web dashboard.", status: "Open", priority: "Medium" },
            { title: "Smart Lock Auto-Lock", description: "Timer resets if the door is opened and closed rapidly.", status: "In Progress", priority: "High" },
            { title: "Thermostat Celsius Calc", description: "Fahrenheit to Celsius conversion rounds down, setting temp too cold.", status: "Closed", priority: "Medium" },
            { title: "Automations Timezone", description: "Sunrise/Sunset triggers fire based on server time, not home location.", status: "Open", priority: "Medium" },
            { title: "Firmware OTA Update", description: "Devices brick if the update is paused halfway through download.", status: "In Progress", priority: "High" }
        ]
    },
    {
        title: "Zenith UI Library",
        description: "Open-source React component library built with Tailwind CSS and Radix UI.",
        tickets: [
            { title: "Tailwind Class Conflicts", description: "Custom prefixes break when used alongside standard Tailwind projects.", status: "Open", priority: "Medium" },
            { title: "Date Picker Localization", description: "Monday is hardcoded as the start of the week, breaking US formats.", status: "In Progress", priority: "Low" },
            { title: "Tooltip Hover Delay", description: "Tooltips flicker if the user moves the mouse rapidly across items.", status: "Open", priority: "Low" },
            { title: "Dark Mode Storybook", description: "Storybook docs don't respect the system dark mode preference.", status: "Closed", priority: "Medium" },
            { title: "Input Auto-fill Styles", description: "Browser autofill overrides the component's custom background color.", status: "Open", priority: "Medium" }
        ]
    }
];

module.exports = seedData;