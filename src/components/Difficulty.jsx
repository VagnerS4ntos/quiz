import * as React from 'react';

import { GlobalContext } from '../GlobalStorage';

export default function Difficulty() {
  const global = React.useContext(GlobalContext);

  const handleChange = ({ target }) => {
    global.setDifficulty(target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xl">Difficulty</label>
      <select
        onChange={handleChange}
        className="border shadow-md text-xl p-2 rounded-md"
      >
        <option value={''}>Any Difficulty</option>
        <option value={'easy'}>Easy</option>
        <option value={'medium'}>Medium</option>
        <option value={'hard'}>Hard</option>
      </select>
    </div>
  );
}
