'use client'

import { useAuth } from "@/libs/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!isAuthenticated()){
      router.push('/auth');
    }
    else{
      router.push('/main')
    }
  }, [])
  return (
    <></>
  );
}
