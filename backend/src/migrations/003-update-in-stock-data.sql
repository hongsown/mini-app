-- Migration to update in_stock field with sample data
-- Update products with realistic stock quantities

UPDATE products SET in_stock = 
  CASE 
    -- Development services (project-based, limited availability)
    WHEN category = 'Development' AND name LIKE '%Basic%' THEN 5
    WHEN category = 'Development' AND name LIKE '%Premium%' THEN 3
    WHEN category = 'Development' AND name LIKE '%Mobile App%' THEN 2
    WHEN category = 'Development' AND name LIKE '%E-commerce%' THEN 4
    WHEN category = 'Development' AND name LIKE '%Database%' THEN 6
    WHEN category = 'Development' AND name LIKE '%API%' THEN 8
    WHEN category = 'Development' AND name LIKE '%Plugin%' THEN 10
    
    -- Design services (creative work, moderate availability)
    WHEN category = 'Design' AND name LIKE '%Logo%' THEN 15
    WHEN category = 'Design' AND name LIKE '%Branding%' THEN 8
    WHEN category = 'Design' AND name LIKE '%UI/UX%' THEN 12
    
    -- Marketing services (campaign-based, good availability)
    WHEN category = 'Marketing' AND name LIKE '%SEO%' THEN 20
    WHEN category = 'Marketing' AND name LIKE '%Google Ads%' THEN 25
    WHEN category = 'Marketing' AND name LIKE '%Social Media%' THEN 18
    WHEN category = 'Marketing' AND name LIKE '%Email Marketing%' THEN 30
    
    -- Support services (ongoing, high availability)
    WHEN category = 'Support' AND name LIKE '%Maintenance%' THEN 50
    WHEN category = 'Support' AND name LIKE '%Training%' THEN 40
    WHEN category = 'Support' AND name LIKE '%Backup%' THEN 100
    
    -- Infrastructure services (setup-based, moderate availability)
    WHEN category = 'Infrastructure' AND name LIKE '%Server%' THEN 15
    WHEN category = 'Infrastructure' AND name LIKE '%Domain%' THEN 200
    
    -- Security services (specialized, limited availability)
    WHEN category = 'Security' AND name LIKE '%Audit%' THEN 5
    WHEN category = 'Security' AND name LIKE '%SSL%' THEN 150
    
    -- Content services (scalable, high availability)
    WHEN category = 'Content' THEN 75
    
    -- Analytics services (setup-based, good availability)
    WHEN category = 'Analytics' THEN 35
    
    -- Optimization services (performance-based, moderate availability)
    WHEN category = 'Optimization' THEN 25
    
    -- Default case for any uncategorized items
    ELSE 10
  END
WHERE in_stock = 0 OR in_stock IS NULL;