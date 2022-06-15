function optimizedGORobot({place, parcels}, route){
    shortest_route = route;
    if(route.length == 0){
        let routes = [];
        for(parcel of parcels){
            if(parcel.place !=place){
                routes.concat({route: findRoute(roadGraph, 
                                                place, 
                                                parcel.place),
                                                pickup: true});
            }else{
                routes.concat({route: findRoute(roadGraph, 
                                        place, 
                                        parcel.address),
                                        pickup:false});
            }
        }
    }

    if(routes.some((route) => route.pickup)){
        shortest_route = routes.filter(route =>{
            return route.pickup;
        }).reduce((min_route, next_route)=> {
            return next_route.length < min_route.lentgh? next_route: min_route;
        }).route;
    }else{
        shortest_route = routes.reduce((min_route, next_route)=> {
            return next_route.length < min_route.lentgh? next_route: min_route;
        }).route;
    }

    return {direction: shortest_route[0], memory: shortest_route.slice(1)};
}