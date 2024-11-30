"use client";
import { useState } from "react";

// Mock data for scholarships
const scholarships = [
  { id: 1, name: "SC Scholarship", caste: "sc", maxIncome: 250000, link: "https://oasis.gov.in/" },
  { id: 2, name: "NT Scholarship", caste: "nt", maxIncome: 200000, link: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AD0CCA04E9F6D7EE4" },
  { id: 3, name: "SBC Scholarship", caste: "sbc", maxIncome: 150000, link: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AACF2205FD2FB060A" },
  { id: 4, name: "EWS Scholarship", caste: "ews", maxIncome: 100000, link: "https://pib.gov.in/Pressreleaseshare.aspx?PRID=1847840" },
  { id: 5, name: "General Merit Scholarship", caste: "all", maxIncome: 500000, link: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AC3C0DE50B5557546#:~:text=The%20applicant%20must%20be%20a,cannot%20apply%20for%20this%20scheme." },
  { id: 6, name: "OBC Scholarship", caste: "obc", maxIncome: 300000, link: "https://mahadbt.maharashtra.gov.in/SchemeData/SchemeData?str=E9DDFA703C38E51AC54E5F6E794BD5C1" },
  { id: 7, name: "Minority Scholarship", caste: "minority", maxIncome: 350000, link: "https://www.minorityaffairs.gov.in/show_content.php?lang=1&level=2&ls_id=661&lid=823" },
  { id: 8, name: "Merit-cum-Means Scholarship", caste: "all", maxIncome: 400000, link: "https://example.com/merit-cum-means-scholarship" },
  { id: 9, name: "Women Empowerment Scholarship", caste: "all", maxIncome: 300000, link: "https://womensempowermentscholarship.org/" },
  { id: 10, name: "Rural Development Scholarship", caste: "all", maxIncome: 200000, link: "https://www.brandonu.ca/rural-development/scholarships-awards/" },
  { id: 11, name: "Disabled Students Scholarship", caste: "all", maxIncome: 400000, link: "https://example.com/disabled-scholarship" },
  { id: 12, name: "Tribal Scholarship", caste: "st", maxIncome: 180000, link: "https://tribal.nic.in/ScholarshiP.aspx" },
  { id: 13, name: "Orphan Students Scholarship", caste: "all", maxIncome: 150000, link: "https://www.hwfindia.org/orphan-scholarships/" },
  { id: 14, name: "Farmer's Child Scholarship", caste: "all", maxIncome: 250000, link: "https://www.buddy4study.com/scholarship/mcaer-dr-punjabrao-deshmukh-vasatigruh-nirvah-bhatta-yojna-agr-maharashtra" },
  { id: 15, name: "Sports Excellence Scholarship", caste: "all", maxIncome: 400000, link: "https://sportsauthorityofindia.nic.in/" },
  { id: 16, name: "Art and Culture Scholarship", caste: "all", maxIncome: 350000, link: "https://www.culture.gov.in/scholarships" },
  { id: 17, name: "National Talent Search Exam Scholarship", caste: "all", maxIncome: 600000, link: "https://www.ncert.nic.in/programmes/talent_exam/index.html" },
  { id: 18, name: "Post Matric Scholarship for Economically Backward Class", caste: "all", maxIncome: 100000, link: "https://scholarships.gov.in/" },
  { id: 19, name: "National Scholarship for Transgender Students", caste: "all", maxIncome: 300000, link: "https://www.transgenderindia.com/scholarships/" },
  { id: 20, name: "Jawaharlal Nehru Memorial Scholarship", caste: "all", maxIncome: 500000, link: "https://www.jnmtrust.org/scholarships/" },
  { id: 21, name: "National Overseas Scholarship", caste: "sc", maxIncome: 800000, link: "https://socialjustice.gov.in/nos" },
  { id: 22, name: "KVPY Fellowship", caste: "all", maxIncome: 500000, link: "http://kvpy.iisc.ac.in/main/index.htm" },
  { id: 23, name: "National Girl Child Scholarship", caste: "all", maxIncome: 250000, link: "https://betibachao.gov.in/" },
  { id: 24, name: "INSPIRE Scholarship", caste: "all", maxIncome: 450000, link: "http://www.online-inspire.gov.in/" },
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
       <div className="flex justify-center">
       <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Find Scholarships
        </button>
       </div>
      </form>

      {availableScholarships.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Available Scholarships</h2>
          <ul className="space-y-2">
          {availableScholarships.map((scholarship) => (
  <div key={scholarship.id} data-aos="fade-left">
    <li className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md" data-aos="fade-in">
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
  </div>
))}

          </ul>
        </div>
      )}
    </div>
  );
}