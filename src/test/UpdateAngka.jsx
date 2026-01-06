import { Minus, Plus } from 'lucide-react'
import React from 'react'

const UpdateAngka = ({angka, setAngka}) => {
  return (
    <div>
      <h2>Silahkan update angka</h2>
      <div className="flex gap-3">
        <Minus onClick={() => setAngka(angka - 1)} />
        <span>{angka}</span>
        <Plus onClick={() => setAngka(angka + 1)} />
      </div>
    </div>
  )
}

export default UpdateAngka