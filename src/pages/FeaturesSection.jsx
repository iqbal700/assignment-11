import React from 'react';
import { Heart, Users, MapPin } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      title: "Become a Lifesaver",
      description: "Your single donation can save up to three lives. Join our community of heroes and start making a real difference today.",
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      bgColor: "bg-rose-50",
      accentColor: "group-hover:bg-rose-500"
    },
    {
      title: "Find Nearby Centers",
      description: "Quickly locate the nearest blood donation centers or mobile camps. Real-time availability and easy appointment booking.",
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      bgColor: "bg-blue-50",
      accentColor: "group-hover:bg-blue-500"
    },
    {
      title: "Emergency Network",
      description: "In urgent cases, our rapid response network connects donors with patients in minutes to ensure no life is lost.",
      icon: <Users className="w-8 h-8 text-emerald-500" />,
      bgColor: "bg-emerald-50",
      accentColor: "group-hover:bg-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-red-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Impact</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Making a Difference Together
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We bridge the gap between donors and those in need, ensuring a safe and efficient process for everyone involved.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-10 bg-white rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-100/50 hover:-translate-y-3"
            >
              {/* Icon Container */}
              <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${feature.accentColor}`}>
                <div className="group-hover:text-white transition-colors duration-500 transform group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-24 h-24 bg-rose-50 rounded-full -mr-12 -mt-12 blur-3xl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;