const vPortSize = document.querySelector('#vPortSize');
const vNumberStationsDiv = document.querySelector('#v-number-stations-div');
const vSolenoidVoltage = document.querySelector('#vSolenoidVoltage');

const valvePopupContent = document.querySelector('.valve-popup-content');

// Initiate null values for valve inputs
let valveInputs = {
    numStat: null,
    portSize: null,
    solVolt: null,
    valves: [],
    flowCtrl: [],
    checkValves: []
};

// Reset valve inputs
const resetValveInputs = () => {
    valveInputs = {
        numStat: null,
        portSize: null,
        solVolt: null,
        valves: [],
        flowCtrl: [],
        checkValves: []
    };
};

// Generate number of stations dropdown if port size is changed
vPortSize.addEventListener('change', e => {
    e.preventDefault();

    valveInputs.portSize = vPortSize.value;

    vGenerateNumberStationsDropdown();
    valvePopupContent.innerHTML = '';
    // hpuValveOptsForm.reset();
});

// Generate number of stations dropdown  based on port size selection
const vGenerateNumberStationsDropdown = () => {
    const htmlD03 = `
        <label for="vNumberStations">Number of Stations:</label>
            <select name="vNumberStations" id="vNumberStations" required>
                <option value="" disabled selected hidden>...</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>`

    const htmlD05 = `
            <label for="vNumberStations">Number of Stations:</label>
                <select name="vNumberStations" id="vNumberStations" required>
                    <option value="" disabled selected hidden>...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>`

    if(valveInputs.portSize == 'D03'){
        vNumberStationsDiv.innerHTML = htmlD03;
    } else if (valveInputs.portSize == 'D05'){
        vNumberStationsDiv.innerHTML = htmlD05;
    } else {
        vNumberStationsDiv.innerHTML = 'NO STATIONS';
    };

    const vNumberStations = document.querySelector('#vNumberStations');

    // Add event listener to reset valve options and sol volt if number of stations is changed
    vNumberStations.addEventListener('change', e => {
        e.preventDefault();

        valveInputs.numStat = vNumberStations.value;
        valvePopupContent.innerHTML = '';
        vSolenoidVoltage.value = "none";
    
    });
};

// Generate valve selectors based on numSt and solVolt
vSolenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    valvePopupContent.innerHTML = '';

    valveInputs.solVolt = vSolenoidVoltage.value;

    // Generate valve dropdowns for each number of stations containing selected solVolt data
    if(valveInputs.solVolt == 'null'){
        valvePopupContent.innerHTML = '';

    } else {
        for(let i = 0; i < valveInputs.numStat; i++){
            hpuNum.getFilteredValveData(valveInputs.portSize, valveInputs.solVolt)
                .then(data => vGenerateValveDropdown(data, i))
                .catch(err => console.log(err.message));
        } 
    };

});

// Create individual valve selectors
const vGenerateValveDropdown = (data, i) => {

    let html = `<div>
                    <label for="valveSelection${i}">Valve ${i}:</label>
                    <select name="valveSelection${i}" id="valveSelection${i}" class="valveSelection">
                        <option value="none">None Selected</option>`

    data.forEach((valve, index) => {
        html += `<option value=${index}>${valve.code}</option>`;
    });

    html += `</select></div>`;

    valvePopupContent.innerHTML += html;
};








// generate valve dropdown

// generate flow control dropdown

// generate check valve dropdown