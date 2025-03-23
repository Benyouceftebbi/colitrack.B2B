"use client"
import { useState, useEffect } from 'react';
import { TrackingDetails } from './components/TrackingDetails';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useTranslations } from 'next-intl';
import './index.css'
export default function App() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [shipmentSteps, setShipmentSteps] = useState<ShipmentStep[]>([]);
  const t  = useTranslations('tracking');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackingParam = params.get('tr');

    if (trackingParam) {

      
      const fetchTrackingData = async () => {
        try {
          const trackingDoc = await getDoc(doc(db, 'Tracking', trackingParam));
          if (trackingDoc.exists()) {
            await setDoc(doc(db, 'Tracking',  trackingParam  ), { opened: true }, { merge: true });
            setShipmentSteps(trackingDoc.data().shippmentTrack|| []);
            setTrackingNumber(trackingParam);
            setIsTracking(true);
          } else {
            console.log('No tracking data found');
          }
        } catch (error) {
          console.error('Error fetching tracking data:', error);
        }
      };
      
      fetchTrackingData();
    }
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 animate-gradient">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeInDown">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('trackYourShipment')}
          </h1>
          <p className="text-gray-600">
            {t('enterTrackingNumber')}
          </p>
        </div>

        {isTracking && (
          <TrackingDetails
            trackingNumber={trackingNumber}
            steps={shipmentSteps}
          />
        )}
      </div>
    </div>
  );
}