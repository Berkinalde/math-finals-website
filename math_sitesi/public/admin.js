document.addEventListener('DOMContentLoaded', () => {
  const uploadNotesButton = document.getElementById('upload-notes');
  const uploadQuestionsButton = document.getElementById('upload-questions');
  const uploadForm = document.getElementById('upload-form');
  const uploadFormElement = document.getElementById('upload-form-element');
  const fileInput = document.getElementById('file-input');

  uploadNotesButton.addEventListener('click', () => {
    uploadForm.style.display = 'block';
    uploadFormElement.action = '/api/upload-notes';
  });

  uploadQuestionsButton.addEventListener('click', () => {
    uploadForm.style.display = 'block';
    uploadFormElement.action = '/api/upload-questions';
  });

  uploadFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < fileInput.files.length; i++) {
      formData.append('files', fileInput.files[i]);
    }
    fetch(uploadFormElement.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Dosyalar başarıyla yüklendi.');
      uploadForm.style.display = 'none';
    })
    .catch(error => {
      alert('Dosya yüklenirken hata oluştu.');
    });
  });
}); 