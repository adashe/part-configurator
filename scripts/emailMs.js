// Generate MS email
const generateMsEmail = () => {
    const msNum = msAssem.buildPartNum();
    const msBody = genMsEmailBody();
    const totalCostBody = genMsTotalCostEmailBody();

    const header = `SUN COAST PART CONFIGURATOR`;
    const introMsgHtml = `\n\nA new part number has been generated by ${contactInputs.contactName}!`
    const contactHtml = genContactEmailBody();
    const noteMsgHtml = `\n\nNOTE TO CUSTOMER: \nA customer representative will follow up shortly to provide lead times and to assist in placing your order. `;
    const thankYouMsg = `\n\nThank you for using the Sun Coast Part Configurator!`;

    const emailAddress = defaultEmail;
    const emailSubject = `Sun Coast Part Number Configurator: ${msNum}`;
    const bodyText = `${header + introMsgHtml + contactHtml + msBody + totalCostBody + noteMsgHtml + thankYouMsg}`; 

    const mailtoLink = createMailtoLink(emailAddress, emailSubject, bodyText);

    window.location.href = mailtoLink;
};

// Generate ms email body text
const genMsEmailBody = () => {

    // Build part num html
    const partNum = msAssem.buildPartNum();
    const partNumHtml = `\n\nMS NUMBER: ${partNum}`;

    const html = partNumHtml;

    return html;
};

// Generate ms total cost body text
const genMsTotalCostEmailBody = () => {

    const total = parseFloat(msAssem.calcCost());

    const html = `\n\nTOTAL LIST PRICE: $${total.toFixed(2)}`;

    return html;
};