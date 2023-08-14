import './globals.css';
import { Inter } from 'next/font/google';
/* import { Navigation } from '../components/Navigation'; */
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Marina Market App',
  description: 'Marina Market Appp'
};

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>Marina Market App</title>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
