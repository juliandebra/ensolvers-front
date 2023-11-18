import { skeleton, skeletonTitle, skeletonButton } from '../Styles/SkeletonCard.module.css'

const SkeletonCard = () => (
  <div className={skeleton}>
    <div className={skeletonTitle}></div>
    <div className={skeletonButton}></div>
  </div>
)

export default SkeletonCard
