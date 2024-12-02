
import {
  Package,
  Truck,
  MapPin,
  AlertTriangle,
  PhoneOff,
  Building2,
  Box,
  RotateCcw,
  PackageCheck,
} from "lucide-react";
import { ShipmentStep, ShipmentStatus, DeliveryAttempt } from "../types";
import {useTranslations} from 'next-intl';
import '../index.css'
interface ShipmentTimelineProps {
  steps: ShipmentStep[];
}

export function ShipmentTimeline({ steps }: ShipmentTimelineProps) {
  const t = useTranslations();

  function DeliveryAttempts({ attempts }: { attempts: DeliveryAttempt[] }) {
    return (
      <div className="mt-3 space-y-2">
        {attempts.map((attempt, index) => (
          <div
            key={index}
            className="bg-red-50 rounded-lg p-3 text-sm border border-red-100"
          >
            <div className="flex items-center gap-2 text-red-700">
              <PhoneOff size={16} />
              <span className="font-medium">
                {t('deliveryAttempt', { number: index + 1 })}
              </span>
            </div>
            <p className="text-red-600 mt-1">{attempt.notes}</p>
            <p className="text-red-500 text-xs mt-1">{attempt.date}</p>
          </div>
        ))}
      </div>
    );
  }

  const getStatusIcon = (status: ShipmentStatus) => {
    switch (status) {
      case "in-preparation":
        return Box;
      case "transfer":
        return Truck;
      case "shipped":
        return Package;
      case "distribution-center":
        return Building2;
      case "en-route-to-region":
        return Truck;
      case "arrived-at-region":
        return MapPin;
      case "ready-for-pickup":
        return Package;
      case "out-for-delivery":
        return Truck;
      case "delivered":
        return PackageCheck;
      case "alert":
        return AlertTriangle;
      case "delivery-attempt-failed":
        return PhoneOff;
      case "delivery-failed":
        return AlertTriangle;
      case "returning-to-center":
        return RotateCcw;
      case "returned-to-center":
        return Building2;
      case "exchange-failed":
        return AlertTriangle;
      default:
        return Package;
    }
  };

  const getStatusColor = (step: ShipmentStep) => {
    if (
      step.status === "alert" ||
      step.status === "delivery-failed" ||
      step.status === 'delivery-attempt-failed'||
      step.status === 'returning-to-center'||
     step.status === 'returned-to-center'||
     step.status === 'exchange-failed'
    ) {
      return "bg-red-100 text-red-600";
    }
    if (step.status === 'delivered') {
      return "bg-green-100 text-green-600";
    }
    return "bg-indigo-100 text-indigo-600";
  };

  return (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const Icon = getStatusIcon(step.status);
        const delay = index * 150;

        return (
          <div
            key={index}
            className="flex gap-6 opacity-0 animate-slideInFromRight"
            style={{
              animationDelay: `${delay}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div className="relative">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
                ${getStatusColor(step)}`}
              >
                <Icon
                  size={24}
                  className={step.isIssue ? "animate-bounce" : "animate-pulse"}
                />
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 bottom-0 w-0.5 -ml-[1px] bg-gray-200">
                  <div
                    className={`h-full transform origin-top ${
                      step.isIssue ? "bg-red-400" : "bg-indigo-600"
                    }`}
                    style={{
                      transform:
                        index <= steps.length - 2 ? "scaleY(1)" : "scaleY(0)",
                      transition: "transform 0.5s ease",
                      transitionDelay: `${delay + 300}ms`,
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex-1 pb-8">
              <h3
                className={`text-lg font-semibold mb-1 ${
                  step.isIssue ? "text-red-600" : "text-gray-900"
                }`}
              >
                {t(`statusLabels.${step.status}`)}
              </h3>
              <p
                className={`mb-2 ${
                  step.isIssue ? "text-red-500" : "text-gray-600"
                }`}
              >
                {t(`statusDescriptions.${step.status}`)}
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{step.date}</span>
                <span>•</span>
                <span>{step.location}</span>
              </div>
              {step.deliveryAttempts && (
                <DeliveryAttempts attempts={step.deliveryAttempts} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
