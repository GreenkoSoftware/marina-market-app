'use client'
import React from "react";
import { Card as CardUI, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function Card(props) {
  const { item, index } = props
  return (
        <CardUI shadow="sm" key={index} isPressable onPress={() => console.log(item)}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </CardUI>
  );
}

