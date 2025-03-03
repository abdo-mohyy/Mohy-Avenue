import Skeleton from "react-loading-skeleton";

export default function SkeletonShow(props) {
  const skeletonLength = Array.from({ length: props.length }).map((_, key) => (
    <div className={props.classes} key={key}>
      <div className="mx-1">
        <Skeleton
          baseColor={props.baseColor}
          width={props.width}
          height={props.height}
        />
      </div>
    </div>
  ));
  return skeletonLength;
}
