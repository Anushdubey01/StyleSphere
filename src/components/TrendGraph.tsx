import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FASHION_TRENDS } from '../utils/constants';

interface TrendGraphProps {
  title: string;
  className?: string;
}

const TrendGraph: React.FC<TrendGraphProps> = ({ title, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FASHION_TRENDS}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis className="text-gray-600 dark:text-gray-400" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="minimalist" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              name="Minimalist"
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="vintage" 
              stroke="#F59E0B" 
              strokeWidth={3}
              name="Vintage"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="streetwear" 
              stroke="#EF4444" 
              strokeWidth={3}
              name="Streetwear"
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="formal" 
              stroke="#14B8A6" 
              strokeWidth={3}
              name="Formal"
              dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendGraph;