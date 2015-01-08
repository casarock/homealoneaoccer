game.module(
    'game.objects'
).require(
    'engine.renderer'
).body(function() {

    game.createClass('Player', 'Sprite', {
        interactive: true,
        active: true,

        init: function(x, y) {
            this._super('player_sprite.png', x, y, {anchor: { x: 0, y: 0 }});
            this.position = {x: x, y: y};

            game.scene.stage.addChild(this);
        },

        jump: function() {
            console.log('jump');
        }
    });

});
