import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from './firebase.js'

const reviewsCollection = collection(db, 'reviews')

export function createPendingReview({ name, course, rating, reviewText, consentToPublish }) {
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 100) {
    throw new Error('Name must be between 1 and 100 characters.')
  }
  if (typeof course !== 'string' || !course.trim() || course.trim().length > 120) {
    throw new Error('Course or program must be between 1 and 120 characters.')
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error('Rating must be a whole number from 1 to 5.')
  }
  if (typeof reviewText !== 'string' || !reviewText.trim() || reviewText.trim().length > 2000) {
    throw new Error('Review must be between 1 and 2000 characters.')
  }
  if (typeof consentToPublish !== 'boolean') {
    throw new Error('Publication consent must be provided.')
  }

  return {
    name: name.trim(),
    course: course.trim(),
    rating,
    reviewText: reviewText.trim(),
    consentToPublish,
    status: 'pending',
    createdAt: serverTimestamp(),
  }
}

export async function submitReview(reviewInput) {
  const review = createPendingReview(reviewInput)
  return addDoc(reviewsCollection, review)
}

export async function fetchApprovedReviews() {
  const approvedReviewsQuery = query(
    reviewsCollection,
    where('status', '==', 'approved'),
    where('consentToPublish', '==', true),
  )
  const snapshot = await getDocs(approvedReviewsQuery)

  return snapshot.docs.map((reviewDocument) => {
    const review = reviewDocument.data()
    if (
      typeof review.name !== 'string'
      || typeof review.course !== 'string'
      || typeof review.reviewText !== 'string'
      || !Number.isInteger(review.rating)
      || review.rating < 1
      || review.rating > 5
      || review.status !== 'approved'
      || review.consentToPublish !== true
    ) {
      throw new Error(`Approved review ${reviewDocument.id} has invalid data.`)
    }

    return {
      name: review.name,
      program: review.course,
      quote: review.reviewText,
      rating: review.rating,
      isDemo: false,
      category: review.course.toLowerCase().includes('internship') ? 'internship' : 'course',
    }
  })
}
