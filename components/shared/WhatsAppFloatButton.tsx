'use client'

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WhatsAppFloatButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

const WhatsAppFloatButton: React.FC<WhatsAppFloatButtonProps> = ({ 
  phoneNumber, 
  message = 'Hello, my name is [___]. I would like to chat with you about [___].', 
  className 
}) => {
  const handleWhatsAppClick = () => {
    const formattedPhone = phoneNumber.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={cn(
      'fixed bottom-6 right-6 z-50 transition-all duration-300 hover:scale-110',
      className
    )}>
      <Button 
        onClick={handleWhatsAppClick}
        variant="default"
        size="icon"
        className="bg-[#1ebc58bb] hover:bg-[#f8d37d] text-white rounded-full shadow-lg w-14 h-14"
      >
        <MessageCircle className="w-8 h-8" />
      </Button>
    </div>
  );
};

export default WhatsAppFloatButton;