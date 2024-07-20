// Questions Page tsx
"use client";

import { useEffect, useState } from "react";
import LayoutDefault from "@/components/layout/LayoutDefault";
import { Question } from "@/types/question";
import CardQuestion from "@/components/CardQuestion";
import { getAllQuestions } from "@/services";
import { useNotification } from "@/components/providers/NotificationProvider";

export default function Questions() {
  const { addNotification } = useNotification();
  const [isFetchingQuestions, setIsFetchingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  useEffect(() => {
    getQuestions();
  }, [])

  const getQuestions = async () => {
    try {
      const response = await getAllQuestions();
      console.log(response);
      if (!response) {
        return;
      }
      setQuestions(response);
    } catch (error) {
      console.error(error);
      addNotification('Error fetching questions. Reload')
    } finally {
      setIsFetchingQuestions(false);
    }
  }

  return (
    <LayoutDefault>
      <main>

        {questions && (
          <div>
            {questions.map((q, idx) => (
              <CardQuestion key={idx} qd={q} />
            ))}
          </div>
        )}

        {isFetchingQuestions && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p>Fetching Questions...</p>
          </div>
        )}

        {!isFetchingQuestions && !questions && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p>Error Fetching Questions.</p>
            <p>Please try again later.</p>
          </div>
        )}

      </main>
    </LayoutDefault>
  );
}