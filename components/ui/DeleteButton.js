import React from 'react'
import { Button } from '@nextui-org/react'
import { DeleteIcon } from './DeleteIcon'

export default function DeleteButton () {
  return (
    <div className="flex flex-col items-center">
        <Button className="flex flex-col items-center" isIconOnly color="danger" variant="faded" aria-label="Take a photo">
        <DeleteIcon />
      </Button>
    </div>
  )
}
