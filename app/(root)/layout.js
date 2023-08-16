import { redirect } from 'next/navigation';
import useAuthStore from '@/stores/user';

export default async function SetupLayout({
  children,
}) {
  const { token } = useAuthStore.getState();
  if (!token) {
    redirect('/home');
  }else if(token === null) {
    redirect('/login');
  }
  return (
    <>
      {children}
    </>
  );
}