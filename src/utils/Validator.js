/**
Contains validation functions like isRequired, isPattern etc.
*/
function Validator(value) {
  function isRequired() {
    if (value.trim() === '') {
      return 'Required';
    }
    return '';
  }

  function isPattern(param) {
    const [pattern, message] = param;
    if (!new RegExp(pattern, 'g').test(value)) {
      return message;
    }
    return '';
  }

  function isMaxLength(length) {
    if (value.length > parseInt(length, 10)) {
      return `*Max length - ${length} chars.`;
    }
    return '';
  }

  function isRequiredDropdown() {
    if (!value) {
      return 'Required';
    }
    return '';
  }

  return {
    isRequired,
    isPattern,
    isMaxLength,
    isRequiredDropdown,
  };
}

export default Validator;
