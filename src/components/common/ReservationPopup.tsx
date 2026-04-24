import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReservation } from '@/contexts/ReservationContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Plus, Minus, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const ReservationPopup: React.FC = () => {
  const { selectedItems, totalCount, removeItem, updateQuantity } = useReservation();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on the reservation page itself
  if (location.pathname === '/reservation' || totalCount === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 max-w-xs sm:max-w-sm w-full"
      >
        <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div 
            className="p-4 flex items-center justify-between gap-4 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg relative">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalCount}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Your Selection
                </p>
                <p className="text-xs text-muted-foreground">
                  {isExpanded ? 'Click to collapse' : 'Click to view items'}
                </p>
              </div>
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
          </div>

          {/* Items List */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-border"
              >
                <ScrollArea className="max-h-[300px] p-4">
                  <div className="flex flex-col gap-4">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 group">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate" title={item.name}>
                            {item.name}
                          </p>
                          <p className="text-xs text-primary font-medium">{item.price}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="p-1 hover:bg-background rounded-md transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold min-w-[1.2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className="p-1 hover:bg-background rounded-md transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Actions */}
          <div className="p-4 bg-background border-t border-border">
            <Button 
              className="w-full rounded-lg text-sm font-medium h-10 shadow-sm"
              onClick={() => navigate('/reservation')}
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationPopup;
