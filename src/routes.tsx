import { lazy, type ReactNode } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const MenuLanding = lazy(() => import('@/pages/MenuLanding'));
const MenuImages = lazy(() => import('@/pages/MenuImages'));
const MenuCards = lazy(() => import('@/pages/MenuCards'));
const Gallery = lazy(() => import('@/pages/Gallery'));
const Videos = lazy(() => import('@/pages/Videos'));
const Reservation = lazy(() => import('@/pages/Reservation'));
const ReservationStatus = lazy(() => import('@/pages/ReservationStatus'));
const NearbyPlaces = lazy(() => import('@/pages/NearbyPlaces'));
const Location = lazy(() => import('@/pages/Location'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const Blogs = lazy(() => import('@/pages/Blogs'));
const SocialMedia = lazy(() => import('@/pages/SocialMedia'));
const LeopardCaveResort = lazy(() => import('@/pages/LeopardCaveResort'));
const CampaignReservation = lazy(() => import('@/pages/CampaignReservation'));

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