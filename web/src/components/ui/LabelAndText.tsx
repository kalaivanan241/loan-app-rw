import React from 'react'

const LabelAndText = ({
  label,
  text,
}: {
  label: string
  text: string | number
}) => {
  return (
    <div className="mb-3 pb-3 ">
      <div className="grid grid-cols-2">
        <p className="mb-2 text-sm text-muted-foreground">{label}</p>
        <p className="text-sm font-medium leading-none">{text}</p>
      </div>
    </div>
  )
}

export default LabelAndText
