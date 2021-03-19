import React from "react";

import { SteppedForm, Step, Navigator } from "../../../components";
import {
  EnunciadoForm,
  AnswerForm,
  DistractorsForm,
  FeaturesForm,
} from "../Edit/From";

export const New = () => (
  <>
    <Navigator home needsConfirmation />
    <div className="bg-gray-100 w-full my-2">
      <main>
        <SteppedForm status={'draft'}>
          <Step step={0}>
            <EnunciadoForm />
          </Step>
          <Step step={1}>
            <AnswerForm />
          </Step>
          <Step step={2}>
            <DistractorsForm />
          </Step>
          <Step step={3}>
            <FeaturesForm />
          </Step>
        </SteppedForm>
      </main>
    </div>
  </>
);