export default function SectionHead(props) {
  return (
    <div className="center-flex my-3">
      <h1 className="bg-info text-primary px-3 py-2 cinzel-bold">
        {props.title}
      </h1>
    </div>
  );
}
