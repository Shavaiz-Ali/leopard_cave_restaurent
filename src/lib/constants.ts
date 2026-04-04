import { MenuItem, Attraction } from '@/types/types';

export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Leopard Cave Special Starter', description: 'Crispy chicken strips with local spices and herbs.', category: 'Starters' },
  { id: '2', name: 'Cave Fried Platter', description: 'Assorted seasonal vegetables and meats fried to perfection.', category: 'Starters' },
  { id: '3', name: 'Attabad Lake Grilled Trout', description: 'Fresh trout from the lake, grilled with lemon and garlic butter.', category: 'Main Course' },
  { id: '4', name: 'Cave-Style Mutton Karahi', description: 'Tender mutton cooked in a rich, spicy tomato base with local herbs.', category: 'Main Course' },
  { id: '5', name: 'Lakeside Chicken Biryani', description: 'Fragrant basmati rice layered with succulent chicken and aromatic spices.', category: 'Main Course' },
  { id: '6', name: 'Walnut Cake', description: 'Rich, moist cake made with local Hunza walnuts.', category: 'Desserts' },
  { id: '7', name: 'Apricot Delight', description: 'A refreshing dessert made with locally grown apricots and cream.', category: 'Desserts' },
  { id: '8', name: 'Hunza Green Tea', description: 'Fragrant local green tea with honey and mint.', category: 'Beverages' },
  { id: '9', name: 'Cave Coffee', description: 'Rich, dark-roasted coffee served with a side of local cookies.', category: 'Beverages' },
];

export const NEARBY_ATTRACTIONS: Attraction[] = [
  { 
    id: '1', 
    name: 'Attabad Lake', 
    description: 'Enjoy the beautiful views of Attabad Lake with your family. From our restaurant, you can see stunning vistas and enjoy boating on the lake.', 
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-and83pylunls.jpeg' 
  },
  { 
    id: '2', 
    name: 'Passu Cones', 
    description: 'Only 30 minutes by car from here, the scenic Passu Cones route is perfect for sightseeing and enjoying the natural beauty of the area.', 
    image: 'https://miaoda-conversation-file.s3cdn.medo.dev/user-a7t3ahj4kw74/conv-ak64calg34zk/20260401/file-and8hba9tbeo.jpeg' 
  },
  { 
    id: '3', 
    name: 'Baskochi Meadows', 
    description: 'Explore Baskochi Meadows on a natural and secure track that starts right from our restaurant. This 40-minute route is enjoyable, safe, and perfect for nature lovers. Along the way, you can see the Baskochi Waterfall and reach the Baskochi Viewpoint. If you wish to go further, you can take a guide and hike to Goush Meadows from Leopard Caves Restaurant. This hike takes about 1.5–2 hours and offers stunning views of Attabad Lake and Upper Gojal valley.', 
    image: 'https://miaoda-site-img.s3cdn.medo.dev/images/KLing_285560b8-080d-4638-a349-eef08d65962c.jpg' 
  },
];
