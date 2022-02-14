import * as React from 'react';

import { GlobalContext } from '../GlobalStorage';

export default function Type() {
  const global = React.useContext(GlobalContext);

  const handleChange = ({ target }) => {
    global.setType(target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xl">Type</label>
      <select
        onChange={handleChange}
        className="border shadow-md text-xl p-2 rounded-md"
      >
        <option value={''}>Any Type</option>
        <option value={'multiple'}>Multiple Choice</option>
        <option value={'boolean'}>True/False</option>
      </select>
    </div>
  );
}
