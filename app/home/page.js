
import MainTittleCard from "@/components/ui/MainCard";
import React from "react";
import Auth from "../auth";
export default function Home() {
    return (
      <section className="min-h-screen flex-1 flex flex-col bg-primary-300 dark:bg-secondary-500">
        <Auth/>
        <div className="flex-1 flex flex-col sm:flex-row sm:mt-20 sm:ml-5 sm:mr-5 sm:mb-0 ">
          <main>
            <section className="flex flex-col items-center sm:mr-0 mr-5 sm:ml-0 ml-5 sm:mt-0 mt-5">
              <div className="gap-5 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] ">
                <MainTittleCard
                  route ="/sales"
                  title="Ventas"
                  imgSrc="https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg"
                  footerMessage="Gestión eficiente para tu minimarket."
                />
                <MainTittleCard
                  route="/inventory"
                  title="Inventario"
                  imgSrc="https://img.freepik.com/free-photo/medium-shot-man-with-tablet_23-2149214272.jpg?w=2000&t=st=1692237976~exp=1692238576~hmac=1162aafe0f45e5b419321d9510e8622f55160e7332c912851d706661b5dc5dbb"
                  footerMessage="Optimiza existencias en tiempo real."
                />
                <MainTittleCard
                  route ="/reports"
                  title="Reportes"
                  imgSrc="https://img.freepik.com/free-photo/businessman-hands-using-cell-phone-with-financial-report-graph_1150-754.jpg?w=2000&t=st=1692238297~exp=1692238897~hmac=9b03a0dc32a11852b60a3bdf872a6651c930ca9910ebe696b5af2f8f23312a64"
                  footerMessage="Datos clave para decisiones informadas y estratégicas."
                />
              </div>
            </section>
          </main>
        </div>
      </section>
      
    );
  }
  

