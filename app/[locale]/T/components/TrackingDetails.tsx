import { ShipmentStep } from '../types';
import { ShipmentTimeline } from './ShipmentTimeline';
import { AlertTriangle } from 'lucide-react';
import {useTranslations} from 'next-intl';
import '../index.css'
interface TrackingDetailsProps {
  trackingNumber: string;
  steps: ShipmentStep[];
}
function getProgressPercentage(steps: ShipmentStep[], lastStep: ShipmentStep): number {
  if (lastStep.status === 'delivered') {
    return 100;
  }
  
  if (lastStep.status === "alert" || 
    lastStep.status === "delivery-attempt-failed" || 
    lastStep.status === "delivery-failed" || 
    lastStep.status === "returning-to-center" || 
    lastStep.status === "returned-to-center" || 
    lastStep.status === "exchange-failed") {
  return 25;
}

  const totalSteps = steps.length;
  if (totalSteps <= 2) {
    return 25;
  } else if (totalSteps <= 5) {
    return 50;
  } else {
    return 75;
  }
}
export function TrackingDetails({ trackingNumber, steps }: TrackingDetailsProps) {
  const t  = useTranslations('tracking');
  const hasIssues = steps.some(step => step.isIssue);
  const lastStep = steps[steps.length - 1];
  const isDelivered = steps.some(step => step.status === 'delivered'); // New check for delivered status
  console.log(getProgressPercentage(steps, lastStep)); // Check the value
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeInUp">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 animate-fadeIn">
              {t('trackingDetails')}
            </h2>
            <p className="text-gray-600 animate-fadeIn animation-delay-100">
              {t('trackingNumber')}: {trackingNumber}
            </p>
          </div>
          {hasIssues && isDelivered ? ( // New condition for issues and delivered status
      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium animate-bounce">
              {t('delivered')} 
            </span>
          ) : hasIssues ? (
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-medium flex items-center gap-2 animate-bounce">
              <AlertTriangle size={18} />
              {t('deliveryIssue')}
            </span>
          ) : isDelivered ? (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium animate-bounce">
              {t('delivered')}
            </span>
          ) : (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium animate-bounce">
              {t('onSchedule')}
            </span>
          )}
        </div>
        <div className="h-2 bg-gray-100 rounded-full relative mb-8 overflow-hidden">
          <div 
            className={`absolute left-0 top-0 h-full rounded-full animate-progress-bar ${
                hasIssues && !isDelivered ? 'bg-red-500' : isDelivered ? 'bg-green-500' : 'bg-indigo-600'
            }`}
            style={{
              animation: 'progressBar 1.5s ease-out forwards',
              '--progress-width': `${getProgressPercentage(steps, lastStep)}%`
            } as React.CSSProperties}
          />
        </div>

        {hasIssues && !isDelivered && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6 animate-fadeIn">
            <h3 className="text-red-800 font-semibold flex items-center gap-2">
              <AlertTriangle size={20} />
              {t('deliveryStatusUpdate')}
            </h3>
            <p className="text-red-600 mt-2">
              {t('deliveryIssuesMessage')}
            </p>
          </div>
        )}
      </div>

      <ShipmentTimeline steps={steps} />
    </div>
  );
}