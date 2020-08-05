require([ "esri/Map", 
        "esri/views/MapView",
        "esri/widgets/Search" ,
        "esri/widgets/Home",
        "esri/widgets/Locate",
        "esri/widgets/BasemapToggle",
        "esri/widgets/ScaleBar"
     ], 
    function(Map, MapView, Search, Home, Locate, BasemapToggle, ScaleBar) {
    var map = new Map({
        basemap: "streets"
    });
    var view = new MapView({
        container: "viewDiv", 
        map: map, 
        zoom: 12.5, 
        center: [51.3839,25.2548] 
    });
    //widgets
 
    const searchWidget = new Search({
        view: view
      });
    var homeWidget = new Home({
        view: view
    });
    var locateWidget = new Locate({
        view: view,
    });
    var basemapToggle = new BasemapToggle({
        view: view,  // The view that provides access to the map's "streets" basemap
        nextBasemap: "hybrid"  // Allows for toggling to the "hybrid" basemap
      });
    var scaleBar = new ScaleBar({
        view: view
    });

    //widgets UI setPosition
    view.ui.add(searchWidget, {
        position: "top-left",
    }); 
    view.ui.add([ basemapToggle ,locateWidget, homeWidget ], {
        position: "bottom-right",
    });
    view.ui.move([ "zoom" ], {
        position: "bottom-right",
    });
    view.ui.add(scaleBar, {
        position: "bottom-left"
    });


    function personalizeUI() {
        ////personalize the wedgets
        const satalite = document.querySelector('.esri-component.esri-basemap-toggle');
        
        let label = document.createElement("div");
        label.innerText = 'Satellite';
        label.className = 'sataliteImage-Label';
        satalite.insertBefore(label, satalite.childNodes[0]);
        
        
        const UIRightbottom = document.querySelector('.esri-ui-bottom-right.esri-ui-corner');
        let wedgets = document.createElement("div");
        wedgets.className += " esri-component esri-cust-nav esri-widget";
        wedgets.innerHTML = `
        <div class="esri-widget--button esri-widget esri-interactive" role="button" tabindex="0" title="Next">
        <img src="img/nav/arrow.png" alt="next" class="cust-icon next" />
            </div>
            <div class="esri-widget--button esri-widget esri-interactive" role="button" tabindex="0" title="Back">
                <img src="img/nav/arrow.png" alt="back" class="cust-icon back"/>
            </div>
        `;
        UIRightbottom.insertBefore(wedgets, UIRightbottom.childNodes[1]);
            
        const UIRightTop = document.querySelector('.esri-ui-top-right.esri-ui-corner');
        let liveIcon = document.createElement("div");
        liveIcon.className = "live-button";
        liveIcon.innerHTML = `
                <img class="live-button-img" src="img/icons1/icons8-traffic-light-50.png" alt="trafficLight" />
                <div class="live-button-text"> Live Traffic </div>
        `;
        UIRightTop.appendChild(liveIcon);
    }

    window.onload = personalizeUI;
});