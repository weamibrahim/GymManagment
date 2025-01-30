import { saveAs } from 'file-saver';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('barcode', {
    downloadBarcodeImage() {
      const barcodeElement = document.getElementById('barcode');
      if (barcodeElement) {
        const barcodeImageUrl = barcodeElement.src; 
        if (barcodeImageUrl) {
          
          saveAs(barcodeImageUrl, 'barcode.png');
        } else {
          console.error('Barcode image not found');
        }
      } else {
        console.error('Barcode element not found');
      }
    },
  });
});
