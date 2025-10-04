document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/jobs')
    .then(res => res.json())
    .then(jobs => {
      const jobsDiv = document.getElementById('jobs');
      const jobSelect = document.getElementById('job');
      jobs.forEach(job => {
        // Display job
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';
        jobDiv.innerHTML = `<strong>${job.title}</strong><br>${job.description}`;
        jobsDiv.appendChild(jobDiv);
        // Add to select
        const option = document.createElement('option');
        option.value = job.id;
        option.textContent = job.title;
        jobSelect.appendChild(option);
      });
    });

  document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      name: this.name.value,
      email: this.email.value,
      jobId: this.jobId.value,
      coverLetter: this.coverLetter.value
    };
    fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        document.getElementById('message').textContent = result.message || result.error;
        if (result.message) this.reset();
      });
  });
});
