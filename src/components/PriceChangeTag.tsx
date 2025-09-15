type Props = { value?: number | null }

export default function PriceChangeTag({ value }: Props) {
  if (value == null || Number.isNaN(value)) {
    return (
      <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-zinc-500/10 text-zinc-400">
        —
      </span>
    )
  }

  const v = Number(value)
  const isUp = v >= 0

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        isUp ? 'bg-emerald-600/10 text-emerald-500'
             : 'bg-rose-600/10 text-rose-400'
      }`}
    >
      {isUp ? '▲' : '▼'} {v.toFixed(2)}%
    </span>
  )
}
