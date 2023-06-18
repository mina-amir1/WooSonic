
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Status({ name }: { name: string }) {
    const getColorByStatus = (name: string) => {
        switch (name) {
            case "processing":
                return "bg-yellow-200 text-yellow-900";
            case "fulfilled":
                return "bg-green-200 text-green-900";
            case "delivered":
                return "bg-green-200 text-green-900";
            case "pending":
                return "bg-blue-200 text-blue-900";
            case "on-hold":
                return "bg-yellow-200 text-yellow-900";
            case "completed":
                return "bg-green-200 text-green-900";
            case "cancelled":
                return "bg-red-200 text-red-900";
            case "refunded":
                return "bg-gray-200 text-gray-900";
            case "failed":
                return "bg-red-200 text-red-900";
            case "checkout-draft":
                return "bg-gray-200 text-gray-900";
            default:
                return "bg-gray-200 text-gray-900";

        }
    };

    const color = getColorByStatus(name);

    return (
        <span
            className={classNames(
                "relative inline-block px-3 py-1 font-semibold leading-tight text-sm rounded-full capitalize",
                color
            )}
        >
            <span className="absolute inset-0 opacity-50"></span>
            <span className="relative">{name}</span>
        </span>
    );
}
