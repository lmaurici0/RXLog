import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "../button/button.module.css";

function gerarPDF() {
  const doc = new jsPDF();

  const data = [
    { categoria: "Analgésico", quantidade: 100 },
    { categoria: "Antibiótico", quantidade: 75 },
    { categoria: "anti-inflamatório", quantidade: 95 },
    { categoria: "Controlados", quantidade: 25 },
  ];

  doc.setFontSize(18);
  doc.text("Relatório de Medicamentos", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Categoria", "Quantidade"]],
    body: data.map((item) => [item.categoria, item.quantidade]),
  });

  doc.save("relatorio_medicamentos.pdf");
}

function Button() {
  return (
    <button className={styles.btn} onClick={gerarPDF}>
      <p>Gerar relatório PDF</p>
    </button>
  );
}

export default Button;
