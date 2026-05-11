import Link from "next/link";

const orders = ["FB-0001 Cutting Meal", "FB-0002 Diet Meal"];

export default function Page() {
  return <main><Link href="/">Kembali</Link><h1>Admin Dashboard</h1><p>Order, member, kitchen queue, delivery manual, dan report.</p>{orders.map((item) => <p key={item}>{item}</p>)}</main>;
}
