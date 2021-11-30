window.document.getElementById('correlationCoeficcient').textContent =
  JSON.stringify(data.correlation);

window.document.getElementById('pcorr').textContent = data.correlation.pcorr;
window.document.getElementById('pValue').textContent = data.correlation.pValue;
