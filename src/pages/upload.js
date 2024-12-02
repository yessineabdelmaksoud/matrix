
const handleFileUpload = (event, size, setMatrix, setVectorB, algorithm) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const lines = e.target.result.split('\n').map(line => line.trim());
        const newMatrix = lines.slice(0, size).map(line => line.split(' ').map(Number));
        setMatrix(newMatrix);

        if (algorithm === 'gauss-seidel') {
            const newVectorB = lines[size].split(' ').map(Number);
            setVectorB(newVectorB);
        }
    };
    reader.readAsText(file);
};

export default handleFileUpload;