function JobCard({
  job,
  onSaveJob,
  onViewJob,
  onRemoveJob,
  isSaved,
}) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>

      <div className="job-info">
  <p>{job.company}</p>
  <p>{job.location}</p>
  <p>{job.type}</p>
  <p>{job.salary}</p>
</div>

      <div className="job-card-actions">
        <button onClick={() => onViewJob(job)}>
          View Job
        </button>

        {isSaved ? (
          <button onClick={() => onRemoveJob(job.id)}>
            Remove Saved
          </button>
        ) : (
          <button onClick={() => onSaveJob(job)}>
            Save Job
          </button>
        )}
      </div>
    </div>
  )
}

export default JobCard