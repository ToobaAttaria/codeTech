import { Quote, Star } from 'lucide-react'

export default function ReviewCard({ review }) {
  const initials = review.name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <article className="review-card">
      <div className="review-card-top">
        <span className="review-avatar" aria-hidden="true">{initials}</span>
        <div className="review-person">
        <strong>{review.name}</strong>
        <small>{review.program}</small>
        {/* <span className={`review-source-label${review.isDemo ? ' is-demo' : ' is-approved'}`}>
          {review.isDemo ? 'Demo content' : 'Published with consent'}
        </span> */}
      </div>
        {/* <Quote className="review-quote-mark" size={26} strokeWidth={2.2} aria-hidden="true" /> */}
        <div className="review-stars" role="img" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }, (_, index) => (
            <Star key={index} size={15} fill="currentColor" aria-hidden="true" />
          ))}
        </div>
      </div>
      <p className="review-quote">{review.quote}</p>
     
    </article>
  )
}
