import { useState } from 'react';
import { Trash2, Clock, CircleCheck as CheckCircle2, Circle as XCircle, Phone, MapPin, Package } from 'lucide-react';
import { useStore } from '@/lib/store';
import type { Order, OrderStatus } from '@/lib/types';

const STATUS_STYLES: Record<OrderStatus, { color: string; bg: string; icon: typeof Clock }> = {
  Pending: { color: 'text-gold-300', bg: 'bg-gold-300/15 border-gold-300/30', icon: Clock },
  Completed: { color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30', icon: CheckCircle2 },
  Cancelled: { color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30', icon: XCircle },
};

export function OrdersAdmin() {
  const { orders, updateOrderStatus, deleteOrder } = useStore();
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="font-serif text-2xl text-cream">Orders ({orders.length})</h3>
        <div className="flex gap-2">
          {(['All', 'Pending', 'Completed', 'Cancelled'] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase border transition-all ${
                filter === s ? 'border-gold-300 text-gold-300' : 'border-gold-300/20 text-cream/50 hover:text-gold-200'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-cream/40 font-serif text-xl">No orders yet</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const st = STATUS_STYLES[order.status];
            const Icon = st.icon;
            const isOpen = expanded === order.id;
            return (
              <div key={order.id} className="glass rounded-xl border border-gold-300/10 overflow-hidden">
                <button onClick={() => setExpanded(isOpen ? null : order.id)} className="w-full p-4 flex items-center gap-4 text-left hover:bg-gold-300/5 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${st.bg}`}>
                    <Icon className={`w-5 h-5 ${st.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg text-cream truncate">{order.customer_name}</h4>
                    <p className="text-cream/50 text-sm">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl gold-text">${order.total.toFixed(0)}</p>
                    <p className={`text-xs tracking-widest uppercase ${st.color}`}>{order.status}</p>
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 space-y-3 border-t border-gold-300/10 mt-2">
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <p className="text-cream/70 flex items-center gap-2"><Phone className="w-4 h-4 text-gold-300/60" /> {order.phone}</p>
                      <p className="text-cream/70 flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-300/60" /> {order.city}{order.city && order.address ? ', ' : ''}{order.address}</p>
                    </div>
                    {order.notes && <p className="text-cream/60 text-sm"><span className="text-gold-300/70">Notes:</span> {order.notes}</p>}
                    <div>
                      <p className="text-gold-300/70 text-xs tracking-widest uppercase mb-2 flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Items</p>
                      <div className="space-y-1">
                        {order.items.map((i) => (
                          <div key={i.id} className="flex justify-between text-sm text-cream/70">
                            <span>{i.title} × {i.quantity}</span>
                            <span>${(i.price * i.quantity).toFixed(0)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {(['Pending', 'Completed', 'Cancelled'] as OrderStatus[]).map((s) => (
                        <button key={s} onClick={() => updateOrderStatus(order.id, s)}
                          className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase border transition-all ${
                            order.status === s ? STATUS_STYLES[s].bg + ' ' + STATUS_STYLES[s].color : 'border-gold-300/20 text-cream/50 hover:text-gold-200'
                          }`}>{s}</button>
                      ))}
                      <button onClick={() => { if (confirm('Delete this order?')) deleteOrder(order.id); }}
                        className="ml-auto px-3 py-1.5 text-red-400/60 hover:text-red-400 text-[10px] tracking-widest uppercase transition-colors flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
