import Auth from "@/app/auth";
import Cards from "./card";
import CreateProduct from "./components/createProduct";

export default function Inventory () {
  return (
        <section>
        <CreateProduct/>
        <Auth/>
        <Cards/>
        </section>
  );
}
