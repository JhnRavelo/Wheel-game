const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const ExcelJS = require("exceljs");

const app = express();

app.listen(4000, () => {
  console.log("http://127.0.0.1:4000");
});
app.use(bodyParser.json());
app.use(cors());

app.post("/add", async (req, res) => {
  res.json(`${req.body.nom} moi`)
  console.log(req.body)
  const { nom, devis, result } = await req.body;
  const nomFichierExcel = "game.xlsx";
  let workbook;
  const collecterEtAjouterDonnees = async (workbook) => {
    let worksheet = workbook.getWorksheet("Feuille1");

    if (!worksheet) {
      worksheet = workbook.addWorksheet("Feuille1");
      worksheet.addRow(["Nom", "Devis", "Resultat"]);
    }

    await worksheet.addRow([nom, devis, result]);

    workbook.xlsx
      .writeFile(nomFichierExcel)
      .then(() => {
        console.log("Données ajoutées avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors de la sauvegarde du fichier Excel :", error);
      });
  }

  if (fs.existsSync(nomFichierExcel)) {
    workbook = new ExcelJS.Workbook();
    workbook.xlsx
      .readFile(nomFichierExcel)
      .then(() => {
        collecterEtAjouterDonnees(workbook);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ouverture du fichier Excel :", error);
      });
  } else {
    workbook = new ExcelJS.Workbook();
    collecterEtAjouterDonnees(workbook);
  }

  
});
