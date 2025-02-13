import {
  skeleton,
  skeletonTitle,
  skeletonDescription,
  skeletonDate,
  skeletonButton,
} from "../Styles/SkeletonCard.module.css";

const SkeletonCard = () => (
  <div className={skeleton}>
    <div className={skeletonTitle}></div>
    <div className={skeletonDescription}></div>
    <div className={skeletonDate}></div>
    <div className={skeletonButton}></div>
  </div>
);

export default SkeletonCard;
