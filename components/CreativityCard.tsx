
import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CreativityCard: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <div className="flex-1 min-w-[280px] p-8 border border-gray-200 rounded-lg flex flex-col items-center text-center space-y-4 hover:border-black transition-colors duration-300">
      <div className="p-3 bg-gray-50 rounded-md">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
};

export default CreativityCard;
