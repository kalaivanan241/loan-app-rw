import React from 'react'

const LabelAndText = ({
  label,
  text,
  type = 'row',
}: {
  label: string
  text: string | number
  type?: 'row' | 'column'
}) => {
  return (
    <div className="mb-3 pb-3 ">
      <div className={`grid ${type === 'column' ? 'grid-cols-2' : ''}`}>
        <p className="mb-2 text-sm text-muted-foreground">{label}</p>
        <p className="mb-2 text-sm font-medium leading-none">{text}</p>
      </div>
    </div>
  )
}

export default LabelAndText
