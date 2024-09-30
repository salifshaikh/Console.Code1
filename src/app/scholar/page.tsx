"use client";
import { useState } from "react";

// Mock data for scholarships
const scholarships = [
  { id: 1, name: "SC Scholarship", caste: "sc", maxIncome: 250000, link: "https://example.com/sc-scholarship" },
  { id: 2, name: "NT Scholarship", caste: "nt", maxIncome: 200000, link: "https://example.com/nt-scholarship" },
  { id: 3, name: "SBC Scholarship", caste: "sbc", maxIncome: 150000, link: "https://example.com/sbc-scholarship" },
  { id: 4, name: "EWS Scholarship", caste: "ews", maxIncome: 100000, link: "https://example.com/ews-scholarship" },
  { id: 5, name: "General Merit Scholarship", caste: "all", maxIncome: 500000, link: "https://example.com/general-scholarship" },
];

export default function ScholarshipFinderPage() {
  const [formData, setFormData] = useState({
    caste: "",
    annualIncome: "",
  });
  const [availableScholarships, setAvailableScholarships] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const income = parseInt(formData.annualIncome);
    const eligible = scholarships.filter(
      (s) => (s.caste === formData.caste || s.caste === "all") && income <= s.maxIncome
    );
    setAvailableScholarships(eligible);
  };

  return (
    <div className="w-full p-6 mt-[100px] bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Scholarship Finder</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Caste</label>
            <select
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              required
            >
              <option value="">Select Caste</option>
              <option value="sc">SC</option>
              <option value="nt">NT</option>
              <option value="sbc">SBC</option>
              <option value="ews">EWS</option>
              <option value="general">General</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Annual Family Income</label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              placeholder="Enter annual income"
              className="w-full p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Find Scholarships
        </button>
      </form>

      {availableScholarships.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Scholarships</h2>
          <ul className="space-y-2">
            {availableScholarships.map((scholarship) => (
              <li key={scholarship.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{scholarship.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Max Income: ₹{scholarship.maxIncome.toLocaleString()}
                </p>
                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  Learn More
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}