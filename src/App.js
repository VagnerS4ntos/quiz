import React from 'react';
import NumberOfQuestions from './components/NumberOfQuestions';
import Categries from './components/Categories';
import Difficulty from './components/Difficulty';
import Type from './components/Type';
import Content from './components/Content';

function App() {
  return (
    <section className="container mx-auto py-10 px-5" id="top">
      <h1 className="text-5xl mb-10">QUIZ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <NumberOfQuestions />
        <Categries />
        <Difficulty />
        <Type />
      </div>
      <Content />
    </section>
  );
}

export default App;
