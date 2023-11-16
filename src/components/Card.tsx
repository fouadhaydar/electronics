"use client";

import Image from "next/image";
import image from "../../public/assets/test.png";
import { HeartFill, Star, StarFill } from "react-bootstrap-icons";
import Link from "next/link";
import phone from "../../public/assets/phones/iphone-compare-iphone-15-pro-202309.jpeg";

interface CardProps {
  title: string;
  description: string;
  // imageUrl: string;
  cardClass: string;
  id: string;
  review: number;
  categoryName?: string;
}

const Card = ({
  cardClass,
  title,
  description,
  id,
  review,
  categoryName,
}: CardProps) => {
  // const router = useRouter();
  // const params = useParams()
  // console.log(params)
  // const productId = router.query.productId;

  return (
    <Link href={`/products/${categoryName}/${id}`}>
      <div className={`${cardClass}`}>
        <div className="flex justify-center">
          <Image src={phone} alt={"iphone"} width={100} />
          <HeartFill className="absolute top-[12px] right-[12px]" color="red" />
        </div>
        <div className="pt-3 flex flex-col gap-2">
          <h3 className="gap-1 xsm:text-[14px] font-bold md:text-lg line-clamp-1">
            {title}
          </h3>
          <span className="text-gray-400 xsm:text-sm md:text-[16px] line-clamp-2">
            {description}
          </span>
          <div className="flex gap-1">
            <StarFill color="gold" />
            <span>{review}</span>
          </div>
        </div>
        {/* <img src="" width={680} height={400}/> */}
      </div>
    </Link>
  );
};

export default Card;
