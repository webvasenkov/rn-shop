// @ts-nocheck
import { useReducer, useCallback } from 'react';

const FORM_INPUT_UPDATE = 'FORM-INPUT-UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updateValues = { ...state.inputValues, [action.input]: action.value };
    const updateValidities = { ...state.inputValidities, [action.input]: action.isValid };

    let formUpdateIsValid = true;
    for (const key in updateValidities) formUpdateIsValid = formUpdateIsValid && updateValidities[key];

    return { inputValues: updateValues, inputValidities: updateValidities, formIsValid: formUpdateIsValid };
  }

  return state;
};

export const useControlForm = (initialState) => {
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const onInputChange = useCallback(
    (id, text, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid,
        input: id,
      });
    },
    [dispatchFormState]
  );

  return [formState, onInputChange];
};
