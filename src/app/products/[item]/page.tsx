import React from 'react';

export default async function Page({ params }: { params: Promise<{ item: string }> }) {
  const { item } = await params;
  return (
    <>
      <h1>Some item {item}</h1>
    </>
  );
}
