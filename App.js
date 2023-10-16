document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form1');
    const modal = document.getElementById('myModal');
    const resultContainer = document.getElementById('result-container');
    const closeModal = document.getElementById('closeModal');
  
    const selectDrop = document.getElementById('countries');
  
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        let output = "";
        data.sort(function (a, b) {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
  
        data.forEach((country) => {
          output += `<option value="${country.name.common}">${country.name.common}</option>`;
        });
  
        selectDrop.innerHTML = output;
      })
      .catch((err) => {
        console.log(err);
      });
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formElements = form.elements;
      let resultText = '';
  
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type !== 'button' && element.type !== 'reset' && element.type !== 'submit' ) {
          if (element.type === 'radio' && !element.checked) {
            continue; // Skip unchecked radio buttons
          }
          resultText += `<strong>${element.name || element.id}:</strong> ${element.value}<br>`;
        }
      }
  
      resultContainer.innerHTML = resultText;
      modal.style.display = 'block';
    });
  
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      document.getElementById("myform").reset();
    });
  
  
  
    const resetButton = document.querySelector('.btn2');
    resetButton.addEventListener('click', () => {
      form.reset();
      resultContainer.innerHTML = '';
      modal.style.display = 'none';
    });
  });