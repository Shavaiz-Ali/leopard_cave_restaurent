import Home from '@/pages/Home';
import MenuLanding from '@/pages/MenuLanding';
import MenuImages from '@/pages/MenuImages';
import MenuCards from '@/pages/MenuCards';
import Gallery from '@/pages/Gallery';
import Videos from '@/pages/Videos';
import Reservation from '@/pages/Reservation';
import ReservationStatus from '@/pages/ReservationStatus';
import NearbyPlaces from '@/pages/NearbyPlaces';
import Location from '@/pages/Location';
import AboutUs from '@/pages/AboutUs';
import Blogs from '@/pages/Blogs';
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
  { name: 'Reservation Status', path: '/reservation-status', element: <ReservationStatus /> },
  { name: 'Nearby Places', path: '/nearby', element: <NearbyPlaces /> },
  { name: 'Location', path: '/location', element: <Location /> },
  { name: 'About Us', path: '/about', element: <AboutUs /> },
  { name: 'Blogs', path: '/blogs', element: <Blogs /> },
  { name: 'Social Media', path: '/social-media', element: <SocialMedia /> },
  { name: 'Leopard Cave & Resort', path: '/leopard-cave-resort', element: <LeopardCaveResort /> },
  { name: 'Campaign Reservation', path: '/campaign-reservation', element: <CampaignReservation /> },
];

export default routes;
