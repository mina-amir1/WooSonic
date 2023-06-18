import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { FormatCurrency } from '~/utils/FormatCurrency'
import Status from './Status'

type OrderStatus =
    | "processing"
    | "fulfilled"
    | "delivered"
    | "pending"
    | "on-hold"
    | "completed"
    | "cancelled"
    | "refunded"
    | "failed"
    | "checkout-draft";

interface Order {
    order_id: number;
    order_date: string;
    order_status: OrderStatus;
    order_total: string;
}

export default function OrdersTableRow({ order }: { order: Order }) {
    const { t } = useTranslation();
    const { order_id, order_date, order_status, order_total } = order;

    return (
        <tr>
            <td>
                <div className="py-2">#{order_id}</div>
            </td>
            <td>
                <div className="py-2">{order_date}</div>
            </td>
            <td>
                <div className="py-2">
                    <Status name={order_status} />
                </div>
            </td>
            <td>
                <div className="py-2">{FormatCurrency(order_total)}</div>
            </td>
            <td>
                <div className="py-2">
                    <Link
                        to={`/my-account/orders/${order_id}`}
                        className="block px-4 py-2 text-sm font-semibold text-center text-white rounded-lg whitespace-nowrap bg-slate-900 hover:bg-slate-700"
                    >
                        {t('common.view_details')}
                    </Link>
                </div>
            </td>
        </tr>

    )
}
