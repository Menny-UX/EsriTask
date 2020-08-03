require([ "esri/Map", 
        "esri/views/MapView",
        "esri/widgets/Search" ,
        "esri/widgets/Home",
        "esri/widgets/Locate",
        "esri/widgets/BasemapToggle"
     ], 
    function(Map, MapView, Search, Home, Locate, BasemapToggle) {
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

});