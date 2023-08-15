import './globals.css';
import { Inter } from 'next/font/google';
/* import { Navigation } from '../components/Navigation'; */
import { Providers } from "./providers";
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Marina Market App',
  description: 'Marina Market Appp'
};

export default function RootLayout ({ children }) {
  return (
    <html lang='en' className='dark'>
      <head>
        <title>Marina Market App</title>
      </head>
      <body className={inter.className}>
      <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
