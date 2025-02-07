import { useShop } from "@/app/context/ShopContext"
import { columns } from "./columns"
import { DataTable } from "./data-table"


export const smsHistory: any[] = [
  {
    id: '1',
    recipient: '+1234567890',
    template: 'expedited',
    status: 'delivered',
    sentAt: '2024-03-20T10:30:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    recipient: '+1987654321',
    template: 'out_for_delivery',
    status: 'pending',
    sentAt: '2024-03-20T10:25:00Z',
    trackingNumber: 'TRK987654321'
  },
  {
    id: '3',
    recipient: '+1122334455',
    template: 'stop_desk',
    status: 'failed',
    sentAt: '2024-03-20T10:20:00Z',
    trackingNumber: 'TRK456789123'
  }
]
export function SMSHistory() {
  const {shopData}=useShop()
  console.log("data ",shopData.sms);
  
  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold glow">Recent Messages</h3>
      </div>
      <DataTable columns={columns} data={shopData.sms} />
    </div>
  )
}