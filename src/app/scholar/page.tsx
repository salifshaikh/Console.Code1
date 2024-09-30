"use client";
import { useState } from "react";

export default function ScholarshipApplicationPage() {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    casteCertificate: null as File | null,
    currentFees: null as File | null,
    dob: "",
    category: "",
    mobileNo: "",
    proofOfIdentity: null as File | null,
    parentName: "",
    familyIncome: "",
    proofOfIncome: null as File | null,
    accountNumber: "",
    ifscCode: "",
    bankName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.files ? target.files[0] : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="w-full p-6 mt-[100px] bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Scholarship Application Form</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

        {/* Student Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Student Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">College</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="Enter college name"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Caste Certificate</label>
              <input
                type="file"
                name="casteCertificate"
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Current Fees (Fee Receipt)</label>
              <input
                type="file"
                name="currentFees"
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              >
                <option value="">Select Category</option>
                <option value="sc">SC</option>
                <option value="nt">NT</option>
                <option value="sbc">SBC</option>
                <option value="ews">EWS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Proof of Identity</label>
              <input
                type="file"
                name="proofOfIdentity"
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Parent Section */}
        <div className="mb-6">
            <hr className="mb-4"/>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Parent Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Parent's Name</label>
              <input
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter parent's name"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Family Income</label>
              <input
                type="text"
                name="familyIncome"
                value={formData.familyIncome}
                onChange={handleChange}
                placeholder="Enter family income"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Proof of Income</label>
              <input
                type="file"
                name="proofOfIncome"
                onChange={handleChange}
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="mb-6">
        <hr className="mb-4"/>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Bank Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                placeholder="Enter account number"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="Enter IFSC code"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Enter bank name"
                className="w-80 p-3 border border-gray-300 rounded-sm dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center">
        <button
          type="submit"
          className="w-40 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Submit Application
        </button>
        </div>
      </form>

     
    </div>
  );
}
