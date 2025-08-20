-- Migration: Create initial database tables

-- Create terms_texts table for storing translated terms content
CREATE TABLE terms_texts (
    id SERIAL PRIMARY KEY,
    lang VARCHAR(2) NOT NULL CHECK (lang IN ('en', 'sv')),
    section VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table for pricelist functionality
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    in_price DECIMAL(10,2),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_terms_texts_lang_section ON terms_texts(lang, section);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);

-- Insert sample terms data (English)
INSERT INTO terms_texts (lang, section, content) VALUES
('en', 'header', '123 Fakturera - Terms of Service'),
('en', 'introduction', 'Welcome to 123 Fakturera. These terms of service govern your use of our invoicing platform.'),
('en', 'service_description', 'Our Service Description'),
('en', 'service_content', '123 Fakturera provides an online invoicing platform that allows users to create, send, and manage invoices efficiently. Our service includes invoice templates, customer management, and reporting features.'),
('en', 'user_obligations', 'User Obligations'),
('en', 'user_content', 'Users are responsible for maintaining accurate account information, keeping login credentials secure, and ensuring all invoice data is correct and compliant with applicable laws.'),
('en', 'privacy_policy', 'Privacy Policy'),
('en', 'privacy_content', 'We respect your privacy and handle your personal data in accordance with GDPR and applicable privacy laws. Your invoice data is encrypted and stored securely.'),
('en', 'limitation_liability', 'Limitation of Liability'),
('en', 'liability_content', '123 Fakturera shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our service.'),
('en', 'termination', 'Termination'),
('en', 'termination_content', 'Either party may terminate this agreement at any time. Upon termination, you will retain access to your data for 30 days before deletion.');

-- Insert sample terms data (Swedish)
INSERT INTO terms_texts (lang, section, content) VALUES
('sv', 'header', '123 Fakturera - Användarvillkor'),
('sv', 'introduction', 'Välkommen till 123 Fakturera. Dessa användarvillkor reglerar din användning av vår faktureringsplattform.'),
('sv', 'service_description', 'Vår Servicebeskrivning'),
('sv', 'service_content', '123 Fakturera tillhandahåller en online-faktureringsplattform som låter användare skapa, skicka och hantera fakturor effektivt. Vår tjänst inkluderar fakturamallar, kundhantering och rapporteringsfunktioner.'),
('sv', 'user_obligations', 'Användarförpliktelser'),
('sv', 'user_content', 'Användare är ansvariga för att upprätthålla korrekt kontoinformation, hålla inloggningsuppgifter säkra och säkerställa att all fakturadata är korrekt och följer tillämpliga lagar.'),
('sv', 'privacy_policy', 'Integritetspolicy'),
('sv', 'privacy_content', 'Vi respekterar din integritet och hanterar dina personuppgifter i enlighet med GDPR och tillämpliga integritetslagar. Dina fakturadata är krypterade och lagras säkert.'),
('sv', 'limitation_liability', 'Ansvarsbegränsning'),
('sv', 'liability_content', '123 Fakturera ska inte vara ansvarig för eventuella indirekta, tillfälliga, särskilda eller följdskador som uppstår från användningen av vår tjänst.'),
('sv', 'termination', 'Uppsägning'),
('sv', 'termination_content', 'Endera parten kan säga upp detta avtal när som helst. Vid uppsägning behåller du tillgång till dina data i 30 dagar innan de raderas.');

-- Insert sample products data (20+ items for scrolling test)
INSERT INTO products (name, in_price, price, category, description) VALUES
('Web Development - Basic Package', 800.00, 1200.00, 'Development', 'Basic website development with up to 5 pages'),
('Web Development - Premium Package', 1500.00, 2500.00, 'Development', 'Advanced website with custom features and CMS'),
('Mobile App Development - iOS', 2000.00, 3500.00, 'Development', 'Native iOS application development'),
('Mobile App Development - Android', 1800.00, 3200.00, 'Development', 'Native Android application development'),
('Logo Design', 300.00, 600.00, 'Design', 'Professional logo design with 3 concepts'),
('Branding Package', 800.00, 1500.00, 'Design', 'Complete branding package including logo, colors, fonts'),
('SEO Optimization', 500.00, 900.00, 'Marketing', 'Search engine optimization for better rankings'),
('Google Ads Campaign', 400.00, 800.00, 'Marketing', 'Setup and management of Google Ads campaigns'),
('Social Media Management', 600.00, 1100.00, 'Marketing', 'Monthly social media content and management'),
('E-commerce Setup', 1200.00, 2000.00, 'Development', 'Complete e-commerce store setup with payment integration'),
('Database Design', 700.00, 1300.00, 'Development', 'Custom database design and optimization'),
('API Development', 900.00, 1600.00, 'Development', 'RESTful API development and documentation'),
('UI/UX Design', 800.00, 1400.00, 'Design', 'User interface and experience design'),
('Website Maintenance', 200.00, 400.00, 'Support', 'Monthly website maintenance and updates'),
('Server Setup', 600.00, 1000.00, 'Infrastructure', 'Cloud server setup and configuration'),
('Security Audit', 800.00, 1500.00, 'Security', 'Comprehensive security audit and recommendations'),
('Content Writing', 150.00, 300.00, 'Content', 'Professional content writing per page'),
('Email Marketing Setup', 400.00, 700.00, 'Marketing', 'Email marketing campaign setup and templates'),
('Analytics Setup', 300.00, 500.00, 'Analytics', 'Google Analytics and tracking implementation'),
('Training Session', 200.00, 350.00, 'Support', 'One-on-one training session (per hour)'),
('Custom Plugin Development', 1000.00, 1800.00, 'Development', 'Custom WordPress or CMS plugin development'),
('Performance Optimization', 500.00, 900.00, 'Optimization', 'Website speed and performance optimization'),
('Backup Solution', 100.00, 200.00, 'Support', 'Automated backup solution setup'),
('SSL Certificate Installation', 50.00, 100.00, 'Security', 'SSL certificate purchase and installation'),
('Domain Setup', 75.00, 150.00, 'Infrastructure', 'Domain registration and DNS configuration');