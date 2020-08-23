import React, { useState } from "react";
import {useSelector} from "react-redux";
import { Button } from "../widgets/Button";
import { useForm } from "react-hook-form";

import { useMutation, gql } from "@apollo/client";

export const FormContext = React.createContext({
  register: undefined,
  control: undefined,
});

const SAVE_QUESTION = gql`
  mutation($input: saveObjectiveInput!) {
    saveObjective(input: $input) {
      payload {
        id
        introduction
        body
        explanation
        authorshipYear
        own
        status
        bloomTaxonomy
        difficulty
        alternatives {
          correct
          text
        }
      }
    }
  }
`;

export const SteppedForm = ({ children }) => {
  const allSteps = children.map((x) => x.props["step"]);
  const minStep = Math.min(...allSteps);
  const maxStep = Math.max(...allSteps);
  const [currentStep, setCurrentStep] = useState(minStep);
  const [submitNext, setSubmitNext] = useState(false);

  const handleNext = () => {
    setCurrentStep(Math.min(currentStep + 1, maxStep));
    setSubmitNext(currentStep === maxStep);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, minStep));
    setSubmitNext(false);
  };

  const { register, handleSubmit, control } = useForm();

  const [saveQuestion] = useMutation(SAVE_QUESTION);
  const authenticationState = useSelector(state => state.auth);

  const onSubmit = async (inputs) => {
    await saveQuestion({
      variables: {
        input: {
          objectiveQuestion: {
            userId: authenticationState.user.user_id,
            body: inputs.enunciado,
            own: inputs.autoria === "Própia" ? true : false,
            explanation: inputs.correctAlternativeExplanation,
            status: "draft",
            bloomTaxonomy: "remember",
            difficulty: "easy",
            authorshipYear: String(inputs.ano),
            alternatives: [
              {
                correct: true,
                text: inputs.correctAlternative || "",
              },
              {
                correct: false,
                text: inputs.incorrectAlternative1 || "",
              },
              {
                correct: false,
                text: inputs.incorrectAlternative2 || "",
              },
              {
                correct: false,
                text: inputs.incorrectAlternative3 || "",
              },
              {
                correct: false,
                text: inputs.incorrectAlternative4 || "",
              },
            ],
          },
        },
      },
    });
  };

  return (
    <form
      className="h-full flex flex-col space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormContext.Provider value={{ register, control }}>
        {children.map((x) => {
          const visible = x.props["step"] === currentStep;

          return (
            <div key={x.props["step"]} className={visible ? "" : "hidden"}>
              {x}
            </div>
          );
        })}
      </FormContext.Provider>

      <div className="flex justify-end space-x-2">
        <Button
          className={minStep === currentStep ? "hidden" : ""}
          onClick={() => handleBack()}
        >
          Retornar
        </Button>
        <Button
          type={submitNext ? "submit" : "button"}
          onClick={() => handleNext()}
        >
          {maxStep === currentStep ? "Finalizar" : "Prosseguir"}
        </Button>
      </div>
    </form>
  );
};