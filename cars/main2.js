var root = document.body;

var Car = {
    beeping: false,
    lights: false,

    view: function(vnode){
        return [
            m("div", {
                style: {
                    "background-color": vnode.attrs.color
                }, class: "container",
            },
            [ 
               m("p", vnode.attrs.year + " " + vnode.attrs.make + " " + vnode.attrs.model + " " + "$" + vnode.attrs.price),

                m("img", {
                    src: vnode.attrs.url,
                    class: "vehicleImage"
                }),
                
                m("button", {
                    style: {
                        "color": vnode.attrs.color,
                    },
                    class: "buttonHonk",

                    onmousedown: function(){
                        vnode.state.beeping = true;
                    },
                    onmouseup: function(){
                        vnode.state.beeping = false;
                    } 
                }, 
                "Honk!"), 
                //ternary
                vnode.state.beeping ? m("p", {
                    class: "beepPara",
                }, "Beep!") : null,

                m("button", {
                    style: {
                        "color": vnode.attrs.color,
                    }, 
                    class: "buttonLight",
//you need to fix this so when you click the button the lights are on. When you click again the lights turn off.
                    onclick: function(){
                        // if (vnode.state.lights == true) {
                        //     vnode.state.lights = false;
                        // } else{
                        //     vnode.state.lights = true;
                        // }
                        // the thing below assigns it to the opposite. 
                        vnode.state.lights = !vnode.state.lights;
                    },

                }, 
                "Beams!"),
                vnode.state.lights ? m("p", {
                    class: "lightPara",
                }, "Lights on!") : null,
            ])    
        ]
    }
}

var Lot = {
    view: function(vnode){
        return [
            m("h1", "The Car Market"),

            m(Car, {
                year: 2019, 
                make: "Honda",
                model: "Fit",
                color: "#54536f",
                price: 18000,
                url: "https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2011/2011-honda-fit-frontside_hofitsp111.jpg"
            }),

            m(Car, {
                year: 2018,
                make: "Toyota",
                model: "Prius",
                color: "#1697bb",
                price: 28000,
                url: "http://assets.nydailynews.com/polopoly_fs/1.3865872.1520636942!/img/httpImage/image.jpg_gen/derivatives/splash_300220/2018-toyota-prius-blue-front-left-quarter.jpg"
            }),

            m(Car, {
                year: 2017,
                make: "Chevrolet",
                model: "Silverado",
                color: "#981d16",
                price: 32000,
                url: "https://file.kbb.com/kbb/vehicleimage/housenew/480x360/2017/2017-chevrolet-silverado%201500%20regular%20cab-frontside_cts15r1701.jpg"
            })
        ]
    }
}

m.mount(root, Lot)
