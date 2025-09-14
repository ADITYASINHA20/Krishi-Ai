import React, { useMemo, useState } from "react";
import { FaRupeeSign, FaSearch, FaDownload } from "react-icons/fa";

// Mock Mandi Data
const MOCK_MANDI = [
  { date: "2025-08-18", state: "Punjab", mandi: "Ludhiana", commodity: "Wheat", min: 2200, max: 2450, modal: 2350, unit: "₹/quintal" },
  { date: "2025-08-18", state: "Haryana", mandi: "Karnal", commodity: "Basmati Rice", min: 3100, max: 3500, modal: 3325, unit: "₹/quintal" },
  { date: "2025-08-18", state: "Maharashtra", mandi: "Nagpur", commodity: "Cotton", min: 5800, max: 6400, modal: 6100, unit: "₹/quintal" },
  { date: "2025-08-18", state: "UP", mandi: "Kanpur", commodity: "Maize", min: 1800, max: 2050, modal: 1950, unit: "₹/quintal" },
  { date: "2025-08-18", state: "Gujarat", mandi: "Rajkot", commodity: "Groundnut", min: 5200, max: 5600, modal: 5450, unit: "₹/quintal" },
];

export default function MandiBhav() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [commodityFilter, setCommodityFilter] = useState("All");
  const [sortKey, setSortKey] = useState("modal");
  const [sortDir, setSortDir] = useState("desc");

  const states = useMemo(() => ["All", ...new Set(MOCK_MANDI.map(m => m.state))], []);
  const commodities = useMemo(() => ["All", ...new Set(MOCK_MANDI.map(m => m.commodity))], []);

  const filtered = useMemo(() => {
    let data = MOCK_MANDI.filter(row => {
      const q = query.toLowerCase();
      const matchesQuery =
        row.mandi.toLowerCase().includes(q) ||
        row.commodity.toLowerCase().includes(q) ||
        row.state.toLowerCase().includes(q);
      const matchesState = stateFilter === "All" || row.state === stateFilter;
      const matchesComm = commodityFilter === "All" || row.commodity === commodityFilter;
      return matchesQuery && matchesState && matchesComm;
    });

    data.sort((a, b) => {
      const A = a[sortKey];
      const B = b[sortKey];
      if (A === B) return 0;
      const val = A > B ? 1 : -1;
      return sortDir === "asc" ? val : -val;
    });

    return data;
  }, [query, stateFilter, commodityFilter, sortKey, sortDir]);

  const exportCSV = () => {
    const headers = ["Date", "State", "Mandi", "Commodity", "Min", "Max", "Modal", "Unit"];
    const rows = filtered.map(r => [r.date, r.state, r.mandi, r.commodity, r.min, r.max, r.modal, r.unit]);
    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mandi-bhav-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = key => {
    if (key === sortKey) setSortDir(d => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8"> {/* pt-24 ensures Navbar spacing */}
      <div className="max-w-6xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaRupeeSign className="text-green-600" /> Mandi Bhav (Market Prices)
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-9 pr-3 py-2 rounded-lg border w-64"
                placeholder="Search mandi / commodity / state"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <select className="px-3 py-2 rounded-lg border" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="px-3 py-2 rounded-lg border" value={commodityFilter} onChange={e => setCommodityFilter(e.target.value)}>
              {commodities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              <FaDownload /> Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  {[
                    { key: "date", label: "Date" },
                    { key: "state", label: "State" },
                    { key: "mandi", label: "Mandi" },
                    { key: "commodity", label: "Commodity" },
                    { key: "min", label: "Min" },
                    { key: "max", label: "Max" },
                    { key: "modal", label: "Modal" },
                    { key: "unit", label: "Unit" },
                  ].map(col => (
                    <th
                      key={col.key}
                      className="text-left px-4 py-3 cursor-pointer select-none"
                      onClick={() => toggleSort(col.key)}
                      title="Click to sort"
                    >
                      {col.label}
                      {sortKey === col.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.state}</td>
                    <td className="px-4 py-3">{row.mandi}</td>
                    <td className="px-4 py-3">{row.commodity}</td>
                    <td className="px-4 py-3">₹{row.min}</td>
                    <td className="px-4 py-3">₹{row.max}</td>
                    <td className="px-4 py-3 font-semibold text-green-700">₹{row.modal}</td>
                    <td className="px-4 py-3">{row.unit}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center text-gray-500" colSpan={8}>
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 text-xs text-gray-500">
            * Mock data for demo. Replace with Agmarknet API later.
          </div>
        </div>
      </div>
    </section>
  );
}
