import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from "next/router";
import React, { useEffect, useCallback, useState } from "react";


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/precisionX1');
  }, [router]);

  return (
    <div>
    </div>
  )
}