
import MainTittleCard from "@/components/ui/MainCard";
import React from "react";

export default function Application() {
    return (
      <section className="flex flex-col items-center m-10 ">
        <div className="gap-10 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] ">
          <MainTittleCard
            route ="/application/sales"
            title="Ventas"
            imgSrc="https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg"
            footerMessage="Gestión eficiente para tu minimarket."
          />
          <MainTittleCard
            route="/application/inventory"
            title="Inventario"
            imgSrc="https://impulsapopular.com/wp-content/uploads/2019/09/4568-Comercio-minorista-vs.-mayorista.jpg?"
            footerMessage="Optimiza existencias en tiempo real."
          />
          <MainTittleCard
            route ="/application/reports"
            title="Reportes"
            imgSrc="https://www.roberthalf.cl/sites/roberthalf.cl/files/styles/full_width_content_image_1x_extra_large_1036/public/2020-10/Mercado%20laboral%20de%20finanzas%20y%20contabilidad%20muestra%20sus%20cartas%20para%202021.jpeg?itok=PGP19hbX"
            footerMessage="Datos clave para decisiones informadas y estratégicas."
          />
        </div>
      </section>
    );
  }
  

