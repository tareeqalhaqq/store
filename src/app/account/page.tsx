import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock order data
const mockOrders = [
  { id: 'ORD-12345', date: '2023-10-26', total: 85.00, status: 'Delivered' },
  { id: 'ORD-67890', date: '2023-10-20', total: 55.00, status: 'Delivered' },
];

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <h1 className="text-3xl font-bold font-headline mb-8">My Account</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-semibold">Name:</span> Abdullah Ibn Umar</p>
              <p><span className="font-semibold">Email:</span> abdullah@example.com</p>
              <p className="text-sm text-primary hover:underline cursor-pointer">Edit Profile</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order, index) => (
                  <div key={order.id}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="font-semibold">Order ID</p>
                        <p>{order.id}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Date</p>
                        <p>{order.date}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Total</p>
                        <p>${order.total.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Status</p>
                        <p className={order.status === 'Delivered' ? 'text-green-600' : ''}>{order.status}</p>
                      </div>
                    </div>
                    {index < mockOrders.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
