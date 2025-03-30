import React from 'react';

export default async function Page({ params }: { params: Promise<{ user: string }> }) {
  const { user } = await params;
  return (
    <>
      <h1>Some user {user}</h1>
    </>
  );
}
