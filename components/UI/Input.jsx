// @ts-nocheck
import React, { useReducer, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { color } from '../../utils/styleGuide';
import TitleText from './TitleText';
import BodyText from './BodyText';

const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_UPDATE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  wrongText,
  required,
  email,
  onInputChange,
  initialValue,
  initialValidate,
  min,
  max,
  minLength,
  maxLength,
  ...props
}) => {
  const initialState = {
    value: initialValue,
    isValid: initialValidate,
    touched: false,
  };

  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const handleChangeText = (text) => {
    let isValid = true;
    const regexEmail = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (email && !regexEmail.test(text)) isValid = false;
    if (required && text.trim().length === 0) isValid = false;
    if (min && +text < min) isValid = false;
    if (max && +text > max) isValid = false;
    if (minLength && text.trim().length < minLength) isValid = false;
    if (maxLength && text.trim().length > maxLength) isValid = false;

    dispatchInput({
      type: INPUT_UPDATE,
      value: text,
      isValid,
    });
  };

  const handelBlur = () => {
    dispatchInput({ type: INPUT_BLUR });
  };

  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [onInputChange, id, inputState.value, inputState.isValid]);

  return (
    <View style={styles.field}>
      <TitleText>{label}</TitleText>
      <TextInput
        value={inputState.value}
        onChangeText={handleChangeText}
        onBlur={handelBlur}
        style={styles.input}
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.wrongContainer}>
          <BodyText style={styles.wrongText}> {wrongText} </BodyText>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  field: {
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  input: {
    width: '100%',
    marginTop: 7.5,
    borderBottomWidth: 1,
    borderColor: color.accent,
  },
  wrongContainer: {
    marginTop: 7.5,
    backgroundColor: color.error,
    padding: 3.25,
    borderRadius: 7.5,
  },
  wrongText: {
    color: color.primary,
  },
});
