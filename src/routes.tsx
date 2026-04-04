import Home from '@/pages/Home';
import MenuLanding from '@/pages/MenuLanding';
import MenuImages from '@/pages/MenuImages';
import MenuCards from '@/pages/MenuCards';
import Gallery from '@/pages/Gallery';
import Videos from '@/pages/Videos';
import Reservation from '@/pages/Reservation';
import NearbyPlaces from '@/pages/NearbyPlaces';
import Location from '@/pages/Location';
import AboutUs from '@/pages/AboutUs';
import Blogs from '@/pages/Blogs';
import AttabadLakeHistory from '@/pages/AttabadLakeHistory';
import MolidaBlog from '@/pages/MolidaBlog';
import ChapshuroBlog from '@/pages/ChapshuroBlog';
import BurushShapickBlog from '@/pages/BurushShapickBlog';
import GiyalinBlog from '@/pages/GiyalinBlog';
import HunzaDryFruitsBlog from '@/pages/HunzaDryFruitsBlog';
import HunzaCultureBlog from '@/pages/HunzaCultureBlog';
import HunzaFoodGuideBlog from '@/pages/HunzaFoodGuideBlog';
import SocialMedia from '@/pages/SocialMedia';
import LeopardCaveResort from '@/pages/LeopardCaveResort';
import CampaignReservation from '@/pages/CampaignReservation';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
}

const routes: RouteConfig[] = [
  { name: 'Home', path: '/', element: <Home /> },
  { name: 'Menu Landing', path: '/menu', element: <MenuLanding /> },
  { name: 'Menu Images', path: '/menu-images', element: <MenuImages /> },
  { name: 'Menu Cards', path: '/menu-cards', element: <MenuCards /> },
  { name: 'Gallery', path: '/gallery', element: <Gallery /> },
  { name: 'Videos', path: '/videos', element: <Videos /> },
  { name: 'Reservation', path: '/reservation', element: <Reservation /> },
  { name: 'Nearby Places', path: '/nearby', element: <NearbyPlaces /> },
  { name: 'Location', path: '/location', element: <Location /> },
  { name: 'About Us', path: '/about', element: <AboutUs /> },
  { name: 'Blogs', path: '/blogs', element: <Blogs /> },
  { name: 'Hunza Food Guide', path: '/blog/hunza-food-guide', element: <HunzaFoodGuideBlog /> },
  { name: 'Burush Shapick Blog', path: '/blog/burush-shapick-traditional-flatbread', element: <BurushShapickBlog /> },
  { name: 'Chapshuro Blog', path: '/blog/chapshuro-hunza-street-food', element: <ChapshuroBlog /> },
  { name: 'Molida Blog', path: '/blog/molida-traditional-hunza-dish', element: <MolidaBlog /> },
  { name: 'Giyalin Blog', path: '/blog/giyalin-traditional-bread-basket', element: <GiyalinBlog /> },
  { name: 'Hunza Dry Fruits', path: '/blog/hunza-dry-fruits', element: <HunzaDryFruitsBlog /> },
  { name: 'Hunza Culture', path: '/blog/hunza-culture', element: <HunzaCultureBlog /> },
  { name: 'Attabad Lake History', path: '/blog/attabad-lake-history', element: <AttabadLakeHistory /> },
  { name: 'Social Media', path: '/social-media', element: <SocialMedia /> },
  { name: 'Leopard Cave & Resort', path: '/leopard-cave-resort', element: <LeopardCaveResort /> },
  { name: 'Campaign Reservation', path: '/campaign-reservation', element: <CampaignReservation /> },
];

export default routes;
