import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroStatus from './components/HeroStatus';
import MenuSection from './components/MenuSection';
import OpeningHoursSection from './components/OpeningHoursSection';
import DishModal from './components/DishModal';
import Footer from './components/Footer';
import { MENU_ITEMS } from './data/menuData';
import { getRealtimeStatus } from './lib/utils';

function App() {
  const [status, setStatus] = useState(getRealtimeStatus());
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);

  // Update status every 60 seconds to keep live badge accurate
  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getRealtimeStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filtered dishes based on active category tab and search query
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
    const el = document.getElementById('schedule');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar status={status} onOpenSchedule={handleOpenSchedule} />

      <main className="flex-1">
        {/* Hero & Status Banner */}
        <HeroStatus status={status} onOpenSchedule={handleOpenSchedule} />

        {/* Full Menu Catalog Section */}
        <MenuSection
          dishes={filteredDishes}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectDish={setSelectedDish}
        />

        {/* Opening Hours & 4-Week Sunday Schedule Forecast */}
        <OpeningHoursSection status={status} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Dish Customization & WhatsApp Order Modal */}
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
