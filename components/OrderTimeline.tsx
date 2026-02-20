import React from 'react';
import { motion } from 'framer-motion';

interface TimelineStep {
  status: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

interface OrderTimelineProps {
  steps: TimelineStep[];
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4">
          {/* Timeline dot */}
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                step.completed || step.current 
                  ? 'bg-primary-500/20 text-primary-300 border border-primary-500/50' 
                  : 'bg-secondary-700 text-secondary-400 border border-secondary-600'
              }`}
            >
              {step.completed ? <i className="fas fa-check"></i> : index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-12 mt-2 ${step.completed ? 'bg-primary-500' : 'bg-secondary-700'}`}></div>
            )}
          </div>

          {/* Timeline content */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pb-4"
          >
            <h4 className={`font-semibold ${step.completed || step.current ? 'text-secondary-50' : 'text-secondary-400'}`}>
              {step.status}
            </h4>
            <p className="text-sm text-secondary-500 mt-1">{step.timestamp}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
