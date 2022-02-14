import * as React from 'react';
import { GlobalContext } from '../GlobalStorage';

export default function NumberOfQuestions() {
  const global = React.useContext(GlobalContext);

  const handleChange = ({ target }) => {
    if (target.value >= 50) {
      global.setNumberOfQuestion(50);
    } else if (target.value <= 1) {
      global.setNumberOfQuestion(1);
    } else {
      global.setNumberOfQuestion(target.value);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xl">Number of Question</label>
      <input
        type="number"
        min="1"
        max="50"
        className="border shadow-md text-xl p-2 rounded-md"
        value={global.numberOfQuestion}
        onChange={handleChange}
      />
    </div>
  );
}
