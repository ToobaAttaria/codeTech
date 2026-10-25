import ProgramCard from './ProgramCard.jsx'
import { internshipApplicationFormUrl } from '../data/site.js'

export default function InternshipCard({ internship }) {
  return <ProgramCard program={internship} type="internship" formUrl={internshipApplicationFormUrl} />
}
