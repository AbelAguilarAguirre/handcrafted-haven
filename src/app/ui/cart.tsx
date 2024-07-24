import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Using MUI for the cart icon
import Badge from '@mui/material/Badge'; // For the bubble

interface CartProps {
  itemCount: number; // Number of items in the cart
}

export default function Cart({ itemCount }: CartProps) {
  return (
    <div className="cursor-pointer md:ml-4 hover:scale-125 transform transition">
      <Badge badgeContent={itemCount > 0 ? itemCount : null} color="primary">
        <ShoppingCartIcon className='text-md md:text-xl lg:text-2xl' />
      </Badge>
    </div>
  );
}