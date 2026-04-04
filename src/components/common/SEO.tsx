import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Leopard Cave Restaurant | Best Restaurant in Hunza & Attabad Lake',
  description = 'Discover Leopard Cave Restaurant – one of the best restaurants in Hunza near Attabad Lake. Enjoy local Hunza food, Pakistani & international dishes with a beautiful natural view.',
  keywords = 'best restaurants in Hunza, best food in Hunza, best food in Hunza Valley, best places to eat in Hunza, best restaurant in Karimabad Hunza, restaurants at Attabad Lake, Hunza food, local food in Hunza, best places in Hunza, where to eat in Hunza, Hunza traditional food, restaurants in Gilgit Baltistan, best restaurants in Gilgit Baltistan, Leopard Cave Restaurant, Hunza Valley restaurants, Attabad Lake dining, Gilgit Baltistan tourism, cave restaurant Hunza, panoramic views restaurant, Karakoram Highway restaurants',
  image = 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260403/file-aozbm8hrcgzk.jpeg',
  url = 'https://leopardcaverestaurant.com',
  type = 'website',
}: SEOProps) {
  const fullTitle = title.includes('Leopard Cave') ? title : `${title} | Leopard Cave Restaurant`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Leopard Cave Restaurant" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Leopard Cave Restaurant" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="geo.region" content="PK-GB" />
      <meta name="geo.placename" content="Hunza, Gilgit-Baltistan, Pakistan" />
      <meta name="geo.position" content="36.3167;74.6500" />
      <meta name="ICBM" content="36.3167, 74.6500" />

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          "name": "Leopard Cave Restaurant",
          "image": image,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Baskochi Trek Ainabad Gojal",
            "addressLocality": "Hunza",
            "addressRegion": "Gilgit-Baltistan",
            "addressCountry": "Pakistan"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 36.3167,
            "longitude": 74.6500
          },
          "url": url,
          "telephone": "+923160605535",
          "email": "leopardcaverestaurantofficial@gmail.com",
          "priceRange": "$$",
          "servesCuisine": ["Pakistani", "Local Hunza Cuisine", "International"],
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "08:00",
            "closes": "00:00"
          },
          "sameAs": [
            "https://www.facebook.com/profile.php?id=61582236326778",
            "https://www.instagram.com/leopard.cave.restaurant",
            "https://www.tiktok.com/@leopard.cave.restaurant"
          ]
        })}
      </script>
    </Helmet>
  );
}
