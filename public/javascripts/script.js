let fileToDelete = '';

function confirmDelete(filename) {
  fileToDelete = filename;
  document.getElementById('deleteModal').classList.remove('hidden');
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
  fetch(`/delete/${fileToDelete}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showSuccessToast(); 
      setTimeout(() => {
        location.reload(); 
      }, 1000);
    } else {
      console.error('Failed to delete the file');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  document.getElementById('deleteModal').classList.add('hidden');
});

document.getElementById('cancelDeleteBtn').addEventListener('click', function () {
  document.getElementById('deleteModal').classList.add('hidden');
});

function showSuccessToast() {
  const toast = document.getElementById('successToast');
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 1000);
}
