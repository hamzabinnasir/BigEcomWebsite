import AdjustIcon from '@mui/icons-material/Adjust';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const filterOrderData = [
    {
        status: "placed",
        details: "Order placed. Awaiting payment confirmation.",
        icon: <ShoppingCartIcon color="action" />
    },
    {
        status: "pending",
        details: "Order pending. Awaiting processing or payment.",
        icon: <HourglassEmptyIcon style={{ color: "#FFA500" }} />  // Orange-ish
    },
    {
        status: "confirmed order",
        details: "Order confirmed and preparing for shipment.",
        icon: <CheckCircleIcon style={{ color: "#1976d2" }} />  // Blue-ish
    },
    {
        status: "shipped",
        details: "Order has been processed and shipped.",
        icon: <LocalShippingIcon color="primary" />
    },
    {
        status: "delivered",
        details: "Order successfully delivered.",
        icon: <AdjustIcon style={{color: "green"}}/>,
    },
    {
        status: "cancelled",
        details: "No further actions allowed (except maybe reorder).",
        icon: <CancelIcon style={{ color: "red" }} />
    },
    {
        status: "returned",
        details: "Return has been processed.",
        icon: <AssignmentReturnIcon color="secondary" />
    },
]


export default filterOrderData;