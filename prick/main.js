var root = document.body;

var Planter = {
   clickCount: 0,

    view: function(vnode){
        return [
            m("div", {
                class: "plantBox"
            }),

            m("img", {
                src: vnode.attrs.url,
                onclick: function(clickCount) {
                    clickCount = clickCount++;

                    if(vnode.state.clickCount == 1){
                        vnode.attrs.url = "https://img1.etsystatic.com/127/1/6395286/il_170x135.1087570373_4h2o.jpg";
                    } else if (vnode.state.clickCount == 2){
                        vnode.attrls.url = "https://media.istockphoto.com/vectors/prickly-pear-cactus-vector-vector-id617375616?s=170x170";
                    } else if (vnode.state.clickCount == 3) {
                        vnode.attrs.url = "https://media.istockphoto.com/vectors/prickly-pear-cactus-vector-vector-id617375616?s=170x170";
                    } else if(vnode.state.clickCount == 4){
                        vnode.attrs.url = "https://thumbs.dreamstime.com/t/funny-surprised-surprised-cactus-cute-frightened-plant-character-cartoon-vector-illustration-funny-surprised-surprised-cactus-cute-102562087.jpg";
                    } else{
                        vnode.attrs.url = null;
                    }
                }
            })
        ]
    }
}

var Garden = {
    view: function(vnode){
       return m(Planter, {
            url: "https://thumbs.dreamstime.com/t/watercolor-cactus-beautiful-vector-image-nice-53412963.jpg",
        })
    }
}

m.mount(root, Garden)

/* There is going to be a grid of divs and in each div there is going to 
be an image of a 4 pieces of plant state. Every time the user clicks
the plant art changes.

On every "onclick" the image will change. OPTIONS:
Keep count of the clicks. So if click <= 1 src = "svg1", 
if click <= 2 src = "svg2", and if click <= 0 src = null. */