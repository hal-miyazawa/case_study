import backpackIcon from '../../assets/icons/リュックicon.png'
import phoneIcon from '../../assets/icons/スマホicon.png'

type EscapeControlsProps = {
  onHoverAction: (action: 'phone' | 'backpack' | null) => void
  onOpenPhone: () => void
  onOpenBackpack: () => void
  disabled?: boolean
}

export function EscapeControls({
  onHoverAction,
  onOpenPhone,
  onOpenBackpack,
  disabled = false,
}: EscapeControlsProps) {
  const handleHover = (action: 'phone' | 'backpack' | null) => {
    if (disabled) {
      return
    }

    onHoverAction(action)
  }

  return (
    <div
      className={`escape-action-icons ${disabled ? 'is-disabled' : ''}`}
      aria-label="脱出行動"
    >
      <button
        type="button"
        className="action-icon-button escape-icon-phone"
        onMouseEnter={() => handleHover('phone')}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleHover('phone')}
        onBlur={() => handleHover(null)}
        onClick={disabled ? undefined : onOpenPhone}
        aria-disabled={disabled}
        aria-label="スマホ"
      >
        <img src={phoneIcon} alt="" />
        <span>スマホ</span>
      </button>
      <button
        type="button"
        className="action-icon-button escape-icon-backpack"
        onMouseEnter={() => handleHover('backpack')}
        onMouseLeave={() => handleHover(null)}
        onFocus={() => handleHover('backpack')}
        onBlur={() => handleHover(null)}
        onClick={disabled ? undefined : onOpenBackpack}
        aria-disabled={disabled}
        aria-label="リュック"
      >
        <img src={backpackIcon} alt="" />
        <span>リュック</span>
      </button>
    </div>
  )
}
