export function createFormData(inputName: string, inputEmail: string, inputPhone: string, selectedOption: string, file: File) {
    const formData = new FormData();
    formData.append('name', inputName);
    formData.append('email', inputEmail.toLowerCase());
    formData.append('phone', inputPhone);
    formData.append('position_id', selectedOption);
    formData.append('photo', file);
    return formData;
}