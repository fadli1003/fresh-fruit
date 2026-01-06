import React, { useState } from 'react'
import UpdateAngka from './UpdateAngka';

localStorage

const Test = () => {
  const [angka, setAngka] = useState(0);
  return (
    <div>
      <h2>Test</h2>
      <UpdateAngka setAngka={setAngka} angka={angka} />
    </div>
  )
}

export default Test