// format the data output so that it "looks nice"
var dataFullOutput = JSON.stringify(data.correlation)
  .trim()
  .replace('{', '{\n\t')
  .replaceAll(',"', ',\n\t"')
  .replace('}', '\n}');

// "output" the full output
window.document.getElementById('correlationFullOutput').textContent =
  dataFullOutput;

// "output" the correlation and p-value
window.document.getElementById('pcorr').textContent = data.correlation.pcorr;
window.document.getElementById('pValue').textContent = data.correlation.pValue;
