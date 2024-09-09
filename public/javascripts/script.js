function confirmDelete(filename) {
    if (confirm("Are you sure you want to delete this file?")) {
        fetch(`/delete/${filename}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('File deleted successfully');
                location.reload();
            } else {
                alert('Failed to delete the file');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
}
