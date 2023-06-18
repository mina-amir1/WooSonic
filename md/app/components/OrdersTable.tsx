import OrdersTableRow from "~/components/OrdersTableRow";

export default function OrdersTable({ userOrders }: { userOrders: any[] }) {
    return (
        <table className="w-full text-left">
            <thead>
                <tr>
                    <th>Order Number</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {userOrders.map((order) => (
                    <OrdersTableRow key={order.order_id} order={order} />
                ))}
            </tbody>
        </table>
    )
}
