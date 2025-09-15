import { useParams } from 'react-router-dom'
import useCoin from '../hooks/useCoin'
import Loader from '../components/Loader'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useApi } from '../lib/swr'

export default function CoinDetail() {
const { id } = useParams()
const { data, isLoading } = useCoin(id)
const { data: chart } = useApi<{ prices: [number, number][] }>(id ? `/coins/${id}/market_chart?vs_currency=usd&days=7` : null)

if (isLoading || !data) return <Loader />

const prices = (chart?.prices || []).map(([ts, price]) => ({ time: new Date(ts).toLocaleDateString(), price }))

return (
<div className="space-y-6">
<div className="flex items-center gap-4">
<img src={data.image.large} className="h-12 w-12" />
<div>
<h1 className="text-2xl font-bold">{data.name} ({data.symbol.toUpperCase()})</h1>
<div className="opacity-70">Piyasa Değeri: ${data.market_data.market_cap.usd.toLocaleString()}</div>
</div>
</div>

<div className="rounded-2xl border border-white/10 p-4">
<h2 className="mb-3 text-lg font-semibold">7 Günlük Fiyat</h2>
<div style={{ width: '100%', height: 320 }}>
<ResponsiveContainer>
<LineChart data={prices}>
<XAxis dataKey="time" hide />
<YAxis domain={['auto', 'auto']} />
<Tooltip />
<Line type="monotone" dataKey="price" dot={false} strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
</div>
</div>

<div className="prose prose-invert max-w-none">
<h2 className="text-lg font-semibold">Açıklama</h2>
<p dangerouslySetInnerHTML={{ __html: (data.description?.en || '').slice(0, 1500) }} />
</div>
</div>
)
}