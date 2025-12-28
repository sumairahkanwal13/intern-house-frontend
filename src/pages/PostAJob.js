import { useState } from "react";
import { toast } from "react-toastify";

export default function PostAJob() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      salary: Number(formData.salary),
      qualifications: formData.qualifications
        .split(",")
        .map((q) => q.trim())
        .filter((q) => q !== ""),
    };

    try {
      const response = await fetch("https://intern-house-backend-bice.vercel.app/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Failed to add new job");
      }

      toast.success("New job posted successfully!");

      
      setFormData({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
        qualifications: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while posting a new job");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Post a Job</h2>

      <form onSubmit={handleSubmit}>
       
        <div className="mb-3">
          <label>Job Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            className="form-control"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Job Type:</label>
          <select
            name="jobType"
            className="form-control"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Job Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Qualifications:</label>
          <input
            type="text"
            name="qualifications"
            className="form-control"
            value={formData.qualifications}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Post Job
        </button>
      </form>
    </div>
  );
}
