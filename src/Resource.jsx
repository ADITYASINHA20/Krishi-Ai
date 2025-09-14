import React, { useState, useMemo } from "react";
import { FaBook, FaRobot, FaChartLine, FaExternalLinkAlt } from "react-icons/fa";

const RESOURCES_DATA = [
  { id: 1, title: "Farming Guide", description: "Step-by-step crop management guide.", category: "Guide", link: "#" },
  { id: 2, title: "AI Tools", description: "Use AI to detect crop diseases early.", category: "AI Tool", link: "#" },
  { id: 3, title: "Market Info", description: "Latest mandi prices and trends.", category: "Market Info", link: "#" },
  { id: 4, title: "Organic Farming Tips", description: "Learn best practices for organic farming.", category: "Guide", link: "#" },
  { id: 5, title: "Drone Monitoring", description: "Monitor your farm using drone technology.", category: "AI Tool", link: "#" },
  { id: 6, title: "Seasonal Price Trends", description: "Analyze crop prices across seasons.", category: "Market Info", link: "#" },
];

export default function Resources() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(RESOURCES_DATA.map(r => r.category))], []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return RESOURCES_DATA.filter(r => {
      const matchesQuery = r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [query, categoryFilter]);

  const getCategoryIcon = (category) => {
    switch(category) {
      case "Guide": return <FaBook className="text-white" />;
      case "AI Tool": return <FaRobot className="text-white" />;
      case "Market Info": return <FaChartLine className="text-white" />;
      default: return <FaBook className="text-white" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case "Guide": return "bg-green-500";
      case "AI Tool": return "bg-blue-500";
      case "Market Info": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2 animate-fade-in">
            <FaBook className="text-green-600" /> Resources
          </h1>

          {/* Search & Filter */}
          <div className="flex flex-wrap gap-3 items-center">
            <input
              className="pl-3 pr-3 py-2 rounded-lg border w-64 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Search resources..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select
              className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-green-400 focus:outline-none"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(r => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-2 transition cursor-pointer relative overflow-hidden group"
            >
              {/* Category Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-2 ${getCategoryColor(r.category)}`}>
                {getCategoryIcon(r.category)}
                <span className="text-white text-xs font-semibold">{r.category}</span>
              </div>

              <h2 className="text-xl font-semibold mb-2 group-hover:text-green-600">{r.title}</h2>
              <p className="text-gray-700 mb-4">{r.description}</p>
              <a
                href={r.link}
                onClick={e => e.preventDefault()}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition transform group-hover:scale-105"
              >
                Learn More <FaExternalLinkAlt />
              </a>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No resources found. Try a different search or filter.
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-6 text-center">
         
        </div>
      </div>
    </section>
  );
}
