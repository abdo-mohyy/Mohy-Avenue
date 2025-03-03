import { useEffect, useState } from "react";

export default function QtySelect(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);

    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <select className="p-2 p-md-3" onChange={(e) => setBtn(e.target.value)}>
      <option value="qty" disabled>
        Qty
      </option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  );
}
