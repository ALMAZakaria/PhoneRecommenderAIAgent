import React from 'react';
import { CellPhone } from '../types';
import { Smartphone, Battery, HardDrive, Calendar, DollarSign } from 'lucide-react';

interface CellPhoneCardProps {
  cellphone: CellPhone;
  onSelect?: (cellphone: CellPhone) => void;
}

const CellPhoneCard: React.FC<CellPhoneCardProps> = ({ cellphone, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              {cellphone.brand} {cellphone.model}
            </h3>
          </div>
          <span className="text-xs text-gray-500">#{cellphone.id}</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-1 mb-3">
          <DollarSign className="w-3 h-3 text-green-600" />
          <span className="text-lg font-bold text-green-600">
            ${cellphone.price.toFixed(0)}
          </span>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Year */}
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Year</p>
              <p className="text-xs font-medium text-gray-900">{cellphone.year}</p>
            </div>
          </div>

          {/* Storage */}
          {cellphone.storage && (
            <div className="flex items-center space-x-1">
              <HardDrive className="w-3 h-3 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Storage</p>
                <p className="text-xs font-medium text-gray-900">{cellphone.storage}</p>
              </div>
            </div>
          )}

          {/* Battery Life */}
          {cellphone.battery_life && (
            <div className="flex items-center space-x-1 col-span-2">
              <Battery className="w-3 h-3 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Battery</p>
                <p className="text-xs font-medium text-gray-900">{cellphone.battery_life}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {onSelect && (
          <button
            onClick={() => onSelect(cellphone)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <Smartphone className="w-3 h-3" />
            <span>Select This Phone</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CellPhoneCard; 