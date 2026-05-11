export type OrderNotification = {
  orderId: string;
  customerName: string;
  customerWhatsapp: string;
  program: string;
  items: string[];
  total: number;
  deliveryDate: string;
  deliveryTime: string;
  address: string;
  note?: string;
};

export function buildOrderMessage(order: OrderNotification) {
  return [
    "ORDER BARU MASUK",
    `Order ID: ${order.orderId}`,
    `Nama: ${order.customerName}`,
    `WA: ${order.customerWhatsapp}`,
    `Program: ${order.program}`,
    `Total: Rp${order.total.toLocaleString("id-ID")}`,
    `Tanggal: ${order.deliveryDate}`,
    `Jam: ${order.deliveryTime}`,
    `Alamat: ${order.address}`,
    `Catatan: ${order.note || "-"}`,
  ].join("\n");
}
