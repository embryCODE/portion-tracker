import classNames from 'classnames'

export default function MacroInput({
  label,
  value,
  onChange,
  desiredValue,
  showNumber = false,
}: {
  label: string
  onChange: (value: number) => void
  value: number
  desiredValue: number
  showNumber?: boolean
}) {
  const handleClick = (buttonNumber: number, fillPercentage: number) => () => {
    // If I click on a filled circle, fill half of it
    if (fillPercentage === 100) {
      onChange(buttonNumber - 0.5)
      return
    }

    // If I click on an empty circle, fill half of it
    if (fillPercentage === 0) {
      onChange(buttonNumber - 0.5)
      return
    }

    // If I click on a half-filled circle, fill it
    onChange(buttonNumber)
  }

  const circles = createCircles(value, desiredValue)

  return (
    <div>
      <label
        htmlFor={label}
        className={classNames(
          'tw-font-bold tw-uppercase tw-text-sm',
          label.toLowerCase() === 'protein' && 'tw-text-protein',
          label.toLowerCase() === 'vegetables' && 'tw-text-veg',
          label.toLowerCase() === 'carbs' && 'tw-text-carbs',
          label.toLowerCase() === 'fat' && 'tw-text-fat'
        )}
      >
        {label}
        {showNumber && ` (${value})`}
      </label>

      <input
        id={label}
        type={'number'}
        className={'tw-sr-only'}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />

      <div className={'tw-mt-1 tw-flex tw-space-x-2'}>
        {circles.map((circle, i) => (
          <button
            key={i}
            type={'button'}
            className={classNames(
              'tw-border-2 tw-rounded-full tw-w-5 tw-h-5 tw-overflow-hidden tw-inline-flex tw-items-center tw-flex-shrink-0',
              label.toLowerCase() === 'protein' && 'tw-border-protein',
              label.toLowerCase() === 'vegetables' && 'tw-border-veg',
              label.toLowerCase() === 'carbs' && 'tw-border-carbs',
              label.toLowerCase() === 'fat' && 'tw-border-fat'
            )}
            onClick={handleClick(i + 1, circle.fillPercentage)}
          >
            <div
              className={classNames(
                'tw-h-full',
                label.toLowerCase() === 'protein' && 'tw-bg-protein',
                label.toLowerCase() === 'vegetables' && 'tw-bg-veg',
                label.toLowerCase() === 'carbs' && 'tw-bg-carbs',
                label.toLowerCase() === 'fat' && 'tw-bg-fat'
              )}
              style={{ width: circle.fillPercentage + '%' }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

function createCircles(value: number, desiredValue: number) {
  const totalPercentage = value * 100

  return Array.from({ length: desiredValue }, (_, i) => {
    const fillPercentage = Math.max(Math.min(totalPercentage - i * 100, 100), 0)

    return {
      fillPercentage,
    }
  })
}
