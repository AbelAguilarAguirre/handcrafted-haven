import Image from "next/image";

export default function Bio() {
    return (
        <div className="border-2 border-slate-200 p-4 w-[212px] h-[300px] md:h-[400px]">
            <Image 
                src='https://placehold.co/180x140/png' // Update with actual data
                width={180}
                height={140}
                alt='placeholder image'
            />
            <h2 className="">About Me</h2>
            <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi voluptas deserunt optio sint quis aut ducimus maxime vel suscipit ab aliquam esse, animi maiores! In vero ab tempore fuga aliquam!</p>
        </div>
    );
}