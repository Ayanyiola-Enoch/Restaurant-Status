import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import OpeningHoursSection from './components/OpeningHoursSection';
import MenuSection from './components/MenuSection';
import DishModal from './components/DishModal';
import Footer from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { getRealtimeStatus } from './lib/utils';

function App() {
  const [status, setStatus] = useState(getRealtimeStatus());
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  // Keep live status refreshed every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getRealtimeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = dish.name.toLowerCase().includes(query);
      const matchesDesc = dish.description.toLowerCase().includes(query);
      const matchesIngredients = dish.ingredients?.some(i => i.toLowerCase().includes(query));

      return matchesCategory && (matchesName || matchesDesc || matchesIngredients);
    });
  }, [activeCategory, searchQuery]);

  const handleOpenSchedule = () => {
    const el = document.getElementById('hours');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#1E6FBA] selection:text-white">
      {/* 1. Navigation Header */}
      <Navbar status={status} onOpenSchedule={handleOpenSchedule} />

      <main className="flex-1">
        {/* 2. Hero Section: "Our Heritage on a Plate" */}
        <HeroSection />

        {/* 3. About G&G Section with Floating Quote Box */}
        <AboutSection />

        {/* 4. Opening Hours & Live Status / Reservations Dual Cards */}
        <OpeningHoursSection status={status} />

        {/* 5. Menu Sections: Regular, Soups & Solids, Specials, Extras */}
        <MenuSection
          dishes={filteredDishes}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectDish={setSelectedDish}
        />
      </main>

      {/* 6. Royal Blue Footer */}
      <Footer />

      {/* 7. Dish Customization & WhatsApp Order Modal */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}

export default App;
