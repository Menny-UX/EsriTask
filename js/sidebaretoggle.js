      //varibles
      var ActiveSection = '';
      var GlobalfetchedData = '';
      const colorList = ['#fff311', '#f48e78', '#02adf2',
      '#a24210' , '#772273' , '#de89dc', '#00adef'
    ];

      //global queryselectors
      const sideOptions = document.querySelectorAll('.sidebar__controle-item');
      const sidebareExtension = document .querySelector('.sidebar__extension');
      
      const sideContent = document.querySelector('.sidebar__extension .sidebar__extension-content')
      

      
      // static nav hierarcy

      const busTabs = [
        {name: 'routes', data: 'helllooo' },
        {name: 'stops' },
        {name: 'stations' },
        {name: 'kiosk' },
      ];

      let sideMenu = {
        route: { img: './img/icons1/icons8-itinerary-50.png'},
        bus: { img: './img/icons1/icons8-bus-50.png', tabs: [...busTabs] },
        train: { img: './img/icons1/icons8-city-railway-station-50.png'},
        ship: { img: './img/icons1/icons8-water-transportation-50.png'},
        car: { img: './img/icons1/icons8-car-50.png'},
        cycle: { img: './img/icons1/icons8-march-50.png'},
        airplan: { img: './img/icons1/icons8-airplane-take-off-50.png', content: {} },
        location: { img: './img/icons1/icons8-marker-50.png'},
        info: { img: './img/icons1/icons8-info-50.png'},
      }

      //Fetch data From Json
      const fetchbusData = async () =>{
        var fetchedData = await fetch('../json/buses.json');
        fetchedData = await fetchedData.json();
        GlobalfetchedData = await {...fetchedData};
        await reStructure(fetchedData.Buses, 'bus');
      }

      //Mocking airplan data 
      const mockAirplanData = () => {
        const data = {
          arrivals: [],
          departures: [],
          generalAreas: []
        };

        Object.keys(data).forEach((key)=> {
          let num = randomNumber(7 , 2);
          for (let i = 0; i < num; i++) {
            data[key].push(`Plan ${i}`);
          }
        })
        reStructure(data, 'airplan')
      }

      //Restructure Hierarcy using Fetched data
      const reStructure = ( Data, section) =>{
          //set fetched data in hierarcy object
          if(section === "bus"){
            sideMenu[section].tabs[0].data = populatingList( Data , busListTemp);
          }else if (section === "airplan"){
            sideMenu[section].content = populatingSections(Data);
          }
          //build section content
          getContentForSection();
          busItemEventListeners();
      }

      const populatingSections = (Data) =>{
        var tempContent =''
        Object.keys(Data).forEach((key)=>{
          tempContent +=  sectionGalleryTemp(Data[key], key)
        })
        return tempContent;
      }

      const sectionGalleryTemp = (data, name)=>{
        let gallery = data.map(el=>{
          return `<div class="gallery__item"  data-toggle="modal" data-target="#airPlanModal">
            <img class="gallery__item-img" src="./img/plan.jpg" />
            <div class="gallery__item-text">${el}</div>
          </div>
          `
        });
        return `<div class="gallery__section">
          <div class="gallery__section-header" >
            ${name}
          </div>
          <div class="gallery__content-grid">
          ${gallery.join(' ')}
          </div>
        </div>
       
        `
      }

      const stationDetailTemp = ({id,name}) => {
          return `
            <div class="bus__Item-station" id="${id}-station">
            <div class="station-name">${name}</div>
            <div class="station-next">
              <img src="./img/nav/more.png" />
            </div>
            </div>
          `
      }

      const busListTemp = ({ id , name , desceiption }) => {
        return `
          <div class="bus_Item u-divider-horizontal" id="${id}-bus">
              <div class="bus_Item-header">
                <div class="bus_id" style="border-color:${colorList[randomNumber(7, 0)]};">${id}</div>
                <div class="bus_name">${name}</div>
              </div>
              <div class="bus_description">
                To : ${ desceiption }
              </div>
          </div>
        `
      }

      //Section Header
      const buildSectionHeader =(section) => {
        return `
        <div class="sidebar__extension-header">
        <div class="sidebar__header-icon">
        <img src=${sideMenu[section].img}>
        </div>
        <div class="sidebar__header-text">
        ${section}
        </div>
        </div>
        `
      }

      //Sections Structure
      const buildSection = (section) => {
        if (sideMenu[section].tabs){
        let tempTabsList = [];
        let tempTabPaneList = [];
        sideMenu[section].tabs.forEach((el,indx) => {
          tempTabsList.push(
            `
            <li class="tab-item ${indx === 0 && 'active'}" id="${el.name}-tab">
              <a class="tab-link"
              href="#${section}-${el.name}">${el.name}</a>
            </li>
            `
          );
          tempTabPaneList.push(
              `
              <div class="tab-pane fade ${indx === 0 && 'show'} ${el.data ? '' : 'empty'}" 
              id="${el.name}-pane">
                ${el.data? el.data.join('') : 'Content not found'}
              </div>
              `
            )
        });
            return `
            <div class="sidebar__extension-content">
            <ul class="tab tab-list" id="tab-list">
            ${tempTabsList.join(' ')}
            </ul>
            <div class="input-group input-group-sm mb-3">
            <input type="text" class="form-control" placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2">
              <div class="input-group-prepend"  id="basic-addon2">
                <img  class="input-group-text" src="img/nav/search.png" alt="search" />
              </div>
            </div>
            <div class="tab-content" id="tab-tabContent">
            ${tempTabPaneList.join(' ')}
            </div>
            </div>
          `
        }else if(sideMenu[section].content){
          return `
          <div class="section__secondary-header">
          <img src="./img/nav/back.png"/>
          <div class="bus_Item-header">
            <img class="bus_icon" src=${sideMenu[section].img}>
            <div class="bus_name">Aviation</div>
          </div>
          </div>
          <div class="list_wrapper">
            ${sideMenu[section].content}
          </div>
          `
        }
        return 'Under development ...';
      }
      

      //////////Event Listeners 
      for (let i = 0; i < sideOptions.length; i++) {
        sideOptions[i].addEventListener("click",
          ()=>changeActive(sideOptions[i])
        );
      }

      /////onLoad Event
      const airplanEventListeners = () =>{
        const allItems = document.querySelectorAll('.gallery__item');
        
        for (let i = 0; i < allItems.length; i++) {
          allItems[i].addEventListener("click",
            ()=>openAirplanModal(allItems[i])
          );
        }
      }

      const tabsEventListeners = ()=>{
        const allTabs = document.querySelectorAll('.tab-item');
        const allPans = document.querySelectorAll('.tab-pane');
        
        for (let i = 0; i < allTabs.length; i++) {
          allTabs[i].addEventListener("click",
            ()=>changeTabActive(allTabs[i] ,allTabs, allPans )
          );
        }
      }

      const busItemEventListeners = ()=>{
        const busList = document.querySelectorAll('.bus_Item');
        
        for (let i = 0; i < busList.length; i++) {
          busList[i].addEventListener("click",
            ()=>busDetailSection( busList[i] )
          );
        }
      }

      const stationItemEventListeners = () => {
        const stationList = document.querySelectorAll('.bus__Item-station');
        
        for (let i = 0; i < stationList.length; i++) {
          stationList[i].addEventListener("click",
            ()=>stationDetailSection( stationList[i] )
          );
        }
      }
      ///////////////////////Events
      ////Station List

      function stationDetailSection(selectedStation){
        const sectionContent = RemoveExtensionContent();
        const station = GlobalfetchedData.Stations.find((el)=> `${el.id}-station` === selectedStation.id)
        const BusListForSec = populatingList( GlobalfetchedData.Buses , busListTemp );
        sectionContent.innerHTML = `<div class="section__secondary-header" >
        <img src="./img/nav/back.png"/>
        <div class="bus_Item-header">
        <div class="bus_name">${station.name}</div>
        </div>
        <div class="station_moreOptions dropdown">
        <img src="./img/nav/more1.png" 
        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item u-divider-horizontal" href="#">
            <img class="dropdown-item-icon" src="img/nav/marker.png" />
            <div class="dropdown-item-text">Route From</div>
          </a>
          <a class="dropdown-item u-divider-horizontal" href="#">
            <img class="dropdown-item-icon" src="img/nav/route.png" />
            <div class="dropdown-item-text">Route To</div>
          </a>
          <a class="dropdown-item u-divider-horizontal" href="#">
           <img class="dropdown-item-icon" src="img/nav/to-favorites.png" />
            <div class="dropdown-item-text">Add to favourites</div>
          </a>
          <a class="dropdown-item" href="#">
            <img class="dropdown-item-icon" src="img/nav/download.png" />
            <div class="dropdown-item-text">Download Schedule</div>
          </a>
        </div>
        </div>
        </div>
        <div class="list_wrapper">
          ${BusListForSec.join(" ")}
        </div>
        `;
      }
      
      ////Bus List
      function busDetailSection (selectedBus){
        const sectionContent = RemoveExtensionContent();
        const bus = GlobalfetchedData.Buses.find((el)=> `${el.id}-bus` === selectedBus.id)
        const StationListForBus = populatingList( GlobalfetchedData.Stations , stationDetailTemp );
        sectionContent.innerHTML = `<div class="section__secondary-header">
        <img src="./img/nav/back.png"/>
        <div class="bus_Item-header">
          <div class="bus_id">${bus.id}</div>
          <div class="bus_name">${bus.name}</div>
        </div>
        </div>
        <div class="list_wrapper">
          ${StationListForBus.join(" ")}
        </div>
        `;
        stationItemEventListeners();
      }

      ////Tabs Events
      function changeTabActive(selected , allTabs, allPans){
        let tabName = selected.id.split("-")[0]
        if(sidebareExtension.classList.contains("open")){
          for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].classList.remove("active");
            allPans[i].classList.remove("show");
            if(allPans[i].id === `${tabName}-pane`){
              allPans[i].classList.add("show");
            }
          }
          selected.classList.add("active");
        }
      }

      ////sideMenu Events

      function changeActive(selectedOption){
        ActiveSection = selectedOption.id;
        //if selected === bus fetch data
        if(selectedOption.id === 'bus'){
          fetchbusData();
        }else if(selectedOption.id === 'airplan'){
          mockAirplanData();
        }else {
          getContentForSection();
        }
        // if active already remove class and close sidebare Extension
        if (selectedOption.classList.contains("active")){
          selectedOption.classList.remove("active");
          sidebareExtension.classList.remove("open");
          sidebareExtension.innerHTML = "";
          ActiveSection = ""
          return;
        }
        
        // remove any active class from Menu List
        for (let i = 0; i < sideOptions.length; i++) {
          sideOptions[i].classList.remove("active");
        }
        // open sidebar Extention and add active case to selected one
        sidebareExtension.classList.add("open");
        selectedOption.classList.add("active");
      }

      //helper functions
      function getContentForSection(){
        if(ActiveSection){
          const sectionHeader = buildSectionHeader(ActiveSection)
          const sectionContent = buildSection(ActiveSection);
          sidebareExtension.innerHTML = sectionHeader;
          sidebareExtension.innerHTML += sectionContent;
          tabsEventListeners();
          airplanEventListeners();
        }
      }

      function RemoveExtensionContent(){
        const sectionContent = document.querySelector('.sidebar__extension-content');
        sectionContent.innerHTML = '';
        return sectionContent;
      }

      const populatingList = (dataArray , template) => {
        return dataArray.map( el=> template(el));
      }

      const randomNumber = (max , min )=>{
       return Math.floor(Math.random() * (max - min + 1)) + min;
      }



