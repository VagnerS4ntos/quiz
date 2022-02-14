import * as React from 'react';

import { GlobalContext } from '../GlobalStorage';

export default function SelectAutoWidth() {
  const global = React.useContext(GlobalContext);

  const handleChange = ({ target }) => {
    global.setSelectedCategory(target.value);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xl">Category</label>
      <select
        onChange={handleChange}
        className="border shadow-md text-xl p-2 rounded-md"
        value={global.selectedCategory}
      >
        <option value={''}>Any Category</option>
        {global.allCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
