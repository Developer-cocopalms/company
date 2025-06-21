import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  Users, 
  ShoppingCart, 
  Building2, 
  Utensils,
  Code,
  Laptop,
  Globe,
  Database,
  Server,
  Zap
} from 'lucide-react';

// Icon mapping object
const iconMap = {
  Monitor,
  Smartphone,
  Users,
  ShoppingCart,
  Building2,
  Utensils,
  Code,
  Laptop,
  Globe,
  Database,
  Server,
  Zap
};

const DynamicIcon = ({ iconName, className = "w-8 h-8" }) => {
  const IconComponent = iconMap[iconName];
  
  // Fallback to Monitor icon if the specified icon doesn't exist
  const FallbackIcon = iconMap.Monitor;
  
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found. Using Monitor as fallback.`);
    return <FallbackIcon className={className} />;
  }
  
  return <IconComponent className={className} />;
};

export default DynamicIcon;