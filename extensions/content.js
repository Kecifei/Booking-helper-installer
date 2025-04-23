(function checkAndRun() {

  const waitForFields = () => {

    const pickupDate = document.getElementById('elmtKopf.TransportInfo.AbholungVonDatum');

    const pickupTime = document.getElementById('elmtKopf.TransportInfo.AbholungVonZeit');

    const deliveryDate = document.getElementById('elmtKopf.TransportInfo.ZustellungVonDatum');

    const kolliWeight = document.getElementById('elmtKolliK_0_Gewicht');

    if (!pickupDate || !pickupTime || !deliveryDate || !kolliWeight) {

      console.log('[AutoFill Extension] Waiting for all required fields...');

      return setTimeout(waitForFields, 500);

    }

    console.log('[AutoFill Extension] Fields detected. Proceeding...');

    function pad(n) { return n < 10 ? '0' + n : n; }

    const now = new Date();

    const plus30 = new Date(now.getTime() + 30 * 60000);

    const plus5 = new Date(now.getTime() + 5 * 24 * 60 * 60000);

    const dateToday = pad(now.getDate()) + '.' + pad(now.getMonth() + 1) + '.' + now.getFullYear();

    const timePlus30 = pad(plus30.getHours()) + ':' + pad(plus30.getMinutes());

    const datePlus5 = pad(plus5.getDate()) + '.' + pad(plus5.getMonth() + 1) + '.' + plus5.getFullYear();

    pickupDate.value = dateToday;

    pickupTime.value = timePlus30;

    deliveryDate.value = datePlus5;

    let refVal = parseFloat(kolliWeight.value.replace(',', '.')) || 0;

    let items = [];

    let totalNet = 0;

    for (let i = 0; i < 20; i++) {

      let weightField = document.getElementById('elmtArtikelA_' + i + '_Gewicht');

      let qtyField = document.getElementById('elmtArtikelA_' + i + '_Menge');

      if (weightField && qtyField) {

        let net = parseFloat(weightField.value.replace(',', '.')) || 0;

        let qty = parseFloat(qtyField.value.replace(',', '.')) || 1;

        let totalItemWeight = net * qty;

        items.push({ field: weightField, net: net, qty: qty });

        totalNet += totalItemWeight;

      }

    }

    if (totalNet >= refVal) {

      console.log('[AutoFill Extension] Adjusting net weights...');

      let target = refVal - 0.01;

      let factor = target / totalNet;

      items.forEach(item => {

        let adjustedNet = (item.net * factor).toFixed(3);

        item.field.value = adjustedNet.replace('.', ',');

        item.field.dispatchEvent(new Event('change'));

      });

    }

    console.log('[AutoFill Extension] Done.');

  };

  waitForFields();

})();
 
