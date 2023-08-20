'use client'
import React from "react";
import { Badge, Card as CardUI, CardBody, CardFooter, Image } from "@nextui-org/react";
export default function Card(props) {
  const { item, index,setTargetProduct } = props
  return (
        <CardUI shadow="sm" key={index} isPressable onPress={() => {setTargetProduct(item)}}>
          <CardBody className="overflow-visible p-0">
          <Badge content={item?.stock >=100 ? '+99' : item?.stock} shape="circle"
          className={`${item?.stock >=100 ? 'right-[1.5rem]' : 'right-[1.2rem]'} z-[15] top-5  bg-red-500 dark:bg-secondary-300 text-primary-50`}
          />
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item?.title}
              className="w-full object-cover h-[14rem]"
              src={item?.img}/>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item?.title}</b>
            <p className="text-default-500">{item?.price}</p>
          </CardFooter>
        </CardUI>
  );
}

