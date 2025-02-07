const partNumDisplay = document.querySelectorAll('.part-num-disp');
const partNumDets = document.querySelector('#part-num-dets');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');

const tableH2 = document.querySelector('#table-h2');
const tableHead = document.querySelector('thead');
const tableBody = document.querySelector('tbody');

// Table close button
tableCloseButton.addEventListener('click', e => {
    e.preventDefault();
    tableWrapper.style.display = 'none';
});

// Display configured HPU part number and details
const displayHpuNumber = (data) => {
    const reservoir = data.reservoir;
    const pump = data.pump;
    const motor = data.motor;
    const manifold = data.manifold;
    const heatExchanger = data.heatExchanger;
    const totalCost = hpuAssem.calcCost();

    // Determine individual item cost based on V or H reservoir
    let reservoirCost = null;
    let pumpCost = null;
    let motorCost = null;
    let manifoldCost = null;
    let heatExchangerCost = null;

    const filterCost = () => {
        if(reservoir.code.includes('H')){
            reservoirCost = reservoir.hCost;
            pumpCost = pump.hCost;
            motorCost = motor.hCost;
            manifoldCost = manifold.hCost;
            heatExchangerCost = heatExchanger.hCost;
        } else if (reservoir.code.includes('V')){
            reservoirCost = reservoir.vCost;
            pumpCost = pump.vCost;
            motorCost = motor.vCost;
            manifoldCost = manifold.vCost;
            heatExchangerCost = heatExchanger.vCost;
        };
    };

    filterCost();

    // Display part number at top of part number, edit, and email pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `N-${reservoir.code}-${pump.code}-${motor.code}-${manifold.code}-${heatExchanger.code}`;
    });

    // Display part number details on part number page
    const reservoirHTML = `
        <div class="dropdown">
            <div class="trigger">RESERVOIR ${reservoir.code}</div>
            <div class="content">        
                <ul>
                    <li>Capacity: ${reservoir.capacity}</li>
                    <li>Heat Dis: ${reservoir.heatDis}</li>
                    <li>Price: $${reservoirCost}</li>
                </ul>
                
            </div>
        </div>
    `;

    const pumpHTML = `        
        <div class="dropdown">
            <div class="trigger">PUMP ${pump.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${pump.partNum}</li>
                    <li>Description: ${pump.description}</li>
                    <li>Dissipation: ${pump.dispCID}</li>
                    <li>Mount Type: ${pump.mountType}</li> 
                    <li>Price: $${pumpCost}</li>
                </ul>
                
            </div>
        </div>
        `;

    const motorHTML = `
        <div class="dropdown">
            <div class="trigger">MOTOR ${motor.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${motor.partNum}</li>
                    <li>Description: ${motor.description}</li>
                    <li>Output HP: ${motor.outputHP}</li>
                    <li>Price: $${motorCost}</li>
                </ul>
                
            </div>
        </div>
    `;

    const manifoldHTML = `
        <div class="dropdown">
            <div class="trigger">MANIFOLD ${manifold.code}</div>
            <div class="content">        
                <ul>
                    <li>Description: ${manifold.description}</li>
                    <li>Valve Pattern: ${manifold.valvePattern}</li>
                    <li>Number of Stations: ${manifold.numStations}</li>
                    <li>Price: $${manifoldCost}</li>
                </ul>
                
            </div>
        </div>
    `;

    // Logic to display user-friendly null heat exchanger results
    let heatExchangerHTML = '';

    if(heatExchanger.code == 0){
         heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${heatExchanger.description}</li>
                        <li>Price: $${heatExchangerCost}</li>
                    </ul>
                    
                </div>
            </div>
        `;
    } else {
        heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${heatExchanger.description}</li>
                        <li>Type: ${heatExchanger.type}</li>
                        <li>Max Flow: ${heatExchanger.maxFlow}</li>
                        <li>Heat Dis: ${heatExchanger.heatDis}</li>
                        <li>Price: $${heatExchangerCost}</li>
                    </ul>
                    
                </div>
            </div>
        `;
    };

    const hpuCostHTML = `<h4>ESTIMATED HPU PRICE: $${totalCost}</h4>`;

    partNumDets.innerHTML = reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

    // Add valve subsection below the HPU section
    displayValveDets(valveAssem);

    addEventHandlersToDropdowns();
    // addEventHandlerstoEditBtns();
    displayPartNumDiv();

};

// Add event handlers to dropdowns
const addEventHandlersToDropdowns = () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.trigger');
        const content = dropdown.querySelector('.content');
    
        trigger.addEventListener('click', e => {
            e.preventDefault();

            trigger.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
};

// Inactive buttons HTML
{/* <button class="button gray edit" id="edit-reservoir">EDIT RESERVOIR</button> */}
{/* <button class="button gray edit" id="edit-pump">EDIT PUMP</button> */}
{/* <button class="button gray edit" id="edit-motor">EDIT MOTOR</button> */}
{/* <button class="button gray edit" id="edit-manifold">EDIT MANIFOLD</button> */}
{/* <button class="button gray edit" id="edit-heat-exchanger">EDIT HEAT EXCHANGER</button> */}
{/* <button class="button gray edit" id="edit-heat-exchanger">EDIT HEAT EXCHANGER</button> */}

// Add event handlers to edit buttons
// const addEventHandlerstoEditBtns = () => {
    // const editReservoirButton = document.querySelector('#edit-reservoir');
    // const editPumpButton = document.querySelector('#edit-pump');
    // const editMotorButton = document.querySelector('#edit-motor');
    // const editManifoldButton = document.querySelector('#edit-manifold');
    // const editHeatExchangerButton = document.querySelector('#edit-heat-exchanger');
    // const editValveButton = document.querySelector('#edit-valves');
    
    // editReservoirButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     hpuAssem.getReservoirData()
    //         .then(data => displayReservoirTable(data))
    //         .catch(err => console.log(err.message));
    
    //     tableWrapper.style.display = 'block';
    // });
    
    // editPumpButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     hpuAssem.getPumpData()
    //         .then(data => displayPumpTable(data))
    //         .catch(err => console.log(err.message));
    
    //     tableWrapper.style.display = 'block';
    // });
    
    // editMotorButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     hpuAssem.getMotorData()
    //         .then(data => displayMotorTable(data))
    //         .catch(err => console.log(err.message));
    
    //     tableWrapper.style.display = 'block';
    // });
    
    // editManifoldButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     hpuAssem.getManifoldData()
    //         .then(data => displayManifoldTable(data))
    //         .catch(err => console.log(err.message));
    
    //     tableWrapper.style.display = 'block';
    // });
    
    // editHeatExchangerButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     hpuAssem.getHeatExchangerData()
    //         .then(data => displayHeatExchangerTable(data))
    //         .catch(err => console.log(err.message));
    
    //     tableWrapper.style.display = 'block';
    // });
    
    // editValveButton.addEventListener('click', e => {
    //     e.preventDefault();
    
    //     displayValvePopup();
    
    // });
// };


// Display table with reservoir data and update HPU number with selected reservoir
const displayReservoirTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `RESERVOIR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>CAPACITY</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.capacity}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateReservoir(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });
};

// Display table with pump data and update HPU number with selected pump
const displayPumpTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `PUMP OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>DISSIPATION</th>
            <th>MOUNT TYPE</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.dispCID}</td><td>${element.mountType}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updatePump(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));
                
            tableWrapper.style.display = 'none';
        });
    });
};

// Display table with motor data and update HPU number with selected motor
const displayMotorTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `MOTOR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>PART NUMBER</th>
            <th>DESCRIPTION</th>
            <th>OUTPUT HP</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.partNum}</td><td>${element.description}</td><td>${element.outputHP}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateMotor(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));
                
            tableWrapper.style.display = 'none';
        });
    });
};

// Display table with manifold data and update HPU number with selected manifold
const displayManifoldTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `MANIFOLD OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>VALVE PATTERN</th>
            <th>NUMBER OF STATIONS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.valvePattern}</td><td>${element.numStations}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateManifold(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));
                
            tableWrapper.style.display = 'none';
        });
    });
};

// Display table with heat exchanger data and update HPU number with selected heat exchanger
const displayHeatExchangerTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `HEAT EXCHANGER OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>MAX FLOW</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.maxFlow}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateHeatExchanger(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));
                
            tableWrapper.style.display = 'none';
        });
    });
};