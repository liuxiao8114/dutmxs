// Handle the form submission for creating a new file
document.getElementById('createFileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileName = document.getElementById('fileName').value;
    const content = document.getElementById('content').value;

    // Send a POST request to create a new file
    fetch('/files', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName,
            content
        })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('createFileForm').reset(); // Clear the form
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Handle the button click to get the list of files
document.getElementById('getFilesButton').addEventListener('click', function() {
    // Send a GET request to retrieve the list of files
    fetch('/files')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('fileList');
            fileList.innerHTML = ''; // Clear the existing list

            if (data.files.length === 0) {
                fileList.innerHTML = '<p>No files found.</p>';
            } else {
                const ul = document.createElement('ul');
                data.files.forEach(file => {
                    const li = document.createElement('li');
                    li.textContent = file;
                    ul.appendChild(li);
                });
                fileList.appendChild(ul);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

// Trigger file input when drop zone is clicked
dropZone.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection through input
fileInput.addEventListener('change', handleFileUpload);

// Drag and drop events
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    handleFileUpload({ target: { files: [file] } });
});

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('No file selected!');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
