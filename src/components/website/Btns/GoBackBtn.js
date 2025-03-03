import { Button } from "react-bootstrap";

export default function GoBackBtn(props) {
  return (
    <div className="center-flex mt-2">
      <Button variant="outline-primary" onClick={() => window.history.back()}>
        {props.word}
      </Button>
    </div>
  );
}
