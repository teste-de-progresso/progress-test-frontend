import React from "react";
import { Card } from "../../../widgets/Card";
import { TextEditor } from "./TextEditor";

export const DistractorsForm = ({ questionData }) => {
  const alternatives = questionData?.alternatives || [
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
  ];

  const incorrectAnswers = alternatives.filter(
    (alternative) => alternative.correct === false
  );

  return (
    <>
      <Card title={"Distratores"}>
        <div className="flex flex-col">
          <div className="">
            {incorrectAnswers.map((answer, index) => {
              return (
                <div className="w-full mb-3" key={index}>
                  <TextEditor
                    name={`incorrectAlternative${index + 1}`}
                    defaultValue={answer.text}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </>
  );
};