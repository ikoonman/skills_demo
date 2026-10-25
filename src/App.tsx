import { useState, type FormEvent } from "react";

type Plan = "Basic" | "Pro" | "Enterprise";

interface Customer {
  id: number;
  name: string;
  plan: Plan;
  active: boolean;
}

// Made-up sample data. No real customers.
const CUSTOMERS: Customer[] = [
  { id: 1, name: "Example Co", plan: "Pro", active: true },
  { id: 2, name: "Sample Industries", plan: "Basic", active: true },
  { id: 3, name: "Demo Labs", plan: "Enterprise", active: false },
  { id: 4, name: "Placeholder Ltd", plan: "Basic", active: false },
  { id: 5, name: "Test Widgets", plan: "Enterprise", active: true },
];

export function App() {
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState<Plan | "">("");
  const [activeOnly, setActiveOnly] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  const visible = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!plan || c.plan === plan) &&
      (!activeOnly || c.active),
  );

  const addNote = (e: FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNotes((prev) => [note.trim(), ...prev]);
    setNote("");
  };

  const reset = () => {
    setSearch("");
    setPlan("");
    setActiveOnly(false);
  };

  return (
    <main className="page">
      <header>
        <h1>Customer Portal</h1>
        <p className="muted">Demo app with sample data only.</p>
      </header>

      <section className="card">
        <h2>Customers</h2>
        <div className="toolbar">
          <input
            type="search"
            placeholder="Search customers…"
            aria-label="Search customers"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select aria-label="Plan" value={plan} onChange={(e) => setPlan(e.target.value as Plan | "")}>
            <option value="">Any plan</option>
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <label className="check">
            <input type="checkbox" checked={activeOnly} onChange={(e) => setActiveOnly(e.target.checked)} />
            Active only
          </label>
          <button type="button" className="secondary" onClick={reset}>
            Reset
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Plan</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.plan}</td>
                <td>{c.active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={3} className="muted">
                  No customers match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Notes</h2>
        <form className="toolbar" onSubmit={addNote}>
          <input
            placeholder="Add a note…"
            aria-label="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" disabled={!note.trim()}>
            Add note
          </button>
        </form>
        {notes.length === 0 ? (
          <p className="muted">No notes yet.</p>
        ) : (
          <ul>
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
