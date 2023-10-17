window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('uploadForm');
    const output = document.getElementById('output');
    const downloadLink = document.getElementById('downloadLink');
    const graphImg = document.getElementById('graphImg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.output_file) {
            downloadLink.href = '/download/' + data.output_file;
            graphImg.src = '/graphs/' + data.graph_file;
            output.style.display = 'block';
        }
    });
});
