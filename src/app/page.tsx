import React from 'react';
import Link from "next/link";

export default function Home() {

  return (
      <section style={{display: 'flex', flexDirection: 'column'}}>
          <Link href={'/register'}>Register Page</Link>
          <Link href={'/login'}>Login Page</Link>
      </section>
  );
}
