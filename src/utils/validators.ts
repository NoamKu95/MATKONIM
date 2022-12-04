export enum ValidationError {
  nullValue,
  tooShort,
  specialCharacters,
  belowZero,
}

export const validateText = (text: string | null): ValidationError | null => {
  if (text !== null) {
    if (text.length < 2) {
      return ValidationError.tooShort;
    } else {
      let reg = /^[^!-\/:-@\[-`{-~]+$/;
      if (!reg.test(text.trim())) {
        return ValidationError.specialCharacters;
      } else {
        return null;
      }
    }
  } else {
    return ValidationError.nullValue;
  }
};

export const validateNumber = (
  value: number | null,
): ValidationError | null => {
  if (value !== null) {
    if (value <= 0) {
      return ValidationError.belowZero;
    } else {
      return null;
    }
  } else {
    return ValidationError.nullValue;
  }
};
