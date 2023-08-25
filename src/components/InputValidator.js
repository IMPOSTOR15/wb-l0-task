export default class InputValidator {
    constructor() {
      this.inputs = [];
    }
  
    addInput(inputElement, errorElement, descriptionElement, errorMessageEmpty, errorMessageInvalid, validationFunction) {
      const inputInfo = {
        inputElement: inputElement,
        errorElement: errorElement,
        descriptionElement: descriptionElement,
        errorMessageEmpty: errorMessageEmpty,
        errorMessageInvalid: errorMessageInvalid,
        validationFunction: validationFunction,
        isValid: false,
      };
      

      this.inputs.push(inputInfo);
      inputElement.addEventListener("input", () => {
        this.handleInput(inputInfo);
      });

      inputElement.addEventListener("blur", () => {
        this.handleBlur(inputInfo);
      });
      if (inputElement.type === 'tel') {
        inputElement.addEventListener("blur", (e) => {
            this.enablePhoneMask(e);
          });
      }
    }

    enablePhoneMask(evt) {
        const x = evt.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        evt.target.value = !x[2] ? x[1] : '+' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '') + (x[5] ? ' ' + x[5] : ''); 
    }

    handleInput(inputInfo) {
        const inputElement = inputInfo.inputElement;
        const trimmedValue = inputElement.value.trim();
        inputInfo.isValid = trimmedValue !== "" && inputInfo.validationFunction(trimmedValue);
        this.updateHideError(inputInfo);
    }
  
    handleBlur(inputInfo) {
      this.updateErrorState(inputInfo);
    }

    updateHideError(inputInfo) {
        if (inputInfo.isValid) {
            this.hideError(inputInfo.inputElement, inputInfo.errorElement);
            if (inputInfo.descriptionElement) {
                this.showDescription(inputInfo)
            }
        }
    }

    updateErrorState(inputInfo) {
        if (!inputInfo.isValid) {
            if (inputInfo.inputElement.value.trim() === "") {
                this.showError(inputInfo.inputElement, inputInfo.errorElement, inputInfo.errorMessageEmpty);
            } else {
                this.showError(inputInfo.inputElement, inputInfo.errorElement, inputInfo.errorMessageInvalid);
            }
            if (inputInfo.descriptionElement) {
                this.hideDescription(inputInfo)
            }
        } else {
            this.hideError(inputInfo.inputElement, inputInfo.errorElement);
            if (inputInfo.descriptionElement) {
                this.showDescription(inputInfo)
            }
        }
        
    }
    showDescription(inputInfo) {
        inputInfo.descriptionElement.style.display = 'inline'
    }
    hideDescription(inputInfo) {
        inputInfo.descriptionElement.style.display = 'none'
    }

    validateName(value) {
        const nameRegex = /\d/;
        return !nameRegex.test(value);
    }
    validatePhone(phone) {
        const phoneRegex = /^\+\d\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
        return phoneRegex.test(phone);
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validateINN(inn) {
        const innRegex = /^\d{14}$/;
        return innRegex.test(inn);
    }
  
    showError(inputElement, errorElement, errorMessage) {
        inputElement.classList.add('user-info__input-field_error')
        errorElement.textContent = errorMessage
        errorElement.style.visibility = 'visible'

    }
  
    hideError(inputElement, errorElement) {
        inputElement.classList.remove('user-info__input-field_error')
        errorElement.textContent = ''
        errorElement.style.visibility = 'hidden'

    }
  
    validateAllInputs() {
      let isValid = true;
        
      for (const input of this.inputs) {
        if (!input.isValid) {
          this.showError(input.inputElement, input.errorElement, input.errorMessageInvalid);
          isValid = false;
        }
      }
  
      return isValid;
    }
  }
  
  

  