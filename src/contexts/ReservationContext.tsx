import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/types/types';
import { toast } from 'sonner';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface ReservationContextType {
  selectedItems: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearReservation: () => void;
  totalCount: number;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);

  // Load from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('selected_reservations');
    if (saved) {
      try {
        setSelectedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved reservations', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('selected_reservations', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const addItem = (item: MenuItem) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setSelectedItems((prev) => 
      prev.map((i) => i.id === itemId ? { ...i, quantity } : i)
    );
  };

  const clearReservation = () => {
    setSelectedItems([]);
  };

  const totalCount = selectedItems.length;

  return (
    <ReservationContext.Provider value={{ selectedItems, addItem, removeItem, updateQuantity, clearReservation, totalCount }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};
