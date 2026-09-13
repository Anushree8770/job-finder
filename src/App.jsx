import { useState } from "react";
import { useNavigate } from "react-router";
import JobCard from "./components/JobCard";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    salary: "₹10–15 LPA",
    type: "Full-time",
    description:
      "Build responsive and user-friendly web applications using React.",
  },
  {
    id: 2,
    title: "React Developer",
    company: "Microsoft",
    location: "Hyderabad",
    salary: "₹12–18 LPA",
    type: "Full-time",
    description:
      "Develop reusable React components and modern frontend interfaces.",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Amazon",
    location: "Delhi",
    salary: "₹8–14 LPA",
    type: "Part-time",
    description:
      "Work on scalable frontend features and improve user experience.",
  },
];

function App() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobType, setJobType] = useState("All");

  const [savedJobs, setSavedJobs] = useState([]);

  const filteredJobs = jobs.filter((job) => {
    const search = searchText.toLowerCase();

    const matchesSearch =
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search);

    const matchesType =
      jobType === "All" || job.type === jobType;

    return matchesSearch && matchesType;
  });

  const handleSearch = () => {
    // Filtering happens automatically as the user types.
    // This button is kept for better user experience.
    console.log("Searching for:", searchText);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleSaveJob = (job) => {
    const alreadySaved = savedJobs.some(
      (savedJob) => savedJob.id === job.id
    );

    if (!alreadySaved) {
      setSavedJobs([...savedJobs, job]);
    }
  };

  const handleRemoveJob = (jobId) => {
    setSavedJobs(
      savedJobs.filter((job) => job.id !== jobId)
    );
  };

  const handleClearFilters = () => {
    setSearchText("");
    setJobType("All");
  };

  const handleApply = (job) => {
    setSelectedJob(null);
    navigate(`/job/${job.id}`);
  };

  return (
    <div>
      {/* Search Section */}

      <div className="search-section">
        <h1>Job Finder</h1>

        <p>Find your next opportunity</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>

        <select
          className="job-filter"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="All">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>

        <button
          className="clear-button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* Selected Job Details */}

      {selectedJob && (
        <div className="job-details">

          <h2>{selectedJob.title}</h2>

          <p>{selectedJob.company}</p>

          <p>{selectedJob.location}</p>

          <p>
            <strong>Salary:</strong>{" "}
            {selectedJob.salary}
          </p>

          <p>
            <strong>Job Type:</strong>{" "}
            {selectedJob.type}
          </p>

          <p>{selectedJob.description}</p>

          <div className="job-actions">

            <button
              onClick={() => handleApply(selectedJob)}
            >
              Apply Now
            </button>

            <button
              onClick={() => setSelectedJob(null)}
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* Saved Jobs */}

      <section className="jobs-section">

        <h2>
          Saved Jobs ({savedJobs.length})
        </h2>

        <div>
          {savedJobs.length === 0 && (
            <p>No saved jobs yet.</p>
          )}

          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewJob={handleViewJob}
              onSaveJob={handleSaveJob}
              onRemoveJob={handleRemoveJob}
              isSaved={true}
            />
          ))}
        </div>

      </section>

      {/* Available Jobs */}

      <section className="jobs-section">

        <h2>
          Available Jobs ({filteredJobs.length})
        </h2>

        <div>
          {filteredJobs.length === 0 && (
            <p>No jobs found.</p>
          )}

          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewJob={handleViewJob}
              onSaveJob={handleSaveJob}
              onRemoveJob={handleRemoveJob}
              isSaved={savedJobs.some(
                (savedJob) => savedJob.id === job.id
              )}
            />
          ))}
        </div>

      </section>
    </div>
  );
}

export default App;