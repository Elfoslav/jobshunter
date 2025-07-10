enum JobApplicationStatus {
  Submitted = 'Submitted', // Default initial state
  InReview = 'In Review', // When someone has looked at it
  Interview = 'Interview Scheduled', // Moved forward
  Offer = 'Offer', // Final selection
  Accepted = 'Accepted Offer', // Candidate said yes
  Rejected = 'Rejected', // Rejected by company or candidate
}

export default JobApplicationStatus;
