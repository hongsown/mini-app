import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditableCell from '../components/EditableCell';
import ApiService from '../services/api';

const Pricelist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(new Set());
  const [currentLang, setCurrentLang] = useState('en');
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);


  useEffect(() => {
    loadProducts();
  }, []);

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-dropdown')) {
        setActionMenuOpen(null);
      }
      // Close language dropdown if clicking outside
      if (isLangDropdownOpen && !event.target.closest('.language-selector')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangDropdownOpen]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.fetchProducts();
      
      // Map API response to match frontend format
      const mappedProducts = response.data.map((product, index) => ({
        id: product.id,
        articleNo: String(product.id).padStart(3, '0'), // Generate article number from ID
        name: product.name,
        inPrice: product.in_price,
        price: product.price,
        unit: 'service', // Default value since not in DB
        inStock: '-', // Default value since not in DB
        description: product.description || '',
        category: product.category
      }));
      
      setProducts(mappedProducts);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  const toggleLangDropdown = (e) => {
    e.stopPropagation();
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleActionMenu = (productId) => {
    setActionMenuOpen(actionMenuOpen === productId ? null : productId);
  };

  const editProduct = (productId) => {
    // Implement edit functionality
    console.log('Edit product:', productId);
    setActionMenuOpen(null);
  };

  const deleteProduct = (productId) => {
    // Implement delete functionality
    console.log('Delete product:', productId);
    setActionMenuOpen(null);
  };

  const duplicateProduct = (productId) => {
    // Implement duplicate functionality
    console.log('Duplicate product:', productId);
    setActionMenuOpen(null);
  };

  const updateProduct = async (productId, field, value) => {
    try {
      // Add to updating set to show loading state
      setUpdating(prev => new Set([...prev, productId]));
      
      // Only allow updating fields that exist in database
      const allowedFields = {
        'name': 'name',
        'inPrice': 'in_price',
        'price': 'price',
        'description': 'description',
        'category': 'category'
      };
      
      // Skip update for fields not in database
      if (!allowedFields[field]) {
        console.warn(`Field ${field} is not updatable (not in database)`);
        return;
      }
      
      const apiField = allowedFields[field];
      const updateData = { [apiField]: value };
      
      // Call API to update product
      await ApiService.updateProduct(productId, updateData);
      
      // Update local state on success
      setProducts(prev => 
        prev.map(product => 
          product.id === productId 
            ? { ...product, [field]: value }
            : product
        )
      );
      
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product');
      
      // Optionally reload products to revert changes
      // await loadProducts();
    } finally {
      // Remove from updating set
      setUpdating(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesArticle = product.articleNo.toLowerCase().includes(searchArticle.toLowerCase());
    const matchesProduct = product.name.toLowerCase().includes(searchProduct.toLowerCase());
    return matchesArticle && matchesProduct;
  });

  return (
    <div className="app-layout">
      {/* Hamburger Menu Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="https://storage.123fakturera.se/public/icons/diamond.png" alt="Logo" className="sidebar-logo" />
          <span className="sidebar-title">123 Fakturera</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">📄</span>
            <span className="sidebar-text">Invoices</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">👥</span>
            <span className="sidebar-text">Customers</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">🏢</span>
            <span className="sidebar-text">My Business</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">📊</span>
            <span className="sidebar-text">Invoice Journal</span>
          </Link>
          <Link to="#" className="sidebar-item active">
            <span className="sidebar-icon">💰</span>
            <span className="sidebar-text">Price List</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">📋</span>
            <span className="sidebar-text">Multiple Invoicing</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">⚠️</span>
            <span className="sidebar-text">Unpaid Invoices</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">🎯</span>
            <span className="sidebar-text">Offer</span>
          </Link>
          <Link to="#" className="sidebar-item disabled">
            <span className="sidebar-icon">📦</span>
            <span className="sidebar-text">Inventory Control</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">👤</span>
            <span className="sidebar-text">Member Invoicing</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">🔄</span>
            <span className="sidebar-text">Import/Export</span>
          </Link>
          <Link to="#" className="sidebar-item">
            <span className="sidebar-icon">🚪</span>
            <span className="sidebar-text">Log out</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-layout">
        {/* Top Bar */}
        <header className="top-bar">
          <div className="top-bar-left">
            <div className="user-profile">
              <div className="avatar">👤</div>
              <div className="user-info">
                <span className="user-name">John Doe</span>
                <span className="user-company">Demo Company</span>
              </div>
            </div>
          </div>

         

          <div className="top-bar-right">
            <div className="language-selector">
              <div 
                className="language-trigger"
                onClick={toggleLangDropdown}
              >
                <div className="language-title-box">
                  <p className="language-name">
                    {currentLang === 'en' ? 'English' : 'Svenska'}
                  </p>
                  <img 
                    src={currentLang === 'en' 
                      ? "https://storage.123fakturere.no/public/flags/GB.png"
                      : "https://storage.123fakturere.no/public/flags/SE.png"
                    } 
                    className="flag-icon drop-down-image" 
                    alt={currentLang === 'en' ? 'English' : 'Svenska'} 
                  />
                 
                </div>
              </div>
              
              <div 
                className="language-dropdown"
                style={{ display: isLangDropdownOpen ? 'block' : 'none' }}
              >
                <div 
                  className="language-option" 
                  onClick={() => handleLanguageChange('sv')}
                >
                  <div className="drop-down-lang-name">Svenska</div>
                  <div className="drop-down-image-div">
                    <img 
                      src="https://storage.123fakturere.no/public/flags/SE.png" 
                      className="drop-down-image" 
                      alt="Svenska" 
                    />
                  </div>
                </div>
                <div 
                  className="language-option" 
                  onClick={() => handleLanguageChange('en')}
                >
                  <div className="drop-down-lang-name">English</div>
                  <div className="drop-down-image-div">
                    <img 
                      src="https://storage.123fakturere.no/public/flags/GB.png" 
                      className="drop-down-image" 
                      alt="English" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="content-area">
          <div className="content-header">
            <h1>Price List</h1>
            {error && (
              <div className="error-message" style={{
                background: '#fee', 
                border: '1px solid #fcc', 
                padding: '8px 12px', 
                borderRadius: '4px', 
                color: '#c33',
                marginBottom: '16px'
              }}>
                {error}
                <button 
                  onClick={() => setError(null)} 
                  style={{
                    marginLeft: '8px', 
                    background: 'none', 
                    border: 'none', 
                    color: '#c33', 
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            <div className="content-controls">
              <div className="search-filters">
                <input
                  type="text"
                  placeholder="Search Article No"
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                  className="search-input"
                />
                <input
                  type="text"
                  placeholder="Search Product"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="action-buttons">
              <button className="action-btn primary" title="New Product">
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14m7-7H5"/>
                </svg>
                <span className="btn-text">New Product</span>
              </button>
              <button className="action-btn secondary" title="Print List">
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
                </svg>
                <span className="btn-text">Print List</span>
              </button>
              <button className="action-btn secondary" title="Advanced mode">
                <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span className="btn-text">Advanced mode</span>
              </button>
              </div>
            </div>
          </div>

          <div className="table-container">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                Loading products...
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="products-table">
                <thead>
                  <tr>
                    <th className="col-article desktop-only">Article No</th>
                    <th className="col-product">Product/Service</th>
                    <th className="col-in-price desktop-only">In Price</th>
                    <th className="col-price">Price</th>
                    <th className="col-unit desktop-only">Unit</th>
                    <th className="col-stock desktop-only">In Stock</th>
                    <th className="col-description desktop-only">Description</th>
                    <th className="col-action"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="product-row">
                      <td className="col-article desktop-only">
                        <EditableCell
                          value={product.articleNo}
                          onSave={(value) => updateProduct(product.id, 'articleNo', value)}
                          placeholder="000"
                        />
                      </td>
                      <td className="col-product">
                        <EditableCell
                          value={product.name}
                          onSave={(value) => updateProduct(product.id, 'name', value)}
                          placeholder="Enter product name"
                        />
                      </td>
                      <td className="col-in-price desktop-only">
                        <EditableCell
                          value={product.inPrice}
                          onSave={(value) => updateProduct(product.id, 'inPrice', value)}
                          type="number"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="col-price">
                        <EditableCell
                          value={product.price}
                          onSave={(value) => updateProduct(product.id, 'price', value)}
                          type="number"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="col-unit desktop-only">
                        <EditableCell
                          value={product.unit}
                          onSave={(value) => updateProduct(product.id, 'unit', value)}
                          placeholder="unit"
                        />
                      </td>
                      <td className="col-stock desktop-only">
                        <EditableCell
                          value={product.inStock}
                          onSave={(value) => updateProduct(product.id, 'inStock', value)}
                          placeholder="-"
                        />
                      </td>
                      <td className="col-description desktop-only">
                        <EditableCell
                          value={product.description}
                          onSave={(value) => updateProduct(product.id, 'description', value)}
                          placeholder="Enter description"
                        />
                      </td>
                      <td className="col-action">
                        <div className="action-dropdown">
                          <button className="action-button" onClick={() => toggleActionMenu(product.id)}>
                            ⋯
                          </button>
                          {actionMenuOpen === product.id && (
                            <div className="action-menu">
                              <button onClick={() => editProduct(product.id)}>Edit</button>
                              <button onClick={() => deleteProduct(product.id)}>Delete</button>
                              <button onClick={() => duplicateProduct(product.id)}>Duplicate</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pricelist;