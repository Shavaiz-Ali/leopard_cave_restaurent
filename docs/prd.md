# Requirements Document

## 1. Application Overview
- **Application Name:** Leopard Cave Restaurant
- **Description:** A multi-page website for Leopard Cave Restaurant, showcasing its unique cave-style dining experience with panoramic views of Attabad Lake. The site enables visitors to explore the menu (via a dedicated Menu landing page with two options: interactive square cards with full item details, and uploaded image cards), view the gallery, watch video reels, make table reservations via WhatsApp or Gmail with a premium dynamic billing system, read blog articles (including dedicated food blogs for traditional Hunza dishes with user-uploaded images and a Reserve Now button on each food blog), explore social media channels, and discover the Resort offerings including campaign reservations. Video download functionality is permanently disabled across the entire site. Every page always loads from the top regardless of previous scroll position. The website includes a branded loading screen, a promotional popup ad, full SEO optimization for targeted keywords, and a custom favicon. The official Leopard Cave Restaurant logo is consistently displayed in the navigation bar header, as the browser tab favicon, and alongside the website title across all pages. A globally fixed back button is present on every page, always visible regardless of scroll position.

---

## 2. Users & Use Cases
- **Target Users:** Tourists, families, couples, and food enthusiasts visiting or planning to visit the Attabad Lake region.
- **Core Use Cases:**
  - Visitors browse the restaurant's ambiance, story, and highlights
  - Visitors navigate to the Menu landing page and choose between Menu Cards or Menu Images
  - Visitors explore the menu via interactive square card layout with item names, descriptions, and prices, or via uploaded image cards
  - Visitors search for food items by name on the Menu Landing Page and Menu Cards sub-page
  - Visitors browse gallery images and video reels (no download option)
  - Visitors reserve a table online with a premium dynamic billing experience and send reservation details via WhatsApp or Gmail
  - Visitors find the restaurant's location, nearby attractions, and social media channels
  - Visitors read blog articles about the history, culture, and traditional foods of the Hunza region
  - Visitors read dedicated food blogs for Burush Shapik, Chapshurou, Mulida, Giyalin, Dawdo Soup, Hari Soup, Diram Phitti, and other traditional Hunza dishes, each with a Reserve Now button
  - Visitors explore social media accounts (Facebook, Instagram, TikTok)
  - Visitors view camp/resort details and contact via WhatsApp for inquiries (booking temporarily disabled)
  - Visitors navigate back to the previous page at any time using the always-visible fixed back button

---

## 3. Page Structure & Core Features

### 3.1 Page Overview
```
Leopard Cave Restaurant Website
├── Home Page
├── Menu Page (Landing Page)
│   ├── Menu Cards Sub-page (Option 1 — square boxes)
│   └── Menu Images Sub-page (Option 2 — uploaded image cards)
├── Gallery Page
│   ├── Images Tab/Sub-page
│   └── Reels/Videos Tab/Sub-page
├── Reservation Page
│   ├── Restaurant Tab (default)
│   └── Resort Tab
│       ├── Camping Booking Sub-section
│       └── Leopard Resort — Coming Soon Sub-section
├── Nearby Places Page
├── Location Page
├── About Us Page
├── Blogs Page
│   ├── Blogs Sub-section
│   │   ├── Blog: About the History of Attabad Lake
│   │   ├── Blog: Culture of Hunza Valley
│   │   ├── Blog: Burush Shapik
│   │   ├── Blog: Chapshurou
│   │   ├── Blog: Mulida
│   │   ├── Blog: Giyalin
│   │   ├── Blog: Dawdo Soup
│   │   ├── Blog: Hari Soup
│   │   └── Blog: Diram Phitti
│   └── Social Media Sub-section
└── Resort Page
    ├── Campaigns Sub-section (with Camp Details + Maintenance Popup)
    └── Resort Sub-section (Coming Soon)
```

### 3.2 Global: Logo Usage
- **Logo file name:** WhatsApp Image 2026-03-26 at 1.58.28 PM.jpeg
- **Logo URL:** https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg
- The official Leopard Cave Restaurant logo must be applied consistently in all of the following key locations:

#### 3.2.1 Navigation Bar (Header)
- The logo is displayed in the navigation bar at the top of every page, positioned to the left of or adjacent to the restaurant name/website title.
- The logo and restaurant name are properly aligned and visually balanced within the navigation bar.
- The logo scales appropriately for both desktop and mobile viewports.
- The logo remains visible and properly proportioned across all pages at all times.

#### 3.2.2 Browser Tab (Favicon)
- The browser tab icon (favicon) is replaced with the Leopard Cave Restaurant official logo.
- The default platform favicon is removed entirely.
- The favicon displays correctly in the browser tab, is clear and properly visible at optimized favicon size, and works across all browsers and devices.
- Multiple favicon formats (ICO, PNG 32x32, PNG 16x16) are provided to ensure cross-browser compatibility.

#### 3.2.3 Browser Address Bar / URL Area
- The favicon is correctly associated with the website so that the logo appears in the browser address bar and any bookmarks or saved links.
- This is achieved through proper favicon implementation (link rel=icon tags with correct MIME types and sizes).

#### 3.2.4 Page Title Area
- The logo is displayed alongside the website title at the top of each page, integrated within the navigation bar header area.
- The logo and title combination is consistent across all pages.

### 3.3 Global: Loading Screen
- A branded loading screen is displayed whenever the website is loading, particularly on slow internet connections.
- **Logo Display:** The Leopard Cave Restaurant logo (file name: WhatsApp Image 2026-03-26 at 1.58.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg) is displayed centered on the screen.
- **Animation:** The logo continuously fades in and fades out (looping fade-in/fade-out animation) while loading is in progress.
- The loading screen remains fully visible until the website has completely finished loading all critical resources.
- Once loading is complete, the loading screen smoothly transitions away (fade out) and the main page content becomes visible.
- The loading screen is fully responsive and works smoothly on both mobile and desktop.

### 3.4 Global: Favicon
- The browser tab icon (favicon) uses the Leopard Cave Restaurant official logo (file name: WhatsApp Image 2026-03-26 at 1.58.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg).
- The default platform favicon is removed entirely.
- The favicon displays correctly in the browser tab, is clear and properly visible at optimized favicon size, and works across all browsers and devices.

### 3.5 Global: SEO Optimization
- The website is fully optimized to rank higher on search engines for the following updated target keywords:
  - Best restaurants in Hunza
  - Best food in Hunza
  - Best food in Hunza Valley
  - Best places to eat in Hunza
  - Best restaurant in Karimabad Hunza
  - Restaurants at Attabad Lake
  - Hunza food
  - Local food in Hunza
  - Best places in Hunza
  - Where to eat in Hunza
  - Hunza traditional food
  - Restaurants in Gilgit Baltistan
  - Best restaurants in Gilgit Baltistan
  - Best restaurant in Hunza
  - Restaurants in Hunza
  - Best places at Attabad Lake
  - Best restaurants at Attabad Lake
  - Best places to visit in Gilgit Baltistan
  - Hunza local food
  - Local dishes of Hunza
- **Global Meta Title (default/homepage):** Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake
- **Global Meta Description (default/homepage):** Discover Leopard Cave Restaurant – one of the best restaurants in Hunza near Attabad Lake. Enjoy local Hunza food, Pakistani & international dishes with a beautiful natural view.
- **SEO Implementation Requirements:**
  - **Page Titles:** Each page has a unique, keyword-rich title tag incorporating the updated keyword set
  - **Meta Descriptions:** Each page has a unique, descriptive meta description incorporating relevant updated target keywords
  - **Headings (H1, H2, H3):** Headings across all pages are structured with proper hierarchy and incorporate updated target keywords naturally
  - **Image Alt Tags:** All images across the site include descriptive, keyword-relevant alt text attributes
  - **URL Structure:** All page URLs are clean, lowercase, hyphen-separated, and keyword-friendly (e.g., /menu, /gallery, /reservation, /blogs/burush-shapik, /nearby-places, /location, /about-us, /resort)
  - **Content Keyword Placement:** Updated target keywords are naturally integrated into page content, section headings, and descriptive text throughout the site
  - **Mobile-Friendly Design:** All pages are fully responsive and pass mobile-friendliness requirements
  - **Fast Loading Speed:** Images are optimized, assets are minimized, lazy loading applied where appropriate
  - **Proper Indexing:** The site includes a robots meta tag allowing indexing, and a sitemap structure is implemented
  - **Blog SEO:** Each blog article has its own unique SEO-optimized title tag and meta description
  - **Hashtag Integration:** The following hashtags are included in blog article footers and social media integration sections: #HunzaFood #AttabadLake #HunzaValley #BestRestaurantHunza #GilgitBaltistan #TravelHunza #HunzaCuisine
  - **Structured Data:** Where applicable, implement basic schema markup (e.g., Restaurant schema)

### 3.6 Global: Video Auto-Pause on Scroll
- All video/reel players across the entire site implement an auto-pause-on-scroll behavior.
- **Behavior:** When a video is currently playing and the user scrolls such that the video player is no longer visible in the viewport, the video automatically pauses.
- **Implementation:** Use the Intersection Observer API to detect when a video element exits the visible viewport. When the observed video element's intersection ratio drops to zero (or below a defined threshold), the video is paused programmatically.
- **Scope:** This behavior applies to every video player on every page and section, including the featured video on the Home Page, top-4 reels on the Home Page, and all videos on the Gallery Reels/Videos sub-page.
- **Device coverage:** Must function correctly and reliably on both mobile devices and desktop browsers.
- **Mobile-specific requirement:** The Intersection Observer implementation must be confirmed working on iOS Safari and Android Chrome, configured with threshold: 0 and rootMargin: '0px'.
- **Single-video playback rule remains enforced:** Auto-pause on scroll is additive to the existing single-video playback rule.

### 3.7 Global: Back Button

#### 3.7.1 Behavior & Placement
- A back button (← arrow) is present on every page of the website.
- The back button is **fixed/sticky** — it remains visible at all times regardless of how far the user has scrolled down the page.
- **Default position:** Fixed at the top-left corner of the screen, with sufficient padding/margin so it does not overlap the navigation bar or any critical content.
- The back button navigates the user to the previous page in the browser history (equivalent to window.history.back()).
- On the Home Page, if there is no previous history entry, the back button is either hidden or disabled gracefully (no broken navigation).

#### 3.7.2 Specific Page: Gallery Reels/Videos Sub-page (View More Videos)
- When the user navigates from the Home Page to the Gallery Reels/Videos sub-page via the View More button, a back button (← arrow) is prominently displayed on that page.
- The back button navigates back to the Home Page.
- The button is fixed/sticky and always visible on scroll, on both mobile and desktop.

#### 3.7.3 Design Requirements
- The back button design is consistent with the restaurant's dark cave-inspired theme.
- It includes a hover effect consistent with the site-wide theme.
- It is touch-friendly and accessible on all mobile screen sizes.
- It does not obstruct any primary content or interactive elements.
- It is fully responsive and works correctly on both mobile and desktop.
- z-index is set sufficiently high to ensure the button is always rendered above other page elements.

### 3.8 Home Page

#### Promotional Ad Popup
- A promotional popup ad is displayed on the Home Page only.
- **Trigger:** The popup appears 10 seconds after the website finishes loading and the Home Page is displayed.
- **Auto-dismiss:** If the user does not manually close the popup, it automatically disappears after 15–20 seconds from the moment it appears.
- **Close Button:** A clearly visible close (X) button is displayed at the top of the popup. Clicking it immediately dismisses the popup.
- **Popup Content:**
  - Message: For Digital Marketing Services & Website Development, contact us
  - A button below the message linking to: https://futurenaire.netlify.app/ (opens in a new tab)
- **Design:** Clean and modern popup design, consistent with the site's dark cave-inspired theme. Includes a subtle dark overlay behind the popup.
- Fully responsive on both mobile and desktop.

#### Navigation Bar & Logo (Global Transparent Overlay)
- The navigation bar contains the Leopard Cave Restaurant logo (file name: WhatsApp Image 2026-03-26 at 1.58.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg) displayed to the left of or adjacent to the restaurant name, along with navigation links: Home, Menu, Gallery, Reservation, Nearby Places, Location, About Us, Blogs, Resort, Book Now.
- The navigation bar is rendered with a transparent background, overlaid directly on top of the slideshow images.
- This transparent overlay applies to all slideshow images except the first logo image (Rustic cave dining with stunning views.png), which retains its original black sidebar background.
- All navigation bar links/buttons include a hover effect: on hover or click, the link or button color changes to match the restaurant's warm earth-tone or cave-inspired color palette.
- **Menu Navigation Behavior (Updated):** When the user clicks the Menu button in the navigation bar, they are navigated to the Menu Landing Page (see Section 3.9). The Menu button does NOT open a dropdown and does NOT directly redirect to any sub-page. The Menu Landing Page itself provides the two options (Menu Cards and Menu Images) via prominent buttons.
- **Menu Button Fix:** The Menu button in the navigation bar must be fully functional on both mobile and desktop. Any broken link, incorrect routing, or JavaScript click issue must be resolved. Clicking Menu must reliably open the Menu Landing Page (/menu) every time, with no unresponsive or broken behavior.

#### Hero Section (Slideshow)
- Heading (H1, SEO-optimized): Best Restaurant in Hunza at Attabad Lake — Leopard Cave Restaurant
- Subheading (H2): Enjoy a unique dining experience with breathtaking views of Attabad Lake.
- Marketing tagline displayed prominently: Dine with a View of Attabad Lake

**Hero Section — Title & Description Fade-Out Behavior (Updated):**
- The title (H1), subheading (H2), and tagline are displayed immediately when the Home Page loads.
- After 5 seconds, the title, subheading, and tagline fade out and disappear.
- The fade-out animation applies only to the title, subheading, and tagline — it does NOT affect the Menu button, Reserve Table button, or any other interactive element.
- The fade-out is implemented as a smooth CSS opacity transition (e.g., 0.8–1 second fade duration).
- Once faded out, the title/subheading/tagline remain hidden for the duration of the session on the Home Page.

**Hero Section — Mobile Centering (Updated):**
- On mobile screens, the title (H1), subheading (H2), and tagline must be centered both horizontally and vertically within the hero section viewport.
- True full centering is required: the text block must be positioned at the visual center of the hero area in all directions — horizontally centered and vertically centered (including from the bottom).
- Implementation: Use CSS flexbox or absolute positioning with transform: translate(-50%, -50%) or equivalent to achieve true center alignment on mobile. The hero section container on mobile must have a defined height (e.g., 100vh or the full visible hero area height) to allow vertical centering to function correctly.
- Text alignment on mobile: centered (text-align: center).
- This centering applies only on mobile screen sizes (e.g., max-width: 768px breakpoint or equivalent). Desktop layout remains unchanged.
- **Additional fix:** The text block must be positioned at the exact visual center of the background slideshow image — not offset toward the top, bottom, or sides. On mobile, the hero container must use display: flex with justify-content: center and align-items: center, or equivalent absolute centering, so the title and description appear balanced and aligned with the center of the image at all times.

**Hero Section Buttons — Immediate & Permanent Visibility (Updated):**
- The Menu button and Reserve Table button are displayed immediately when the Home Page loads.
- Both buttons are visible at the same time as the title, description, and tagline — there is no delay, animation delay, or timed appearance for the buttons.
- The buttons do NOT fade out. They remain permanently visible at all times, including after the title/description/tagline have faded out after 5 seconds.
- The buttons do NOT depend on the title or description disappearing before they appear.
- Both buttons are positioned clearly below the title and description/tagline, properly spaced, and styled as real, clearly visible, clickable buttons.
- On mobile, the buttons remain centered horizontally and are positioned below the centered text block. After the title/description fade out, the buttons remain visible and accessible.
- This behavior applies on both mobile and desktop.
- **Menu** button links to the Menu Landing Page.
- **Reserve Table** button links to the Reservation Page.
- Both buttons include a hover effect consistent with the restaurant's cave and nature theme.

**Mobile Typography for Hero Text (Updated):**
- The title (H1) and description/subheading text in the hero section must be specifically optimized for mobile screens.
- **Title font size on mobile:** Reduced to a smaller but still prominent size (e.g., clamp-based or responsive sizing such as 1.6rem–2rem on small screens), ensuring it does not appear oversized or cause awkward line wrapping.
- **Description/subheading font size on mobile:** Reduced to a balanced, readable size (e.g., 0.9rem–1.1rem on small screens) with improved line spacing (line-height: 1.5–1.7) for readability.
- **Text alignment on mobile:** Centered in all directions (see Mobile Centering above).
- **Font style:** Clean and modern font, maintaining proper typographic hierarchy (Title > Subheading > Tagline).
- **Line spacing and padding:** Sufficient spacing between title, subheading, and tagline so text does not feel cramped on small screens.
- **No awkward wrapping:** All text must wrap gracefully on small screens without orphaned single words or broken phrases.
- **Desktop:** Desktop typography remains mostly unchanged; only minor consistency adjustments applied if needed.

- The hero section displays a sliding banner/slideshow cycling through the following restaurant images in this order:
  - Image 1 (opening slide, selected randomly at page load from Image 1 and Image 2) — file name: Rustic cave dining with stunning views.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png
  - Image 2 (follows immediately after Image 1) — file name: Rustic hillside restaurant at sunset.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png
  - Image 3 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxu72ukunsw.jpeg
  - Image 4 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg
  - Image 5 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (2).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm29s0.jpeg
  - Image 6 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM.jpeg (original), URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1e68.jpeg
- **Auto-slide speed:** Each image is displayed for 1 second before transitioning to the next. The transition is smooth and fast (CSS crossfade, approximately 300–500ms). The slideshow runs continuously without stopping or pausing on both mobile and desktop.
- **Slideshow sidebar/letterbox color rules:**
  - Image 1 (Rustic cave dining with stunning views.png): retain the original black sidebars as-is.
  - All other images (Images 2–6): fill any side letterbox or empty areas with deep charcoal, dark espresso brown, or near-black tones (e.g., #1a1008, #1c1c1c, or #0d0d0d).
- **Slideshow order rule:** At page load, either Image 1 or Image 2 is randomly selected as the opening slide. Image 2 always follows Image 1. After the two opening images, the slideshow continues in fixed order: Image 3, Image 4, Image 5, Image 6. The slideshow loops continuously.

#### Introduction Section
- H2 heading (SEO-optimized): Local Hunza Food & Cave Dining at Attabad Lake
- Text: Leopard Cave Restaurant offers a one-of-a-kind dining experience located above the stunning Attabad Lake. Surrounded by nature, this beautiful space combines cave-inspired architecture, warm wooden interiors, and panoramic views of one of the most scenic lakes in the region. Whether you are looking for the best food in Hunza, traditional Hunza cuisine, or a memorable place to eat in Hunza Valley, Leopard Cave Restaurant is your destination.

#### Experience Highlights Section
- H2 heading (SEO-optimized): Why Leopard Cave is the Best Restaurant in Hunza
- Displayed as visual cards. Each card displays the full, uncropped background image matched to its title/experience. A semi-transparent dark gradient is applied at the bottom of each image to ensure text readability.
- Highlight cards:
  - **Stunning Panoramic Views of Attabad Lake** — Description: Experience breathtaking panoramic views of the iconic Attabad Lake right from your table. — Background image: file name: Rustic hillside restaurant at sunset.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png — Image alt: 「Attabad Lake restaurant view from Leopard Cave Restaurant Hunza」
  - **Cozy Cave-Style Ambiance** — Description: Dine inside a beautifully crafted cave-inspired space with warm wooden interiors and a unique atmosphere. — Background image: file name: Rustic cave dining with stunning views.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png — Image alt: 「Cave dining ambiance at best restaurant in Hunza」
  - **Perfect Spot for Lunch & Dinner** — Description: Whether it's a relaxed lunch or a special dinner, enjoy exceptional food with a view that makes every meal memorable. — Background image: file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg — Image alt: 「Best places to eat in Hunza Valley — Leopard Cave Restaurant」
  - **Peaceful Natural Environment** — Description: Surrounded by the serene beauty of nature, our restaurant offers a tranquil escape from the everyday. — Background image: file name: WhatsApp Image 2026-03-27 at 10.29.27 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg — Image alt: 「Natural environment at Hunza restaurant near Attabad Lake」
  - **Ideal for Families, Couples, and Tourists** — Description: A welcoming space perfect for families, romantic outings, and tourists seeking an unforgettable dining experience. — Background image: file name: WhatsApp Image 2026-03-27 at 10.29.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg — Image alt: 「Family-friendly restaurant in Hunza Gilgit Baltistan」
  - **Baskochi Meadows Access** — Description: Enjoy exclusive access to the scenic Baskochi Track, leading directly to the breathtaking Baskochi Meadows — a premium experience for nature lovers and adventurous guests. — Background image: file name: WhatsApp Image 2026-03-30 at 2.29.36 AM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt7c1sucni8.jpeg — Image alt: 「Baskochi Meadows track access from Leopard Cave Restaurant Hunza」
  - **Scenic Lakeside Setting** — Description: Nestled above Attabad Lake, every corner of the restaurant offers a stunning lakeside view that creates an unmatched dining backdrop. — Background image: file name: WhatsApp Image 2026-03-27 at 10.27.23 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg — Image alt: 「Scenic lakeside dining at Attabad Lake restaurant Hunza」
  - **Warm & Inviting Atmosphere** — Description: From the moment you arrive, our warm and inviting atmosphere ensures every guest feels at home. — Background image: file name: WhatsApp Image 2026-03-27 at 10.29.29 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg — Image alt: 「Warm atmosphere at best restaurant in Hunza Valley」

#### Featured Video / Reel Section (Homepage)
- Positioned after the Experience Highlights section.
- Section heading (H2, SEO-optimized): Experience Hunza Food & Dining in Motion
- **Featured Reel (top of section):**
  - File name: WhatsApp Video 2026-03-30 at 10.55.19 P.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami98mm4ey2o.mp4
  - Rendered as an inline video player with standard controls (play, pause, volume, fullscreen) — no download button or download option is present
  - **Fullscreen fix:** The fullscreen button must function correctly on both desktop and mobile. On desktop, clicking fullscreen must trigger the browser's native fullscreen API (document.requestFullscreen or vendor-prefixed equivalents). Tested across Chrome, Firefox, Edge, and Safari on desktop.
  - **Auto-play with auto-unmute on scroll into view (Updated):** When the featured video scrolls into the visible viewport, it automatically begins playing AND is automatically unmuted (sound ON). The video must not remain muted when it enters the viewport. If the browser enforces autoplay restrictions that block unmuted autoplay, the video attempts to play unmuted after the first user interaction on the page (click, scroll, or tap) as a fallback. The video does not require the user to manually press play or manually unmute.
  - **Auto-pause / auto-mute on scroll out of view (Updated):** When the featured video is playing and the user scrolls it out of the visible viewport, it automatically pauses AND is muted. This ensures audio does not continue playing when the video is off-screen.
  - **Implementation detail:** Use the Intersection Observer API (threshold: 0, rootMargin: '0px'). When the video enters the viewport (intersecting), call videoElement.muted = false and videoElement.play(). When the video exits the viewport (not intersecting), call videoElement.pause() and videoElement.muted = true. This must be confirmed working on iOS Safari and Android Chrome as well as desktop browsers.
  - **Watermark/caption text:** www.leopardcaverestaurant.com is displayed as a visible watermark overlay on the featured video player during playback, positioned in the top-left or top-right corner, or sufficiently above the bottom control bar without overlapping any video controls.
  - **Single-video playback rule:** When this featured video is playing and the user starts any other video, this video automatically pauses/stops.
- **Remaining Reels (below featured video):**
  - Position 1: WhatsApp Video 2026-04-01 at 7.41.50 PM.mp4 (file-ao0pk0xvdbsw.mp4), URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0pk0xvdbsw.mp4
  - Position 2: WhatsApp Video 2026-03-30 at 10.55.19 PM.mp4 (file-ami9atjcwyrk.mp4), URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9atjcwyrk.mp4
  - Position 3: WhatsApp Video 2026-03-30 at 10.55.24 .mp4 (file-ami9b9bltekg.mp4), URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9b9bltekg.mp4
  - Position 4: WhatsApp Video 2026-03-30 at 10.55.24 PM.mp4 (file-ami9c4w3ma68.mp4), URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9c4w3ma68.mp4
  - Maximum of 4 reels shown; each rendered as an inline video player with standard controls — no download button
  - **Fullscreen fix:** Same implementation as featured video above
  - Videos do not autoplay; single-video playback rule enforced
  - **Auto-pause on scroll:** Each reel automatically pauses when scrolled out of the visible viewport (see Section 3.6)
  - **Reel player size on desktop:** Reduced to a balanced, well-proportioned size
  - After the 4 reels, a **View More** button navigates to the Reels/Videos sub-page within the Gallery page

#### Gallery Section (Homepage)
- Positioned immediately below the Featured Video / Reel section
- Section heading/caption: 「A Glimpse Into Our World」
- Images displayed in a structured grid gallery layout:
  - Image 1 — file name: Rustic cave dining with stunning views.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5lnnk.png — alt: 「Cave dining at best restaurant in Hunza」
  - Image 2 — file name: Rustic hillside restaurant at sunset.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png — alt: 「Hillside restaurant at Attabad Lake Hunza」
  - Image 3 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg — alt: 「Hunza food and dining experience Leopard Cave Restaurant」
  - Image 4 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (2).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm29s0.jpeg — alt: 「Local food in Hunza Valley restaurant」
  - Image 5 — file name: WhatsApp Image 2026-03-27 at 10.27.58 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1e68.jpeg — alt: 「Restaurants at Attabad Lake Gilgit Baltistan」
  - Image 6 — file name: WhatsApp Image 2026-03-27 at 10.27.23 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg — alt: 「Scenic view from best restaurant in Hunza」
  - Image 7 — file name: WhatsApp Image 2026-03-27 at 10.29.27 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg — alt: 「Where to eat in Hunza — Leopard Cave Restaurant」
  - Image 8 — file name: WhatsApp Image 2026-03-27 at 10.29.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg — alt: 「Best places to eat in Hunza Valley」
  - Image 9 — file name: WhatsApp Image 2026-03-27 at 10.29.29 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg — alt: 「Hunza traditional food restaurant Attabad Lake」
- Note: The slideshow-only image (file-akxu72ukunsw.jpeg) must NOT appear in this gallery section.

#### Restaurant Facilities Section (Premium Facilities)
- Positioned after the Gallery section
- Section heading (H2): Our Facilities
- All facility items displayed at the same uniform size in a grid or card layout.
- **Baskochi Track Access** is featured as the first card:
  - Background image: file name: WhatsApp Image 2026-03-30 at 2.29.36 AM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt7c1sucni8.jpeg — alt: 「Baskochi Track access from Leopard Cave Restaurant Hunza」
  - Description: Exclusive access to the Baskochi Track route — a premium facility of Leopard Cave Restaurant that passes through and provides direct access to the breathtaking Baskochi Meadows, making it an exceptional experience for nature lovers and adventurous guests.
- Remaining facilities as icon cards (same uniform size, high-quality realistic icons):
  - Free Wi-Fi
  - Free Parking
  - Family-Friendly Area
  - Best Food Service with Top-Quality Serving
  - High-Level Cooking Facilities
  - Excellent Cleanliness
  - Natural, Eco-Friendly Look of the Restaurant

#### Customer Reviews Section
- Positioned above the footer on the homepage
- Section heading (H2): What Our Guests Say About the Best Restaurant in Hunza
- Displays customer review cards attributed to Google Maps, Facebook, and other social media platforms
- Each review card includes: reviewer name, platform source, review text, and star rating where available
- If live API integration is not available, display static representative review cards with platform attribution labels

#### Visit Us Today / Location Section (Homepage)
- H2 heading (SEO-optimized): Find the Best Restaurant in Hunza — Visit Us Today
- Embedded interactive map: Above Attabad Lake, Hunza, Gilgit-Baltistan, Pakistan (coordinates: approximately 36.3167° N, 74.8667° E)
- The map is identical to the map on the internal Location Page — live, zoomable, navigable, with directions
- Full restaurant details displayed below the map:
  - Restaurant name: Leopard Cave Restaurant
  - Address: Above Attabad Lake, Hunza, Gilgit-Baltistan, Pakistan
  - Phone/WhatsApp: 03160605535
  - Email: Leopardcaverestaurantofficial@gmail.com
  - Social media links (WhatsApp, Facebook, Instagram, TikTok)
- Reference images:
  - file name: WhatsApp Image 2026-03-27 at 10.27.23 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2qkg.jpeg — alt: 「Leopard Cave Restaurant location above Attabad Lake Hunza」
  - file name: WhatsApp Image 2026-03-27 at 10.29.27 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl1uyo.jpeg — alt: 「Best restaurant near Attabad Lake Gilgit Baltistan」
  - file name: WhatsApp Image 2026-03-27 at 10.29.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg — alt: 「Where to eat in Hunza Valley — Leopard Cave」
  - file name: WhatsApp Image 2026-03-27 at 10.29.29 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg — alt: 「Hunza food restaurant visit us today」

#### Social Media Floating Icons — Homepage Bottom Corner
- Facebook, Instagram, and TikTok icons displayed as a fixed/floating group in the bottom corner (bottom-right or bottom-left)
- Arranged vertically or neatly aligned
- Each icon opens in a new tab:
  - Facebook: https://www.facebook.com/profile.php?id=61582236326778
  - Instagram: https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ==
  - TikTok: https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8
- Clean, minimal design with subtle dark background or semi-transparent backdrop

#### Social Media Links (Footer / Global)
- Displayed in the footer across all pages:
  - WhatsApp: 03160605535
  - Facebook: https://www.facebook.com/profile.php?id=61582236326778
  - Instagram: https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ==
  - TikTok: https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8
- Each icon opens in a new tab

### 3.9 Menu Page (Landing Page + Two Sub-pages)

#### 3.9.0 Menu Landing Page (Updated)
- **URL:** /menu
- **Purpose:** This is the first page the user sees when clicking the Menu button in the navigation bar or the Menu CTA button on the Home Page. It does NOT directly open Menu Cards or Menu Images.
- **H1 heading (SEO-optimized):** Our Menu — Best Hunza Food & Local Dishes at Leopard Cave Restaurant
- **Cover Image:** Displayed prominently at the top of the landing page.
  - file name: WhatsApp Image 2026-03-30 at 10.31.08 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjuheyo.jpeg — alt: 「Hunza food menu at Leopard Cave Restaurant」
- **Search Functionality (New):**
  - A search input box is displayed prominently at the top of the Menu Landing Page, below the cover image and above the two option buttons.
  - Users can type any food item name into the search box.
  - As the user types, matching food items from the full 40-item menu list are displayed instantly in real time (live filtering).
  - Only items whose names match the search query (case-insensitive, partial match supported) are shown in the results.
  - Each result displays the item name and price.
  - If no items match the search query, a message is displayed: No items found. Try a different search.
  - Clearing the search input hides the results and returns the page to its default state.
  - The search box is styled consistently with the site's dark cave-inspired theme and is fully responsive on both mobile and desktop.
- **Two prominent buttons displayed below the search box:**
  - **View Menu Cards** — navigates to the Menu Cards Sub-page (/menu/cards)
  - **View Menu Images** — navigates to the Menu Images Sub-page (/menu/images)
- Both buttons are styled consistently with the site's dark cave-inspired theme, include hover effects, and are fully responsive on both mobile and desktop.
- **User Flow:**
  1. User clicks Menu in the navigation bar or the Menu CTA button on the Home Page
  2. User is taken to the Menu Landing Page (/menu)
  3. User sees the cover image, search box, and two buttons
  4. User may search for a food item directly, or click View Menu Cards or View Menu Images to proceed to the respective sub-page
- This flow applies on both mobile and desktop. There is no direct redirection to any sub-page from the navigation bar.

#### 3.9.1 Menu Cards Sub-page (Option 1 — Square Boxes)
- **URL:** /menu/cards
- **H1 heading (SEO-optimized):** Our Menu — Local Hunza Food & Traditional Dishes
- **Intro text (SEO-optimized):** Explore our full menu featuring the best Hunza food, traditional local dishes, Pakistani cuisine, and international favorites. From Hunza traditional food like Burush Shapik and Chapshurou to mountain beverages — every dish is crafted with local ingredients.
- **Search Functionality (New):**
  - A search input box is displayed at the top of the Menu Cards sub-page, above all category sections.
  - Users can type any food item name into the search box.
  - As the user types, matching menu item cards are displayed instantly in real time (live filtering). Only cards whose item names match the search query (case-insensitive, partial match supported) are shown.
  - Non-matching cards are hidden while the search query is active.
  - If no items match the search query, a message is displayed: No items found. Try a different search.
  - Clearing the search input restores all category sections and cards to their default visible state.
  - The search box is styled consistently with the site's dark cave-inspired theme and is fully responsive on both mobile and desktop.
- All menu items organized by category in square box cards in a responsive grid layout
- Each card includes: Item Name, Price, Short description, and a **Reserve a Table** button
- **Reserve a Table Button Behavior (Updated — Multi-Item Cart with Confirmation Popup):**
  - Clicking the Reserve a Table button on any menu card does NOT immediately redirect to the Reservation Page.
  - Instead, a confirmation popup (modal) is displayed with the following behavior:
    - **Popup Message:** Do you want to proceed to reservation or add more items?
    - **Popup Buttons:**
      1. **Add More Items** — closes the popup and keeps the user on the Menu Cards page; the selected item is added to a persistent cart/selection state
      2. **Go to Reservation** — navigates to the Reservation Page and passes all currently selected items
      3. **Cancel / Close** — closes the popup; the user remains on the same page; no item is added
    - The popup uses a clean, modern design with smooth fade or slide animation, clear CTA-style buttons, and is fully responsive on both mobile and desktop.
  - **Multi-item selection (cart behavior):**
    - Users can select multiple items from the Menu Cards page before proceeding to reservation.
    - Selected items are stored in component state or localStorage so they persist while the user browses the menu.
    - A visible indicator (e.g., a cart badge or selected items count) is shown on the page so the user knows how many items are currently selected.
    - When the user clicks Go to Reservation, all selected items are passed to the Reservation Page and automatically pre-filled in the Pre-Order Food Items multi-select dropdown, each with a default quantity of 1.
  - **URL parameter compatibility:** The existing single-item pre-selection via URL query parameter (e.g., ?item=Chicken+Corn+Soup) remains supported for direct links from other pages. When arriving via URL parameter, the item is pre-selected in the dropdown as before.
  - **Pre-selection mechanism:** All selected items are passed as URL query parameters or via state when navigating to the Reservation Page. The Reservation Page reads these on load and pre-selects all matching items in the Pre-Order Food Items multi-select dropdown. Matching is case-insensitive and trims whitespace. This behavior must work correctly on both mobile and desktop.

**Menu Items by Category:**

**Local Delights**
1. BURUSH SHAPICK — PKR 650 — Authentic local flatbread, crafted with caramelized onions and an aromatic blend of handpicked local herbs, then lightly drizzled with rich walnut oil.
2. CHAP SHUROO — PKR 1,000 — Tender boneless yak meat, slow-braised with caramelized onions and wild local herbs. Served with hand-kneaded traditional wheat dough, home-style potato wedges, and a savory local dipping sauce.
3. CHICKEN DEROO — PKR 500 — Boneless chicken cooked with fragrant local herbs and onion, wrapped in freshly baked local wheat shapick, served with golden home-style potato wedges and a vibrant, tangy local chutney.

**Valley Soups**
4. DAWDO SOUP — PKR 450 — A nourishing, slow-cooked soup made with homemade laksha flat noodles, tender halize mountain yak meat cuts, and ba page chap, gently simmered with aromatic local herbs.
5. HARI SOUP — PKR 750 — Local barley, handmade laksha (noodles), halize (fermented grains), and mixed mountain herbs. Slow-cooked over an open fire.
6. SHIRIJOON SOUP — PKR 2,000 — A rich and earthy mountain delicacy made with wild morel mushrooms. Slow-cooked with golden onions and fresh cream.

**From the Mountain Pod**
7. HOT & SOUR — PKR 500 — A classic combination of spicy heat and tangy kick. Made with a rich broth, local mountain vegetables and free-range chicken.

**Mountain Greens**
8. Hari Ka Biranze Salad — PKR 600 — Made with hari (local barley) and biranze (mulberry), toasted with onions, tomatoes, and cucumber in a honey-apple cider vinaigrette.
9. Fresh Garden Salad — PKR 400 — A vibrant celebration of freshness, crafted with local mountain vegetables.

**Bite Before the Peak**
10. Mountain Yak Karahi — 1 kg — PKR 3,000 — A traditional karahi made with tender cuts of locally raised yak meat, slow-cooked in fresh mountain tomatoes, halizi (turmeric), and gawkomaricho (black pepper). Served with fresh seasonal salad and warm local roti.
11. Pasture Mutton — 1 kg — PKR 3,500 — Tender pasture-raised mutton, slow-cooked in traditional mountain spices. Served with fresh seasonal salad and warm local roti.
12. Free Range Chicken — 1 kg — PKR 2,700 — Locally raised free-range chicken, cooked in traditional mountain spices. Served with fresh seasonal salad and warm local roti.

**Orders**
13. CHICKEN CORN SOUP — PKR 450 — A comforting classic soup with tender chicken and sweet corn in a savory broth.
14. BALLING KHAM — PKR 3,200 — A hearty traditional highland dish.
15. CHAP ZA LAKSHA — Price to be confirmed — A traditional dish featuring laksha noodles with chap (meat) in a rich, flavorful broth.

**Glacier Flow Beverages**
16. Chamuse — PKR 500 — A pure and refreshing drink made from sun-dried local apricots and crystal-clear mountain water.
17. Peak Fruit Fizz — PKR 500 — Fresh mountain apricots muddled with wild local herbs, sparkling mountain ice water, and a touch of homeland honey, served over crushed ice.
18. Season's Essence — PKR 600 — A refreshing blend crafted from the freshest fruits of the season.
19. Lemon Peak Spark — PKR 300 — A refreshing burst of mountain-grown mint, zesty ginger, fresh lemon, and a dash of local honey, lightly sparkling with mountain soda water.
20. Soft Drinks — PKR 150
21. Small Water — PKR 100
22. Large Water — PKR 100

**Peak Warmth**
23. Cappuccino — PKR 400
24. Americano — PKR 300
25. Espresso — PKR 300
26. Latte — PKR 400
27. Rose Petal Tea — PKR 200
28. Mountain Tea — PKR 150
29. Honey Tea — PKR 250
30. Matka Chai — PKR 250
31. Dhood Patti Chai — PKR 250

**Highlanders Snacks**
32. HIGHLAND YAK BURGER — PKR 1,300 — Featuring a juicy yak meat patty, grilled to perfection and layered with caramelized onions, melted cheese, and fresh local greens. Served in a soft toasted bun with a side of crispy homeland-style potato wedges.
33. ZINGER CRUNCH BURGER — PKR 1,150 — A deep-fried chicken fillet, marinated in bold seasonings. Layered with fresh lettuce, creamy garlic mayo, served in a soft toasted bun.
34. CRISPY CLUCK — PKR 1,450 — Juicy, tender pieces of free-range chicken, marinated in house spices and double-crisped. Served hot alongside homeland potato wedges.
35. WALNUT DIP — Price to be confirmed — A rich, creamy dip made from locally sourced walnuts, blended with mountain herbs.
36. HOMELAND POTATO FRIES — PKR 550 — Crispy golden fries made from local potatoes, seasoned with mountain herbs.
37. HOMELAND POTATO CHILI FRIES — PKR 750 — Crispy fries loaded with rich chili, melted cheese, and handpicked herbs. Served with garlic mayo.

**From the Mountain Wok**
38. Mountain Yak Chili Dry — PKR 1,300 — Tender strips of yak meat, stir-fried with fresh chilies, garlic, and onions in a smoky, spicy glaze. Served with classic egg fried rice.
39. Sweet & Sour Chicken — PKR 1,500 — Tender free-range chicken, stir-fried with local vegetables and glazed in a tangy-sweet & sour sauce. Served with fragrant steamed rice.

**Mountain Feast**
40. Grilled Beef Steak — PKR 3,000 — Tender yak meat, marinated in fresh onion juice and a blend of local herbs, flame-grilled for a rich, smoky flavor. Served with creamy mashed potatoes and finished with a traditional gakowmarcho sauce.

#### 3.9.2 Menu Images Sub-page (Option 2 — Image Cards)
- **URL:** /menu/images
- **H1 heading (SEO-optimized):** Our Menu — Hunza Food & Local Dishes
- Displays uploaded menu images as full cards — no cropping
- A **Reserve Now** button at the bottom of each image card navigates to the Reservation Page
- Menu images:
  - file name: WhatsApp Image 2026-03-30 at 10.31.08 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjuheyo.jpeg — alt: 「Hunza food menu at Leopard Cave Restaurant」
  - file name: WhatsApp Image 2026-03-30 at 10.41.40 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjuhla8.jpeg — alt: 「Local food menu in Hunza Valley」
  - file name: WhatsApp Image 2026-03-30 at 10.41.40 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39frlksu8.jpeg — alt: 「Traditional Hunza dishes menu」
  - file name: WhatsApp Image 2026-03-30 at 10.41.41 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjugpog.jpeg — alt: 「Best food in Hunza restaurant menu」
  - file name: WhatsApp Image 2026-03-30 at 10.41.42 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-amj39vjugd1c.jpeg — alt: 「Hunza traditional food menu Leopard Cave」

### 3.10 Gallery Page (Images & Reels/Videos — Two Separate Sub-pages)
- Two clearly distinct tabs: Images (default) and Reels/Videos

#### 3.10.1 Images Sub-page
- **H1 heading (SEO-optimized):** Explore Our Space — Best Restaurant Views in Hunza
- **Intro Text:** Discover the beauty of Leopard Cave Restaurant, where every corner offers a scenic view of Attabad Lake, combined with a warm and inviting dining atmosphere. One of the best places to eat in Hunza Valley.
- Grid layout displaying nine images (same list as Homepage Gallery section, with same alt text as specified in Section 3.8)
- Note: The slideshow-only image (file-akxu72ukunsw.jpeg) must NOT appear on this sub-page.

#### 3.10.2 Reels/Videos Sub-page
- **H1 heading (SEO-optimized):** Our Reels — Hunza Food & Attabad Lake Dining Experience
- **Intro Text:** Watch our latest reels and experience the beauty of Leopard Cave Restaurant — the best restaurant in Hunza — in motion.
- All eight videos displayed in a clean grid or row layout:
  - Video 1 — file name: WhatsApp Video 2026-03-30 at 10.55.19 P.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami98mm4ey2o.mp4
  - Video 2 — file name: WhatsApp Video 2026-03-30 at 10.55.19 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9atjcwyrk.mp4
  - Video 3 — file name: WhatsApp Video 2026-03-30 at 10.55.24 .mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9b9bltekg.mp4
  - Video 4 — file name: WhatsApp Video 2026-03-30 at 10.55.24 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9c4w3ma68.mp4
  - Video 5 — file name: WhatsApp Video 2026-03-30 at 10.58.44 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260331/file-ami9gyitjabk.mp4
  - Video 6 — file name: WhatsApp Video 2026-04-01 at 7.41.50 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0pk0xvdbsw.mp4
  - Video 7 — file name: WhatsApp Video 2026-04-01 at 7.44.01 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0qt6rc78qo.mp4
  - Video 8 — file name: WhatsApp Video 2026-04-01 at 7.44.29 PM.mp4, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao0qtmjl416o.mp4
- Each video: inline player with standard controls, no download button, no autoplay, fullscreen fix applied, single-video playback rule enforced
- **Auto-pause on scroll:** Each video automatically pauses when scrolled out of the visible viewport (see Section 3.6); must work on both mobile and desktop
- Sub-page designed to accommodate additional videos in the future

### 3.11 Reservation Page (Premium Redesign — Two Tabs)

#### 3.11.0 Tab Structure (Updated)
- The Reservation Page is divided into two top-level tabs displayed as prominent buttons at the top of the page:
  - **Restaurant** (Tab 1 — default)
  - **Resort** (Tab 2)
- **Default behavior:** When the Reservation Page is opened (from any link or navigation), the Restaurant tab is automatically active and its content is displayed. The Resort tab button is visible but its content is not shown until the user clicks it.
- **Tab switching:** Clicking the Resort tab button activates the Resort tab and displays its content. Clicking the Restaurant tab button returns to the Restaurant content. Switching between tabs is smooth (e.g., fade or instant swap with no page reload).
- Both tab buttons are always visible at the top of the Reservation Page regardless of which tab is active.
- The active tab button is visually distinguished (e.g., highlighted, underlined, or filled) from the inactive tab button, consistent with the site's dark cave-inspired theme.
- Fully responsive on both mobile and desktop.

#### 3.11.1 Restaurant Tab (Default)
- **Overall Design:** Card-based layout with clean spacing, soft shadows, rounded corners, modern fonts
- **H1 heading (SEO-optimized):** Reserve Your Table — Best Restaurant in Hunza at Attabad Lake
- **Intro Text:** Book your table at Leopard Cave Restaurant and enjoy a memorable lunch or dinner with a breathtaking view of Attabad Lake. One of the best places to eat in Hunza Valley.
- **URL Parameter Handling (Updated):** On page load, the Reservation Page reads the URL query parameter(s) for item(s). If one or more valid item names matching entries in the predefined menu item list are found, those items are automatically pre-selected in the Pre-Order Food Items multi-select dropdown, each with a default quantity of 1. This pre-selection must work correctly on both mobile and desktop. Item name matching is case-insensitive and trims whitespace for robustness.
- **Advance Payment Policy Notice:** Displayed prominently above the form in a highlighted box with an info/warning icon. Text: If you reserve a table or place a food order in advance, you will be required to pay 40% of the total bill as an advance payment.
- **Section 1 — Guest Details:** Full Name (required), Phone Number (required)
- **Section 2 — Reservation Details:** Date (date picker, required), Time (time picker, required), Number of Guests (number input, required)
- **Section 3 — Pre-Order Food Items (Required):** Controlled multi-select dropdown with search; the predefined menu item list must include ALL 40 menu items listed in Section 3.9.1 across all categories; availability indicator per item; quantity +/- controls; at least one item required before submission. The complete predefined list is:
  1. BURUSH SHAPICK
  2. CHAP SHUROO
  3. CHICKEN DEROO
  4. DAWDO SOUP
  5. HARI SOUP
  6. SHIRIJOON SOUP
  7. HOT & SOUR
  8. Hari Ka Biranze Salad
  9. Fresh Garden Salad
  10. Mountain Yak Karahi
  11. Pasture Mutton
  12. Free Range Chicken
  13. CHICKEN CORN SOUP
  14. BALLING KHAM
  15. CHAP ZA LAKSHA
  16. Chamuse
  17. Peak Fruit Fizz
  18. Season's Essence
  19. Lemon Peak Spark
  20. Soft Drinks
  21. Small Water
  22. Large Water
  23. Cappuccino
  24. Americano
  25. Espresso
  26. Latte
  27. Rose Petal Tea
  28. Mountain Tea
  29. Honey Tea
  30. Matka Chai
  31. Dhood Patti Chai
  32. HIGHLAND YAK BURGER
  33. ZINGER CRUNCH BURGER
  34. CRISPY CLUCK
  35. WALNUT DIP
  36. HOMELAND POTATO FRIES
  37. HOMELAND POTATO CHILI FRIES
  38. Mountain Yak Chili Dry
  39. Sweet & Sour Chicken
  40. Grilled Beef Steak
- **Section 4 — Dynamic Billing Table:** Updates in real time; columns: Item Name | Quantity | Unit Price | Total; Subtotal and Total summary lines; items with no confirmed price (CHAP ZA LAKSHA, WALNUT DIP) show a note and are excluded from numeric total; styled as a clean invoice/receipt; **Print / Preview Bill** button below the table
- **Section 5 — Special Request:** One textarea field, optional
- **Section 6 — Payment Method:** Three selectable options:
  - JazzCash: Account Number: 03160605535; QR Code: file name: WhatsApp Image 2026-03-31 at 11.53.52 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ancjy90b0q9s.jpeg
  - Easypaisa: Account Number: 03160605535; QR Code: file name: WhatsApp Image 2026-03-31 at 11.52.58 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anck7ghhyh34.jpeg
  - Crypto (USDT – TRC20): Wallet Address: TEbBbx5NQXJoUZrpPaaAM39919SpbYCb47; QR Code: file name: WhatsApp Image 2026-03-31 at 11.51.56 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anckgnyov5z4.jpeg; Notice: Send only USDT via TRC20 network.
  - Payment confirmation instruction: After completing the payment, please send a screenshot of the transaction to our WhatsApp number or email address for confirmation.
- **Section 7 — Submission Channel:** Send via WhatsApp (03160605535) or Send via Gmail (Leopardcaverestaurantofficial@gmail.com); user must select one
- **Submit button:** Confirm Reservation — disabled if any required field is empty, no food item selected, no payment method selected, or no submission channel selected; on submission opens WhatsApp or mailto pre-filled with structured reservation message; confirmation message displayed; reservation data stored in backend database

#### 3.11.2 Resort Tab
- **Activation:** The Resort tab content is displayed only when the user clicks the Resort tab button. It is not shown by default.
- The Resort tab contains two clearly distinct sub-sections displayed vertically in order:

**Sub-section A — Camping Booking**
- Heading: Camping at Leopard Cave
- Displays camp booking details prominently:
  - 1 Tent = Maximum 3 people
  - Price per tent per night = PKR 3,000
- **Reserve Now Button — Maintenance Popup Behavior:**
  - Clicking the Reserve Now button does NOT open any reservation form.
  - Instead, a bottom notification popup slides up from the bottom of the screen:
    - **Popup Message:** Currently, camping services are not available due to maintenance.
    - **WhatsApp Button inside popup:** Labeled Contact Us on WhatsApp — clicking this button opens WhatsApp chat to 03160605535.
    - **Close Button:** A clearly visible close (X) button or tap-outside-to-dismiss behavior is provided.
    - **Auto-dismiss:** The popup may auto-dismiss after 8–10 seconds OR remain until the user manually closes it.
    - **Animation:** The popup slides up from the bottom of the screen (mobile-friendly slide-up animation using CSS transform translateY).
    - **Design:** Clean, modern design consistent with the site's dark cave-inspired theme; not an error screen or harsh alert.
    - **Responsive:** Works correctly on both mobile and desktop.
  - No reservation form is rendered or accessible while the maintenance popup behavior is active.

**Sub-section B — Leopard Resort (Coming Soon)**
- Heading: Leopard Resort
- **Status:** Coming Soon
- Prominent Coming Soon notice displayed as a visually styled banner or card
- Content: Construction has not yet started. The resort is currently in planning. Check back soon for updates.
- No booking or reservation functionality present

### 3.12 Nearby Places Page
- **H1 heading (SEO-optimized):** Explore Nearby Attractions — Best Places in Hunza Near Attabad Lake
- **Intro Text:** Located near the iconic Attabad Lake, our restaurant gives you easy access to one of the most beautiful tourist destinations in Gilgit Baltistan. Discover the best places in Hunza Valley right from our doorstep.
- Three attraction entries:
  1. **Attabad Lake** — Photo: file name: WhatsApp Image 2026-04-01 at 12.25.33 AM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-and83pylunls.jpeg — alt: 「Attabad Lake best places in Hunza Gilgit Baltistan」 — Description: Enjoy the beautiful views of Attabad Lake with your family. From our restaurant, you can see stunning vistas and enjoy boating on the lake.
  2. **Passu Cones** — Photo: file name: WhatsApp Image 2026-04-01 at 12.25.33 AM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-and8hba9tbeo.jpeg — alt: 「Passu Cones best places to visit in Gilgit Baltistan」 — Description: Only 30 minutes by car from here, the scenic Passu Cones route is perfect for sightseeing and enjoying the natural beauty of the area.
  3. **Baskochi Meadows (Special Featured Section)** — Visually distinct and more prominent than standard cards; Background Image: file name: WhatsApp Image 2026-03-30 at 2.29.36 AM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-anzpaa9jyn0g.jpeg — alt: 「Baskochi Meadows best places in Hunza Valley」; semi-transparent dark overlay for text readability; Description: Explore Baskochi Meadows on a natural and secure track that starts right from our restaurant. This 40-minute route is enjoyable, safe, and perfect for nature lovers. Along the way, you can see the Baskochi Waterfall and reach the Baskochi Viewpoint. If you wish to go further, you can take a guide and hike to Goush Meadows from Leopard Caves Restaurant. This hike takes about 1.5–2 hours and offers stunning views of Attabad Lake and Upper Gojal valley.
- Hussaini Suspension Bridge and Gardu-Borok Lake are not included.

### 3.13 Location Page
- **H1 heading (SEO-optimized):** Find Us — Best Restaurant in Hunza at Attabad Lake
- **Text:** Leopard Cave Restaurant is located above the breathtaking Attabad Lake, offering one of the most scenic dining locations in Gilgit Baltistan. If you are searching for the best restaurant in Karimabad Hunza or restaurants at Attabad Lake, you have found us.
- Embedded interactive map (coordinates: approximately 36.3167° N, 74.8667° E); live, zoomable, navigable, with directions
- Address: Baskochi Trek Ainabad Gojal Hunza Gilgit Baltistan Pakistan
- Phone: 03160605535
- Email: leopardcaverestaurantofficial@gmail.com
- Opening Hours: 8:00 AM – 12:00 AM

### 3.14 About Us Page
- **H1 heading (SEO-optimized):** Our Story — Leopard Cave Restaurant, Best Restaurant in Hunza

#### 3.14.1 Our Story Section
- Top Image: file name: WhatsApp Image 2026-03-26 at 11.57.39 AM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkjksg.jpeg — alt: 「Leopard Cave Restaurant story — best restaurant in Hunza Valley」
- Story Text: Before 2008, prior to the Attabad disaster, the village of Ayeenabad was a beautiful and lush green valley. More than 70–80 families lived there peacefully as one united community. However, in 2008, the Attabad disaster changed everything. The entire village was submerged under what is now known as Attabad Lake. While it was a tragic event, it also gave rise to one of the most breathtaking natural lakes in the region. Today, the local community has rebuilt their lives around this lake, earning their livelihood through tourism, boating, and hospitality. Leopard Cave Restaurant is one such local initiative, located right above Attabad Lake. Our goal is to provide a unique dining experience where guests can enjoy local Hunza food, Pakistani, and international cuisine while taking in the stunning views of the lake. We aim to create a natural, peaceful, and beautiful environment, while also promoting the local culture and traditional food of the Hunza region.

#### 3.14.2 Experience Sub-sections (Updated Background Images)
The About Us page includes four experience sub-sections below the Our Story section. Each sub-section uses a background image sourced exclusively from the real uploaded website images/gallery. AI-generated images are strictly prohibited. Each background image must be properly fitted (object-fit: cover, no distortion or awkward cropping), fully responsive on both mobile and desktop, and overlaid with a semi-transparent dark gradient to ensure text readability.

- **Unforgettable Moments**
  - Description: Every visit to Leopard Cave Restaurant is a memory to cherish — from the breathtaking views to the warmth of our hospitality.
  - Background image: file name: WhatsApp Image 2026-03-27 at 10.29.28 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl27ls.jpeg — alt: 「Unforgettable dining moments at Leopard Cave Restaurant Hunza」

- **Natural Beauty**
  - Description: Surrounded by the majestic mountains and the turquoise waters of Attabad Lake, our restaurant is set in one of the most breathtaking natural landscapes in Pakistan.
  - Background image: file name: Rustic hillside restaurant at sunset.png, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxqj3o5mj9c.png — alt: 「Natural beauty at Attabad Lake Hunza Valley Leopard Cave Restaurant」

- **Cultural Heritage**
  - Description: We celebrate the rich traditions and cultural heritage of the Hunza Valley through our food, our space, and our stories.
  - Background image: file name: WhatsApp Image 2026-03-27 at 10.27.58 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260329/file-akxcbezm1x4w.jpeg — alt: 「Cultural heritage of Hunza Valley at Leopard Cave Restaurant」

- **Exceptional Service**
  - Description: From the moment you arrive to the moment you leave, our team is dedicated to providing you with the finest service and a truly memorable experience.
  - Background image: file name: WhatsApp Image 2026-03-27 at 10.29.29 PM.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260330/file-alt9l5yl2ww0.jpeg — alt: 「Exceptional service and hospitality at best restaurant in Hunza」

#### 3.14.3 Join Us at The Cave Section
- Standard call-to-action invitation text
- Bottom Image: file name: WhatsApp Image 2026-03-27 at 6.28.51 PM (1).jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-ao01ejzkivi8.jpeg — alt: 「Join us at Leopard Cave Restaurant best place to eat in Hunza」
- Both images (Our Story top image and Join Us bottom image) fully visible without cropping

### 3.15 Blogs Page
- **Navigation:** Accessible from the navigation bar as 「Blogs」, positioned after About Us in the nav order.
- Two clearly distinct sub-sections accessible via tabs or toggles: Blogs and Social Media

#### 3.15.1 Blogs Sub-section
- **H1 heading (SEO-optimized):** Our Blog — Hunza Food, Culture & Travel Stories
- **Intro Text:** Stories, history, and insights from Leopard Cave Restaurant and the beautiful Hunza Valley. Explore traditional Hunza food, local culture, and the best places in Gilgit Baltistan.
- Blog articles displayed as cards with title, short excerpt, and a Read More button
- Clicking Read More opens the full dedicated blog article page
- **Image Policy for All Blogs:** Only user-uploaded images are used for blog articles. AI-generated images are strictly prohibited. If no user-uploaded image is available for a particular blog, the image area is left blank or displays a neutral placeholder.
- **Reserve Now Button on Food Blogs:** Every dedicated food blog article page includes a prominent Reserve Now button that links to the Reservation Page.
- **Hashtag Footer (All Blog Articles):** Each blog article page includes a hashtag section at the bottom: #HunzaFood #AttabadLake #HunzaValley #BestRestaurantHunza #GilgitBaltistan #TravelHunza #HunzaCuisine

**Blog articles (in order):**

**Blog 1: About the History of Attabad Lake**
- SEO Title Tag: About the History of Attabad Lake | Hunza Valley Travel Guide
- SEO Meta Description: Learn about the history of Attabad Lake — its formation after the 2010 landslide, the submerged village of Ayeenabad, and how it became one of Pakistan's most iconic tourist destinations in Gilgit Baltistan.
- Title: About the History of Attabad Lake
- Featured Image: file name: images (2).jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrpvdkxr7k.jpg — alt: 「History of Attabad Lake Hunza Valley Gilgit Baltistan」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image. Display the image as the cover/header image of the article with proper fitting (object-fit: cover or contain as appropriate), no awkward cropping, and fully responsive on both mobile and desktop.
- Content: A detailed article covering the history of Attabad Lake — its formation following the 2010 landslide disaster in Hunza, the submergence of the village of Ayeenabad, the displacement of local communities, and the subsequent transformation of the area into one of Pakistan's most iconic tourist destinations. The article highlights the resilience of the local people, the natural beauty of the lake, and its significance for tourism and the regional economy. SEO-friendly headings and naturally integrated keywords.
- No Reserve Now button on this article.

**Blog 2: Culture of Hunza Valley**
- SEO Title Tag: Culture of Hunza Valley | Traditions, Festivals & Heritage of Hunza
- SEO Meta Description: Explore the vibrant culture of Hunza Valley — its traditions, festivals, music, dance, and the warm hospitality of the Burusho people. Discover the unique cultural heritage of Gilgit Baltistan.
- Title: Culture of Hunza Valley
- Featured Image: file name: 56d36c2830a9b.jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-apmrwg5agikg.jpg — alt: 「Culture of Hunza Valley traditions and heritage Gilgit Baltistan」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image. Display the image as the cover/header image of the article with proper fitting, no awkward cropping, and fully responsive on both mobile and desktop.
- Content: A rich article covering the vibrant culture of the Hunza Valley — its traditions, festivals, music, dance, traditional clothing, and the warm hospitality of the Burusho people. SEO-friendly headings and naturally integrated keywords.
- No Reserve Now button on this article.

**Blog 3: Burush Shapik**
- SEO Title Tag: Burush Shapik — Traditional Hunza Flatbread | Local Food in Hunza
- SEO Meta Description: Discover Burush Shapik, the iconic traditional flatbread of Hunza Valley. Learn about its ingredients, preparation, and cultural significance as a staple of local Hunza food.
- Title: Burush Shapik — The Iconic Flatbread of Hunza
- Featured Image: file name: Burus-Berikux-1024x683.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0on1oy73ls.jpeg — alt: 「Burush Shapik traditional Hunza flatbread local food in Hunza」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image.
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 4: Chapshurou**
- SEO Title Tag: Chapshurou — Hunza's Beloved Stuffed Bread | Traditional Hunza Food
- SEO Meta Description: Learn about Chapshurou, one of the most beloved traditional dishes of Hunza — a stuffed flatbread filled with seasoned yak meat. A must-try Hunza traditional food.
- Title: Chapshurou — Hunza's Beloved Stuffed Bread
- Featured Image: file name: foods-s-chapshuru2506577647222476830-1-1024x683.jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0peo4iyeio.jpg — alt: 「Chapshurou traditional Hunza stuffed bread local food Hunza Valley」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image.
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 5: Mulida**
- SEO Title Tag: Mulida — Traditional Hunza Comfort Food | Local Dishes of Hunza
- SEO Meta Description: Discover Mulida, a traditional Hunza comfort dish made from crumbled bread, mountain butter, and wild honey. One of the most cherished local dishes of Hunza Valley.
- Title: Mulida — A Traditional Hunza Comfort Dish
- Featured Image: file name: images.jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0prtnxzqww.jpg — alt: 「Mulida traditional Hunza comfort food local dishes of Hunza」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image.
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 6: Giyalin**
- SEO Title Tag: Giyalin — Ancient Thin Bread of Hunza | Hunza Traditional Food
- SEO Meta Description: Explore Giyalin, one of the oldest traditional breads of Hunza Valley — a thin, crispy flatbread made from buckwheat. A unique piece of Hunza traditional food culture.
- Title: Giyalin — The Ancient Thin Bread of Hunza
- Featured Image: file name: images (1).jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0qne5qvcow.jpg — alt: 「Giyalin ancient thin bread Hunza traditional food Gilgit Baltistan」
- Image usage rule: Use only the user-uploaded image above. Do not use any AI-generated image.
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 7: Dawdo Soup**
- SEO Title Tag: Dawdo Soup — Traditional Hunza Noodle Soup | Local Food in Hunza
- SEO Meta Description: Learn about Dawdo Soup, a nourishing traditional Hunza soup made with handmade noodles and mountain yak meat. One of the most beloved local dishes of Hunza Valley.
- Title: Dawdo Soup — A Nourishing Highland Broth of Hunza
- Featured Image: None (no user-uploaded image provided; image area left blank or neutral placeholder — no AI-generated image used)
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 8: Hari Soup**
- SEO Title Tag: Hari Soup — Smoky Barley Soup of Hunza | Hunza Traditional Food
- SEO Meta Description: Discover Hari Soup, a deeply traditional Hunza barley soup slow-cooked over an open fire. A warming and iconic piece of Hunza traditional food from the highlands of Gilgit Baltistan.
- Title: Hari Soup — The Smoky Barley Soup of the Hunza Highlands
- Featured Image: None (no user-uploaded image provided; image area left blank or neutral placeholder — no AI-generated image used)
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

**Blog 9: Diram Phitti**
- SEO Title Tag: Diram Phitti — Hunza's Traditional Walnut Pancake | Local Hunza Food
- SEO Meta Description: Explore Diram Phitti, a traditional Hunza pancake made with buckwheat flour and topped with crushed walnuts and wild honey. A beloved sweet treat and local Hunza food classic.
- Title: Diram Phitti — Hunza's Traditional Walnut Pancake
- Featured Image: None (no user-uploaded image provided; image area left blank or neutral placeholder — no AI-generated image used)
- Content structure: Introduction, Ingredients, Preparation Steps, Cultural Significance. SEO-friendly headings and naturally integrated keywords.
- Reserve Now button at the bottom of the article, linking to the Reservation Page.

- Blog section is extensible — new articles are appended as new cards

#### 3.15.2 Social Media Sub-section
- **Heading:** Follow Us
- **Intro Text:** Stay connected with Leopard Cave Restaurant on social media for the latest updates, reels, and stories about the best food in Hunza and Attabad Lake.
- Three social media accounts as prominent cards or link buttons:
  - Facebook: https://www.facebook.com/profile.php?id=61582236326778 — opens in a new tab
  - Instagram: https://www.instagram.com/leopard.cave.restaurant?igsh=MXZ0eWtsN3NoMW1zaQ== — opens in a new tab
  - TikTok: https://www.tiktok.com/@leopard.cave.restaurant?_r=1&_t=ZS-954evnj7xI8 — opens in a new tab

### 3.16 Resort Page
- **Navigation:** Accessible from the navigation bar as 「Resort」, positioned after Blogs in the nav order.
- Two clearly distinct sub-sections accessible via tabs or toggles: Campaigns and Resort

#### 3.16.1 Campaigns Sub-section (Updated)
- **Heading:** Campaigns
- **Intro Text:** Explore our available campaigns and book your spot for an unforgettable experience at Leopard Cave — one of the best places in Hunza.
- Default campaign card:
  - Title: Leopard Cave Campaign
  - Description: Join us for an exclusive campaign experience at Leopard Cave Restaurant, surrounded by the breathtaking scenery of Attabad Lake and Baskochi Meadows. Limited spots available — book now to secure your place.
  - Reserve Now button — see behavior below

**Camp Booking Details (Displayed in Campaigns Sub-section):**
- The following camp/tent pricing and capacity rules are displayed clearly within the Campaigns sub-section and within the campaign card:
  - 1 Tent = Maximum 3 people
  - Price per tent per night = PKR 3,000
- This information is shown prominently in the campaign card description and/or in a dedicated info block within the section, so visitors can see the pricing and capacity before attempting to book.

**Reserve Now Button — Maintenance Popup Behavior (Updated):**
- Clicking the Reserve Now button on any campaign card does NOT open the Campaign Reservation Form and does NOT proceed to any actual reservation flow.
- Instead, a bottom notification popup slides up from the bottom of the screen with the following behavior:
  - **Popup Message:** Currently, camping services are not available due to maintenance.
  - **WhatsApp Button inside popup:** Labeled Contact Us on WhatsApp — clicking this button opens WhatsApp chat to 03160605535.
  - **Close Button:** A clearly visible close (X) button or tap-outside-to-dismiss behavior is provided.
  - **Auto-dismiss:** The popup may auto-dismiss after a reasonable timeout (e.g., 8–10 seconds) OR remain until the user manually closes it — either approach is acceptable.
  - **Animation:** The popup slides up from the bottom of the screen (mobile-friendly slide-up animation using CSS transform translateY).
  - **Design:** Clean, modern design consistent with the site's dark cave-inspired theme; not an error screen or harsh alert.
  - **Responsive:** Works correctly on both mobile and desktop.
- The Campaign Reservation Form is not rendered or accessible while the maintenance popup behavior is active.

#### 3.16.2 Resort Sub-section
- **Heading:** Resort
- **Status:** Coming Soon
- Prominent Coming Soon notice displayed as a visually styled banner or card
- Content: Construction has not yet started. The resort is currently in planning. Check back soon for updates.
- No booking or reservation functionality present

---

## 4. Business Rules & Logic
- **Logo placement rule (global):** The official Leopard Cave Restaurant logo must appear consistently in: (1) Navigation bar header; (2) Browser tab favicon; (3) Page title area.
- **Scroll-to-top on page load (global):** Every page always loads from the very top on every fresh open or navigation event.
- **Video download permanently disabled (global):** Download button and download option completely removed from all video players across the entire site.
- **Auto-pause on scroll rule (global):** All video players use the Intersection Observer API. When a playing video is scrolled out of view, it is automatically paused. Applies on both mobile (iOS Safari, Android Chrome) and desktop. Observer configured with threshold: 0 and rootMargin: '0px'. Additive to the single-video playback rule.
- **Featured video auto-play with auto-unmute on scroll into view rule (Updated):** When the featured video on the Home Page scrolls into the visible viewport, it automatically begins playing AND is automatically unmuted (sound ON). The video must not remain muted when entering the viewport. If browser autoplay restrictions block unmuted autoplay, the video plays unmuted after the first user interaction on the page (click, scroll, or tap) as a fallback. Implementation uses Intersection Observer API: on intersection enter, set videoElement.muted = false and call videoElement.play(); on intersection exit, call videoElement.pause() and set videoElement.muted = true.
- **Featured video auto-pause and auto-mute on scroll out of view rule (Updated):** When the featured video is playing and the user scrolls it out of the visible viewport, it automatically pauses AND is muted. Audio must not continue when the video is off-screen.
- **Global back button rule:** A fixed/sticky back button (← arrow) is present on every page of the website. It is always visible regardless of scroll position, positioned at the top-left corner of the screen. It navigates to the previous page in browser history (window.history.back()). On the Home Page with no prior history, the button is hidden or disabled gracefully. The button is touch-friendly, accessible on all screen sizes, and rendered with sufficient z-index to remain above all other page elements. It is consistent with the restaurant's dark cave-inspired theme and includes a hover effect.
- **View More Videos page back button rule:** The Gallery Reels/Videos sub-page (reached via the View More button on the Home Page) displays a fixed/sticky back button (← arrow) that navigates back to the Home Page. Always visible on scroll, on both mobile and desktop.
- **About Us experience sub-sections background image rule:** The four experience sub-sections on the About Us page use only real uploaded website images as background images. AI-generated images are strictly prohibited. Each image is applied with object-fit: cover, no distortion or awkward cropping, fully responsive on both mobile and desktop, and overlaid with a semi-transparent dark gradient for text readability.
- **Menu navigation rule (Updated):** Clicking the Menu button in the navigation bar navigates to the Menu Landing Page (/menu). The Menu button must be fully functional on both mobile and desktop. There is no dropdown from the navigation bar. The Menu Landing Page displays a cover image, a search box, and two buttons: View Menu Cards and View Menu Images. This flow applies on both mobile and desktop.
- **Menu Landing Page search rule (New):** A search input box is present at the top of the Menu Landing Page. As the user types, matching items from the full 40-item menu list are shown in real time (case-insensitive, partial match). Non-matching items are hidden. If no items match, a no results message is displayed. Clearing the input restores the default page state.
- **Menu Cards sub-page search rule (New):** A search input box is present at the top of the Menu Cards sub-page. As the user types, matching menu item cards are shown in real time (case-insensitive, partial match). Non-matching cards are hidden. If no items match, a no results message is displayed. Clearing the input restores all cards.
- **Hero section title/description fade-out rule:** The title (H1), subheading (H2), and tagline in the hero section fade out after 5 seconds using a smooth CSS opacity transition. The fade-out applies only to the title, subheading, and tagline. It does NOT affect the Menu button, Reserve Table button, or any other interactive element on the page.
- **Hero section mobile centering rule (Updated):** On mobile screens, the title, subheading, and tagline are centered both horizontally and vertically within the hero section viewport — true full centering in all directions including from the bottom. The hero container on mobile uses display: flex with justify-content: center and align-items: center, or equivalent absolute centering with transform. The text block is positioned at the exact visual center of the background slideshow image. The hero container on mobile has a defined height (e.g., 100vh) to enable vertical centering. Text alignment is centered. This applies only on mobile (max-width: 768px or equivalent); desktop layout is unchanged.
- **Hero section buttons permanent visibility rule (Updated):** The Menu button and Reserve Table button on the Home Page hero section are visible immediately when the page loads and remain permanently visible at all times — including after the title/description/tagline have faded out. The buttons are never affected by the fade-out animation. They are clearly visible, properly spaced, and styled as real clickable buttons on both mobile and desktop.
- **Hero section mobile typography rule (Updated):** The title and description text in the hero section are specifically optimized for mobile screens. Title font size is reduced to a smaller but still prominent responsive size (e.g., clamp-based, approximately 1.6rem–2rem on small screens). Description font size is reduced to a balanced, readable size (e.g., 0.9rem–1.1rem) with line-height of 1.5–1.7. Text alignment is centered on mobile. A clean, modern font is used with proper typographic hierarchy. Sufficient spacing between text elements prevents cramped appearance. All text wraps gracefully. Desktop typography remains mostly unchanged.
- **Reservation Page tab structure rule:** The Reservation Page contains two top-level tabs: Restaurant (default, opens automatically) and Resort. Both tab buttons are always visible at the top of the page. The Restaurant tab content is shown by default on page open. The Resort tab content is shown only when the user clicks the Resort tab button. Switching between tabs is smooth with no page reload. The active tab is visually distinguished.
- **Reservation Resort tab content rule:** The Resort tab within the Reservation Page contains two sub-sections displayed vertically: (A) Camping Booking — showing camp pricing and capacity details with a Reserve Now button that triggers the maintenance slide-up popup; (B) Leopard Resort Coming Soon — displaying a Coming Soon notice with no booking functionality.
- **Menu item confirmation popup rule:** Clicking the Reserve a Table button on any menu card on the Menu Cards sub-page does NOT immediately redirect to the Reservation Page. A confirmation popup (modal) is displayed with the message: Do you want to proceed to reservation or add more items? The popup contains three buttons: Add More Items, Go to Reservation, Cancel / Close.
- **Multi-item cart rule:** Users can select multiple items from the Menu Cards page before proceeding to reservation. Selected items are stored in component state or localStorage. A visible cart indicator is shown. When the user proceeds to reservation, all selected items are passed and pre-filled in the Pre-Order Food Items dropdown.
- **Menu item pre-selection rule (Updated):** All selected items are passed as URL query parameters or via state. The Reservation Page reads these on load and pre-selects all matching items. Single-item pre-selection via URL query parameter remains supported. Matching is case-insensitive and trims whitespace.
- **Pre-Order Food Items complete list rule:** The Pre-Order Food Items dropdown on the Reservation Page must include all 40 menu items listed in Section 3.9.1.
- **Loading screen rule:** The branded loading screen with the Leopard Cave Restaurant logo and continuous fade-in/fade-out animation is displayed until the website fully loads. It then fades out smoothly.
- **Favicon rule:** The browser tab icon displays the Leopard Cave Restaurant official logo. The default favicon is removed. Multiple favicon formats provided for cross-browser compatibility.
- **SEO rule (updated):** All pages include unique, keyword-rich title tags and meta descriptions. Global homepage meta title: Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake. Headings use proper H1/H2/H3 hierarchy. All images include descriptive alt text. Clean, keyword-friendly URL structure applied. Hashtags included in blog article footers and social media integration sections.
- **Promotional popup rule:** Appears on Home Page only, 10 seconds after page loads. Auto-dismisses after 15–20 seconds. Visible close (X) button. Links to https://futurenaire.netlify.app/ in a new tab. Fully responsive.
- **Navigation bar naming rule:** Links in order: Home, Menu, Gallery, Reservation, Nearby Places, Location, About Us, Blogs, Resort, Book Now.
- **Slideshow auto-slide speed rule:** Transitions every 1 second with smooth crossfade (approximately 300–500ms). Runs continuously on both mobile and desktop.
- **Slideshow sidebar color rule:** Image 1 retains original black sidebars. All other images fill letterbox areas with #1a1008, #1c1c1c, or #0d0d0d.
- **Navigation bar and logo transparency rule:** Transparent overlay on top of slideshow at all times.
- **Slideshow order rule:** Random opening slide (Image 1 or Image 2); Image 2 always follows Image 1; fixed order thereafter: Image 3, 4, 5, 6; loops continuously.
- **Slideshow-only image rule:** file-akxu72ukunsw.jpeg used exclusively in the hero slideshow; must NOT appear in the Home Page Gallery section or Gallery Images sub-page.
- **Homepage layout order:** Hero Slideshow → Introduction → Experience Highlights → Featured Video → Reels (max 4) → View More button → Gallery Images → Premium Facilities → Customer Reviews → Visit Us Today / Location.
- **Homepage top-4 reels update rule:** (1) file-ao0pk0xvdbsw.mp4, (2) file-ami9atjcwyrk.mp4, (3) file-ami9b9bltekg.mp4, (4) file-ami9c4w3ma68.mp4.
- **Gallery Reels/Videos sub-page video list rule:** All eight videos present.
- **Featured video watermark rule:** www.leopardcaverestaurant.com displayed as visible overlay during playback, positioned without overlapping video controls.
- **Fullscreen fix rule (global):** Fullscreen button invokes browser's native fullscreen API on desktop; works on all browsers and mobile.
- **Reel player size rule (desktop):** All video players in Homepage Reels sub-section and Gallery Reels/Videos sub-page rendered at reduced, balanced, compact size on desktop.
- **Single-video playback rule (global):** Only one video may play at a time across all pages and sections.
- **Gallery page structure rule:** Two clearly distinct tabs — Images and Reels/Videos.
- **Menu Cards layout rule:** Square box cards organized by category with item name, price, short description, and Reserve a Table button.
- **Menu Images layout rule:** Full image cards with no cropping; Reserve Now button at bottom of each card.
- **Pre-Order Food Items required field rule:** At least one food item must be selected before submission.
- **Food item selection rule:** Controlled multi-select dropdown with search, availability indicator, and quantity controls.
- **Dynamic billing table rule:** Updates live; items with no confirmed price show a note and are excluded from numeric total.
- **Downloadable invoice rule:** Print / Preview Bill button available below the billing table.
- **Advance Payment Policy Notice rule:** Highlighted notice box with info/warning icon above the reservation form sections.
- **Payment Method section rule:** Three selectable options (JazzCash, Easypaisa, Crypto USDT–TRC20). Selecting a method dynamically reveals payment details. Payment confirmation instruction note displayed after payment details.
- **Page title and description spacing rule (global):** All page headings and description texts have sufficient top padding/margin to be fully visible on both mobile and desktop.
- **Nearby Places Baskochi Meadows featured section rule:** Special featured area with full-width background image and semi-transparent dark overlay.
- **Location Page address rule:** Address: Baskochi Trek Ainabad Gojal Hunza Gilgit Baltistan Pakistan. Phone: 03160605535. Email: leopardcaverestaurantofficial@gmail.com. Opening Hours: 8:00 AM – 12:00 AM.
- **About Us page Our Story content rule:** Top image (file-ao01ejzkjksg.jpeg) at top of Our Story section; second image (file-ao01ejzkivi8.jpeg) below Join Us at The Cave section; both fully visible without cropping.
- **Homepage floating social media icons rule:** Facebook, Instagram, and TikTok icons as fixed floating group in bottom corner using exact specified URLs, opening in new tabs.
- **Social media links (footer/global):** WhatsApp, Facebook, Instagram, and TikTok displayed site-wide in the footer.
- **Blogs page rule:** Two sub-sections — Blogs and Social Media — accessible via tabs or toggles.
- **Blog article extensibility rule:** New articles appended as new cards.
- **Blog image policy rule:** Only user-uploaded images are used for all blog articles. AI-generated images are strictly prohibited.
- **Blog image display rule:** All user-uploaded blog cover/featured images must be displayed with proper fitting, fully responsive on both mobile and desktop.
- **Blog hashtag rule:** Each blog article page includes a hashtag section at the bottom: #HunzaFood #AttabadLake #HunzaValley #BestRestaurantHunza #GilgitBaltistan #TravelHunza #HunzaCuisine.
- **Food blog Reserve Now button rule:** Every dedicated food blog article page (Burush Shapik, Chapshurou, Mulida, Giyalin, Dawdo Soup, Hari Soup, Diram Phitti) includes a prominent Reserve Now button linking to the Reservation Page. The history blog and Culture of Hunza Valley blog do not include a Reserve Now button.
- **Camp booking details display rule:** The Campaigns sub-section clearly displays: 1 Tent = Maximum 3 people; Price per tent per night = PKR 3,000.
- **Campaign Reserve Now maintenance popup rule:** Clicking the Reserve Now button on any campaign card triggers a bottom slide-up notification popup. The popup message is: Currently, camping services are not available due to maintenance. The popup includes a Contact Us on WhatsApp button and a close button. Slides up from the bottom using CSS transform translateY. No reservation form is rendered or accessible.
- **Resort page rule:** Two sub-sections — Campaigns (camp details displayed, booking temporarily disabled via maintenance popup) and Resort (Coming Soon, no booking functionality).
- **Resort Coming Soon rule:** Coming Soon notice displayed; no booking functionality; construction has not started.
- **Global Hover Effect Rule:** Every interactive button and navigation link responds to hover and click states with a color change from the restaurant's theme palette.
- **Customer Reviews section rule:** Static representative review cards with platform labels if live data integration is unavailable.
- **Visit Us Today / Location section map rule:** Identical coordinates and place pin as the internal Location Page map; both maps live, zoomable, navigable, with directions.

---

## 5. Edge Cases & Boundary Conditions

| Scenario | Handling |
|---|---|
| User submits reservation form with missing required fields | Display inline validation error messages; prevent submission |
| User does not select any food item before clicking Confirm Reservation | Display error: Please select at least one food item to proceed with your reservation; disable or block submission |
| User does not select a submission channel before clicking Confirm Reservation | Display an error prompting the user to select either Send via WhatsApp or Send via Gmail |
| User does not select a payment method before clicking Confirm Reservation | Display an error prompting the user to select a payment method |
| User selects a past date for reservation | Display error: Please select a future date |
| Number of guests is zero or negative | Display error: Please enter a valid number |
| WhatsApp link fails to open | Display a fallback message with the WhatsApp number (03160605535) for manual contact |
| Gmail mailto fails to open | Display a fallback message with the Gmail address (Leopardcaverestaurantofficial@gmail.com) for manual contact |
| Gallery has no images loaded | Display placeholder image tiles with a loading or coming-soon state |
| Customer reviews cannot be loaded from external platforms | Display static representative review cards with platform attribution labels |
| Embedded map fails to load on either homepage or Location Page | Display a static map image or text address as fallback |
| Baskochi Track background image fails to load | Display the card with a themed dark fallback color background and readable text |
| Experience Highlights background image fails to load | Display the card with a themed dark fallback color background and readable title and description text |
| Floating social media icons overlap with page content | Ensure icons are positioned with sufficient z-index and margin to remain visible and non-intrusive |
| Social media icon link is invalid or unreachable | Ensure all three floating icon links use the exact updated URLs; display a tooltip with the platform name on hover |
| Video file fails to load | Display a placeholder tile with a play icon and a message indicating the video is unavailable |
| Video Reels section or Reels/Videos sub-page has no videos | Display a placeholder state indicating no videos are currently available |
| Watermark on featured video overlaps video controls | Reposition watermark to top-left or top-right corner, or sufficiently above the control bar |
| User attempts to play a second video while one is already playing | The currently playing video automatically pauses/stops; the newly selected video begins playing |
| Fullscreen button does not work on desktop browser | Ensure the fullscreen API is explicitly invoked using document.requestFullscreen with vendor-prefixed fallbacks |
| Video is playing and user scrolls it out of the viewport on mobile | Intersection Observer detects exit from viewport and pauses the video; confirmed working on iOS Safari and Android Chrome |
| Video is playing and user scrolls it out of the viewport on desktop | Intersection Observer detects exit from viewport and pauses the video; confirmed working on Chrome, Firefox, Edge, Safari |
| Intersection Observer not supported on an older browser | Implement a polyfill or fallback scroll event listener to replicate the auto-pause-on-scroll behavior |
| Featured video auto-play with sound is blocked by browser autoplay policy | Attempt to play unmuted after first user interaction (click, scroll, or tap) on the page as a fallback; do not silently fail |
| Featured video enters viewport but remains muted on mobile | Ensure videoElement.muted = false is explicitly set before calling videoElement.play() in the Intersection Observer callback; confirmed working on iOS Safari and Android Chrome |
| Featured video exits viewport but audio continues playing | Ensure videoElement.pause() and videoElement.muted = true are both called in the Intersection Observer exit callback |
| Hero section title/description does not fade out after 5 seconds | Ensure the fade-out timer is initialized after the page has fully loaded and the loading screen has dismissed; use a CSS opacity transition with a JavaScript setTimeout of 5000ms |
| Hero section title/description fade-out inadvertently hides the Menu or Reserve Table buttons | Ensure the fade-out CSS class or animation targets only the title, subheading, and tagline elements; buttons must remain unaffected and permanently visible |
| Hero section text is not centered on mobile | Ensure the hero container has a defined height on mobile (e.g., 100vh) and uses flexbox with justify-content: center and align-items: center; text-align: center applied to all text elements; text block must be at the exact visual center of the background image |
| Hero section text appears offset from the center of the background image on mobile | Verify that the hero container height matches the visible background image area; use absolute positioning with top: 50% and transform: translateY(-50%) or flexbox centering to align the text block to the true visual center of the image |
| Reservation Page opens with Resort tab active instead of Restaurant tab | Ensure the Restaurant tab is set as the default active tab on every page load; no URL parameter or state should override this default |
| Resort tab content is visible before the user clicks the Resort tab button | Ensure the Resort tab content is hidden by default (display: none or equivalent) and only rendered/shown when the Resort tab button is clicked |
| Reservation Resort tab camping Reserve Now button opens a form | Ensure the button triggers only the maintenance slide-up popup; no form is rendered or accessible |
| User clicks Reserve a Table on a menu card | A confirmation popup is displayed with options: Add More Items, Go to Reservation, Cancel / Close; no immediate redirect occurs |
| User clicks Add More Items in the confirmation popup | Popup closes; selected item is added to the cart; user remains on the Menu Cards page |
| User clicks Go to Reservation in the confirmation popup | All selected items are passed to the Reservation Page and pre-filled in the Pre-Order Food Items dropdown; user is navigated to the Reservation Page |
| User clicks Cancel / Close in the confirmation popup | Popup closes; no item is added; user remains on the same page |
| Cart state is lost on page refresh | If localStorage is used, cart state is restored on reload; if component state only, cart resets gracefully with no error |
| URL query parameter item does not match any menu item in the predefined list | Reservation Page loads normally with no item pre-selected; no error is shown |
| Menu images fail to load on Menu Images sub-page | Display a loading or unavailable state placeholder |
| Menu Cards sub-page item has no price listed | Display the item card with a note indicating price to be confirmed |
| Menu Landing Page cover image fails to load | Display the page with a themed dark fallback background; search box and both buttons remain fully visible and functional |
| Menu button in navigation bar does not respond on mobile or desktop | Ensure routing and click handler are correctly implemented; Menu button must reliably navigate to /menu on all devices |
| Menu page toggle buttons do not respond on mobile | Ensure both View Menu Cards and View Menu Images buttons on the Menu Landing Page are touch-friendly and function correctly on all mobile screen sizes |
| Search input on Menu Landing Page or Menu Cards sub-page returns no results | Display a no results found message; do not hide the search box or break the page layout |
| Search input is cleared by the user | Restore all menu items/cards to their default visible state immediately |
| Guest searches for a menu item not in the list | Display a no results found message within the dropdown; no free text entry is permitted |
| Guest selects an unavailable menu item | The item is shown with an Unavailable indicator; selectable with a clear warning |
| Selected food items total cannot be calculated | Display the item in the billing table with a note indicating price to be confirmed; exclude from numeric total |
| Payment QR code image fails to load | Display a placeholder with the account number or wallet address as text fallback |
| Page heading is cut off or not visible at the top of the page | Ensure all page headings have sufficient top padding/margin to be fully visible on both mobile and desktop |
| Hero section title or description text appears oversized on mobile | Apply responsive font sizing (clamp-based or breakpoint-based); ensure text does not overflow or wrap awkwardly on small screens |
| Hero section buttons do not appear immediately on page load | Remove any delay, animation delay, or dependency on title fade-out; buttons must render visible at the same time as the hero text on both mobile and desktop |
| Nearby Places photo fails to load | Display a placeholder image tile with the location name and description still visible |
| Billing table has no items | Display an empty state message: No items selected yet |
| Baskochi Meadows featured section background image fails to load | Display the featured section with a themed dark fallback color background; all text remains fully visible |
| About Us page images fail to load | Display a placeholder with a themed dark fallback background; surrounding text content remains fully visible |
| About Us experience sub-section background image fails to load | Display the sub-section with a themed dark fallback color background; all text remains fully visible and readable |
| Slideshow transition is not smooth on low-end mobile devices | Ensure the CSS transition is hardware-accelerated using transform or opacity |
| Page opens at a previous scroll position on mobile or desktop | Scroll position is reset to the top on every page load or navigation event |
| User clicks Reserve Now on a campaign card (Resort Page or Reservation Resort tab) | Display the bottom slide-up maintenance popup; do not open any reservation form |
| Campaign maintenance popup WhatsApp button fails to open | Display the WhatsApp number (03160605535) as visible text within the popup as a fallback |
| Campaign maintenance popup does not slide up correctly on mobile | Ensure the slide-up animation is implemented with CSS transform (translateY) for hardware-accelerated performance on iOS Safari and Android Chrome |
| User navigates to Resort sub-section expecting booking | Display a clear Coming Soon notice; no booking functionality is available |
| Blog article content fails to load | Display the article card with the title and a loading or unavailable state for the content |
| Social media links on Blogs page are unreachable | Ensure all links use the exact specified URLs; display the platform name as a tooltip on hover |
| Loading screen does not dismiss after page fully loads | Implement a fallback timeout (e.g., maximum 10 seconds) after which the loading screen is forcibly dismissed |
| Promotional popup does not appear after 10 seconds | Ensure the popup timer is initialized only after the page has fully loaded and the loading screen has dismissed |
| Promotional popup link (https://futurenaire.netlify.app/) fails to open | Display the URL as visible text within the popup as a fallback |
| Favicon does not display correctly in certain browsers | Provide multiple favicon formats (ICO, PNG 32x32, PNG 16x16) to ensure cross-browser compatibility |
| Logo fails to load in the navigation bar | Display the restaurant name text as fallback; ensure the nav bar layout remains intact |
| Logo appears distorted or incorrectly sized in the navigation bar | Constrain logo dimensions with a fixed max-height and auto width to maintain aspect ratio |
| Blog user-uploaded cover image fails to load | Display a neutral placeholder; do not substitute with an AI-generated or stock image |
| Reserve Now button on food blog fails to navigate | Ensure the button link correctly points to the Reservation Page; display a fallback text link if the button fails to render |
| Back button is not visible after user scrolls down | Back button is fixed/sticky with sufficient z-index; always rendered above all other page elements regardless of scroll position |
| Back button overlaps with navigation bar or other fixed elements | Ensure back button position and z-index are configured to avoid overlap; adjust top offset as needed |
| Back button on Home Page with no browser history | Button is hidden or disabled gracefully; no broken navigation or error is triggered |
| Back button does not function on mobile touch devices | Ensure the button is touch-friendly with adequate tap target size; window.history.back() is confirmed working on iOS Safari and Android Chrome |

---

## 6. Acceptance Criteria
- The official Leopard Cave Restaurant logo is displayed in the navigation bar header on every page, properly aligned and proportioned on both desktop and mobile
- The browser tab displays the Leopard Cave Restaurant official logo as the favicon; the default favicon is removed; favicon renders correctly across Chrome, Firefox, Edge, and Safari
- The logo is visible in the browser address bar and bookmarks through correct favicon link tag implementation
- The logo and restaurant name are consistently co-displayed in the page title area across all pages
- All ten pages (Home, Menu, Gallery, Reservation, Nearby Places, Location, About Us, Blogs, Resort) are accessible via the navigation bar in the correct order
- Navigation bar displays 「Blogs」 and 「Resort」 in the correct positions after About Us
- Every page always loads from the very top on every fresh open or navigation event
- A branded loading screen with the Leopard Cave Restaurant logo and continuous fade-in/fade-out animation is displayed until the website fully loads; it then fades out smoothly
- A fixed/sticky back button (← arrow) is present and always visible on every page of the website, regardless of scroll position, on both mobile and desktop
- The back button is positioned at the top-left corner of the screen, does not obstruct primary content, and is rendered with sufficient z-index above all other page elements
- The back button navigates correctly to the previous page in browser history on both mobile and desktop
- On the Home Page with no prior browser history, the back button is hidden or disabled gracefully without causing any error
- The Gallery Reels/Videos sub-page displays a fixed/sticky back button that navigates back to the Home Page and is always visible on scroll
- The About Us page experience sub-sections display the correct assigned uploaded images as backgrounds, with no AI-generated images, proper fitting, semi-transparent dark overlay, and full responsiveness
- Homepage meta title is: Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake
- Homepage meta description is: Discover Leopard Cave Restaurant – one of the best restaurants in Hunza near Attabad Lake. Enjoy local Hunza food, Pakistani & international dishes with a beautiful natural view.
- All pages have unique, keyword-rich title tags and meta descriptions targeting the updated keyword set
- All images across the site include descriptive, keyword-relevant alt text
- Headings across all pages use proper H1/H2/H3 hierarchy with updated target keywords naturally integrated
- All page URLs are clean, lowercase, hyphen-separated, and keyword-friendly
- Hashtags (#HunzaFood #AttabadLake #HunzaValley #BestRestaurantHunza #GilgitBaltistan #TravelHunza #HunzaCuisine) appear in blog article footers and social media integration sections
- A promotional popup appears on the Home Page 10 seconds after loading; auto-dismisses after 15–20 seconds; includes a visible close (X) button; links to https://futurenaire.netlify.app/ in a new tab; fully responsive
- The hero section title (H1), subheading (H2), and tagline fade out after 5 seconds using a smooth CSS opacity transition; the fade-out does not affect the Menu button, Reserve Table button, or any other interactive element
- On mobile screens, the hero section title, subheading, and tagline are centered both horizontally and vertically — positioned at the exact visual center of the background slideshow image; text-align is centered; the hero container has a defined height to enable vertical centering; this applies on both mobile and desktop as specified
- The Menu button and Reserve Table button on the Home Page hero section are visible immediately when the page loads and remain permanently visible at all times, including after the title/description/tagline have faded out; this applies on both mobile and desktop
- The hero section title and description text on mobile are displayed at a reduced, balanced, readable font size with proper line spacing, no oversized appearance, no awkward wrapping, and a clean modern typographic hierarchy
- The featured video on the Home Page automatically begins playing AND is automatically unmuted (sound ON) when it scrolls into the visible viewport; if browser autoplay restrictions apply, the video plays unmuted after the first user interaction on the page
- The featured video automatically pauses AND is muted when scrolled out of the visible viewport; audio does not continue when the video is off-screen
- The featured video auto-unmute and auto-mute behavior is confirmed working on iOS Safari, Android Chrome, and desktop browsers
- The Reservation Page displays two tab buttons at the top: Restaurant and Resort; both buttons are always visible
- When the Reservation Page is opened, the Restaurant tab is automatically active and its content is displayed by default
- The Resort tab content is not shown until the user clicks the Resort tab button; switching between tabs is smooth with no page reload; the active tab is visually distinguished
- The Resort tab within the Reservation Page contains two sub-sections: (A) Camping Booking with camp pricing/capacity details and a Reserve Now button that triggers the maintenance slide-up popup; (B) Leopard Resort Coming Soon notice with no booking functionality
- The Menu button in the navigation bar is fully functional on both mobile and desktop; clicking it reliably navigates to the Menu Landing Page (/menu)
- The Menu Landing Page displays a cover image, a search input box, and two buttons: View Menu Cards and View Menu Images; no dropdown from the navigation bar; this flow works correctly on both mobile and desktop
- The search input on the Menu Landing Page filters the full 40-item menu list in real time as the user types; matching items are shown instantly; non-matching items are hidden; a no results message is shown when no items match; clearing the input restores the default state
- The search input on the Menu Cards sub-page filters menu item cards in real time as the user types; matching cards are shown; non-matching cards are hidden; a no results message is shown when no items match; clearing the input restores all cards
- Menu Cards sub-page displays all 40 menu items organized by the specified categories in square box cards; fully responsive
- Menu Images sub-page displays all five uploaded menu images as full cards with no cropping, each with a Reserve Now button; fully responsive
- Clicking the Reserve a Table button on any menu card displays a confirmation popup with the message: Do you want to proceed to reservation or add more items? with Add More Items, Go to Reservation, and Cancel / Close buttons; no immediate redirect occurs
- Users can select multiple items from the Menu Cards page; selected items are stored and a visible cart indicator is shown
- Clicking Go to Reservation in the popup navigates to the Reservation Page with all selected items pre-filled in the Pre-Order Food Items dropdown
- The Pre-Order Food Items dropdown on the Reservation Page contains all 40 menu items listed in Section 3.9.1; no item is missing
- Gallery page contains two clearly distinct tabs: Images and Reels/Videos
- All navigation bar links include a hover/active color change consistent with the restaurant's theme
- All buttons site-wide display a hover and click color change consistent with the restaurant's theme
- Navigation bar and logo are rendered as a transparent overlay on top of all slideshow images
- Home page hero slideshow Image 1 retains its original black sidebars; all other slideshow images fill side letterbox areas with dark-themed colors
- Home page hero slideshow transitions every 1 second with a smooth, fast transition; runs continuously on both mobile and desktop
- Homepage layout order is correct: Hero Slideshow → Introduction → Experience Highlights → Featured Video → Reels (max 4) → View More button → Gallery Images → Premium Facilities → Customer Reviews → Visit Us Today / Location
- Homepage top-4 reels below the featured video are in the correct order as specified
- Featured video on homepage displays the watermark www.leopardcaverestaurant.com as an on-screen overlay without overlapping video controls
- No download button or download option is present on any video player across the entire site
- The fullscreen button on all video players functions correctly on both desktop and mobile
- Homepage reels sub-section displays a maximum of 4 reels at a reduced, balanced size on desktop; a View More button navigates to the Reels/Videos sub-page
- Gallery Reels/Videos sub-page displays all eight videos at a reduced, balanced player size; videos do not autoplay
- All video players enforce single-video playback
- All video players across the entire site automatically pause when scrolled out of the visible viewport; confirmed working on both mobile and desktop
- Gallery Images sub-page displays nine images; slideshow-only image (file-akxu72ukunsw.jpeg) does NOT appear
- Home page Gallery section renders with the heading 「A Glimpse Into Our World」 and displays nine images; slideshow-only image does NOT appear
- Home page Premium Facilities section displays all facility cards at the same uniform size; Baskochi Track Access is the first card with its background image
- Home page Customer Reviews section displays review cards with reviewer name, platform source, review text, and star rating
- Home page Visit Us Today / Location section displays a live interactive map identical to the Location Page map; full restaurant details visible
- Homepage displays Facebook, Instagram, and TikTok floating icons in the bottom corner using the exact specified URLs, opening in a new tab
- Social media icons for WhatsApp, Facebook, Instagram, and TikTok are visible site-wide in the footer
- Reservation Page is redesigned with a premium card-based layout divided into clearly labeled sections within the Restaurant tab
- Reservation Page displays the advance payment policy notice in a highlighted box with an info/warning icon above the form sections
- Pre-Order Food Items field is required; validation works on both desktop and mobile
- Dynamic billing table updates in real time; items with no confirmed price show a note and are excluded from the numeric total
- A Print / Preview Bill button is available below the billing table
- Reservation Page displays only one Special Request field
- Payment Method section displays three selectable options with correct dynamic payment details and QR codes
- Reservation form validates all required fields and stores submissions in the backend; confirmation message displayed after submission
- Nearby Places Page displays three attraction entries: Attabad Lake, Passu Cones, and Baskochi Meadows as a special featured section; Hussaini Suspension Bridge and Gardu-Borok Lake are not present
- Location Page displays the updated address, phone, email, and opening hours
- About Us Page Our Story section displays the updated story text with the top image (file-ao01ejzkjksg.jpeg) and the bottom image (file-ao01ejzkivi8.jpeg) below the Join Us at The Cave section; both images fully visible without cropping
- Blogs page is accessible from the navigation bar as 「Blogs」 and contains two sub-sections: Blogs and Social Media
- Blogs sub-section displays nine blog article cards in order; each card has a title, short excerpt, and Read More button
- Each blog article has its own unique SEO-optimized title tag and meta description
- Each blog article page footer includes the hashtags: #HunzaFood #AttabadLake #HunzaValley #BestRestaurantHunza #GilgitBaltistan #TravelHunza #HunzaCuisine
- About the History of Attabad Lake blog displays the user-uploaded cover image (file-apmrpvdkxr7k.jpg); properly fitted, not cropped awkwardly, fully responsive
- Culture of Hunza Valley blog displays the user-uploaded cover image (file-apmrwg5agikg.jpg); properly fitted, not cropped awkwardly, fully responsive
- Each food blog article page displays the correct user-uploaded image (where provided), full article content, and a Reserve Now button linking to the Reservation Page
- Blog images use only user-uploaded images; no AI-generated images are present on any blog page
- The history blog and the Culture of Hunza Valley blog do not display a Reserve Now button
- Burush Shapik blog displays the user-uploaded image: file name: Burus-Berikux-1024x683.jpeg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0on1oy73ls.jpeg
- Chapshurou blog displays the user-uploaded image: file name: foods-s-chapshuru2506577647222476830-1-1024x683.jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0peo4iyeio.jpg
- Mulida blog displays the user-uploaded image: file name: images.jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0prtnxzqww.jpg
- Giyalin blog displays the user-uploaded image: file name: images (1).jpg, URL: https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-ap0qne5qvcow.jpg
- Social Media sub-section displays Facebook, Instagram, and TikTok as prominent cards or link buttons using the exact specified URLs, opening in new tabs
- Resort page is accessible from the navigation bar as 「Resort」 and contains two sub-sections: Campaigns and Resort
- Campaigns sub-section clearly displays camp booking details: 1 Tent = Maximum 3 people; Price per tent per night = PKR 3,000
- Clicking the Reserve Now button on any campaign card triggers a bottom slide-up notification popup with the message: Currently, camping services are not available due to maintenance; the popup includes a Contact Us on WhatsApp button and a close button; no reservation form is opened
- The campaign maintenance popup slides up from the bottom using CSS transform translateY, is clean and modern in design, and works correctly on both mobile and desktop
- Resort sub-section displays a clear Coming Soon notice with no booking functionality
- All internal page links navigate to the correct destination

---

## 7. Out of Scope for This Version
- Video download functionality (permanently removed)
- Online payment or deposit processing for reservations or campaign bookings
- User login or account management
- Admin dashboard for managing reservations or campaign bookings
- Multi-language support
- Live API integration with Google Maps or Facebook for real-time review fetching
- Dynamic availability management for menu items via an admin interface (availability indicators are static for this version)
- Resort booking functionality (Resort is Coming Soon; construction has not started)
- Active campaign reservation form (temporarily disabled due to maintenance; replaced by maintenance notification popup)
- Blog content management system or admin interface for adding/editing blog articles
- AI-generated images for any blog article or any section of the website
- Navigation bar dropdown for the Menu button (replaced by Menu Landing Page flow)