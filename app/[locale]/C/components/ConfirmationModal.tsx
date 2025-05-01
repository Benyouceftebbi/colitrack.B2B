import React from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Phone } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, orderNumber }) => {
  if (!isOpen) return null;

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
          <div className="relative w-24 h-24 mb-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-500 via-[#4f4ce1] to-indigo-500 opacity-75 blur-lg" />
                <div className="relative bg-white rounded-full p-4">
                  <PartyPopper className="h-12 w-12 text-[#4f4ce1]" />
                </div>
              </div>
            </motion.div>
          </div>
          <h3 className="text-xl font-bold mb-2">شكراً لطلبك!</h3>
          <p className="text-center text-gray-600 mb-4">
            تم تأكيد طلبك رقم #{orderNumber} وجاري معالجته. سوف تتلقى رسالة تأكيد عبر البريد
            الإلكتروني قريباً.
          </p>
          <div className="w-full max-w-xs p-4 bg-[#4f4ce1]/10 rounded-lg mb-4">
            <p className="text-sm text-center font-medium text-[#4f4ce1]">
              الخطوة التالية: أرسل صورة الكتيب والطرد عبر واتساب
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-[#4f4ce1] font-medium">
            <Phone className="h-5 w-5" />
            <span>للدعم اتصل على: 0123456789</span>
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
};

export default ConfirmationModal;