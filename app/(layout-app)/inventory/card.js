'use client'
import React,{  useState } from "react";
import CardUi from "@/components/ui/Card";
import { Tabs, Tab } from "@nextui-org/react";
export default function Card() {
  const [selected, setSelected] = useState(null);
  const list = [
    {
      title: "Orange",
      img: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80',
      price: "$5.000",
      stock:100
    },
    {
      title: "Tangerine",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$6.000",
      stock:100
    },
    {
      title: "Raspberry",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$1.000",
      stock:100
    },
    {
      title: "Lemon",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$5.300",
      stock:100
    },
    {
      title: "Avocado",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$15.700",
      stock:100
    },
    {
      title: "Lemon 2",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$8.000",
      stock:100
    },
    {
      title: "Banana",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$7.500",
      stock:10
    },
    {
      title: "Watermelon",
      img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      price: "$12.200",
      stock:50
    },
  ];
  let category = [
    {
      id: "fruts",
      label: "Frutas",
      route:'/sales'
    },
    {
      id: "vegetables",
      label: "Verduras",
      route:'/inventory'
    },
    {
      id: "other",
      label: "Otros",
      route:'/reports'
    }
  ];
  
  return (
  <section>
    <section className="absolute z-20 h-[4rem] w-[260px] top-[82px] rounded-t-[3px] bg-secondary-50 dark:bg-secondary-450">
      <Tabs 
            disabledKeys={["reports"]}
            aria-label="Options"
            items={category} 
            selectedKey={selected}
            onSelectionChange={setSelected}
            variant={'light'}
            className="pt-3 pl-3"
          >
          {(item) => (
            <Tab key={item.id} size={"lg"} title={item.label}>
              <section className="ml-[-4px] p-[3rem] w-full md:w-[58rem] xl:w-[80rem] shadow-md hover:shadow-lg  rounded-tl-[0px]  bg-secondary-50 dark:bg-secondary-450 rounded-[14px]">
                <div className="gap-2 grid grid-cols-2 md:grid-cols-4">
                  {list.map((item, index) => (
                    <CardUi key={index} item={item} index={index} />
                  ))}
                </div>
              </section>
            </Tab>
          )}
      </Tabs>
    </section>
  </section>
  );
}
