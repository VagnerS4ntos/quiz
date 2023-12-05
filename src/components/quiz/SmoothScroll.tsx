import { useQuiz } from "@/globalStates/config";
import React from "react";
import { BsArrowUpCircleFill, BsFillArrowDownCircleFill } from "react-icons/bs";

function SmoothScroll() {
  const [scroll, setScroll] = React.useState(false);
  const { quizData } = useQuiz((state) => state);

  function hasScroll() {
    // Obtém a altura total da página
    const body = document.body;
    const html = document.documentElement;
    const totalHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    // Obtém a altura da janela
    const windowHeight = window.innerHeight;

    // Verifica se a altura total da página é maior que a altura da janela
    if (totalHeight > windowHeight) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  React.useEffect(() => {
    hasScroll();
  }, [quizData]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {scroll && (
        <>
          <BsFillArrowDownCircleFill
            size="2em"
            className="animate-bounce fixed bottom-10 right-20 cursor-pointer"
            onClick={scrollToBottom}
          />

          <BsArrowUpCircleFill
            size="2em"
            className="animate-bounce fixed bottom-10 right-10 cursor-pointer"
            onClick={scrollToTop}
          />
        </>
      )}
    </>
  );
}

export default SmoothScroll;
