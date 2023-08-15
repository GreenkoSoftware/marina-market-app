'use client'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'; 
export default function SendButton () {
    const router = useRouter()
    return (
        <Button title={'Sales'} type="button" onClick={() => router.push('/application/inventory')}>
        
      </Button>
    );
  }
  