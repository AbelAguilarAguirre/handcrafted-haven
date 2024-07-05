import Rating from "@mui/material/Rating";
import Image from "next/image";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Product } from "../lib/definitions";

export function ProfileProductCard({ product }: { product: Product}) {
    return (
        <div className="border-2 border-slate-200 p-4 w-[212px] h-[300px] md:h-[400px]">
            <Image
                src={product.image} // Update with actual data
                width={180}
                height={140}
                alt={product.name}
            />
            <div className="mt-2 flex justify-between">
                <Rating
                    size="small"
                    defaultValue={product.rating} // Update with actual data
                    precision={0.5}
                    readOnly
                />
                <p>{product.price}</p>
            </div>
            <p className="my-2 font-bold text-2xl text-center">
                {product.name}
            </p>
            <p className="text-md line-clamp-2 md:line-clamp-6">
                {product.description}
            </p>
        </div>
    );
}

export function CartProductCard() {
    return (
        <div className="w-full p-4 flex my-2 justify-center gap-2 md:gap-4 border-y-2">
            <Image
                src="https://placehold.co/180x160/png" // Update with actual data
                width={180}
                height={160}
                alt="placeholder image"
            />
            <div>
                <div className="flex items-center justify-between">
                    <p className="font-bold md:text-xl">Product Name</p>{" "}
                    {/* Update with actual data */}
                    <p className="font-bold md:text-2xl">$0.00</p>{" "}
                    {/* Update with actual data */}
                </div>
                {/* Update with actual data */}
                <p className="text-sm md:text-md">Seller Name</p>
                <p className="text-sm md:text-md line-clamp-2 md:line-clamp-2 max-w-[550px]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nisi voluptas deserunt optio sint quis aut ducimus maxime
                    vel suscipit ab aliquam esse, animi maiores! In vero ab
                    tempore fuga aliquam!
                </p>
                <div className="flex justify-between items-center mt-4">
                    <IconButton
                        className="md:hidden"
                        color="error"
                        aria-label="remove"
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Button
                        className="hidden md:inline-flex"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                    >
                        Remove from Cart
                    </Button>
                    <ButtonGroup size="small" aria-label="Small button group">
                        <Button aria-label="decrease">
                            <ChevronLeftIcon />
                        </Button>
                        <Button className="font-bold" disabled>
                            1 {/* Update with actual data */}
                        </Button>
                        <Button aria-label="increase">
                            <ChevronRightIcon />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}
