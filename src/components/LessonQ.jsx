"use client";

import { useState } from "react";
import { endLesson } from "@/app/actions/endLesson";
import Image from "next/image";

export default function LessonQ({
  singleLesson,
  questionsAndAnswers,
  lesson_id,
  user_id,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questionsAndAnswers[currentIndex];

  //   async function endLesson(formData) {
  //     const { user, lesson } = Object.fromEntries(formData);
  //     console.log(user);
  //     console.log(lesson);
  //   }

  const handleContinue = () => {
    if (selectedOption) {
      setSelectedOption(null);
      setChecked(false);
      setIsCorrect(null);
      setCurrentIndex((index) => index + 1);
    }
  };

  const handleCheck = () => {
    if (selectedOption) {
      setChecked(true);
      setIsCorrect(selectedOption.is_answer);
      const correct = selectedOption.is_answer;
      if (correct) {
        setCorrectCount((count) => count + 1);
      }
    }
  };

  return (
    <div mode="modal" className="p-6">
      <h3 className="text-2xl font-bold text-white mb-4 text-center bg-black/30 w-full p-3">
        {singleLesson.lesson_name}
      </h3>

      {currentIndex < questionsAndAnswers.length ? (
        <div key={currentQuestion.question}>
          <p className="text-white text-center my-8">
            {currentQuestion.question}
          </p>
          <div className="grid gap-4">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.option}
                className={`bg-gray-600 cursor-pointer transition-colors rounded-2xl p-2 ${
                  selectedOption?.option === answer.option
                    ? "bg-pink-300 text-black"
                    : "hover:bg-pink-300 text-white"
                }`}
                onClick={() => setSelectedOption(answer)}
              >
                {answer.option}
              </button>
            ))}
          </div>

          <div className="flex flex-col mt-8">
            {checked ? (
              <button
                className={`mt-4 px-4 py-2 rounded ${
                  checked
                    ? "bg-pink-700 text-white hover:bg-purple-400"
                    : "bg-gray-400 text-gray-700"
                }`}
                onClick={handleContinue}
                disabled={!checked}
              >
                Continue
              </button>
            ) : (
              <button
                className={`mt-4 px-4 py-2 rounded ${
                  selectedOption
                    ? "bg-purple-600 text-white hover:bg-purple-400"
                    : "bg-gray-400 text-gray-700"
                }`}
                onClick={handleCheck}
                disabled={!selectedOption}
              >
                Check
              </button>
            )}

            <div>
              {checked && (
                <p
                  className={`font-semibold flex justify-center p-5 ${
                    isCorrect ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-green-600 font-semibold mt-6 text-center">
            <p>Well done, lesson completed!</p>
            <p>
              you scored {correctCount}/{questionsAndAnswers.length}
            </p>
          </div>
          <div>
            <Image
              src="/owl-wings-raised-icon.png"
              width={250}
              height={250}
              alt="Codealingo logo"
              className="self-center justify-self-center mt-10"
            />
          </div>
          <div className="flex flex-col mt-8 text-center items-center">
            <form action={endLesson}>
              <input
                name="user"
                id="user"
                type="hidden"
                defaultValue={user_id}
              ></input>
              <input
                name="lesson"
                id="lesson"
                type="hidden"
                defaultValue={lesson_id}
              ></input>
              <input
                name="course"
                id="course"
                type="hidden"
                defaultValue={singleLesson.language_name}
              ></input>
              <button
                type="submit"
                className="flex w-full mt-4 px-4 py-2 rounded bg-pink-700 text-white hover:bg-purple-400 text-center"
              >
                End lesson
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
