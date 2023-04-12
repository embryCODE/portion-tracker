export default function MacroInput({
  label,
  value,
  onChange,
}: {
  label: string
  onChange: (value: number) => void
  value: number
}) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={'number'}
        className={
          'tw-rounded tw-border tw-border-gray-300 tw-px-2 tw-py-0.5 tw-mr-2 tw-block'
        }
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  )
}
