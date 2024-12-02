// src/pages/DownloadMatrix.js
import { generateMatrixByType } from '../Algorithms/typematrice'; // Assurez-vous que le chemin est correct

const downloadMatrix = (method, size, matrixType, algorithm, setMatrix, setVectorB, min, max) => {
    if (method === 'random' && size > 30) {
        const { matrix: generatedMatrix, vectorB: generatedVectorB } = generateMatrixByType(size, matrixType, min, max, algorithm);
        setMatrix(generatedMatrix); // Met à jour la matrice générée
        setVectorB(generatedVectorB); // Met à jour le vecteur généré

        // Préparer le contenu du fichier
        let matrixContent = generatedMatrix.map(row => row.join(",")).join("\n");
        if (algorithm === 'gauss-seidel') {
            matrixContent += `\n${generatedVectorB.join(",")}`;
        }

        // Créer le fichier Blob et le télécharger
        const blob = new Blob([matrixContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "random_matrix.csv"; // Nom du fichier
        link.click();
    } else {
        console.error("Conditions non respectées : méthode non random ou taille ≤ 30.");
    }
};

export default downloadMatrix;