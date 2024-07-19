// Post Page tsx

"use client";

import { useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import PaddingBlock from "@/components/ui/PaddingBlock";
import PostQuestion from "@/components/post/PostQuestion";
import PostArticle from "@/components/post/PostArticle";


export default function Post() {
  // Because we only have 2 states, we will use a boolean
  // State => (true ? question : article)
  const [isQuestion, setIsQuestion] = useState<boolean>(true);

  return (
    <LayoutDefault>
      <main>
        <PaddingBlock pad={0.5} />
        <h1 className="text-center text-xl">Post a Question or Article</h1>

        <PaddingBlock pad={0.5} />

        <div className="flex justify-center gap-4 items-center">
          <button className={`btn ${isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(true) }}>Post a Question</button>
          <button className={`btn ${!isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(false) }}>Post an Article</button>
        </div>

        <PaddingBlock pad={1} />

        <div className="w-[99%] mb:w-[85%] sm:w-[70%] m-auto">
          {isQuestion ?
            <PostQuestion />
            :
            <PostArticle />
          }
        </div>

        <PaddingBlock pad={2} />

      </main>
    </LayoutDefault>
  );
}
