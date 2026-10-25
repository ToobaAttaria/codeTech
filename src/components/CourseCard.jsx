import ProgramCard from './ProgramCard.jsx'
import { shortCoursesFormUrl } from '../data/site.js'

export default function CourseCard({ course }) {
  return <ProgramCard program={course} type="course" formUrl={shortCoursesFormUrl} />
}
