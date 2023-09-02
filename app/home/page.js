'use client'
import MainTittleCard from '@/components/ui/MainCard'
import React,{useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import Auth from '../auth'
import UserAvatar from '../../components/ui/UserAvatar'
import { Button } from '@nextui-org/react'
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';

function printPage() {
    var w = window.open();

    var headers =  $("#headers").html();
    var field= $("#field1").html();
    var field2= $("#field2").html();

    var html = "<!DOCTYPE HTML>";
    html += '<html lang="en-us">';
    html += '<head><style></style></head>';
    html += "<body>";

    //check to see if they are null so "undefined" doesnt print on the page. <br>s optional, just to give space
    if(headers != null) html += headers + "<br/><br/>";
    if(field != null) html += field + "<br/><br/>";
    if(field2 != null) html += field2 + "<br/><br/>";

    html += "</body>";
    w.document.write(html);
    w.window.print();
    w.document.close();
};
const receipt = (
    <Printer type="epson" width={42} characterSet="korea">
      <Text size={{ width: 2, height: 2 }}>9,500원</Text>
      <Text bold={true}>결제 완료</Text>
      <Br />
      <Line />
      <Row left="결제방법" right="체크카드" />
      <Row left="카드번호" right="123456**********" />
      <Row left="할부기간" right="일시불" />
      <Row left="결제금액" right="9,500" />
      <Row left="부가세액" right="863" />
      <Row left="공급가액" right="8,637" />
      <Line />
      <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
      <Text>옵션1(500)/옵션2/메모</Text>
      <Row left="(-) 할인" right="- 500" />
      <Br />
      <Line />
      <Row left="합계" right="9,500" />
      <Row left="(-) 할인 2%" right="- 1,000" />
      <Line />
      <Row left="대표" right="김대표" />
      <Row left="사업자등록번호" right="000-00-00000" />
      <Row left="대표번호" right="0000-0000" />
      <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
      <Line />
      <Br />
      <Text align="center">Wifi: some-wifi / PW: 123123</Text>
      <Cut />
    </Printer>
  );

  const functionnnn = async (port) =>{
    
    console.log("port: ")
    console.log(port)
    const writer = port.writable?.getWriter();
    console.log("writter: ")
    console.log(writer)

    if (writer != null) {
        printPage()
        await writer.write(await render(receipt));
        //await writer.write(receipt);
        writer.releaseLock();
        console.error('Writers');
    } else {
        console.error('No Writers');
    }
    /*   const writer = port.writable?.getWriter();
        if (writer != null) {
        await writer.write(receipt);
        writer.releaseLock();
        }  */
  }

export default async function Home () {
      const [port, setPort]=useState(null)
      const [printTest, setPrintTest] = useState(false)
      useEffect(() => {
        if (typeof window !== 'undefined' && printTest && port) {
            functionnnn(port)
            console.log("AQUI SE IMPRIME")
        }else{
            console.log("AQUI NO PASA NA")
        }
        setPrintTest(false)
        
      },[printTest, port])
      const openPort = async ()=>{
        const port = await window.navigator.serial.requestPort();
        //await port.open({ baudRate: 9600 });
        await port.open({ baudRate: 8008 });
        setPort(port)
      }
    
      useEffect(()=>{
        if(printTest && !port){
            openPort()
        }
      },[printTest, port])
    return (
        <section className="h-full w-full flex-1 flex flex-col bg-primary-300 dark:bg-secondary-500">
            <Auth/>
            <div className="flex-1  flex flex-col sm:flex-row sm:mt-36 sm:ml-5 sm:mr-5 sm:mb-0 ">
                <main>
                    <section className="flex flex-col items-center sm:mr-0 mr-5 sm:ml-0 ml-5 sm:mt-0 mt-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                            className="gap-5 grid grid-cols-3 grid-rows-[auto_minmax(auto,_1fr)_auto] ">
                            <MainTittleCard
                                route ="/sales"
                                title="Ventas"
                                imgSrc="https://confidentefinanciero.com/wp-content/uploads/2023/04/Facturacion-electronica-restaurantes-scaled.jpg"
                                footerMessage="Gestión eficiente para tu minimarket."
                            />
                            <MainTittleCard
                                route="/inventory"
                                title="Inventario"
                                imgSrc="https://www.vendhq.com/blog/wp-content/uploads/2020/04/iStock-1133945516.jpg"
                                footerMessage="Optimiza existencias en tiempo real."
                            />
                            <MainTittleCard
                                route ="/reports"
                                title="Reportes"
                                imgSrc="https://assets.equifax.com/marketing/argentina/images/interactive_reports_feature1_750x550.jpg"
                                footerMessage="Datos clave para decisiones informadas y estratégicas."
                            />
                        </motion.div>
                    </section>
                    <div className='flex  sm:flex-row-reverse sm:items-end sm:m-0 m-5'>
                    <Button onClick={()=>{setPrintTest(true)}}>imprimir</Button>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                                ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            <UserAvatar />
                        </motion.div>
                    </div>
                </main>
            </div>
        </section>

    )
}
