import { useEffect, useRef, useState } from 'react'
import { BookOpen, BriefcaseBusiness, ChevronLeft, ChevronRight, Send, Star, X } from 'lucide-react'
import ReviewCard from '../components/ReviewCard.jsx'
import { courseReviews, internshipReviews } from '../data/reviews.js'
import { fetchApprovedReviews, submitReview } from '../lib/reviews.js'

const reviewCategories = [
  { id: 'course', label: 'Course Reviews', icon: BookOpen, reviews: courseReviews },
  { id: 'internship', label: 'Internship Reviews', icon: BriefcaseBusiness, reviews: internshipReviews },
]

export default function ReviewsSection() {
  const [activeCategory, setActiveCategory] = useState('course')
  const [reviewIndex, setReviewIndex] = useState(0)
  const [transitionPhase, setTransitionPhase] = useState('')
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    studentName: '',
    program: '',
    rating: 0,
    review: '',
    permission: false,
  })
  const [formErrors, setFormErrors] = useState({})
  const [submissionNotice, setSubmissionNotice] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [approvedReviews, setApprovedReviews] = useState([])
  const [reviewLoadState, setReviewLoadState] = useState('loading')
  const tabRefs = useRef([])
  const reviewModalRef = useRef(null)
  const studentNameRef = useRef(null)
  const shareReviewButtonRef = useRef(null)
  const transitionLock = useRef(false)
  const submissionLock = useRef(false)
  const transitionTimer = useRef(null)
  const activeIndex = reviewCategories.findIndex(({ id }) => id === activeCategory)
  const activeReviews = [
    ...reviewCategories[activeIndex].reviews.map((review) => ({ ...review, isDemo: true })),
    ...approvedReviews.filter((review) => review.category === activeCategory),
  ]
  const activeReview = activeReviews[reviewIndex]

  useEffect(() => {
    let isMounted = true

    fetchApprovedReviews()
      .then((reviews) => {
        if (!isMounted) return
        setApprovedReviews(reviews)
        setReviewLoadState('loaded')
      })
      .catch((error) => {
        console.error('Failed to load approved Firestore reviews:', error)
        if (isMounted) setReviewLoadState('error')
      })

    return () => {
      isMounted = false
      clearTimeout(transitionTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!isReviewModalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    studentNameRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeReviewModal()
        return
      }

      if (event.key !== 'Tab') return
      const focusableElements = reviewModalRef.current?.querySelectorAll(
        'button:not(:disabled), input:not(:disabled), textarea:not(:disabled)',
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      shareReviewButtonRef.current?.focus()
    }
  }, [isReviewModalOpen])

  function closeReviewModal() {
    if (submissionLock.current) return
    setIsReviewModalOpen(false)
    setReviewForm({ studentName: '', program: '', rating: 0, review: '', permission: false })
    setFormErrors({})
    setSubmissionNotice('')
    setSubmissionStatus('')
  }

  function updateReviewForm(field, value) {
    setReviewForm((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => ({ ...current, [field]: '' }))
    setSubmissionNotice('')
    setSubmissionStatus('')
  }

  async function handleReviewSubmit(event) {
    event.preventDefault()
    if (submissionLock.current) return

    const errors = {}
    if (!reviewForm.studentName.trim()) errors.studentName = 'Please enter your name.'
    else if (reviewForm.studentName.trim().length > 100) errors.studentName = 'Name must be 100 characters or fewer.'
    if (!reviewForm.program.trim()) errors.program = 'Please enter your course or internship program.'
    else if (reviewForm.program.trim().length > 120) errors.program = 'Course or program must be 120 characters or fewer.'
    if (!Number.isInteger(reviewForm.rating) || reviewForm.rating < 1 || reviewForm.rating > 5) {
      errors.rating = 'Please choose a star rating.'
    }
    if (!reviewForm.review.trim()) errors.review = 'Please write your review.'
    else if (reviewForm.review.trim().length > 2000) errors.review = 'Review must be 2000 characters or fewer.'

    setFormErrors(errors)
    if (Object.keys(errors).length) {
      setSubmissionNotice('')
      setSubmissionStatus('')
      return
    }

    submissionLock.current = true
    setIsSubmitting(true)
    setSubmissionNotice('')
    setSubmissionStatus('')
    try {
      await submitReview({
        name: reviewForm.studentName,
        course: reviewForm.program,
        rating: reviewForm.rating,
        reviewText: reviewForm.review,
        consentToPublish: reviewForm.permission,
      })
      setReviewForm({ studentName: '', program: '', rating: 0, review: '', permission: false })
      setSubmissionNotice('Your review was submitted and is pending approval. It will appear publicly only if approved and you gave publication consent.')
      setSubmissionStatus('success')
    } catch (error) {
      console.error('Failed to submit review to Firestore:', error)
      setSubmissionNotice('Your review could not be submitted. Please try again later; Firestore access may require security rules to be configured.')
      setSubmissionStatus('error')
    } finally {
      submissionLock.current = false
      setIsSubmitting(false)
    }
  }

  function selectCategory(id) {
    clearTimeout(transitionTimer.current)
    transitionLock.current = false
    setTransitionPhase('')
    setActiveCategory(id)
    setReviewIndex(0)
  }

  function navigateToReview(nextIndex) {
    if (transitionLock.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReviewIndex(nextIndex)
      return
    }

    transitionLock.current = true
    setTransitionPhase('is-falling-out')
    transitionTimer.current = setTimeout(() => {
      setReviewIndex(nextIndex)
      setTransitionPhase('is-falling-in')
      transitionTimer.current = setTimeout(() => {
        setTransitionPhase('')
        transitionLock.current = false
      }, 280)
    }, 220)
  }

  function showPreviousReview() {
    navigateToReview((reviewIndex - 1 + activeReviews.length) % activeReviews.length)
  }

  function showNextReview() {
    navigateToReview((reviewIndex + 1) % activeReviews.length)
  }

  function handleTabKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % reviewCategories.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + reviewCategories.length) % reviewCategories.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = reviewCategories.length - 1
    else return

    event.preventDefault()
    selectCategory(reviewCategories[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <>
    <section className="section-pad reviews-section" id="reviews">
      <div className="reviews-ambient-orbs" aria-hidden="true">
        <span className="reviews-ambient-orb reviews-ambient-orb-one" />
        <span className="reviews-ambient-orb reviews-ambient-orb-two" />
        <span className="reviews-ambient-orb reviews-ambient-orb-three" />
        <span className="reviews-ambient-orb reviews-ambient-orb-four" />
        <span className="reviews-ambient-orb reviews-ambient-orb-five" />
      </div>
      <div className="container">
        <div className="reviews-panel">
          <div className="reviews-intro">
            <p className="eyebrow">LEARNER FEEDBACK</p>
            <h2 className="section-title">What <span>Learners Say</span></h2>
            <p className="section-description">
              Explore testimonials about learning and skill development.
            </p>
           
            {reviewLoadState === 'loading' && (
              
              <p className="review-data-notice" role="status">Loading approved learner reviews…</p>
            )}
            {reviewLoadState === 'error' && (
              <p className="review-data-notice" role="alert">
                Approved learner reviews could not be loaded. Demo testimonials remain available.
              </p>
            )}
            <div className="review-tabs" role="tablist" aria-label="Review categories">
              {reviewCategories.map(({ id, label, icon: Icon }, index) => (
                <button
                  className={`review-tab${activeCategory === id ? ' is-active' : ''}`}
                  id={`review-tab-${id}`}
                  key={id}
                  ref={(element) => { tabRefs.current[index] = element }}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === id}
                  aria-controls="review-panel"
                  tabIndex={activeCategory === id ? 0 : -1}
                  onClick={() => selectCategory(id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            className="review-carousel"
            id="review-panel"
            role="tabpanel"
            aria-labelledby={`review-tab-${activeCategory}`}
            tabIndex={0}
            key={activeCategory}
          >
            <button
              className="review-arrow review-arrow-previous"
              type="button"
              aria-label="Previous review"
              disabled={Boolean(transitionPhase)}
              onClick={showPreviousReview}
            >
              <ChevronLeft size={21} aria-hidden="true" />
            </button>
            <div className={`review-card-stage ${transitionPhase}`} aria-live="polite" aria-atomic="true">
              <ReviewCard key={`${activeCategory}-${activeReview.name}`} review={activeReview} />
            </div>
            <button
              className="review-arrow review-arrow-next"
              type="button"
              aria-label="Next review"
              disabled={Boolean(transitionPhase)}
              onClick={showNextReview}
            >
              <ChevronRight size={21} aria-hidden="true" />
            </button>
            <p className="review-position" aria-label={`Review ${reviewIndex + 1} of ${activeReviews.length}`}>
              {reviewIndex + 1} / {activeReviews.length}
            </p>
          </div>
          <div className="review-share-wrap">
            <button
              className="review-share-button"
              type="button"
              ref={shareReviewButtonRef}
              onClick={() => setIsReviewModalOpen(true)}
            >
              <Send size={16} aria-hidden="true" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    {isReviewModalOpen && (
      <div
        className="review-modal-backdrop"
        onClick={(event) => {
          if (!isSubmitting && event.target === event.currentTarget) closeReviewModal()
        }}
      >
        <section
          className="review-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          aria-describedby="review-modal-description"
          ref={reviewModalRef}
        >
          <button className="review-modal-close" type="button" aria-label="Close review form" disabled={isSubmitting} onClick={closeReviewModal}>
            <X size={19} aria-hidden="true" />
          </button>
          <div className="review-modal-heading">
            <span className="review-modal-icon" aria-hidden="true"><Star size={19} /></span>
            <p className="review-modal-eyebrow">YOUR EXPERIENCE MATTERS</p>
            <h2 id="review-modal-title">Share Your Review</h2>
            <p id="review-modal-description">Tell us about your CodeTech learning experience.</p>
          </div>

          <form className="review-form" noValidate onSubmit={handleReviewSubmit}>
            <label className="review-form-field">
              <span>Student Name</span>
              <input
                ref={studentNameRef}
                type="text"
                autoComplete="name"
                maxLength={100}
                disabled={isSubmitting}
                value={reviewForm.studentName}
                aria-required="true"
                aria-invalid={Boolean(formErrors.studentName)}
                aria-describedby={formErrors.studentName ? 'review-name-error' : undefined}
                onChange={(event) => updateReviewForm('studentName', event.target.value)}
              />
              {formErrors.studentName && <small className="review-field-error" id="review-name-error">{formErrors.studentName}</small>}
            </label>

            <label className="review-form-field">
              <span>Course or Internship Program</span>
              <input
                type="text"
                maxLength={120}
                disabled={isSubmitting}
                value={reviewForm.program}
                aria-required="true"
                aria-invalid={Boolean(formErrors.program)}
                aria-describedby={formErrors.program ? 'review-program-error' : undefined}
                onChange={(event) => updateReviewForm('program', event.target.value)}
              />
              {formErrors.program && <small className="review-field-error" id="review-program-error">{formErrors.program}</small>}
            </label>

            <fieldset className="review-rating-field">
              <legend>Star Rating (1–5)</legend>
              <div
                className="review-rating-options"
                role="group"
                aria-label="Choose a rating from 1 to 5 stars"
                aria-required="true"
                aria-invalid={Boolean(formErrors.rating)}
                aria-describedby={formErrors.rating ? 'review-rating-error' : undefined}
              >
                {Array.from({ length: 5 }, (_, index) => {
                  const rating = index + 1
                  return (
                    <button
                      className={`review-rating-star${rating <= reviewForm.rating ? ' is-selected' : ''}`}
                      type="button"
                      key={rating}
                      disabled={isSubmitting}
                      aria-label={`${rating} ${rating === 1 ? 'star' : 'stars'}`}
                      aria-pressed={reviewForm.rating === rating}
                      onClick={() => updateReviewForm('rating', rating)}
                    >
                      <Star size={25} fill={rating <= reviewForm.rating ? 'currentColor' : 'none'} aria-hidden="true" />
                    </button>
                  )
                })}
              </div>
              {formErrors.rating && <small className="review-field-error" id="review-rating-error">{formErrors.rating}</small>}
            </fieldset>

            <label className="review-form-field">
              <span>Write Your Review</span>
              <textarea
                rows="4"
                maxLength={2000}
                disabled={isSubmitting}
                value={reviewForm.review}
                aria-required="true"
                aria-invalid={Boolean(formErrors.review)}
                aria-describedby={formErrors.review ? 'review-text-error' : undefined}
                onChange={(event) => updateReviewForm('review', event.target.value)}
              />
              {formErrors.review && <small className="review-field-error" id="review-text-error">{formErrors.review}</small>}
            </label>

            <label className="review-permission">
              <input
                type="checkbox"
                disabled={isSubmitting}
                checked={reviewForm.permission}
                onChange={(event) => updateReviewForm('permission', event.target.checked)}
              />
              <span>I give CodeTech permission to publish my review on its website.</span>
            </label>

            {submissionNotice && (
              <p
                className={`review-submission-notice is-${submissionStatus}`}
                role={submissionStatus === 'error' ? 'alert' : 'status'}
              >
                {submissionNotice}
              </p>
            )}

            <div className="review-form-actions">
              <button className="review-submit-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting…' : 'Submit Review'}
              </button>
              <button className="review-cancel-button" type="button" disabled={isSubmitting} onClick={closeReviewModal}>Cancel</button>
            </div>
          </form>
        </section>
      </div>
    )}
    </>
  )
}
