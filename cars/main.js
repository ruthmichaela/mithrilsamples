var root = document.body;

var Car = {
    //state defaults
    isBeeping: false,

    view: function(vnode){
        return [

            m("p", {
                style: {
                    'background-color': vnode.attrs.color,
                    'font-family': "sans-serif",
                    'font-weight': "bold",
                    'color': "white"
                }
            }, vnode.attrs.year + " " + vnode.attrs.make + " " + vnode.attrs.model),

            //vnode relates to real car not bp
            m("button", {
                onmousedown: function(){
                    vnode.state.isBeeping = true;
                },
                onmouseup: function(){
                    vnode.state.isBeeping = false;
                }
            }, "HONK!"),

            vnode.state.isBeeping ? m("p", "it beeps!") : null
        ];
    }
}

var App = {
    view: function(vnode){
        return [
            m(Car, {
                year: 2007,
                make: "Toyota",
                model: "Yaris",
                color: "Red"
            }),
            m(Car, {
                year: 2002,
                make: "Chevrolet",
                model: "Silverado",
                color: "Silver" 
            }),
            m(Car, {
                year: 1998,
                make: "Honda",
                model: "Civic LX",
                color: "Silver"
            }),
            m(Car, {
                year: 1999,
                make: "Honda",
                model: "CRV",
                color: "Red"
            })
        ]
    }
}

m.mount(root, App)