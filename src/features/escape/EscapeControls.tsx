import backpackIcon from '../../assets/icons/リュックicon.png'
import phoneIcon from '../../assets/icons/スマホicon.png'

type EscapeControlsProps = {
  onHoverAction: (action: 'phone' | 'backpack' | null) => void
  onOpenPhone: () => void
  onOpenBackpack: () => void
}

export function EscapeControls({
  onHoverAction,
  onOpenPhone,
  onOpenBackpack,
}: EscapeControlsProps) {
  return (
    <div className="escape-action-icons" aria-label="脱出行動">
      <button
        type="button"
        className="action-icon-button escape-icon-phone"
        onMouseEnter={() => onHoverAction('phone')}
        onMouseLeave={() => onHoverAction(null)}
        onFocus={() => onHoverAction('phone')}
        onBlur={() => onHoverAction(null)}
        onClick={onOpenPhone}
        aria-label="スマホ"
      >
        <img src={phoneIcon} alt="" />
        <span>スマホ</span>
      </button>
      <button
        type="button"
        className="action-icon-button escape-icon-backpack"
        onMouseEnter={() => onHoverAction('backpack')}
        onMouseLeave={() => onHoverAction(null)}
        onFocus={() => onHoverAction('backpack')}
        onBlur={() => onHoverAction(null)}
        onClick={onOpenBackpack}
        aria-label="リュック"
      >
        <img src={backpackIcon} alt="" />
        <span>リュック</span>
      </button>
    </div>
  )
}
