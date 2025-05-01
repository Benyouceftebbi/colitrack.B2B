import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type: 'success' | 'cancel';
}

const ConfirmationModals: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, type }) => {
  if (!open) return null;

  if (type === 'success') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-center text-2xl font-bold text-[#4f4ce1]">تم تأكيد الطلب!</h2>
            <p className="text-center text-gray-600">تم تقديم طلبك بنجاح.</p>
          </div>
          
          <div className="flex flex-col items-center py-6 px-4">
            <div className="relative w-64 h-64 mb-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-[#4f4ce1] to-indigo-500 opacity-75 blur-lg" />
                  <div className="relative bg-white rounded-full p-8">
                    <PartyPopper className="h-16 w-16 text-[#4f4ce1]" />
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style={{ zIndex: -1 }}
              >
                <svg width="240" height="240" viewBox="0 0 240 240">
                  <defs>
                    <filter id="graffiti" x="-20%" y="-20%" width="140%" height="140%">
                      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                      <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
                    </filter>
                  </defs>
                  <g filter="url(#graffiti)">
                    <circle
                      cx="120"
                      cy="120"
                      r="100"
                      fill="none"
                      stroke="#4f4ce1"
                      strokeWidth="8"
                      strokeDasharray="15 10"
                    />
                    <path d="M70,120 C90,90 150,90 170,120" fill="none" stroke="#4f4ce1" strokeWidth="6" />
                    <path d="M80,80 L100,60 L120,80 L140,60 L160,80" fill="none" stroke="#4f4ce1" strokeWidth="4" />
                  </g>
                </svg>
              </motion.div>
            </div>
            <h3 className="text-xl font-bold mb-2">شكراً لطلبك!</h3>
            <p className="text-center text-gray-600 mb-4">
              تم تأكيد طلبك رقم #{Math.floor(Math.random() * 10000)} وجاري معالجته. سوف تتلقى رسالة تأكيد عبر البريد
              الإلكتروني قريباً.
            </p>
            <div className="w-full max-w-xs p-4 bg-[#4f4ce1]/10 rounded-lg">
              <p className="text-sm text-center font-medium text-[#4f4ce1]">
                الخطوة التالية: أرسل صورة الكتيب والطرد عبر واتساب
              </p>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#4f4ce1] text-white py-3 px-4 rounded-lg font-bold"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(79, 76, 225, 0)",
                  "0 0 15px rgba(79, 76, 225, 0.7)",
                  "0 0 0 rgba(79, 76, 225, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              متابعة
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden border border-red-200"
      >
        <div className="p-4 border-b border-red-100">
          <h2 className="text-center text-2xl font-bold text-red-600">إلغاء الطلب؟</h2>
          <p className="text-center text-gray-700">هل أنت متأكد من رغبتك في إلغاء الطلب؟</p>
        </div>
        
        <div className="flex flex-col items-center py-6 px-4">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-center text-gray-600 mb-6">
            لا يمكن التراجع عن هذا الإجراء. سيتم إلغاء طلبك ولن يتم خصم أي رسوم.
          </p>
          <div className="w-full p-4 bg-red-50 rounded-lg border border-red-100">
            <p className="text-sm text-center text-red-600">سيتم إلغاء جميع العناصر في طلبك من المعالجة.</p>
          </div>
        </div>
        
        <div className="p-4 border-t border-red-100 flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-1/2 border border-gray-200 bg-white text-gray-800 py-3 px-4 rounded-lg font-bold"
          >
            الاحتفاظ بطلبي
          </motion.button>
          <motion.button
            onClick={onConfirm}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold"
          >
            نعم، إلغاء الطلب
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModals;