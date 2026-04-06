-- Supabase Seed Script for Leopard Cave Restaurant
-- Run this completely in your Supabase SQL Editor to populate the Categories and Menu Items.

BEGIN;

-- 1. Insert Categories
INSERT INTO categories (name, status) VALUES
  ('Local Delights', 'Active'),
  ('Valley Soups', 'Active'),
  ('From the Mountain Pod', 'Active'),
  ('Mountain Greens', 'Active'),
  ('Bite Before the Peak', 'Active'),
  ('Others', 'Active'),
  ('Glacier Flow Beverages', 'Active'),
  ('Peak Warmth', 'Active'),
  ('Highlanders Snacks', 'Active'),
  ('From the Mountain Wok', 'Active'),
  ('Mountain Feast', 'Active');

-- 2. Insert Menu Items (using dynamic subqueries to match the correct category_id based on the names inserted above)
INSERT INTO menu_items (name, category_id, price, description) VALUES
  ('Burush Shapick', (SELECT id FROM categories WHERE name = 'Local Delights' LIMIT 1), 'PKR 650', 'Authentic local flatbread, crafted with caramelized onions and an aromatic blend of handpicked local herbs, then lightly drizzled with rich walnut oil tradition and the essence of mountain flavors to every bite.'),
  ('Chap Shuroo', (SELECT id FROM categories WHERE name = 'Local Delights' LIMIT 1), 'PKR 1,000', 'Tender boneless yak meat, slow-braised with caramelized onions and wild local herbs for a deep, earthy flavor. Served with hand-kneaded traditional wheat dough, home-style potato wedges, and a savory local dipping sauce.'),
  ('Chicken Deroo', (SELECT id FROM categories WHERE name = 'Local Delights' LIMIT 1), 'PKR 500', 'Boneless chicken cooked with fragrant local herbs, onion wrapped in freshly baked local wheat shapick, served with golden home-style potato wedges and a vibrant, tangy local chutney.'),
  
  ('Dawdo Soup', (SELECT id FROM categories WHERE name = 'Valley Soups' LIMIT 1), 'PKR 450', 'A nourishing, slow-cooked soup made with homemade laksha flat noodles, tender halize mountain yak meat cuts, and ba page chap, gently simmered with aromatic local herbs.'),
  ('Hari Soup', (SELECT id FROM categories WHERE name = 'Valley Soups' LIMIT 1), 'PKR 750', 'Local barley, handmade laksha (noodles), halize (fermented grains), and mixed mountain herbs. Slow-cooked over an open fire, it brings the deep, smoky flavors of our highland home straight to your bowl.'),
  ('Shirijoon Soup', (SELECT id FROM categories WHERE name = 'Valley Soups' LIMIT 1), 'PKR 2,000', 'A rich and earthy mountain delicacy made with wild morel mushrooms handpicked from the highland forests. Slow-cooked with golden onions, fresh cream, this soup brings out the deep, nutty flavor of the prized shrijoon (morel).'),
  
  ('Hot & Sour', (SELECT id FROM categories WHERE name = 'From the Mountain Pod' LIMIT 1), 'PKR 500', 'A classic, flavors - spicy heat from chili and pepper, and a tangy kick from vinegar or fermented ingredients. Traditionally made with a rich broth, includes a mix of local mountain vegetables, free-range chicken.'),
  ('Chicken Corn Soup', (SELECT id FROM categories WHERE name = 'From the Mountain Pod' LIMIT 1), 'PKR 450', 'A comforting blend of tender chicken and sweet corn in a rich, flavorful broth.'),
  
  ('Hari Ka Biranze Salad', (SELECT id FROM categories WHERE name = 'Mountain Greens' LIMIT 1), 'PKR 600', $$Made with hari (local barley) and biranze (mulberry) - toasted to perfection with onions, tomatoes, and cucumber a honey-apple cider vinaigrette, finished with a touch of homeland burushe. It's a vibrant fusion of highland flavors.$$),
  ('Fresh Garden Salad', (SELECT id FROM categories WHERE name = 'Mountain Greens' LIMIT 1), 'PKR 400', 'Vibrant celebration of freshness, crafted with local mountain vegetables grown in pure air and soil. This salad brings together crisp greens, seasonal roots, and wild herbs, all handpicked from the heart of the highlands.'),
  
  ('Mountain Yak Karahi', (SELECT id FROM categories WHERE name = 'Bite Before the Peak' LIMIT 1), 'PKR 3,000 (1kg)', 'A traditional karahi, made with tender cuts of locally raised yak meat slow-cooked in a fragrant blend of fresh mountain tomatoes, halizi (turmeric), and gawkomaricho (black pepper), this dish is fired up with maricho (chilies) for a rich in flavor. Served with a side of fresh seasonal salad and warm local roti.'),
  ('Pasture Mutton Karahi', (SELECT id FROM categories WHERE name = 'Bite Before the Peak' LIMIT 1), 'PKR 3,500 (1kg)', 'Tender pasture-raised mutton cooked in traditional karahi style with aromatic spices and fresh herbs.'),
  ('Free Range Chicken Karahi', (SELECT id FROM categories WHERE name = 'Bite Before the Peak' LIMIT 1), 'PKR 2,700 (1kg)', 'Free-range chicken prepared in authentic karahi style with rich tomato-based gravy and mountain spices.'),
  
  ('Balling Kham', (SELECT id FROM categories WHERE name = 'Others' LIMIT 1), 'PKR 3,200', 'A traditional highland specialty featuring authentic local ingredients and time-honored cooking methods.'),
  ('Chap Za Laksha', (SELECT id FROM categories WHERE name = 'Others' LIMIT 1), 'Price on request', 'Traditional handmade noodles served with authentic local accompaniments and flavorful broth.'),
  
  ('Chamuse', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 500', 'A pure and refreshing drink made from sun-dried local apricots crystal rise mountain water. No sugar, no additive, just the natural sweetness of the fruit.'),
  ('Peak Fruit Fizz', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 500', 'Fresh mountain apricots muddled with wild local herbs, sparkling mountain ice water, and a touch of homeland honey served over crushed ice.'),
  ($$Season's Essence$$, (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 600', 'A refreshing blend crafted from the freshest fruits of the season handpicked at peak ripeness from local orchards and gardens. Each glass captures the true taste of nature.'),
  ('Lemon Peak Spark', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 300', 'A refreshing burst of mountain-grown mint, zesty ginger, fresh lemon, and a dash of local honey lightly sparkling with mountain soda water.'),
  ('Soft Drinks', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 150', 'Selection of popular carbonated beverages.'),
  ('Small Water', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 100', 'Pure mountain spring water in small bottle.'),
  ('Large Water', (SELECT id FROM categories WHERE name = 'Glacier Flow Beverages' LIMIT 1), 'PKR 100', 'Pure mountain spring water in large bottle.'),
  
  ('Cappuccino', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 400', 'Rich espresso topped with steamed milk foam.'),
  ('Americano', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 300', 'Bold espresso diluted with hot water.'),
  ('Espresso', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 300', 'Strong, concentrated coffee shot.'),
  ('Latte', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 400', 'Smooth espresso with steamed milk.'),
  ('Rose Petal Tea', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 200', 'Delicate tea infused with fragrant rose petals.'),
  ('Mountain Tea', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 150', 'Traditional highland tea blend.'),
  ('Honey Tea', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 250', 'Soothing tea sweetened with pure local honey.'),
  ('Matka Chai', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 250', 'Traditional clay pot tea with authentic flavor.'),
  ('Dhood Patti Chai', (SELECT id FROM categories WHERE name = 'Peak Warmth' LIMIT 1), 'PKR 250', 'Creamy milk tea brewed to perfection.'),
  
  ('Highland Yak Burger', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'PKR 1,300', 'Featuring a juicy yak meat patty, grilled to perfection and layered with caramelized onions, melted cheese, and a handful of fresh local greens. Soft, toasted bun and served with a side of crispy homeland-style potato wedges.'),
  ('Zinger Crunch Burger', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'PKR 1,150', 'A deep-fried chicken fillet, marinated in bold seasonings and fried to golden perfection. Layered with fresh lettuce, creamy garlic mayo, and served in a soft toasted bun for the perfect crunch in every bite.'),
  ('Crispy Cluck', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'PKR 1,450', 'Juicy, tender pieces of free-range chicken, marinated in house spices and double-crisped. Served hot with a crunchy outer layer and bursting with homeland potato wedges.'),
  ('Walnut Dip', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'Price on request', 'Rich, creamy dip made from locally sourced walnuts with aromatic spices.'),
  ('Homeland Potato Fries', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'PKR 550', 'Crispy golden fries made from fresh highland potatoes.'),
  ('Homeland Potato Chili Fries', (SELECT id FROM categories WHERE name = 'Highlanders Snacks' LIMIT 1), 'PKR 750', 'Crispy fries loaded with rich chili, melted cheese, handpick herbs. Served with garlic mayo.'),
  
  ('Mountain Yak Chili Dry', (SELECT id FROM categories WHERE name = 'From the Mountain Wok' LIMIT 1), 'PKR 1,300', 'A bold fusion of spice and mountain flavor our Mountain Yak Chili Dry features tender strips of yak meat, stir-fried with fresh chilies, garlic, and onions in a smoky, spicy glaze. Served with classic egg fried rice.'),
  ('Sweet & Sour Chicken', (SELECT id FROM categories WHERE name = 'From the Mountain Wok' LIMIT 1), 'PKR 1,500', 'A vibrant twist on our Mountain Sweet & Sour Chicken tender free-range chicken, stir-fried with local vegetables and glazed in a tangy-sweet & sour sauce a unique highland flavor served with fragrant steamed rice.'),
  
  ('Grilled Beef Steak', (SELECT id FROM categories WHERE name = 'Mountain Feast' LIMIT 1), 'PKR 3,000', 'Tender yak meat, marinated in fresh onion juice and a blend of local herbs, flame-grilled for a rich, smoky flavor creamy mashed potatoes and finished with a traditional gakowmarcho sauce for a bold, local touch.');

COMMIT;
