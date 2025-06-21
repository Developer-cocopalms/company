import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DynamicIcon from '../components/DynamicIcon';
import { useServices } from './hooks/useServices';



// Import images (keep your existing imports)
import webdevImage from '../assets/webdev.jpg';
import mobileappImage from '../assets/mobileapp.jpg';
import erpImage from '../assets/erp.jpg';
import ecomImage from '../assets/ecom.jpg';
import rentingsImage from '../assets/rentings.jpg';
import fbImage from '../assets/fb1.png';

const WhatWeDo = () => {
  const location = useLocation();
  const { services, loading, error } = useServices();

  // Image mapping for your local images
  const imageMap = {
    'webdev.jpg': webdevImage,
    'mobileapp.jpg': mobileappImage,
    'erp.jpg': erpImage,
    'ecom.jpg': ecomImage,
    'rentings.jpg': rentingsImage,
    'fb1.png': fbImage,
  };

  // Handle anchor navigation when component mounts or hash changes
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading services: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Custom Teal Background */}
      <section className="bg-custom-teal py-20 md:py-32 px-4 mt-24 md:mt-24">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            What We Do?
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 mb-6 md:mb-8">
            Empowering Your Business with Technology
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
            As a leading IT company in Kuwait, Cocoplams partners with you to drive software innovation and deliver market-leading solutions. Our expert IT services tackle your complex business problems head-on with tailored technological solutions.
          </p>
        </div>
      </section>

      {/* Dynamic Services Sections */}
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
        const serviceImage = imageMap[service.image_url] || service.image_url;
        
        return (
          <section
            key={service.id}
            id={service.slug}
            className={`py-12 md:py-16 lg:py-20 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} scroll-mt-20`}
          >
            <div className="container mx-auto max-w-7xl">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content Side */}
                <div className={`${!isEven ? 'lg:col-start-2' : ''} px-2 md:px-0`}>
                  <div className={`${service.icon_bg} w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-6 md:mb-8 inline-flex`}>
                    <DynamicIcon 
                      iconName={service.icon_name} 
                      className={`w-8 h-8 md:w-10 md:h-10 ${service.icon_color}`} 
                    />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                    {service.title}
                  </h2>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-6">
                    {service.subtitle}
                  </h3>
                  
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Visual Side with Image */}
                <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''} px-2 md:px-0`}>
                  <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={serviceImage} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image: ${service.image_url}`);
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <h4 className="text-lg md:text-xl font-bold mb-1">{service.title}</h4>
                      <p className="text-sm md:text-base text-white/80">{service.service_name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Call to Action Section */}
      <section className="py-16 md:py-20 px-4 bg-custom-teal">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 px-2">
            Transforming Your Ideas into Reality: Your Trusted Technology Partner.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Let's discuss how our comprehensive IT solutions can help you achieve your business goals and drive digital transformation. Cocopalms is a leading IT company in Kuwait,
            dedicated to delivering trustworthy and guaranteed services. Contact us today to turn your vision into tangible success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              to="/contact" 
              className="bg-white text-teal-600 hover:bg-gray-100 px-6 md:px-8 py-3 rounded-lg font-medium transition duration-300 inline-block text-center"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeDo;