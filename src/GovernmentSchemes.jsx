import React, { useMemo, useState } from "react";
import { FaUniversity, FaExternalLinkAlt, FaFilter } from "react-icons/fa";

// Mock schemes data
const SCHEMES = [
  {
    id: 1,
    name: "PM-KISAN",
    ministry: "Ministry of Agriculture",
    category: "Income Support",
    state: "All India",
    eligibility: "Small & marginal farmers with cultivable land records",
    benefit: "₹6,000 per year in 3 installments",
    applyUrl: "#",
  },
  {
    id: 2,
    name: "PMFBY (Fasal Bima Yojana)",
    ministry: "Ministry of Agriculture",
    category: "Insurance",
    state: "All India",
    eligibility: "All farmers (loanee & non-loanee) for notified crops",
    benefit: "Crop insurance against natural calamities",
    applyUrl: "#",
  },
  {
    id: 3,
    name: "PM-KUSUM",
    ministry: "MNRE",
    category: "Solar / Irrigation",
    state: "All India",
    eligibility: "Farmers/Cooperatives for solar pump installation",
    benefit: "Subsidy for solar pumps & grid-connected RE",
    applyUrl: "#",
  },
  {
    id: 4,
    name: "Rythu Bandhu",
    ministry: "Telangana Govt",
    category: "Income Support",
    state: "Telangana",
    eligibility: "All farmers with land ownership",
    benefit: "Per-acre investment support for each season",
    applyUrl: "#",
  },
];

export default function GovernmentSchemes() {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const states = useMemo(() => ["All", ...new Set(SCHEMES.map(s => s.state))], []);
  const categories = useMemo(() => ["All", ...new Set(SCHEMES.map(s => s.category))], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return SCHEMES.filter(s => {
      const matchesQuery =
        s.name.toLowerCase().includes(q) ||
        s.ministry.toLowerCase().includes(q) ||
        s.eligibility.toLowerCase().includes(q);
      const matchesState = stateFilter === "All" || s.state === stateFilter;
      const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
      return matchesQuery && matchesState && matchesCategory;
    });
  }, [query, stateFilter, categoryFilter]);

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-4 md:px-8"> {/* pt-24 ensures spacing below navbar */}
      <div className="max-w-6xl mx-auto">
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaUniversity className="text-indigo-600" /> Government Schemes
          </h1>

          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-9 pr-3 py-2 rounded-lg border w-64"
                placeholder="Search scheme / ministry / eligibility"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 rounded-lg border"
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              className="px-3 py-2 rounded-lg border"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{s.name}</h2>
                  <p className="text-sm text-gray-500">{s.ministry} • {s.state}</p>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{s.category}</span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-semibold">Eligibility:</span> {s.eligibility}</p>
                <p><span className="font-semibold">Benefit:</span> {s.benefit}</p>
              </div>

              <div className="mt-4">
                <a
                  href={s.applyUrl}
                  onClick={e => e.preventDefault()} // demo placeholder
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                  title="Apply / Learn More"
                >
                  Apply / Learn More <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No schemes found. Try a different search or filter.
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-6">
          * Mock data for demo. Later, fetch dynamic schemes from official portals/APIs.
        </div>
      </div>
    </section>
  );
}
