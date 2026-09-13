import { useParams, useNavigate } from "react-router";
import { useState } from "react";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !resume) {
      alert("Please fill all fields.");
      return;
    }

    setSubmitted(true);
    setShowForm(false);

    setName("");
    setEmail("");
    setResume(null);
  };

  return (
    <div className="job-details-page">

      <button onClick={() => navigate("/")}>
        ← Back to Jobs
      </button>

      <h1>Job Details</h1>

      <p>
        <strong>Job ID:</strong> {jobId}
      </p>

      <h2>Frontend Developer</h2>

      <p>
        <strong>Company:</strong> Google
      </p>

      <p>
        <strong>Location:</strong> Bangalore
      </p>

      <p>
        <strong>Salary:</strong> ₹10–15 LPA
      </p>

      <p>
        <strong>Job Type:</strong> Full-time
      </p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>
        Build responsive and user-friendly web applications using React.
      </p>

      {!submitted && (
        <button onClick={() => setShowForm(true)}>
          Apply Now
        </button>
      )}

      {submitted && (
        <div className="success-message">
          <h3>Application Submitted Successfully! 🎉</h3>
          <p>
            Your application for Frontend Developer has been submitted.
          </p>
        </div>
      )}

      {showForm && (
        <div className="application-form">

          <h2>Apply for this Job</h2>

          <form onSubmit={handleSubmit}>

            <div>
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label>Resume</label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />

              {resume && (
                <p>
                  Selected: {resume.name}
                </p>
              )}
            </div>

            <button type="submit">
              Submit Application
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

    </div>
  );
}

export default JobDetails;