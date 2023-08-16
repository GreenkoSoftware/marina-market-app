'use client'
import React from "react";
import CardUi from "@/components/ui/Card";
import { Card as CardNextUi } from "@nextui-org/react";
export default function Card() {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <CardNextUi className="p-[3rem]">
      <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
        {list.map((item, index) => (
          <CardUi key={index} item={item} index={index} />
        ))}
      </div>
    </CardNextUi>
  );
}
