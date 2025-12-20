-- Seed Data for Flower Shop

-- Insert admin user (password: admin123 - in production, use bcrypt hashed password)
INSERT INTO users (email, password, role) VALUES 
('admin@whisperingpetals.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4KgLlzYQp.Cy8nR2', 'admin');

-- Insert products
INSERT INTO products (id, name, price, description, category, availability) VALUES 
(1, 'Blush Harmony Bouquet', 95.00, 'Exquisite harmony bouquet with blush, autumn tones and hints of romance and elegance. Perfect for anniversaries, birthdays, or expressing your deepest affections.', 'Bouquets', TRUE),
(2, 'Eternal Grace Box', 120.00, 'A stunning arrangement of premium roses in an elegant box, symbolizing eternal love and grace. Hand-selected blooms that last longer than traditional bouquets.', 'Box Arrangements', TRUE),
(3, 'Velvet Romance Arrangement', 110.00, 'Velvet-textured roses paired with delicate greenery create this romantic masterpiece. Ideal for proposals, anniversaries, or any moment that calls for elegance.', 'Arrangements', TRUE),
(4, 'Garden Dream Basket', 85.00, 'A whimsical basket filled with garden-fresh blooms, bringing the beauty of nature indoors. Features seasonal flowers in soft, dreamy hues.', 'Baskets', TRUE),
(5, 'Peony Paradise', 145.00, 'Luxurious peonies in full bloom, representing prosperity and romance. This premium arrangement features the most sought-after seasonal blooms.', 'Premium', TRUE),
(6, 'Sunset Serenade', 75.00, 'Warm sunset tones dance through this enchanting arrangement. Orange roses, coral carnations, and golden accents create a symphony of color.', 'Bouquets', TRUE);

-- Insert product images
INSERT INTO product_images (product_id, image_url, display_order) VALUES 
(1, '/pink-roses-bouquet-elegant.jpg', 1),
(1, '/blush-pink-flower-arrangement.jpg', 2),
(1, '/romantic-rose-bouquet-side-view.jpg', 3),
(2, '/luxury-flower-box-roses.jpg', 1),
(2, '/elegant-rose-arrangement-box.jpg', 2),
(2, '/premium-flower-gift-box.jpg', 3),
(3, '/velvet-red-roses-arrangement.jpg', 1),
(3, '/romantic-flower-arrangement.jpg', 2),
(3, '/luxury-rose-bouquet.jpg', 3),
(4, '/garden-flower-basket-arrangement.jpg', 1),
(4, '/spring-flowers-basket.jpg', 2),
(4, '/cottage-style-flower-arrangement.jpg', 3),
(5, '/peony-flower-arrangement-luxury.jpg', 1),
(5, '/pink-peonies-bouquet.png', 2),
(5, '/elegant-peony-arrangement.jpg', 3),
(6, '/sunset-colored-flower-arrangement.jpg', 1),
(6, '/orange-coral-flower-bouquet.jpg', 2);

-- Insert product colors
INSERT INTO product_colors (product_id, color_name) VALUES 
(1, 'Baby Pink'),
(1, 'Blush Rose'),
(1, 'Soft Coral'),
(2, 'Classic Red'),
(2, 'Soft Pink'),
(2, 'Pure White'),
(3, 'Deep Red'),
(3, 'Burgundy'),
(3, 'Rose Gold'),
(4, 'Mixed Pastels'),
(4, 'Lavender Dreams'),
(4, 'Sunny Yellow'),
(5, 'Blush Pink'),
(5, 'Coral Charm'),
(5, 'White Cloud'),
(6, 'Sunset Orange'),
(6, 'Coral Pink'),
(6, 'Golden Yellow');
