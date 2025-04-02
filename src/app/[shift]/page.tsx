import React from 'react';

export default async function Page({ params }: { params: Promise<{ shift: string }> }) {
  const { shift } = await params;
  return (
    <>
      <h1>Some shift {shift}</h1>
    </>
  );
}
